import { Pill } from "@mantine/core";
import useTestStore from "../../stores/useTestStore";


const Results = () => {

    const {correctAnswers, questions} = useTestStore();

    let allTopics: string[] = [];
  
  questions.forEach((question) => {
    question.topics.forEach((topic) => {
      allTopics.push(topic);
    })})
  
  const uniqueTopics = Array.from(new Set(allTopics));


    return (
        <div>
        <h1>Results</h1>
        <p>Correct Answers: {correctAnswers} / {questions.length}</p>
        <p>Topics: {uniqueTopics.map(topic => <Pill>{topic}</Pill>)}</p>
        </div>
    );
    }

export default Results;