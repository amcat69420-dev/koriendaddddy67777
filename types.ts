export interface InterviewQuestion {
  question: string;
  targetSkill: string;
  rationale: string;
  type: 'Behavioral' | 'Technical' | 'Situational';
}

export interface RecruitmentOutput {
  jobDescription: string; // Markdown format
  interviewQuestions: InterviewQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppTab {
  INPUT = 'input',
  JOB_DESC = 'jd',
  INTERVIEW = 'interview',
  CHAT = 'chat'
}

export type LoadingState = 'idle' | 'thinking' | 'complete' | 'error';