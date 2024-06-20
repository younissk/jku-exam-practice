import { useMutation } from "@tanstack/react-query";
import { getFilteredQuestions } from "../../firebase/firestore";
import { Button, Alert } from "@mantine/core";
import SubjectSelect from "../components/SubjectSelect";
import SourceSelect from "../components/SourceSelect";
import YearSelect from "../components/YearSelect";
import useSearchStore from "../stores/useSearchStore";
import useTestStore from "../stores/useTestStore";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const { source, year, subject } = useSearchStore();
  const { setQuestions } = useTestStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("source", source);
      return await getFilteredQuestions(subject, year, source);
    },
  });

  const { mutate, data, isError, error } = mutation;

  return (
    <div>
      <SubjectSelect />
      <SourceSelect />
      <YearSelect />
      <Button onClick={() => mutate()} >
        Get Questions
      </Button>

      {isError && <Alert color="red">{error.message}</Alert>}

      {data && (
        <div>
          <p>{data.length} questions found</p>
          <Button onClick={() => {setQuestions(data); navigate("/test-simulation")}}>Start Test</Button>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
