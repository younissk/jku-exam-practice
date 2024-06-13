import { useParams } from "react-router-dom";
import Subjects from "../../../data/subjects";
import Subject from "../../../data/interfaces/Subject";
import Tests from "../../../data/tests";

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  if (!subjectId) {
    return <h1>No subject in url</h1>;
  }

  if (!Subjects.has(subjectId)) {
    return <h1>404 Subject not found</h1>;
  }

  const subject: Subject | undefined = Subjects.get(subjectId);

  if (!subject) {
    // Handle the case when subject is undefined
    return null; // or any other appropriate action
  }

  const tests = Array.from(Tests.values()).filter(
    (test) => test.subject === subjectId
  );

  return (
    <div>
      <h2>{subject.title}</h2>
      <p>{subject.description}</p>
      <h3>Tests:</h3>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            <a href={`/test/${test.id}`}>{test.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectPage;
