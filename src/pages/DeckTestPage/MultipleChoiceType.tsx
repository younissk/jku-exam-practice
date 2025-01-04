import { Checkbox, Stack } from "@mantine/core";
import { Question } from "../../../data/interfaces/Test";

const MultipleChoiceType = (props: {
  currentQuestion: Question;
  answers: Record<string, any>;
  handleMultipleChoiceToggle: (opt: string) => void;
}) => {
  return (
    <Stack>
      {(props.currentQuestion.options || []).map((opt) => {
        const userSelected = Array.isArray(props.answers[props.currentQuestion.id])
          ? props.answers[props.currentQuestion.id].includes(opt)
          : false;
        return (
          <Checkbox
            key={opt}
            label={opt}
            checked={userSelected}
            onChange={() => props.handleMultipleChoiceToggle(opt)}
          />
        );
      })}
    </Stack>
  );
};

export default MultipleChoiceType;