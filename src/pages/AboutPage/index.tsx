import React from "react";
import { Container, Title, Text, Card, Stack, Divider } from "@mantine/core";

const AboutPage: React.FC = () => {
  return (
    <Container size="md" mt="xl">
      <Card shadow="md" radius="md" p="lg" withBorder>
        <Stack gap="md">
          <Title order={2} ta="center">
            About JKU Exam Simulator
          </Title>
          <Divider />
          <Text size="lg" ta="center" color="dimmed">
            I created this to procrastinate studying for my exams...
          </Text>
          <Title order={3} mt="lg">
            Update Log:
          </Title>
          <Stack gap="sm">
            <Text>
              <strong>04.01.2025:</strong> Added the ability to create your own Question Decks. Also added login functionality, leaderboards and fully revamped the UI. Lot's of procrastination right before the exams.
            </Text>
            <Text>
              <strong>21.06.2024:</strong> Changed some styling and made it more mobile friendly.
            </Text>
            <Text>
              <strong>20.06.2024:</strong> Connected the Web app to a Database of Questions and added the feature to craft your own Questionset / Exam.
            </Text>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

export default AboutPage;