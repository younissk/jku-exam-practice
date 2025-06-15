// FILE: src/pages/DeckCreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck, createQuestion, linkQuestionToDeck } from "../firebase/firestore";
import { useAuth } from "./useAuth";
import { Container, TextInput, NumberInput, Button, Title, Stack, FileInput, Group, Alert, Text } from "@mantine/core";
import { User } from "firebase/auth";
import { QuestionType, Question } from "../../data/interfaces/Test";
import { showNotification, updateNotification } from "@mantine/notifications";

type AIQuestion = {
  question: string;
  type: string;
  options?: string[];
  correctAnswers?: string[];
  correctAnswerBoolean?: boolean;
  correctAnswerInput?: string;
  answer?: string;
};

const DeckCreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [openaiKey, setOpenaiKey] = useState<string>(() => localStorage.getItem("openai_api_key") || "");
  const [keySaved, setKeySaved] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = useAuth() as { user: User | null };

  if (!user) {
    return <div>You must be logged in to create a deck.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a deck title.");
      return;
    }

    setLoading(true);
    try {
      const deckId = await createDeck({
        title: title.trim(),
        ...(typeof timer === 'number' ? { timer } : {}),
        leaderboard: [],
        questionIds: [],
        creatorId: user.uid,
      });
      navigate(`/decks/${deckId}/new-question`);
    } catch (err) {
      console.error("Error creating deck:", err);
      alert("Error creating deck. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromPDF = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a deck title.");
      return;
    }
    if (!pdfFile) {
      alert("Please upload a PDF file to generate the deck.");
      return;
    }
    if (!openaiKey.trim()) {
      alert("Please provide your OpenAI API key.");
      return;
    }
    setLoading(true);
    try {
      // 1) Extract text from the PDF -------------------------------------------------
      const extractTextFromPDF = async (file: File): Promise<string> => {
        const pdfjsLib = await import("pdfjs-dist/build/pdf");
        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = (
          await import("pdfjs-dist/build/pdf.worker.mjs?url")
        ).default as string;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        const maxPages = Math.min(pdf.numPages, 20); // avoid huge PDFs
        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item: { str: string }) => item.str)
            .join(" ");
          text += " " + pageText;
        }
        return text;
      };

      const pdfText = await extractTextFromPDF(pdfFile);

      showNotification({
        id: "gen-progress",
        title: "Generating questions…",
        message: "Contacting OpenAI (chunk 1)…",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      // 2) Ask OpenAI to generate questions (supports chunking) --------------------
      const apiKey = openaiKey.trim();
      if (!apiKey) {
        throw new Error("OpenAI API key is required.");
      }

      const promptSystem =
        "You are an assistant that creates high-quality flashcard questions for exams.";

      const buildUserPrompt = (snippet: string) =>
        `Based on the text below, create up to 15 UNIQUE questions suitable for studying. Vary the question types (MultipleChoice, TrueFalse, Input).

Return ONLY a valid JSON array. Each element must have:
  - question (string) (may include HTML with LaTeX markup)
  - type ("MultipleChoice" | "TrueFalse" | "Input")
  - For MultipleChoice: options (string[]), correctAnswers (string[])
  - For TrueFalse: correctAnswerBoolean (boolean)
  - For Input: correctAnswerInput (string)

GOOD EXAMPLES:
[
  {"question":"With respect to the vanishing gradient problem, which of the following statements are true regarding deep neural networks?","type":"MultipleChoice","options":["The deeper the network, the more multiplications (chain rule) we have to perform in the backward pass.","The used activation functions of the network play a significant role.","The vanishing gradient problem will typically occur towards the input layer.","Deep networks will always suffer from the vanishing gradient problem."],"correctAnswers":["The deeper the network, the more multiplications (chain rule) we have to perform in the backward pass.","The used activation functions of the network play a significant role.","The vanishing gradient problem will typically occur towards the input layer."]},
  {"question":"Consider the update function used during Q-learning: $$Q(s, a) \\leftarrow (1 - \\alpha) Q(s, a) + \\alpha (r + \\gamma \\max Q(s', a'))$$ Which of the following statements are true?","type":"MultipleChoice","options":["α = 0 means that only new information is used in the update.","α = 1 means that only new information is used in the update.","α is the learning rate.","r is the expected long-term reward when taking action a in state s."],"correctAnswers":["α is the learning rate.","α = 1 means that only new information is used in the update."]}
]

Do NOT wrap the JSON in markdown. Do NOT include other keys. Avoid duplicates.

Text:
"""
${snippet}
"""`;

      const chunkSize = 6000; // characters
      const overlap = 1000;
      const chunks: string[] = [];
      for (let i = 0; i < pdfText.length; i += chunkSize - overlap) {
        chunks.push(pdfText.slice(i, i + chunkSize));
      }

      const aggregated: AIQuestion[] = [];

      for (let index = 0; index < Math.min(3, chunks.length); index++) {
        const chunk = chunks[index];
        updateNotification({ id: "gen-progress", message: `Contacting OpenAI (chunk ${index + 1}/${Math.min(3, chunks.length)})…` });
        // Limit to first 3 chunks to avoid excessive cost
        const body = {
          model: "gpt-3.5-turbo-0125",
          temperature: 0.4,
          messages: [
            { role: "system", content: promptSystem },
            { role: "user", content: buildUserPrompt(chunk) },
          ],
        };

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error("OpenAI API request failed");
        }

        const data = await res.json();
        let content: string = data.choices?.[0]?.message?.content ?? "[]";
        // Clean any accidental markdown
        content = content.replace(/^```json\n/, '').replace(/\n```$/, '').trim();

        try {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            aggregated.push(...parsed);
          }
        } catch (err) {
          console.error("Failed to parse OpenAI chunk", content);
        }
      }

      // Deduplicate by question text
      const seen = new Set<string>();
      const generated = aggregated.filter((q: AIQuestion) => {
        if (seen.has(q.question)) return false;
        seen.add(q.question);
        return true;
      });

      if (generated.length === 0) {
        alert("OpenAI did not return any questions.");
        return;
      }

      // 3) Persist the deck and questions ------------------------------------------
      const deckId = await createDeck({
        title: title.trim(),
        ...(typeof timer === 'number' ? { timer } : {}),
        leaderboard: [],
        questionIds: [],
        creatorId: user!.uid,
      });

      for (const pair of generated) {
        const newQuestion: Partial<Question> = {
          id: "", // Firestore will assign
          question: pair.question,
          deckIds: [deckId],
        };
        // Map by question type
        if (pair.type === "MultipleChoice") {
          newQuestion.type = QuestionType.MultipleChoice;
          newQuestion.options = pair.options;
          newQuestion.correctAnswers = pair.correctAnswers;
        } else if (pair.type === "TrueFalse") {
          newQuestion.type = QuestionType.TrueFalse;
          newQuestion.correctAnswerBoolean = pair.correctAnswerBoolean;
        } else {
          newQuestion.type = QuestionType.Input;
          newQuestion.correctAnswerInput = pair.correctAnswerInput ?? pair.answer;
        }

        const qId = await createQuestion(newQuestion as Question);
        await linkQuestionToDeck(deckId, qId);
      }

      navigate(`/decks/${deckId}`);
      updateNotification({ id: "gen-progress", title: "Generation complete", message: `${generated.length} questions created`, loading: false, autoClose: 4000 });
    } catch (err) {
      console.error("Error generating deck:", err);
      alert("Error generating deck. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = () => {
    localStorage.setItem("openai_api_key", openaiKey.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2}  mb="lg">
        Create a New Deck
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Deck Title"
            placeholder="Enter deck title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />

          <NumberInput
            label="Timer (minutes)"
            placeholder="Enter timer in minutes"
            value={timer}
            onChange={(value) => setTimer(Number(value))}
            disabled={loading}
          />

          <FileInput
            label="PDF File (optional)"
            placeholder="Upload study PDF"
            accept="application/pdf"
            value={pdfFile}
            onChange={setPdfFile}
            disabled={loading}
          />

          <TextInput
            label="OpenAI API Key"
            placeholder="Enter your OpenAI API key"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
            disabled={loading}
            required
          />
          <Button onClick={handleSaveKey} disabled={loading}>
            Save API Key
          </Button>
          {keySaved && (
            <Alert color="green">
              <Text>Your OpenAI API key has been saved in localStorage. You can check the open source code to verify that we do not send it anywhere else.</Text>
            </Alert>
          )}

          <Group justify="space-between" mt="md">
            <Button type="submit" loading={loading} style={{ flex: 1 }}>
              {loading ? "Creating..." : "Create Deck Manually"}
            </Button>
            <Button onClick={handleGenerateFromPDF} loading={loading} variant="outline" style={{ flex: 1 }}>
              {loading ? "Generating..." : "Generate from PDF (LLM)"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default DeckCreatePage;
