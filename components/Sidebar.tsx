import React from 'react';

interface SidebarProps {
  rawNotes: string;
  setRawNotes: (notes: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ rawNotes, setRawNotes, onGenerate, isLoading }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-slate-200 h-full flex flex-col shadow-sm z-10">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-2xl">💼</span> RecruitAI
        </h1>
        <p className="text-xs text-slate-500 mt-1">Sandbox Environment</p>
      </div>

      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Role Requirements
        </label>
        <p className="text-xs text-slate-500 mb-4">
          Paste your raw meeting notes, bullet points, or brain dump here. AI will structure it.
        </p>
        <textarea
          className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm text-slate-700 transition-all"
          placeholder="- Senior React Engineer&#10;- Must know TypeScript&#10;- Remote friendly&#10;- Good communication skills..."
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50">
        <button
          onClick={onGenerate}
          disabled={isLoading || !rawNotes.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
            isLoading || !rawNotes.trim()
              ? 'bg-slate-400 cursor-not-allowed hover:translate-y-0 shadow-none'
              : 'bg-brand-600 hover:bg-brand-500 hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              <span>✨</span> Generate Assets
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;