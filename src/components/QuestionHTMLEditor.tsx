import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface QuestionHTMLEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const QuestionHTMLEditor: React.FC<QuestionHTMLEditorProps> = ({ content, setContent }) => {


  return (
    <ReactQuill
      value={content}
      onChange={setContent}
      theme="snow"
    />
  );
};

export default QuestionHTMLEditor; 