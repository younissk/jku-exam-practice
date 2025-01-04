import { Button, Group } from "@mantine/core";
import { Question } from "../../../data/interfaces/Test";

const TestActions = (props: {
  handleCheckAnswer: () => void;
  handleNext: () => void;
  currentIndex: number;
  questions: Question[];
}) => {
  return (
    <Group mt="md">
      <Button onClick={props.handleCheckAnswer} variant="outline">
        Check Answer
      </Button>
      <Button onClick={props.handleNext}>
        {props.currentIndex === props.questions.length - 1 ? "Finish" : "Next"}
      </Button>
    </Group>
  );
};

export default TestActions;
