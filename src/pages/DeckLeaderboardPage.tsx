// FILE: src/pages/DeckLeaderboardPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Deck, LeaderboardItem } from "../../data/interfaces/Deck";
import { getDeck, getUser } from "../../firebase/firestore"; // or wherever these live

/**
 * We'll define an interface for our "enhanced" leaderboard row,
 * including the username we fetch from the user's doc.
 */
interface EnhancedLeaderboardItem extends LeaderboardItem {
  username?: string;
}

const DeckLeaderboardPage: React.FC = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * We'll keep a separate state for the "enhanced" leaderboard,
   * where each item has a "username" in addition to userId, xp, score, etc.
   */
  const [leaderboard, setLeaderboard] = useState<EnhancedLeaderboardItem[]>([]);

  useEffect(() => {
    if (!deckId) return;

    async function loadDeckAndUsers() {
      try {
        // 1) Fetch the deck
        const deckData = await getDeck(deckId);
        if (!deckData) {
          setDeck(null);
          setLoading(false);
          return;
        }
        setDeck(deckData);

        // 2) Sort the deck's existing leaderboard by XP desc
        const sorted = [...(deckData.leaderboard || [])].sort(
          (a, b) => (b.xp || 0) - (a.xp || 0),
        );

        // 3) For each leaderboard entry, fetch the user's doc
        const userDocs = await Promise.all(
          sorted.map((item) => getUser(item.userId)),
        );

        // 4) Combine user info with the leaderboard item
        const enhanced = sorted.map((item, idx) => {
          const userDoc = userDocs[idx];
          return {
            ...item,
            username: userDoc?.username ?? item.userId,
            // If no username, fallback to userId
          };
        });

        // 5) Store in state
        setLeaderboard(enhanced);
      } catch (err) {
        console.error("Error loading deck or users:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDeckAndUsers();
  }, [deckId]);

  if (loading) return <div>Loading leaderboard...</div>;
  if (!deck) return <div>Deck not found.</div>;

  return (
    <div>
      <h1>Leaderboard for {deck.title}</h1>
      {leaderboard.length === 0 ? (
        <p>No leaderboard entries yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>XP</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr key={item.userId}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.xp ?? 0}</td>
                <td>{item.score !== undefined ? `${item.score}%` : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeckLeaderboardPage;
