import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getFilteredQuestions } from "../../../firebase/firestore";
import useTestStore from "../../stores/useTestStore";

const ExamRedirect = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source');
  const year = searchParams.get('year');
  const subject = searchParams.get('subject');

  if (!source || !year || !subject) {
    return <Navigate to={"/"} />;
  }

  const { setQuestions } = useTestStore();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Fetching questions with:", { subject, year, source });
      return await getFilteredQuestions(subject, year, source);
    },
    onSuccess: async (data) => {
      console.log("Fetched questions: ", data);
      await setQuestions(data);
      navigate('/test-simulation');
    },
    onError: (error) => {
      console.error("Error fetching questions: ", error);
    }
  });

  const { mutate } = mutation;

  useEffect(() => {
    if (source && year && subject) {
      mutate();
    }
  }, [source, year, subject, mutate]);

  return (
    <div>
      <h1>Redirecting to Exam...</h1>
    </div>
  );
};

export default ExamRedirect;
