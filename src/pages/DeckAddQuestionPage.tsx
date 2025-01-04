// FILE: src/pages/DeckAddQuestionPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextInput, Select, Button, Stack, Title, Checkbox, Textarea } from "@mantine/core";
import { QuestionType } from "../../data/interfaces/Test";
import { createQuestion, linkQuestionToDeck } from "../../firebase/firestore";

const DeckAddQuestionPage: React.FC = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MultipleChoice);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deckId) {
      alert("No deckId provided.");
      navigate("/decks");
    }
  }, [deckId, navigate]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleToggleCorrectAnswer = (value: string) => {
    if (correctAnswers.includes(value)) {
      setCorrectAnswers(correctAnswers.filter((a) => a !== value));
    } else {
      setCorrectAnswers([...correctAnswers, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckId) return;

    if (!questionText.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    try {
      const newQuestionData = {
        question: questionText.trim(),
        type: questionType,
        topics: [],
        deckIds: [],
        options,
        correctAnswers,
      };

      const questionId = await createQuestion({
        ...newQuestionData,
        id: "",
      });
      await linkQuestionToDeck(deckId, questionId);
      navigate(`/decks/${deckId}`);
    } catch (err) {
      console.error("Error creating question:", err);
      alert("Error creating question. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="lg">
        Add a New Question to Deck
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Textarea
            label="Question Text"
            placeholder="Enter your question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            disabled={loading}
            required
          />

          <Select
            label="Question Type"
            value={questionType}
            onChange={(value) => setQuestionType(value as QuestionType)}
            data={[
              { value: QuestionType.MultipleChoice, label: "Multiple Choice" },
              { value: QuestionType.TrueFalse, label: "True/False" },
              { value: QuestionType.Input, label: "Input (Number/Text)" },
            ]}
            disabled={loading}
          />

          {questionType === QuestionType.MultipleChoice && (
            <Stack gap="xs">
              {options.map((opt, idx) => (
                <div key={idx}>
                  <TextInput
                    value={opt}
                    onChange={(e) => handleOptionChange(e.target.value, idx)}
                    disabled={loading}
                  />
                  <Checkbox
                    label="Correct?"
                    checked={correctAnswers.includes(opt)}
                    onChange={() => handleToggleCorrectAnswer(opt)}
                    disabled={loading}
                  />
                </div>
              ))}
              <Button onClick={handleAddOption} disabled={loading}>
                + Add Option
              </Button>
            </Stack>
          )}

          {questionType === QuestionType.TrueFalse && (
            <Stack gap="xs">
              <Checkbox
                label="True"
                checked={correctAnswers.includes("true")}
                onChange={() => setCorrectAnswers(["true"])}
                disabled={loading}
              />
              <Checkbox
                label="False"
                checked={correctAnswers.includes("false")}
                onChange={() => setCorrectAnswers(["false"])}
                disabled={loading}
              />
            </Stack>
          )}

          {questionType === QuestionType.Input && (
            <TextInput
              label="Correct Answer (text/number)"
              value={correctAnswers[0] || ""}
              onChange={(e) => setCorrectAnswers([e.target.value])}
              disabled={loading}
            />
          )}

          <Button type="submit" fullWidth loading={loading}>
            {loading ? "Creating..." : "Create Question"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default DeckAddQuestionPage;
