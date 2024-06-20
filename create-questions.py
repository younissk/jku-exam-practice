import json
from tqdm import tqdm

# %%
from langchain_core.pydantic_v1 import BaseModel, Field
from typing import List
from pydantic import BaseModel, Field
from langchain_core.output_parsers import JsonOutputParser

class QuestionInformation(BaseModel):
    """Information about the Question."""
    id: str = Field(description="The ID of the question")
    courseId: str = Field(description="The ID of the course")
    source: str = Field(description="The source of the question (e.g. Exam, Quiz, etc.)")
    year: str = Field(description="The year the question was asked")
    topics: list[str] = Field(description="The topics covered by the question in a list of strings")
    type: str = Field(description="The type of the question (e.g. MCQ, True/False, etc.)")
    question: str = Field(description="The question in HTML format")
    correctAnswer: list[str] = Field(description="The correct answer/s to the question ")
    

parser = JsonOutputParser(pydantic_object=QuestionInformation)

# %%
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain import globals
from langchain_core.runnables import chain

# %%
@chain
def question_model(inputs: dict) -> str | list[str] | dict:
    """Invoke model with image and prompt."""
    model = ChatOpenAI(temperature=0.5, model="gpt-3.5-turbo", api_key="sk-proj-hYwb3SqXo9htbCmbJujtT3BlbkFJ06RXgF7vRxH7pydrv5fu")
    msg = model.invoke(
        [HumanMessage(
            content=[
                {"type": "text", "text": inputs["prompt"]},
                {"type": "text", "text": parser.get_format_instructions()},
                {"type": "text", "text": inputs["question"]},
            ])]
    )
    return msg.content

# %%
source = "Exam"
courseId = "qaGEDqLkQZwb34UTsHOf"
year = "2024"
topics = [
    "1. Project Design",
    "2. Resources",
    "3. Git",
    "4. Data Analysis",
    "5. Data Loading",
    "6. Neural Network inference",
    "7. Neural Network Training",
    "8. Data Augmentation",
    "9. Evaluation",
    "10. TorchScript",
]

# %%

INSTRUCTIONS_PROMPT = f"""
You will be given a JSON object which is a question from a specific test. I want you to
analyse it and return a JSON object using the following Interface as a template:

interface Question:
  id: string;
  courseId: string;
  source: string;
  year: string;
  topics: string;
  type: QuestionType;
  question: string;
  correctAnswer: string | string[];


enum QuestionType:
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",


interface MultipleChoiceQuestion extends Question:
  type: QuestionType.MultipleChoice;
  options: string[];


use the following input to fill in the gaps:
courseId: {courseId}
source: {source}
year: {year}
topics list (Pick and choose from this list): {topics}

=== EXAMPLE INPUT ===
id: "q2",
question:
  "<h3>You want to predict if the current image contains a traffic sign, a car, or a street. For each of the three objects, a prediction should be made. All three objects may occur in the image at the same time. This is a</h3>",
options: [
  "a. binary classification task",
  "b. multilabel classification task",
  "c. multiclass classification task",
  "d. regression task",
],
correctAnswers: [b. multilabel classification task],


=== EXAMPLE OUTPUT ===
  id: "q2",
  courseId: "{courseId}",
  source: "{source}",
  year: "{year}",
  topics: ["Machine Learning", "Classification"],
  type: "MultipleChoice",
    question:
    "<h3>You want to predict if the current image contains a traffic sign, a car, or a street. For each of the three objects, a prediction should be made. All three objects may occur in the image at the same time. This is a</h3>",
  options: [
    "a. binary classification task",
    "b. multilabel classification task",
    "c. multiclass classification task",
    "d. regression task",
  ],
  correctAnswer: [b. multilabel classification task],

Please dont add ```json at the start and end of the JSON object.
"""

questions = []

# %%
with open("2024.json", "r") as file:
    questions = json.load(file)

# %%
generated_questions = []

for index, q in enumerate(questions):
    result = question_model.invoke({"prompt": INSTRUCTIONS_PROMPT, "question": json.dumps(q)})
    generated_questions.append(json.loads(result))
    print(f"Generated question {index + 1} of {len(questions)}")

with open("generated_questions.json", "w") as file:
    json.dump(generated_questions, file)
