import { Deck } from "../../../data/interfaces/Deck";
import "./DeckCard.css";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  return (
    <div className="deck-card" key={deck.id}>
      <div className="deck-card-content">
        <h2>{deck.title}</h2>
        <a href={`/decks/${deck.id}`} className="deck-card-link">
          View Deck
        </a>
      </div>
    </div>
  );
};
