import { useMutation } from "@tanstack/react-query";
import { getFilteredQuestions } from "../../firebase/firestore";
import { Button, Alert } from "@mantine/core";
import SubjectSelect from "../components/SubjectSelect";
import SourceSelect from "../components/SourceSelect";
import YearSelect from "../components/YearSelect";
import useSearchStore from "../stores/useSearchStore";
import useTestStore from "../stores/useTestStore";
import { useNavigate } from "react-router-dom";
import "../index.css"

const IndexPage = () => {
  const { source, year, subject } = useSearchStore();
  const { setQuestions, resetEverything } = useTestStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("source", source);
      return await getFilteredQuestions(subject, year, source);
    },
  });

  const { mutate, data, isError, error } = mutation;

  return (
    <div className="homepage">
      <div className="craft-exam">
        <h1>Craft your exam:</h1>
        <SubjectSelect />
        <SourceSelect />
        <YearSelect />
        <Button onClick={() => mutate()}>Get Questions</Button>

        {isError && <Alert color="red">{error.message}</Alert>}

        {data && (
          <div>
            <p>{data.length} questions found</p>
            <Button
              onClick={() => {
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Start Test
            </Button>
          </div>
        )}
      </div>

      <div className="from-preset">
        <h1>Or select from Presets:</h1>

        <h3>Semester 2:</h3>

        <h5>Programming in Python 2</h5>
        <ul>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qaGEDqLkQZwb34UTsHOf",
                  "2024",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2024
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qaGEDqLkQZwb34UTsHOf",
                  "2023",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2023
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qaGEDqLkQZwb34UTsHOf",
                  "2022",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2022
            </Button>
          </li>
        </ul>
        <h5>Hands on AI 2</h5>
        <ul>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qKGyw05W1UXklk4P9m6J",
                  "2024",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2024
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qKGyw05W1UXklk4P9m6J",
                  "2023",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2023
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qKGyw05W1UXklk4P9m6J",
                  "2022",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2022
            </Button>
          </li>
        </ul>
        <h5>Technology and Society</h5>
        <ul>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qKGyw05W1UXklk4P9m6J",
                  "2024",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2024
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qKGyw05W1UXklk4P9m6J",
                  "2023",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2023
            </Button>
          </li>
          <li>
            <Button
              onClick={async () => {
                const data = await getFilteredQuestions(
                  "qKGyw05W1UXklk4P9m6J",
                  "2022",
                  "Exam"
                );
                resetEverything();
                setQuestions(data);
                navigate("/test-simulation");
              }}
            >
              Exam 2022
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
