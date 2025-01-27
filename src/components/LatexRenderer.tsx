import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexRendererProps {
  text: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ text }) => {
  if (!text) return null;

  // Split by both inline ($...$) and block ($$...$$) delimiters
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/gs);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Block math
          const latex = part.slice(2, -2).trim();
          return <BlockMath key={index} math={latex} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Inline math
          const latex = part.slice(1, -1).trim();
          return <InlineMath key={index} math={latex} />;
        }
        // Regular text
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default LatexRenderer; 