import { useEffect, useState } from "react";
import { getFeedback, sendFeedback } from "../firebase/firestore";
import {
  Card,
  Stack,
  Textarea,
  Button,
  Title,
  Text,
  Group,
  Chip,
} from "@mantine/core";
import { Feedback } from "../../data/interfaces/Feedback";

export function FeedbackAndFeatureRequest() {
  const [feedback, setFeedback] = useState<string>("");
  const [allFeedback, setAllFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    getFeedback().then((feedback) => {
      setAllFeedback(feedback);
    });
  }, [feedback]);

  const handleSubmit = () => {
    sendFeedback(feedback);
    setFeedback("");
  };

  return (
    <Stack>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={1}>Feedback and Feature Request</Title>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here"
            autosize
            minRows={3}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Card>
      <Stack>
        {allFeedback.map((feedback) => (
          <Card key={feedback.id}>
            <Group gap="xs">
              <Text>{feedback.feedback}</Text>
              <Text>{new Date(feedback.timestamp).toLocaleString()}</Text>
              <Chip
                variant="outline"
                color={feedback.done ? "green" : "red"}
                type="checkbox"
                checked={feedback.done}
              >
                {feedback.done ? "Done" : "Not done"}
              </Chip>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
