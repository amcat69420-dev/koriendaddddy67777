import React from 'react';
import ReactMarkdown from 'react-markdown';

interface JobDescriptionProps {
  content: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 min-h-[80vh]">
      <div className="prose prose-slate max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-slate-900 mb-6" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3 border-b border-slate-200 pb-1" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-4 space-y-1" {...props} />,
            li: ({node, ...props}) => <li className="text-slate-700" {...props} />,
            p: ({node, ...props}) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
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