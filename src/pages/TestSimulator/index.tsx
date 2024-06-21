import { Button, Progress } from "@mantine/core";
import useTestStore from "../../stores/useTestStore";
import MultipleChoice from "./AnswerTypes/MultipleChoice";
import { QuestionType } from "../../../data/interfaces/Test";
import { Pill } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./style.css";

const TestSimulator = () => {
  const {
    questions,
    currentQuestion,
    nextQuestion,
    currentQuestionIndex,
    correctAnswers,
    setChecked,
    setIsCorrect,
    checked,
    checkAnswer,
    isCorrect,
    currentAnswer,
  } = useTestStore();

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!questions) {
    return <Navigate to="/" />;
  }

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
      <div className="test-simulator">
        <div
          style={{
            borderBottom: "1px solid black",
          }}

          className="inside"
        >
          <Progress value={progress} />
          <h3>
            {currentQuestion.topics.map((topic) => (
              <Pill>{topic}, </Pill>
            ))}{" "}
            | {currentQuestion.source} {currentQuestion.year} | {correctAnswers}{" "}
            correct answers
          </h3>
        </div>
        <div
          style={{
            overflow: "auto",
          }}

          className="inside"
        >
          <div
            style={{
              overflow: "scroll",
              maxWidth: "100vw",
              maxHeight: "30vh",
              borderBottom: "1px solid black",
            }}
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
        </div>
        <div
          style={{
            overflow: "scroll",
            maxWidth: "100vw",
            maxHeight: "50vh",
          }}

          className="inside"
        >
          {answerType}
        </div>
        {isCorrect && (
          <Confetti width={dimensions.width} height={dimensions.height} />
        )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: 10,
          borderTop: "1px solid black",
        }}
      >
        <Button
          onClick={() => {
            setChecked(true);
            setIsCorrect(checkAnswer(currentAnswer));
          }}
          disabled={checked}
        >
          Check Answer
        </Button>
        <Button
          onClick={() => {
            setChecked(false);
            setIsCorrect(null);
            nextQuestion();
          }}
        >
          Next Question
        </Button>
      </div>
      </div>
    </>
  );
};

export default TestSimulator;
