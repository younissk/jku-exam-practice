import { useState, useEffect } from "react";
import useTestStore from "../../../stores/useTestStore";
import { Button, Paper } from "@mantine/core";
import Confetti from "react-confetti";

export default function MultipleChoice() {
  const { currentQuestion, nextQuestion, checkAnswer } = useTestStore();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!currentQuestion.options) {
    return null;
  }

  const handleCheckAnswer = () => {
    setChecked(true);
    setIsCorrect(checkAnswer(selectedOptions));
  };

  return (
    <div>
      {currentQuestion.options.map((option, index) => {
        let backgroundColor = "white";
        if (checked) {
          if (Array.isArray(currentQuestion.correctAnswer)) {
            if (currentQuestion.correctAnswer.includes(option)) {
              backgroundColor = "lightgreen";
            } else if (selectedOptions.includes(option)) {
              backgroundColor = "lightcoral";
            }
          } else {
            if (option === currentQuestion.correctAnswer) {
              backgroundColor = "lightgreen";
            } else if (selectedOptions.includes(option)) {
              backgroundColor = "lightcoral";
            }
          }
        } else if (selectedOptions.includes(option)) {
          backgroundColor = "lightblue";
        }

        return (
          <Paper
            key={index}
            style={{
              backgroundColor,
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (!checked) {
                if (selectedOptions.includes(option)) {
                  setSelectedOptions(
                    selectedOptions.filter((o) => o !== option)
                  );
                } else {
                  setSelectedOptions([...selectedOptions, option]);
                }
              }
            }}
          >
            {option}
          </Paper>
        );
      })}
      <Button
        onClick={() => {
          handleCheckAnswer();
        }}
        disabled={checked}
      >
        Check Answer
      </Button>
      <Button
        style={{ marginLeft: 5 }}
        onClick={() => {
          setChecked(false);
          setIsCorrect(null);
          setSelectedOptions([]);
          nextQuestion();
        }}
      >
        Next Question
      </Button>
      {isCorrect && <Confetti width={dimensions.width} height={dimensions.height} />}
    </div>
  );
}
