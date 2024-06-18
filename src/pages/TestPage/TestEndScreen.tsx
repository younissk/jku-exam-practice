const TestEndScreen = ({
  totalQuestions,
}: {
  totalQuestions: number;
}) => {
  return (
    <div>
      <h1>Test End Screen</h1>
      <p>You have completed the test.</p>
      <p>Total Questions: {totalQuestions}</p>
    </div>
  );
};

export default TestEndScreen;
