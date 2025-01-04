import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Loader,
  Text,
  Title,
  Button,
  Stack,
  Card,
  Group,
  Switch,
} from "@mantine/core";
import { Deck } from "../../data/interfaces/Deck";
import {
  getDeck,
  getUser,
  getQuestionsByDeckId,
} from "../../firebase/firestore";
import { useAuth } from "./useAuth";
import QuestionCard from "../components/QuestionCard";

const DeckOverviewPage: React.FC = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [creatorName, setCreatorName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!deckId) return;
    async function loadDeck() {
      try {
        if (!deckId) throw new Error("No deck ID provided");
        const deckData = await getDeck(deckId);
        setDeck(deckData);
        if (deckData?.creatorId) {
          const userData = await getUser(deckData.creatorId);
          setCreatorName(userData?.username || "Unknown");
        }
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

  if (loading) return <Loader size="xl" variant="dots" />;
  if (!deck) return <Text color="red">Deck not found.</Text>;

  return (
    <Container size="md" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Title order={2} mb="lg" ta="center">
          {deck.title}
        </Title>
        <Stack gap="md">
          <Text size="lg" ta="center">
            This deck has {deck.questionIds.length} questions.
          </Text>
          {deck.timer && (
            <Text size="lg" ta="center">
              Time limit: {deck.timer} Minutes
            </Text>
          )}
          <Text size="lg" ta="center">
            Created by: {creatorName}
          </Text>
          <Group justify="center" mt="md">
            <Button
              variant="filled"
              color="blue"
              onClick={() => navigate(`/decks/${deckId}/test`)}
            >
              Start Test
            </Button>
            <Button
              variant="outline"
              color="blue"
              onClick={() => navigate(`/decks/${deckId}/leaderboard`)}
            >
              View Leaderboard
            </Button>
            {user?.uid === deck.creatorId && (
              <Button
                variant="outline"
                color="green"
                onClick={() => navigate(`/decks/${deckId}/edit`)}
              >
                Edit Deck
              </Button>
            )}
          </Group>
        </Stack>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Title order={3} mb="lg" ta="center">
          Questions
        </Title>
        <Switch
          label="Show Answers"
          checked={showAnswers}
          onChange={() => setShowAnswers(!showAnswers)}
        />
      </Card>

      <Stack gap="md">
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            showAnswer={showAnswers}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default DeckOverviewPage;
