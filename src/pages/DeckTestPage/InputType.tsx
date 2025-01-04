import { TextInput } from "@mantine/core";
import { Question } from "../../../data/interfaces/Test";

const InputType = (props: {
  currentQuestion: Question;
  answers: Record<string, any>;
  handleInput: (opt: string) => void;
}) => {
  return (
    <TextInput
      value={props.answers[props.currentQuestion.id] || ""}
      onChange={(e) => props.handleInput(e.target.value)}
      placeholder="Type your answer here"
    />
  );
};

export default InputType;