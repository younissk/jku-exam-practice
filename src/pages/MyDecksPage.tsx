import React from "react";
import { getDecksByCreatorId } from "../firebase/firestore";
import { Deck } from "../../data/interfaces/Deck";
import { useAuth } from "./useAuth";
import { Container, Grid, Title } from "@mantine/core";
import { DeckCard } from "../components/DeckCard/DeckCard";

const MyDecksPage = () => {
  const [decks, setDecks] = React.useState<Deck[]>([]);

  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      getDecksByCreatorId(user.uid).then(setDecks);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container size="lg" mt="xl">
      <Title order={2} mb="lg" ta="center">
        My Decks
      </Title>
      <Grid>
        {decks.map((deck) => (
          <Grid.Col key={deck.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <DeckCard deck={deck} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default MyDecksPage;
