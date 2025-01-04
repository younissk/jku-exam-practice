import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Text, Stack, Divider } from "@mantine/core";
import { Question } from "../../../data/interfaces/Test";
import { auth } from "../../../firebase";
import {
    addUserXP,
    createOrUpdateUser,
    getQuestionsByDeckId,
    getUser,
    updateDeckLeaderboard,
} from "../../../firebase/firestore";
import QuestionInfo from "./QuestionInfo";
import MultipleChoiceType from "./MultipleChoiceType";
import TrueFalseType from "./TrueFalseType";
import InputType from "./InputType";
import { checkIfCorrect, calculateScoreAndXp } from "./TestFunctions";
import TestActions from "./TestActions";

interface FeedbackState {
  isCorrect: boolean | null;    
  correctAnswersShown: boolean; 
}

const DeckTestPage: React.FC = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [correctSoFar, setCorrectSoFar] = useState(0);

  const [answers, setAnswers] = useState<Record<string, any>>({});

  const [feedback, setFeedback] = useState<Record<string, FeedbackState>>({});

  useEffect(() => {
    if (!deckId) return;
    async function loadQuestions() {
      try {
        if (!deckId) throw new Error("No deck ID provided");
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

  if (loading) return <Text>Loading test...</Text>;
  if (questions.length === 0) return <Text>No questions for this deck.</Text>;

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

      // Delete the feedback entry for the next question instead of setting it to undefined
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[questions[nextIndex].id];
        return next;
      });
      return;
    }

    // Last question => finalize
    const currentUser = auth.currentUser;
    if (currentUser && deckId) {
      try {
        const { correctCount, totalCount, xpEarned } = calculateScoreAndXp(questions, answers);
        const scorePercentage = Math.round((correctCount / totalCount) * 100);

        await updateDeckLeaderboard(deckId, currentUser.uid, xpEarned, scorePercentage);
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
    <Container>
      <QuestionInfo
        correctSoFar={correctSoFar}
        questions={questions}
        currentIndex={currentIndex}
        currentQuestion={currentQuestion}
      />

      <Divider my="md" />

      {currentQuestion.type === "MultipleChoice" && (
        <MultipleChoiceType
          currentQuestion={currentQuestion}
          answers={answers}
          handleMultipleChoiceToggle={handleMultipleChoiceToggle}
        />
      )}

      {currentQuestion.type === "TrueFalse" && (
        <TrueFalseType
          currentQuestion={currentQuestion}
          answers={answers}
          handleTrueFalse={handleTrueFalse}
        />
      )}

      {currentQuestion.type === "Input" && (
        <InputType
          currentQuestion={currentQuestion}
          answers={answers}
          handleInput={handleInputAnswer}
        />
      )}

      {isChecked && (
        <Stack mt="md">
          {currentFeedback?.isCorrect ? (
            <Text color="green">Correct!</Text>
          ) : (
            <Text color="red">
              Incorrect!
              {showCorrect && currentQuestion.correctAnswers && (
                <>
                  <Text>Correct answer(s):</Text>
                  <ul>
                    {currentQuestion.correctAnswers.map((ca) => (
                      <li key={ca}>{ca}</li>
                    ))}
                  </ul>
                </>
              )}
            </Text>
          )}
        </Stack>
      )}

      <TestActions
        handleCheckAnswer={handleCheckAnswer}
        handleNext={handleNext}
        currentIndex={currentIndex}
        questions={questions}
      /> 
    </Container>
  );
};



export default DeckTestPage;
