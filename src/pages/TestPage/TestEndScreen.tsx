import React from "react";

const TestEndScreen = ({
  totalQuestions,
  correctAnswers,
}: {
  totalQuestions: number;
  correctAnswers: number;
}) => {
  return (
    <div>
      <h1>Test End Screen</h1>
      <p>You have completed the test.</p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
    </div>
  );
};

export default TestEndScreen;
