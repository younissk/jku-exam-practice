import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Loader, Text, Title, Button, Stack, Card, Group } from "@mantine/core";
import { Deck } from "../../data/interfaces/Deck";
import { getDeck, getUser } from "../../firebase/firestore";

const DeckOverviewPage: React.FC = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [creatorName, setCreatorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!deckId) return;
    async function loadDeck() {
      try {
        if (!deckId) return;
        const deckData = await getDeck(deckId);
        setDeck(deckData);
        if (deckData?.creatorId) {
          const userData = await getUser(deckData.creatorId);
          setCreatorName(userData?.username || "Unknown");
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
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} mb="lg" ta="center">
          {deck.title}
        </Title>
        <Stack gap="md">
          <Text size="lg" ta="center">
            This deck has {deck.questionIds.length} questions.
          </Text>
          {deck.timer && (
            <Text size="lg" ta="center">
              Time limit: {deck.timer} seconds
            </Text>
          )}
          <Text size="lg" ta="center">
            Created by: {creatorName}
          </Text>
          <Group justify="center" mt="md">
            <Button variant="filled" color="blue" onClick={() => navigate(`/decks/${deckId}/test`)}>
              Start Test
            </Button>
            <Button variant="outline" color="blue" onClick={() => navigate(`/decks/${deckId}/leaderboard`)}>
              View Leaderboard
            </Button>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};

export default DeckOverviewPage;
