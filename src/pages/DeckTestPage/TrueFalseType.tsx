import { Radio, RadioGroup } from "@mantine/core";
import { Question } from "../../../data/interfaces/Test";

const TrueFalseType = (props: {
  currentQuestion: Question;
  answers: Record<string, any>;
  handleTrueFalse: (opt: string) => void;
}) => {
  return (
    <RadioGroup
      value={
        Array.isArray(props.answers[props.currentQuestion.id])
          ? props.answers[props.currentQuestion.id][0]
          : ""
      }
      onChange={props.handleTrueFalse}
    >
      <Radio value="true" label="True" />
      <Radio value="false" label="False" />
    </RadioGroup>
  );
};

export default TrueFalseType;