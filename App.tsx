import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import JobDescription from './components/JobDescription';
import InterviewGuide from './components/InterviewGuide';
import ChatAssistant from './components/ChatAssistant';
import { generateRecruitmentAssets } from './services/geminiService';
import { AppTab, RecruitmentOutput } from './types';

function App() {
  const [rawNotes, setRawNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<RecruitmentOutput | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.JOB_DESC);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generateRecruitmentAssets(rawNotes);
      setOutput(result);
      setActiveTab(AppTab.JOB_DESC); // Switch to JD tab on success
    } catch (err: any) {
      setError(err.message || "An error occurred while generating content. Please check your API Key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Input Area */}
      <Sidebar 
        rawNotes={rawNotes}
        setRawNotes={setRawNotes}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navigation for Results */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 justify-between shrink-0 z-10">
          <div className="flex space-x-6">
            <button 
              onClick={() => setActiveTab(AppTab.JOB_DESC)}
              disabled={!output}
              className={`text-sm font-medium pb-5 border-b-2 transition-colors ${
                activeTab === AppTab.JOB_DESC 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              } ${!output ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Job Description
            </button>
            <button 
              onClick={() => setActiveTab(AppTab.INTERVIEW)}
              disabled={!output}
              className={`text-sm font-medium pb-5 border-b-2 transition-colors ${
                activeTab === AppTab.INTERVIEW 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              } ${!output ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Interview Guide
            </button>
            <button 
              onClick={() => setActiveTab(AppTab.CHAT)}
              className={`text-sm font-medium pb-5 border-b-2 transition-colors ${
                activeTab === AppTab.CHAT 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              AI Assistant
            </button>
          </div>
          <div className="flex items-center space-x-2">
             {/* Add any extra header actions here if needed */}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
          
          {/* Error Notification */}
          {error && (
            <div className="max-w-4xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!output && !isLoading && !error && activeTab !== AppTab.CHAT && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 mt-[-40px]">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready to Create</h3>
              <p className="max-w-md text-slate-500">
                Enter your rough notes in the sidebar to generate professional recruitment assets instantly using Gemini 3 Pro.
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
             <div className="h-full flex flex-col items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-200 rounded-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-t-4 border-brand-600 rounded-full animate-spin"></div>
                </div>
                <h3 className="mt-6 text-lg font-medium text-slate-800">Thinking deeply...</h3>
                <p className="text-slate-500 mt-1">Crafting specific interview questions and polishing the JD.</p>
             </div>
          )}

          {/* Tab Content */}
          {activeTab === AppTab.JOB_DESC && output && (
            <div className="animate-fade-in">
              <JobDescription content={output.jobDescription} />
            </div>
          )}

          {activeTab === AppTab.INTERVIEW && output && (
             <div className="animate-fade-in">
               <InterviewGuide questions={output.interviewQuestions} />
             </div>
          )}

          {activeTab === AppTab.CHAT && (
             <div className="animate-fade-in h-full">
               <ChatAssistant contextData={output} />
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;