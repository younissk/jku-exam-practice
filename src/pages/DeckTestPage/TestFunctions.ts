// -------------------------------------------------
// checkIfCorrect: see if user's answer is correct
// -------------------------------------------------

import { Question } from "../../../data/interfaces/Test";

export function normalizeText(str: string) {
  return str.trim().toLowerCase();
}

// -------------------------------------------------
// checkIfCorrect: see if user's answer is correct
// -------------------------------------------------
export function checkIfCorrect(question: Question, userAnswer: any) {
  let isCorrect = false;
  const correctAnswers = question.correctAnswers || [];
    
  // For debugging, you could do:
  // console.log("UserAnswer:", userAnswer);
  // console.log("CorrectAnswers:", correctAnswers);

  if (question.type === "MultipleChoice") {
    // Must match the set exactly
    if (Array.isArray(userAnswer)) {
      const chosenNormalized = userAnswer.map((a: string) => normalizeText(a));
      const correctNormalized = correctAnswers.map((a: string) =>
        normalizeText(a)
      );

      const chosenSet = new Set(chosenNormalized);
      const correctSet = new Set(correctNormalized);

      if (chosenSet.size === correctSet.size) {
        isCorrect = [...chosenSet].every((val) => correctSet.has(val));
      }
    }
  } else if (question.type === "TrueFalse") {
    // userAnswer = ["true"] or ["false"]
    if (Array.isArray(userAnswer) && userAnswer.length === 1) {
      const ansNorm = normalizeText(userAnswer[0]);
      // correctAnswers might be ["true"] or ["false"], so if either matches
      isCorrect = correctAnswers.map((c) => normalizeText(c)).includes(ansNorm);
    }
  } else if (question.type === "Input") {
    // compare userAnswer to correctAnswers[0], ignoring case/spaces
    if (typeof userAnswer === "string" && correctAnswers.length > 0) {
      if (normalizeText(userAnswer) === normalizeText(correctAnswers[0])) {
        isCorrect = true;
      }
    }
  }

  return { isCorrect, correctAnswers };
}

// -------------------------------------------------
// calculateScoreAndXp
// (5 xp correct, 1 xp wrong), also normalizes
// -------------------------------------------------
export function calculateScoreAndXp(qs: Question[], ans: Record<string, any>) {
  let correctCount = 0;
  let xpEarned = 0;
  const totalCount = qs.length;

  qs.forEach((question) => {
    const userAnswer = ans[question.id];
    const { isCorrect } = checkIfCorrect(question, userAnswer);
    if (isCorrect) {
      correctCount++;
      xpEarned += 5;
    } else {
      xpEarned += 1;
    }
  });

  return { correctCount, totalCount, xpEarned };
}
