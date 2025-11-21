import React from 'react';
import { InterviewQuestion } from '../types';

interface InterviewGuideProps {
  questions: InterviewQuestion[];
}

const InterviewGuide: React.FC<InterviewGuideProps> = ({ questions }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 min-h-[80vh]">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Interview Guide</h2>
        <p className="text-slate-500">
          A structured set of questions designed to evaluate the core competencies derived from the job description.
        </p>
      </div>

      <div className="grid gap-6">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-brand-300 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
                {q.type}
              </span>
              <span className="text-xs text-slate-400 font-mono">Q{idx + 1}</span>
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-3 group-hover:text-brand-700 transition-colors">
              {q.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Skill</p>
                <p className="text-sm text-slate-700">{q.targetSkill}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Evaluation Rationale</p>
                <p className="text-sm text-slate-600 italic">"{q.rationale}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewGuide;