// FILE: src/pages/DeckCreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../../firebase/firestore";
import { useAuth } from "./useAuth";
import { Container, TextInput, NumberInput, Button, Title, Stack } from "@mantine/core";
import { User } from "firebase/auth";

const DeckCreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
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
        timer,
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

          <Button type="submit" fullWidth loading={loading}>
            {loading ? "Creating..." : "Create Deck"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default DeckCreatePage;
