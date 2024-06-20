import { Button, Progress } from "@mantine/core";
import useTestStore from "../../stores/useTestStore";
import MultipleChoice from "./AnswerTypes/MultipleChoice";
import { QuestionType } from "../../../data/interfaces/Test";
import { Pill } from "@mantine/core";

const TestSimulator = () => {
  const { questions, currentQuestion, nextQuestion, currentQuestionIndex, correctAnswers } =
    useTestStore();

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const questionType = currentQuestion.type;

  let answerType;

  switch (questionType) {
    case QuestionType.MultipleChoice:
      answerType = <MultipleChoice />;
      break;
    default:
      answerType = <Button onClick={nextQuestion}>Next Question</Button>;
      break;
  }

  return (
    <>
      <Progress value={progress} />
      <h3>
        {currentQuestion.topics.map((topic) => (
          <Pill>{topic}, </Pill>
        ))}{" "}
        | {currentQuestion.source} {currentQuestion.year} | {correctAnswers} correct answers
      </h3>
      <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      {answerType}
    </>
  );
};

export default TestSimulator;
