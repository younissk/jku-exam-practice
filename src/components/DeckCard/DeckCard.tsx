import { useEffect, useState } from "react";
import { Card, Text, Button, Stack } from "@mantine/core";
import { Deck } from "../../../data/interfaces/Deck";
import { getUser } from "../../../firebase/firestore";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const [creatorName, setCreatorName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCreatorName() {
      if (deck.creatorId) {
        const userData = await getUser(deck.creatorId);
        setCreatorName(userData?.username || "Unknown");
      }
    }
    fetchCreatorName();
  }, [deck.creatorId]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="deck-card">
      <Stack gap="sm">
        <Text fw={500} size="lg">
          {deck.title}
        </Text>
        <Text size="sm">
          Questions: {deck.questionIds.length}
        </Text>
        {deck.timer && (
          <Text size="sm">
            Timer: {deck.timer} Minutes
          </Text>
        )}
        <Text size="sm" color="dimmed">
          Created by: {creatorName}
        </Text>
        <Button variant="light" fullWidth component="a" href={`/decks/${deck.id}`}>
          View Deck
        </Button>
      </Stack>
    </Card>
  );
};
