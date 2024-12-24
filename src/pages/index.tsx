import {
  Alert,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Title,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getFilteredQuestions } from "../../firebase/firestore";
import SourceSelect from "../components/SourceSelect";
import SubjectSelect from "../components/SubjectSelect";
import TopicSelect from "../components/TopicSelect";
import YearSelect from "../components/YearSelect";
import useSearchStore from "../stores/useSearchStore";
import useTestStore from "../stores/useTestStore";

const IndexPage = () => {
  const { source, year, subject, topic } = useSearchStore();
  const { setQuestions, resetEverything } = useTestStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await getFilteredQuestions(subject, year, source);
    },
  });

  const { mutate, data, isError, error } = mutation;

  return (
    <Container size="lg" py="xl">
      <Title
        align="center"
        order={1}
        mb="xl"
        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700 }}
      >
        JKU Exam Simulator
      </Title>
      <Grid gutter="xl">
        {/* Craft Exam Section */}
        <Grid.Col md={6} sm={12}>
          <Card shadow="md" padding="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              Craft your exam
            </Title>
            <SubjectSelect />
            <SourceSelect />
            <YearSelect />
            <Button mt="md" fullWidth onClick={() => mutate()}>
              Get Questions
            </Button>

            {isError && (
              <Alert mt="md" color="red">
                {error.message}
              </Alert>
            )}

            {data && (
              <div>
                <p>{data.length} questions found</p>
                <TopicSelect questions={data} />
                <Button
                  mt="md"
                  fullWidth
                  onClick={() => {
                    resetEverything();
                    if (topic) {
                      const filteredQuestions = data.filter((question) =>
                        question.topics.includes(topic),
                      );
                      setQuestions(filteredQuestions);
                    } else {
                      setQuestions(data);
                    }
                    navigate("/test-simulation");
                  }}
                >
                  Start Test
                </Button>
              </div>
            )}
          </Card>
        </Grid.Col>

        {/* Presets Section */}
        <Grid.Col md={6} sm={12}>
          <Card shadow="md" padding="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              Or select from presets
            </Title>

            <Group direction="column" spacing="sm">
              <Title order={4}>Semester 2:</Title>

              <Title order={6}>Programming in Python 2</Title>
              {["2024", "2023", "2022"].map((year) => (
                <Button
                  variant="outline"
                  fullWidth
                  key={year}
                  onClick={async () => {
                    const data = await getFilteredQuestions(
                      "qaGEDqLkQZwb34UTsHOf",
                      year,
                      "Exam",
                    );
                    resetEverything();
                    setQuestions(data);
                    navigate("/test-simulation");
                  }}
                >
                  Exam {year}
                </Button>
              ))}

              <Title order={6}>Hands on AI 2</Title>
              {["2024", "2023", "2022"].map((year) => (
                <Button
                  variant="outline"
                  fullWidth
                  key={year}
                  onClick={async () => {
                    const data = await getFilteredQuestions(
                      "qKGyw05W1UXklk4P9m6J",
                      year,
                      "Exam",
                    );
                    resetEverything();
                    setQuestions(data);
                    navigate("/test-simulation");
                  }}
                >
                  Exam {year}
                </Button>
              ))}

              <Title order={6}>Technology and Society</Title>
              {["2024", "2023", "2022"].map((year) => (
                <Button
                  variant="outline"
                  fullWidth
                  key={year}
                  onClick={async () => {
                    const data = await getFilteredQuestions(
                      "qKGyw05W1UXklk4P9m6J",
                      year,
                      "Exam",
                    );
                    resetEverything();
                    setQuestions(data);
                    navigate("/test-simulation");
                  }}
                >
                  Exam {year}
                </Button>
              ))}
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default IndexPage;
