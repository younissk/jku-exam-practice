import { useEffect, useState } from "react";
import { Card, Text, Button, Stack } from "@mantine/core";
import { Deck } from "../../../data/interfaces/Deck";
import { getUser } from "../../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IconBookmark } from "@tabler/icons-react";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const [creatorName, setCreatorName] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchCreatorName() {
      if (deck.creatorId) {
        const userData = await getUser(deck.creatorId);
        setCreatorName(userData?.username || "Unknown");
      }
    }
    fetchCreatorName();
  }, [deck.creatorId]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsBookmarked(bookmarks.includes(deck.id));
  }, [deck.id]);

  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (!bookmarks.includes(deck.id)) {
      bookmarks.push(deck.id);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
      bookmarks = bookmarks.filter((id: string) => id !== deck.id);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };


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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button variant="light" fullWidth component="a" onClick={() => {
            navigate(`/decks/${deck.id}`);
          }}>
            View Deck
          </Button>
          <IconBookmark style={{ cursor: "pointer", marginLeft: "20px" }} size={32} onClick={toggleBookmark} color={isBookmarked ? "blue" : "gray"} fill={isBookmarked ? "lightblue" : "none"} />
        </div>
      </Stack>
    </Card>
  );
};
