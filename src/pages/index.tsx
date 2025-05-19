import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Card,
  Grid,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { getAllUsers } from "../firebase/firestore";
import { useEffect, useState } from "react";
import { User } from "../../data/interfaces/User";

const IndexPage: React.FC = () => {
  const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
  
  useEffect(() => {


    async function loadUsers() {

      const users = await getAllUsers()

      setLeaderboard(users.sort((a, b) => (b.xp || 0) - (a.xp || 0)));
    }

    loadUsers();

  }, []);



  return (
    <>
      <Container size="md" mt="xl">
        <Stack align="center" gap="xl">
          <Title order={1} ta="center">
            Welcome to JKU Exam Simulator
          </Title>
          <Text size="lg" ta="center">
            Prepare for your exams with Question Decks made by students for
            students.
          </Text>
          <Group justify="center" mt="lg">
            <Button
              variant="filled"
              color="blue"
              onClick={() => navigate("/decks")}
            >
              Explore Decks
            </Button>
            <Button
              variant="outline"
              color="blue"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </Group>
        </Stack>
      </Container>
      <Container size="md" mt="xl">
        <Title order={2} mb="lg" ta="center">
          Leaderboard
        </Title>
        {leaderboard.length === 0 ? (
          <Text ta="center">No leaderboard entries yet.</Text>
        ) : (
          <Card shadow="sm" padding="lg">
            <Grid>
              <Grid.Col span={3}>
                <Text fw={500}>Rank</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text fw={500}>Username</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text fw={500}>XP</Text>
              </Grid.Col>
            </Grid>
            {leaderboard.map((item, index) => (
              <Grid key={item.uid} align="center">
                <Grid.Col span={3}>
                  {index === 0 && (
                    <FaCrown color="gold" style={{ marginRight: 5 }} />
                  )}
                  {index + 1}
                </Grid.Col>
                <Grid.Col span={3}>{item.username}</Grid.Col>
                <Grid.Col span={3}>{item.xp ?? 0}</Grid.Col>
              </Grid>
            ))}
          </Card>
        )}
      </Container>
    </>
  );
};

export default IndexPage;
