import React from "react";
import { Container, Title, Text, Button, Stack, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="md" mt="xl">
      <Stack align="center" gap="xl">
        <Title order={1} ta="center">
          Welcome to JKU Exam Simulator
        </Title>
        <Text size="lg" ta="center" >
          Prepare for your exams with Question Decks made by students for students.
        </Text>
        <Group justify="center" mt="lg">
          <Button variant="filled" color="blue" onClick={() => navigate("/decks")}>
            Explore Decks
          </Button>
          <Button variant="outline" color="blue" onClick={() => navigate("/about")}>
            Learn More
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default IndexPage;