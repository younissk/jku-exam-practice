// FILE: src/pages/DeckCreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../../firebase/firestore";
import { useAuth } from "./useAuth";

const DeckCreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

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
        creatorId: user.email,
      });
      navigate(`/decks/${deckId}`);
    } catch (err) {
      console.error("Error creating deck:", err);
      alert("Error creating deck. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Deck Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label>Timer (seconds)</label>
          <input
            type="number"
            value={timer ?? ""}
            onChange={(e) =>
              setTimer(parseInt(e.target.value, 10) || undefined)
            }
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Deck"}
        </button>
      </form>
    </div>
  );
};

export default DeckCreatePage;
