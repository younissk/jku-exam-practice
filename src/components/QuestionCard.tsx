import React from "react";
import { Card, Text, Stack, Divider, Checkbox } from "@mantine/core";
import { Question, QuestionType } from "../../data/interfaces/Test";

interface QuestionCardProps {
  question: Question;
  showAnswer: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, showAnswer }) => {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Text size="lg" fw={500}>
          <div className="question-content" dangerouslySetInnerHTML={{ __html: question.question }} />
        </Text>
        {showAnswer && (
          <>
            <Divider />
            {question.type === QuestionType.MultipleChoice && (
                <Stack gap="xs">
                    {question.options?.map((option, index) => (
                        <div key={index}>
                            <Text size="md">{option}</Text>
                            <Checkbox checked={question.correctAnswers?.includes(option)} />
                        </div>
                    ))}
                </Stack>
            )}
            {question.type === QuestionType.TrueFalse && (
                <Stack gap="xs">
                    <Text size="md">True</Text>
                    <Checkbox checked={!question.correctAnswerBoolean} />
                    <Text size="md">False</Text>
                    <Checkbox checked={question.correctAnswerBoolean} />
                </Stack>
            )}

            {question.type === QuestionType.Input && (
                <Stack gap="xs">
                    <Text size="md">Answer: {question.correctAnswers?.join(", ")}</Text>
                </Stack>
            )}
          </>
        )}
      </Stack>
    </Card>
  );
};

export default QuestionCard; 