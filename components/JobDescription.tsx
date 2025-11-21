import React from 'react';
import ReactMarkdown from 'react-markdown'; // Note: In a real scenario we might need to install this, but here we assume valid TSX handling or simple replacement.
// Since we cannot import external libraries not listed in instructions easily without ensure they exist, 
// we will do a simple renderer or assume the user accepts standard text rendering if libraries aren't available.
// However, standard practice allows common libraries. I'll use a simple CSS-based display for Markdown-like content
// to avoid "Module not found" if 'react-markdown' isn't pre-installed in the environment. 
// I'll use a simple text parser or just display as pre-wrap if complex. 
// better: I will handle basic markdown parsing for headers and lists manually to be safe and dependency-free.

interface JobDescriptionProps {
  content: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ content }) => {
  // Simple markdown to HTML parser for safety without external libs
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold text-slate-800 mt-6 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-3 border-b border-slate-200 pb-1">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-extrabold text-slate-900 mb-6">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-slate-700 mb-1 list-disc">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }
      return <p key={index} className="text-slate-700 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 min-h-[80vh]">
      <div className="prose prose-slate max-w-none">
        {renderMarkdown(content)}
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-end gap-3">
         <button 
           onClick={() => navigator.clipboard.writeText(content)}
           className="px-4 py-2 text-sm text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors border border-slate-200 hover:border-brand-200"
         >
           Copy to Clipboard
         </button>
      </div>
    </div>
  );
};

export default JobDescription;