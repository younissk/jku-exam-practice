import { useParams } from "react-router-dom";
import Tests from "../../../data/tests";
import TestSimulation from "./TestSimulation";


const TestPage = () => {
  const { testId } = useParams();

  if (!testId) {
    return <h1>No test in url</h1>;
  }

  if (!Tests.has(testId)) {
    return <h1>404 Test not found</h1>;
  }

  const test = Tests.get(testId);

  if (!test) {
    // Handle the case when test is undefined
    return null; // or any other appropriate action
  }

  return (
    <div>
      <h1>{test.title}</h1>
      <TestSimulation questions={test.questions} />
    </div>
  );
};

export default TestPage;
