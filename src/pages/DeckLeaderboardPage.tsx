// FILE: src/pages/DeckLeaderboardPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Text, Title, Loader, Card, Grid } from "@mantine/core";
import { FaCrown } from "react-icons/fa";
import { Deck, LeaderboardItem } from "../../data/interfaces/Deck";
import { getDeck, getUser } from "../firebase/firestore";

interface EnhancedLeaderboardItem extends LeaderboardItem {
  username?: string;
}

const DeckLeaderboardPage: React.FC = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<EnhancedLeaderboardItem[]>([]);

  useEffect(() => {
    if (!deckId) return;

    async function loadDeckAndUsers() {
      if (!deckId) return;
      
      try {
        const deckData = await getDeck(deckId);
        if (!deckData) {
          setDeck(null);
          setLoading(false);
          return;
        }
        setDeck(deckData);

        const sorted = [...(deckData.leaderboard || [])].sort(
          (a, b) => (b.xp || 0) - (a.xp || 0)
        );

        const userDocs = await Promise.all(
          sorted.map((item) => getUser(item.userId))
        );

        const enhanced = sorted.map((item, idx) => {
          const userDoc = userDocs[idx];
          return {
            ...item,
            username: userDoc?.username ?? item.userId,
          };
        });

        setLeaderboard(enhanced);
      } catch (err) {
        console.error("Error loading deck or users:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDeckAndUsers();
  }, [deckId]);

  if (loading) return <Loader />;
  if (!deck) return <Text>Deck not found.</Text>;

  return (
    <Container size="md" mt="xl">
      <Title order={2} mb="lg" ta="center">
        Leaderboard for {deck.title}
      </Title>
      {leaderboard.length === 0 ? (
        <Text ta="center">No leaderboard entries yet.</Text>
      ) : (
        <Card shadow="sm" padding="lg">
          <Grid>
            <Grid.Col span={3}><Text fw={500}>Rank</Text></Grid.Col>
            <Grid.Col span={3}><Text fw={500}>Username</Text></Grid.Col>
            <Grid.Col span={3}><Text fw={500}>XP</Text></Grid.Col>
            <Grid.Col span={3}><Text fw={500}>Score</Text></Grid.Col>
          </Grid>
          {leaderboard.map((item, index) => (
            <Grid key={item.userId} align="center">
              <Grid.Col span={3}>
                {index === 0 && <FaCrown color="gold" style={{ marginRight: 5 }} />}
                {index + 1}
              </Grid.Col>
              <Grid.Col span={3}>{item.username}</Grid.Col>
              <Grid.Col span={3}>{item.xp ?? 0}</Grid.Col>
              <Grid.Col span={3}>{item.score !== undefined ? `${item.score}%` : "N/A"}</Grid.Col>
            </Grid>
          ))}
        </Card>
      )}
    </Container>
  );
};

export default DeckLeaderboardPage;
