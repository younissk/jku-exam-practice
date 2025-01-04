import React, { useState } from "react";
import { Card, Button, Stack, Select, TextInput, Checkbox } from "@mantine/core";
import 'react-quill/dist/quill.snow.css';
import { Question, QuestionType } from "../../data/interfaces/Test";
import { updateQuestion } from "../../firebase/firestore";
import QuestionHTMLEditor from "../components/QuestionHTMLEditor";

interface EditQuestionCardProps {
  question: Question;
}

const EditQuestionCard: React.FC<EditQuestionCardProps> = ({ question }) => {
  const [questionText, setQuestionText] = useState(question.question);
  const [options, setOptions] = useState<string[]>(question.options || []);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(question.correctAnswers || []);
  const [questionType, setQuestionType] = useState<QuestionType>(question.type);
  const [loading, setLoading] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleToggleCorrectAnswer = (value: string) => {
    if (correctAnswers.includes(value)) {
      setCorrectAnswers(correctAnswers.filter((a) => a !== value));
    } else {
      setCorrectAnswers([...correctAnswers, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    try {


      await updateQuestion(question.id, {
        ...question,
        question: questionText.trim(),
        type: questionType,
        options: options,
        correctAnswers: correctAnswers,
      });
    } catch (err) {
      console.error("Error creating question:", err);
      alert("Error creating question. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <QuestionHTMLEditor
          content={questionText}
          setContent={(updatedContent) => setQuestionText(updatedContent)}
        />
        <Select
          label="Question Type"
          value={questionType}
          onChange={(value) => setQuestionType(value as QuestionType)}
          data={Object.values(QuestionType).map((type) => ({ value: type, label: type }))}
          disabled={loading}
        />
          {questionType === QuestionType.MultipleChoice && (
            <Stack gap="xs">
              {options.map((opt, idx) => (
                <div key={idx}>
                  <TextInput
                    value={opt}
                    onChange={(e) => handleOptionChange(e.target.value, idx)}
                    disabled={loading}
                  />
                  <Checkbox
                    label="Correct?"
                    checked={correctAnswers.includes(opt)}
                    onChange={() => handleToggleCorrectAnswer(opt)}
                    disabled={loading}
                  />
                </div>
              ))}
              <Button onClick={handleAddOption} disabled={loading}>
                + Add Option
              </Button>
            </Stack>
          )}

          {questionType === QuestionType.TrueFalse && (
            <Stack gap="xs">
              <Checkbox
                label="True"
                checked={correctAnswers.includes("true")}
                onChange={() => setCorrectAnswers(["true"])}
                disabled={loading}
              />
              <Checkbox
                label="False"
                checked={correctAnswers.includes("false")}
                onChange={() => setCorrectAnswers(["false"])}
                disabled={loading}
              />
            </Stack>
          )}

          {questionType === QuestionType.Input && (
            <TextInput
              label="Correct Answer (text/number)"
              value={correctAnswers[0] || ""}
              onChange={(e) => setCorrectAnswers([e.target.value])}
              disabled={loading}
            />
          )}
        <Button onClick={handleSubmit} fullWidth loading={loading}>
          {loading ? "Updating..." : "Update Question"}
        </Button>
      </Stack>
    </Card>
  );
};

export default EditQuestionCard; 