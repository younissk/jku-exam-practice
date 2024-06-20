import { getDocs, collection, query, where, Query } from "firebase/firestore";
import { db } from ".";
import { Question } from "../data/interfaces/Test";

export const getAllQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, "questions"));
  const questions: Question[] = [];

  querySnapshot.forEach((doc) => {
    questions.push(doc.data() as Question);
  });

  return questions;
};

export const getFilteredQuestions = async (
  subject?: string,
  year?: string,
  source?: string
) => {
  const questionsRef = collection(db, "questions");
  let q: Query = questionsRef;

  if (subject) {
    q = query(q, where("courseId", "==", subject));
  }

  if (year) {
    q = query(q, where("year", "==", year));
  }

  if (source) {
    q = query(q, where("source", "==", source));
  }

  const querySnapshot = await getDocs(q);
  const questions: Question[] = [];

  querySnapshot.forEach((doc) => {
    questions.push(doc.data() as Question);
  });

  return questions;
};
