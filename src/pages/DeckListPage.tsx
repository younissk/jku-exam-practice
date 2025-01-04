import React, { useEffect, useState } from "react";
import { Container, Loader, Grid, Title, TextInput } from "@mantine/core";
import { Deck } from "../../data/interfaces/Deck";
import { getAllDecks } from "../../firebase/firestore";
import { DeckCard } from "../components/DeckCard/DeckCard";

const DeckListPage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadDecks() {
      try {
        const allDecks = await getAllDecks();
        setDecks(allDecks);
      } catch (err) {
        console.error("Error loading decks:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDecks();
  }, []);

  const filteredDecks = decks.filter((deck) =>
    deck.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader size="xl" variant="dots" />;
  }

  return (
    <Container size="lg" mt="xl">
      <Title order={2} mb="lg" ta="center">
        All Decks
      </Title>
      <TextInput
        placeholder="Search decks"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="lg"
      />
      <Grid>
        {filteredDecks.map((deck) => (
          <Grid.Col key={deck.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <DeckCard deck={deck} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default DeckListPage;
