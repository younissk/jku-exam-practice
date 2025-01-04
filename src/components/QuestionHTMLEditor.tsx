import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface QuestionHTMLEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const QuestionHTMLEditor: React.FC<QuestionHTMLEditorProps> = ({ content, setContent }) => {

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const range = quillRef.current?.getEditor().getSelection();
          if (range) {
            quillRef.current?.getEditor().insertEmbed(range.index, 'image', reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload
      }
    }
  };

  const quillRef = React.useRef<ReactQuill>(null);

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      onChange={setContent}
      theme="snow"
      modules={modules}
    />
  );
};

export default QuestionHTMLEditor; 