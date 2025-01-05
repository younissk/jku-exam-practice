import React, { useEffect, useState } from "react";
import { Container, Grid, Title, Text } from "@mantine/core";
import { Deck } from "../../data/interfaces/Deck";
import { getDeck } from "../../firebase/firestore";
import { DeckCard } from "../components/DeckCard/DeckCard";

const BookmarkDeckPage: React.FC = () => {
  const [bookmarkedDecks, setBookmarkedDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const fetchBookmarkedDecks = async () => {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      const decks = await Promise.all(bookmarks.map((id: string) => getDeck(id)));
      setBookmarkedDecks(decks.filter((deck) => deck !== null));
    };
    fetchBookmarkedDecks();
  }, []);

  return (
    <Container size="lg" mt="xl">
      <Title order={2} mb="lg" ta="center">
        Bookmarked Decks
      </Title>
      {bookmarkedDecks.length === 0 ? (
        <Text ta="center">No bookmarks yet.</Text>
      ) : (
        <Grid>
          {bookmarkedDecks.map((deck) => (
            <Grid.Col key={deck.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <DeckCard deck={deck} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BookmarkDeckPage; 