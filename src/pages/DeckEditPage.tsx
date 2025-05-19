import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Loader, Text, Title, Button, Stack, Card, TextInput } from "@mantine/core";
import { Deck } from "../../data/interfaces/Deck";
import { getDeck, updateDeck, getQuestionsByDeckId } from "../firebase/firestore";
import EditQuestionCard from "../components/EditQuestionCard";
import { Question } from "../../data/interfaces/Test";

const DeckEditPage: React.FC = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [deckTitle, setDeckTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!deckId) return;
    async function loadDeck() {
      try {
        if (!deckId) return;
        const deckData = await getDeck(deckId);
        if (!deckData) return;
        setDeck(deckData);
        setDeckTitle(deckData.title);
        if (deckData?.questionIds) {
          const questionsData = await getQuestionsByDeckId(deckId);
          setQuestions(questionsData);
        }
      } catch (err) {
        console.error("Error loading deck:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDeck();
  }, [deckId]);

  const handleTitleChange = async () => {
    if (!deckId || !deck) return;
    try {
      await updateDeck(deckId, { title: deckTitle });
      alert("Deck title updated successfully.");
    } catch (err) {
      console.error("Error updating deck title:", err);
      alert("Error updating deck title. See console for details.");
    }
  };

  if (loading) return <Loader size="xl" variant="dots" />;
  if (!deck) return <Text color="red">Deck not found.</Text>;

  return (
    <Container size="md" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Title order={2} mb="lg" ta="center">
          Edit Deck
        </Title>
        <TextInput
          label="Deck Title"
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.currentTarget.value)}
          mb="lg"
        />
        <Button onClick={handleTitleChange} fullWidth>
          Update Deck Title
        </Button>
      </Card>

      <Stack gap="md">
        {questions.map((question, index) => (
          <EditQuestionCard
            key={index}
            question={question}
          />
        ))}
        <Button onClick={() => {
          navigate(`/decks/${deckId}/new-question`);
        }} fullWidth>
          Add Question
        </Button>
      </Stack>
    </Container>
  );
};

export default DeckEditPage; 