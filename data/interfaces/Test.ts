export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",
  Input = "Input",
}

export interface Question {
  id: string; // Firestore document ID
  question: string; // the text of the question
  type: QuestionType;
  topics?: string[]; // optional
  // For multiple choice
  options?: string[];
  correctAnswers?: string[]; // For multiple-choice "select all that apply"
  // For true/false
  correctAnswerBoolean?: boolean;
  // For input
  correctAnswerInput?: string; // or number, if you want numeric
  deckIds: string[]; // the set of decks that contain this question
  // optional fields you might want:
  createdAt?: Date;
  updatedAt?: Date;
  difficulty?: number; // 1-5 scale, or "easy"/"medium"/"hard"
  timesAnswered?: number; // for analytics
  timesCorrect?: number; // for analytics
}
