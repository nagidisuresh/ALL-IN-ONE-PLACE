export interface EAMCETUser {
  email: string;
  name: string;
  rank?: number;
  category?: string; // OC, BC-A, BC-B, BC-C, BC-D, BC-E, SC, ST
  gender?: string; // Male, Female
  region?: string; // AU (Andhra University), OU (Osmania University), SVU (Sri Venkateswara University), NL (Non-Local)
  preferredBranch?: string;
  targetDistrict?: string;
}

export interface EAMCETQuestion {
  id: string;
  subject: "Mathematics" | "Physics" | "Chemistry";
  topic: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface StudyMaterial {
  id: string;
  subject: "Mathematics" | "Physics" | "Chemistry";
  topic: string;
  title: string;
  content: string; // Markdown or rich summaries
  formulas: string[];
  keyPoints: string[];
}

export interface PreviousPaper {
  id: string;
  title: string;
  year: number;
  pdfUrl: string; // Fake / Simulated URL
  downloads: number;
}

export interface College {
  id: string;
  code: string; // e.g. JNTU, OUCE, AUCE
  name: string;
  logo: string;
  images: string[];
  description: string;
  district: string;
  region: "AU" | "OU" | "SVU" | "NL";
  type: "Govt" | "Private Autonomous" | "Private";
  feesPerYear: number;
  placementPercentage: number;
  highestPackage: number; // in LPA
  averagePackage: number; // in LPA
  facultyCount: number;
  infrastructure: string[];
  website: string;
  contactEmail: string;
  contactPhone: string;
  hostelAvailable: "Yes" | "No" | "Boys Only" | "Girls Only";
  rating: number; // e.g. 4.5
}

export interface CutoffData {
  id: string;
  collegeId: string;
  collegeCode: string;
  branchCode: string; // e.g. CSE, ECE, INF
  category: string; // e.g. OC_GEN, OC_GIRLS, SC_GEN, BC_A_GEN, etc.
  cutoffRank: number;
  year: number;
}

export interface Branch {
  code: string; // e.g. CSE
  name: string;
  description: string;
  opportunities: string[];
  skillsRequired: string[];
  averageSalary: number; // in LPA
  futureDemand: "High" | "Medium" | "Emerging";
  recruiters: string[];
}

export interface PlacementData {
  collegeId: string;
  year: number;
  totalPlaced: number;
  eligibleStudents: number;
  highestPackage: number;
  averagePackage: number;
  topRecruiters: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  eligibility: string;
  amount: string;
  applyLink: string;
}

export interface CounselingEvent {
  id: string;
  phase: "Phase 1" | "Phase 2" | "Final Phase" | "Spot Admission";
  title: string;
  dateRange: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  description: string;
}

export interface SavedCollege {
  collegeId: string;
  branchCode: string;
  preferenceOrder: number;
}

export interface RankPredictionResult {
  dream: { college: College; branchCode: string; cutoff: number; probability: number }[];
  target: { college: College; branchCode: string; cutoff: number; probability: number }[];
  safe: { college: College; branchCode: string; cutoff: number; probability: number }[];
  aiExplanation: string;
}
