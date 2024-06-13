import React, { useState } from "react";
import {
  Button,
  Container,
  Text,
  List,
  ListItem,
  Stack,
  Progress,
} from "@mantine/core";
import { MultipleChoiceQuestion } from "../../../data/interfaces/Test";
import TestEndScreen from "./TestEndScreen";

const TestSimulation = ({
  questions,
}: {
  questions: MultipleChoiceQuestion[];
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string[];
  }>({});
  const [feedback, setFeedback] = useState<{
    [key: string]: { option: string; correct: boolean; missed: boolean }[];
  }>({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (questionId: string, option: string) => {
    const currentSelected = selectedAnswers[questionId] || [];
    if (currentSelected.includes(option)) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: currentSelected.filter((ans) => ans !== option),
      });
    } else {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: [...currentSelected, option],
      });
    }
  };

  const handleCheckAnswer = () => {
    const selected = selectedAnswers[currentQuestion.id] || [];
    const correctOptions = currentQuestion.correctOptions;
    const feedbackObject = currentQuestion.options.map((option) => ({
      option,
      correct: correctOptions.includes(option),
      missed: correctOptions.includes(option) && !selected.includes(option),
    }));
    setFeedback({
      ...feedback,
      [currentQuestion.id]: feedbackObject,
    });
    setShowCorrectAnswers(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowCorrectAnswers(false);
      setFeedback({});
    } else {
      setShowEndScreen(true);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showEndScreen) {
    const totalQuestions = questions.length;
    const correctAnswers = Object.values(feedback)
      .flat()
      .filter((ans) => ans.correct).length;
    return (
      <TestEndScreen
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
      />
    );
  }

  return (
    <Container style={{width: "100%"}}>
      <Progress value={progress} size="md" mb="lg" />
      <Stack align="center">
        <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <List type="ordered" spacing="sm">
          {currentQuestion.options.map((option) => {
            const isSelected =
              selectedAnswers[currentQuestion.id]?.includes(option);
            const feedbackOption = feedback[currentQuestion.id]?.find(
              (ans) => ans.option === option
            );
            const isCorrect = feedbackOption?.correct;
            const isMissed = feedbackOption?.missed;

            return (
              <ListItem
                key={option}
                onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                style={{
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? isCorrect === undefined
                      ? "lightblue"
                      : isCorrect
                      ? "lightgreen"
                      : "lightcoral"
                    : isMissed
                    ? "lightgreen"
                    : "transparent",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {option}
                {feedbackOption &&
                  (feedbackOption.correct ? (
                    <span style={{ color: "green" }}> (Correct)</span>
                  ) : (
                    <span style={{ color: "red" }}> (Incorrect)</span>
                  ))}
              </ListItem>
            );
          })}
        </List>
        {showCorrectAnswers ? (
          <>
            <Text mt="md">
              Correct answers: {currentQuestion.correctOptions.join(", ")}
            </Text>
            <Button onClick={handleNextQuestion} mt="md">
              Next Question
            </Button>
          </>
        ) : (
          <Button onClick={handleCheckAnswer} mt="md">
            Check Answer
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default TestSimulation;
