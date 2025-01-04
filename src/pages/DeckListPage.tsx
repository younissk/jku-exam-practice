import React, { useEffect, useState } from "react";
import { Deck } from "../../data/interfaces/Deck";
import { getAllDecks } from "../../firebase/firestore";
import { DeckCard } from "../components/DeckCard/DeckCard";

const DecksListPage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading Decks...</div>;
  }

  return (
    <div className="decks-list-container">
      <h1>All Decks</h1>
      <div className="decks-grid">
        {decks.map((deck) => (
          <DeckCard deck={deck} />
        ))}
      </div>
    </div>
  );
};

export default DecksListPage;
