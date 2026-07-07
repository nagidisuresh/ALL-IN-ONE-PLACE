export interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  estimatedTime: string;
}

export interface FillerWord {
  word: string;
  count: number;
}

export interface EvaluationFeedback {
  overallScore: number;
  contentScore: number;
  structureScore: number;
  confidenceScore: number;
  sentimentScore?: number;
  speakingPace: number;
  paceRating: string;
  fillerWords: FillerWord[];
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  duration: string;
  description: string;
  theory: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  resources: {
    name: string;
    url: string;
    type: string;
  }[];
  completed?: boolean;
}

export interface Roadmap {
  title: string;
  goal: string;
  level: string;
  timeline: string;
  steps: RoadmapStep[];
}

export interface ResumeData {
  name: string;
  role: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  experience: string;
  skills: string;
  education: string;
}

export interface ResumeEnhancement {
  resumeScore: number;
  professionalSummary: string;
  optimizedBulletPoints: string[];
  keywordOptimization: string[];
  grammarTips: string[];
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  solved: boolean;
  bookmarked: boolean;
  revision: boolean;
  notes?: string;
  leetcodeUrl?: string;
  companyTags?: string[];
}

export interface CodingSheet {
  name: string;
  progress: string;
  percent: number;
  problems: CodingProblem[];
}

export interface CompanyPrep {
  name: string;
  logo: string;
  faq: { q: string; a: string }[];
  coding: string[];
  systemDesign: string[];
  hiringProcess: string;
  salary: string;
  strategy: string;
}
