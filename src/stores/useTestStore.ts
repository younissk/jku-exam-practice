import { Question } from "../../data/interfaces/Test";
import { create } from "zustand";

function arraysEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }
  return true;
}

interface TestStore {
  questions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question;
  currentAnswer: string[];
  setCurrentAnswer: (answer: string[]) => void;
  checked: boolean;
  isCorrect: boolean | null;
  setChecked: (checked: boolean) => void;
  setIsCorrect: (isCorrect: boolean | null) => void;
  correctAnswers: number;
  incorrectAnswers: number;
  resetEverything: () => void;
  checkAnswer: (answer: string[]) => boolean;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  setQuestions: (questions: Question[]) => void;
}

const useTestStore = create<TestStore>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  currentQuestion: {} as Question,
  correctAnswers: 0,
  incorrectAnswers: 0,
  checkAnswer: (answer: string[]) => {
    console.log("Checking answer", answer);
    console.log("Correct answer", useTestStore.getState().currentQuestion.correctAnswer);
    console.log(arraysEqual(answer, useTestStore.getState().currentQuestion.correctAnswer));
    if (arraysEqual(answer, useTestStore.getState().currentQuestion.correctAnswer)) {
      set((state) => ({
        correctAnswers: state.correctAnswers + 1,
      }));
      return true;
    } else {
      set((state) => ({
        incorrectAnswers: state.incorrectAnswers + 1,
      }));
      return false;
    }
  },
  setCurrentQuestionIndex: (index: number) =>
    set({ currentQuestionIndex: index }),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      currentQuestion: state.questions[state.currentQuestionIndex + 1],
      currentAnswer: [],
    })),
  setQuestions: (questions: Question[]) =>
    set({ questions, currentQuestion: questions[0] }),
  checked: false,
  isCorrect: null,
  setChecked: (checked) => set({ checked }),
  setIsCorrect: (isCorrect) => set({ isCorrect }),
  currentAnswer: [],
  setCurrentAnswer: (answer) => set({ currentAnswer: answer }),
  resetEverything: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {} as Question,
      correctAnswers: 0,
      incorrectAnswers: 0,
      checked: false,
      isCorrect: null,
      currentAnswer: [],
    }),
}));

export default useTestStore;
