import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Deck } from "../../data/interfaces/Deck";
import { getDeck } from "../../firebase/firestore";

const DeckOverviewPage: React.FC = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!deckId) return;
    async function loadDeck() {
      try {
        const deckData = await getDeck(deckId);
        setDeck(deckData);
      } catch (err) {
        console.error("Error loading deck:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDeck();
  }, [deckId]);

  if (loading) return <div className="loading">Loading deck...</div>;
  if (!deck) return <div className="error">Deck not found.</div>;

  return (
    <div className="deck-overview">
      <DeckHeader title={deck.title} />
      <DeckDetails questionCount={deck.questionIds.length} timer={deck.timer} />
      <DeckActions deckId={deckId!} />
    </div>
  );
};

export default DeckOverviewPage;

// FILE: src/components/DeckHeader.tsx

interface DeckHeaderProps {
  title: string;
}

export const DeckHeader: React.FC<DeckHeaderProps> = ({ title }) => (
  <header className="deck-header">
    <h1>{title}</h1>
  </header>
);

// FILE: src/components/DeckDetails.tsx

interface DeckDetailsProps {
  questionCount: number;
  timer?: number;
}

export const DeckDetails: React.FC<DeckDetailsProps> = ({
  questionCount,
  timer,
}) => (
  <div className="deck-details">
    <p>This deck has {questionCount} questions.</p>
    {timer && <p>Time limit: {timer} seconds</p>}
  </div>
);

// FILE: src/components/DeckActions.tsx
import { Link } from "react-router-dom";

interface DeckActionsProps {
  deckId: string;
}

export const DeckActions: React.FC<DeckActionsProps> = ({ deckId }) => (
  <div className="deck-actions">
    <Link to={`/decks/${deckId}/test`} className="action-button">
      Start Test
    </Link>
    <Link to={`/decks/${deckId}/leaderboard`} className="action-button">
      View Leaderboard
    </Link>
  </div>
);
