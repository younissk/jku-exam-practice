export default interface Test {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: MultipleChoiceQuestion[];
}

export interface Question {
  id: string;
  courseId: string;
  source: string;
  year: string;
  topics: string[];
  options?: string[];
  type: QuestionType;
  question: string;
  correctAnswer: string[];
}

export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptions: string[];
}
