import { Paper } from "@mantine/core";
import useTestStore from "../../../stores/useTestStore";

export default function MultipleChoice() {
  const { currentQuestion, currentAnswer, setCurrentAnswer, checked } =
    useTestStore();

  if (!currentQuestion.options) {
    return null;
  }

  return (
    <div style={{ position: "relative" }}>
      {currentQuestion.options.map((option, index) => {
        let backgroundColor = "white";
        if (checked) {
          if (Array.isArray(currentQuestion.correctAnswer)) {
            if (currentQuestion.correctAnswer.includes(option)) {
              backgroundColor = "lightgreen";
            } else if (currentAnswer.includes(option)) {
              backgroundColor = "lightcoral";
            }
          } else {
            if (option === currentQuestion.correctAnswer) {
              backgroundColor = "lightgreen";
            } else if (currentAnswer.includes(option)) {
              backgroundColor = "lightcoral";
            }
          }
        } else if (currentAnswer.includes(option)) {
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
                if (currentAnswer.includes(option)) {
                  setCurrentAnswer(currentAnswer.filter((o) => o !== option));
                } else {
                  setCurrentAnswer([...currentAnswer, option]);
                }
              }
            }}
          >
            {option}
          </Paper>
        );
      })}
    </div>
  );
}
