import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Question } from "../../data/interfaces/Test";
import { auth } from "../../firebase";
import {
    addUserXP,
    createOrUpdateUser,
    getQuestionsByDeckId,
    getUser,
    updateDeckLeaderboard,
} from "../../firebase/firestore";

interface FeedbackState {
  isCorrect: boolean | null;     // null = not checked yet
  correctAnswersShown: boolean;  // show the correct answers if user is wrong
}

/**
 * A small helper to unify comparisons:
 *  - Trim leading/trailing spaces
 *  - Convert to lower case
 *  - (Optional) replace multiple spaces with one, etc.
 */
function normalizeText(str: string) {
  return str.trim().toLowerCase();
}

const DeckTestPage: React.FC = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  // All deck questions
  const [questions, setQuestions] = useState<Question[]>([]);
  // Current question index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track loading
  const [loading, setLoading] = useState(true);

  // Running tally of how many questions answered correctly so far
  const [correctSoFar, setCorrectSoFar] = useState(0);

  /**
   * answers[questionId] can be:
   *  - MultipleChoice => string[]
   *  - TrueFalse => string[] with one element ("true"/"false")
   *  - Input => string
   */
  const [answers, setAnswers] = useState<Record<string, any>>({});

  /**
   * feedback[questionId] = { isCorrect, correctAnswersShown }
   */
  const [feedback, setFeedback] = useState<Record<string, FeedbackState>>({});

  useEffect(() => {
    if (!deckId) return;
    async function loadQuestions() {
      try {
        const qs = await getQuestionsByDeckId(deckId);
        setQuestions(qs);
      } catch (err) {
        console.error("Error loading questions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [deckId]);

  // Ensure user doc exists in Firestore
  useEffect(() => {
    const ensureUserDocExists = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const existingUser = await getUser(currentUser.uid);
      if (!existingUser) {
        await createOrUpdateUser(currentUser.uid, {
          email: currentUser.email || "",
          xp: 0,
        });
      }
    };
    ensureUserDocExists();
  }, []);

  if (loading) return <div>Loading test...</div>;
  if (questions.length === 0) return <div>No questions for this deck.</div>;

  // Current question
  const currentQuestion = questions[currentIndex];
  const questionId = currentQuestion.id;

  // -------------
  // Handlers
  //-------------

  // Multiple-choice => toggle selected option in an array
  const handleMultipleChoiceToggle = (optionValue: string) => {
    setAnswers((prev) => {
      const currentSelected = Array.isArray(prev[questionId]) ? [...prev[questionId]] : [];
      if (currentSelected.includes(optionValue)) {
        // remove if already selected
        return {
          ...prev,
          [questionId]: currentSelected.filter((opt) => opt !== optionValue),
        };
      } else {
        // add if not selected
        return {
          ...prev,
          [questionId]: [...currentSelected, optionValue],
        };
      }
    });
  };

  // True/False => store as an array with one element
  const handleTrueFalse = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [value],
    }));
  };

  // Input => single string
  const handleInputAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Check answer => immediate feedback
  const handleCheckAnswer = () => {
    const userAnswer = answers[questionId];
    const { isCorrect } = checkIfCorrect(currentQuestion, userAnswer);

    // If correct, increment the "correctSoFar" tally
    if (isCorrect) {
      setCorrectSoFar((prev) => prev + 1);
    }

    setFeedback((prev) => ({
      ...prev,
      [questionId]: {
        isCorrect,
        correctAnswersShown: !isCorrect,
      },
    }));
  };

  // Next question => or finalize if last question
  const handleNext = async () => {
    // If not the last question, go next
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // reset the feedback for the *next* question
      const nextQuestionId = questions[nextIndex].id;
      setFeedback((prev) => ({
        ...prev,
        [nextQuestionId]: undefined,
      }));
      return;
    }

    // Last question => finalize
    const currentUser = auth.currentUser;
    if (currentUser && deckId) {
      try {
        // final scoring
        const { correctCount, totalCount, xpEarned } = calculateScoreAndXp(questions, answers);
        const scorePercentage = Math.round((correctCount / totalCount) * 100);

        // update deck's leaderboard
        await updateDeckLeaderboard(deckId, currentUser.uid, xpEarned, scorePercentage);
        // update user XP
        await addUserXP(currentUser.uid, xpEarned);
      } catch (err) {
        console.error("Error updating leaderboard/user XP:", err);
      }
    }

    // redirect to deck's leaderboard
    navigate(`/decks/${deckId}/leaderboard`);
  };

  // -------------
  // Render
  //-------------
  const currentFeedback = feedback[questionId];
  const isChecked = currentFeedback != null;
  const showCorrect = currentFeedback?.correctAnswersShown || false;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h3>Correct so far: {correctSoFar} / {questions.length}</h3>

      <h1>Question {currentIndex + 1} of {questions.length}</h1>
      <h2>{currentQuestion.question}</h2>

      {currentQuestion.type === "MultipleChoice" && (
        <div>
          {(currentQuestion.options || []).map((opt) => {
            const userSelected = Array.isArray(answers[questionId])
              ? answers[questionId].includes(opt)
              : false;
            return (
              <div key={opt}>
                <label>
                  <input
                    type="checkbox"
                    checked={userSelected}
                    onChange={() => handleMultipleChoiceToggle(opt)}
                  />
                  {opt}
                </label>
              </div>
            );
          })}
        </div>
      )}

      {currentQuestion.type === "TrueFalse" && (
        <div>
          <label>
            <input
              type="radio"
              name={`tf-${questionId}`}
              checked={
                Array.isArray(answers[questionId]) &&
                answers[questionId][0] === "true"
              }
              onChange={() => handleTrueFalse("true")}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name={`tf-${questionId}`}
              checked={
                Array.isArray(answers[questionId]) &&
                answers[questionId][0] === "false"
              }
              onChange={() => handleTrueFalse("false")}
            />
            False
          </label>
        </div>
      )}

      {currentQuestion.type === "Input" && (
        <div>
          <input
            type="text"
            value={answers[questionId] || ""}
            onChange={(e) => handleInputAnswer(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {/* Check Answer button */}
      {!isChecked && (
        <button onClick={handleCheckAnswer} style={{ marginRight: 16 }}>
          Check Answer
        </button>
      )}

      {/* Show feedback */}
      {isChecked && (
        <div style={{ margin: "10px 0" }}>
          {currentFeedback?.isCorrect ? (
            <p style={{ color: "green" }}>Correct!</p>
          ) : (
            <div style={{ color: "red" }}>
              <p>Incorrect!</p>
              {showCorrect && currentQuestion.correctAnswers && (
                <>
                  <p>Correct answer(s):</p>
                  <ul>
                    {currentQuestion.correctAnswers.map((ca) => (
                      <li key={ca}>{ca}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <button onClick={handleNext}>
        {currentIndex === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

// -------------------------------------------------
// checkIfCorrect: see if user's answer is correct
// -------------------------------------------------
function checkIfCorrect(question: Question, userAnswer: any) {
  let isCorrect = false;
  const correctAnswers = question.correctAnswers || [];

  // For debugging, you could do:
  // console.log("UserAnswer:", userAnswer);
  // console.log("CorrectAnswers:", correctAnswers);

  if (question.type === "MultipleChoice") {
    // Must match the set exactly
    if (Array.isArray(userAnswer)) {
      const chosenNormalized = userAnswer.map((a: string) => normalizeText(a));
      const correctNormalized = correctAnswers.map((a: string) => normalizeText(a));

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
      isCorrect = correctAnswers
        .map((c) => normalizeText(c))
        .includes(ansNorm);
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
function calculateScoreAndXp(qs: Question[], ans: Record<string, any>) {
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

export default DeckTestPage;
