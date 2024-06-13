export default interface Test {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: MultipleChoiceQuestion[];
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptions: string[];
}
