import { Group, Stack, Text } from "@mantine/core";
import { Question } from "../../../data/interfaces/Test";

const QuestionInfo = (props: {
  correctSoFar: number;
  questions: Question[];
  currentIndex: number;
  currentQuestion: Question;
}) => {
  return (
    <Stack>
      <Group justify="space-between">
      <Text size="xl" fw={700}>
        Question {props.currentIndex + 1} of {props.questions.length}
        </Text>
      <Text size="lg" fw={500}>
          Correct so far: {props.correctSoFar} / {props.questions.length}
        </Text>
      </Group>
      <div
        dangerouslySetInnerHTML={{ __html: props.currentQuestion.question }}
      />
    </Stack>
  );
};

export default QuestionInfo;
