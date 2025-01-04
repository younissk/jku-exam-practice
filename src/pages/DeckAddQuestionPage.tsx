// FILE: src/pages/DeckAddQuestionPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionType } from "../../data/interfaces/Test";
import { createQuestion, linkQuestionToDeck } from "../../firebase/firestore";

const DeckAddQuestionPage: React.FC = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  // We'll store the form fields in local state
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.MultipleChoice,
  );
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deckId) {
      alert("No deckId provided.");
      navigate("/decks");
    }
  }, [deckId, navigate]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleToggleCorrectAnswer = (value: string) => {
    // if not in correctAnswers, add it; otherwise remove it
    if (correctAnswers.includes(value)) {
      setCorrectAnswers(correctAnswers.filter((a) => a !== value));
    } else {
      setCorrectAnswers([...correctAnswers, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckId) return;

    // Basic validation
    if (!questionText.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    try {
      // 1) Create a new question doc
      const newQuestionData = {
        question: questionText.trim(),
        type: questionType,
        topics: [],
        deckIds: [], // We'll link them next
        options,
        correctAnswers,
      };

      const questionId = await createQuestion(newQuestionData);

      // 2) Link question to the deck
      await linkQuestionToDeck(deckId, questionId);

      // 3) Navigate back to deck overview
      navigate(`/decks/${deckId}`);
    } catch (err) {
      console.error("Error creating question:", err);
      alert("Error creating question. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add a New Question to Deck</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text:</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label>Question Type:</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            disabled={loading}
          >
            <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
            <option value={QuestionType.TrueFalse}>True/False</option>
            <option value={QuestionType.Input}>Input (Number/Text)</option>
          </select>
        </div>

        {/* For multiple choice, let the user add options */}
        {questionType === QuestionType.MultipleChoice && (
          <div>
            <label>Options:</label>
            {options.map((opt, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(e.target.value, idx)}
                  disabled={loading}
                />
                <input
                  type="checkbox"
                  checked={correctAnswers.includes(opt)}
                  onChange={() => handleToggleCorrectAnswer(opt)}
                  disabled={loading}
                />
                <label>Correct?</label>
              </div>
            ))}
            <button type="button" onClick={handleAddOption} disabled={loading}>
              + Add Option
            </button>
          </div>
        )}

        {/* For True/False, we might just show two radio buttons, for example */}
        {questionType === QuestionType.TrueFalse && (
          <div>
            <label>
              <input
                type="radio"
                name="tf"
                value="true"
                checked={correctAnswers.includes("true")}
                onChange={() => setCorrectAnswers(["true"])}
                disabled={loading}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="tf"
                value="false"
                checked={correctAnswers.includes("false")}
                onChange={() => setCorrectAnswers(["false"])}
                disabled={loading}
              />
              False
            </label>
          </div>
        )}

        {/* For Input type, the correctAnswers might just be a single-value array */}
        {questionType === QuestionType.Input && (
          <div>
            <label>Correct Answer (text/number):</label>
            <input
              type="text"
              value={correctAnswers[0] || ""}
              onChange={(e) => setCorrectAnswers([e.target.value])}
              disabled={loading}
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Question"}
        </button>
      </form>
    </div>
  );
};

export default DeckAddQuestionPage;
