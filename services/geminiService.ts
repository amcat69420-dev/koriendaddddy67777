import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RecruitmentOutput } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: API_KEY });

const MODEL_NAME = 'gemini-3-pro-preview';

const RECRUITMENT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    jobDescription: {
      type: Type.STRING,
      description: "A professional, full-length Job Description in Markdown format. Include sections for About, Responsibilities, Requirements, and Benefits."
    },
    interviewQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "The interview question text." },
          targetSkill: { type: Type.STRING, description: "The specific hard or soft skill this question targets." },
          rationale: { type: Type.STRING, description: "Why this question is important for this role." },
          type: { type: Type.STRING, description: "Type of question: Behavioral, Technical, or Situational" }
        },
        required: ["question", "targetSkill", "rationale", "type"]
      }
    }
  },
  required: ["jobDescription", "interviewQuestions"]
};

export const generateRecruitmentAssets = async (rawNotes: string): Promise<RecruitmentOutput> => {
  if (!API_KEY) throw new Error("API Key is missing.");

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate a professional Job Description and an Interview Guide based on these raw notes:
      
      ${rawNotes}
      
      The Job Description should be formatted in clean Markdown with headers.
      The Interview Guide should contain exactly 10 distinct questions.
      Think deeply about the role's requirements, implied culture, and necessary soft skills based on the notes provided.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: RECRUITMENT_SCHEMA,
        // Using Thinking Config for complex reasoning to infer missing details from raw notes
        thinkingConfig: {
          thinkingBudget: 32768 
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    return JSON.parse(text) as RecruitmentOutput;
  } catch (error) {
    console.error("Generation failed:", error);
    throw error;
  }
};

export const createChatSession = (context: RecruitmentOutput | null) => {
    if (!API_KEY) throw new Error("API Key is missing.");

    let systemInstruction = "You are a helpful Recruitment Assistant using Gemini 3 Pro. You assist users in refining job descriptions or preparing for interviews.";
    
    if (context) {
        systemInstruction += `
        
        Current Context:
        The user has generated a Job Description and Interview Guide.
        
        [Job Description Summary]
        ${context.jobDescription.substring(0, 2000)}... (truncated for context window if needed)
        
        [Interview Questions]
        ${context.interviewQuestions.map(q => `- ${q.question} (${q.targetSkill})`).join('\n')}
        
        Answer questions specifically about this role, how to improve the JD, or how to evaluate candidates based on these questions.
        `;
    }

    return ai.chats.create({
        model: MODEL_NAME,
        config: {
            systemInstruction: systemInstruction,
            // We don't necessarily need max thinking for simple chat, but user requested Gemini 3 Pro.
            // We will not force a huge thinking budget for every chat turn to ensure responsiveness,
            // unless the user asks something very complex. For this implementation, we stick to standard inference
            // for chat to keep the UX snappy, as the heavy lifting was done in generation.
        }
    });
};