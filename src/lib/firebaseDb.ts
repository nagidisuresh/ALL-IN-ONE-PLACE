import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Helper interfaces
export interface MockInterviewRecord {
  id: string;
  userId: string;
  date: string;
  role: string;
  type: string;
  level: string;
  field: string;
  avgScore: number;
  questionsCount: number;
  feedbacks: any[];
  createdAt?: any;
  updatedAt?: any;
}

export interface ResumeRecord {
  id: string;
  userId: string;
  resumePdf?: string;
  resumeScore: number;
  atsScore?: number;
  suggestions?: string;
  formData?: any;
  matchPercentage?: number;
  scoreBreakdown?: any;
  matchedKeywords?: string[];
  missingKeywords?: string[];
  gapsAnalysis?: string;
  actionableSuggestions?: string[];
  atsOptimizedSummary?: string;
  createdDate: string;
  updatedDate: string;
  createdAt?: any;
}

export interface TaskRecord {
  id: string;
  userId: string;
  taskName: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  deadline?: string;
  createdDate: string;
  updatedDate?: string;
}

// -----------------------------------------
// 1. Mock Interviews CRUD & Sync
// -----------------------------------------

/**
 * Saves a mock interview session to Firestore under the 'mock_interviews' collection.
 */
export async function saveMockInterviewToFirestore(userId: string, session: any): Promise<void> {
  if (!userId) return;
  try {
    const interviewId = session.id || Date.now().toString();
    const docRef = doc(db, "mock_interviews", interviewId);
    
    await setDoc(docRef, {
      ...session,
      id: interviewId,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log(`Successfully saved mock interview ${interviewId} to Firestore.`);
  } catch (err) {
    console.error("Error saving mock interview to Firestore:", err);
    throw err;
  }
}

/**
 * Fetches all mock interview records for a specific user from Firestore.
 */
export async function getMockInterviewsFromFirestore(userId: string): Promise<MockInterviewRecord[]> {
  if (!userId) return [];
  try {
    const q = query(
      collection(db, "mock_interviews"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const records: MockInterviewRecord[] = [];
    
    querySnapshot.forEach((docSnap) => {
      records.push({ id: docSnap.id, ...docSnap.data() } as MockInterviewRecord);
    });
    
    // Sort locally by date descending as fallback for missing firestore composite index
    return records.sort((a, b) => {
      const timeA = parseInt(a.id) || 0;
      const timeB = parseInt(b.id) || 0;
      return timeB - timeA;
    });
  } catch (err) {
    console.error("Error fetching mock interviews from Firestore:", err);
    return [];
  }
}

/**
 * Subscribes to real-time changes in a user's mock interviews.
 */
export function subscribeMockInterviews(userId: string, callback: (records: MockInterviewRecord[]) => void) {
  if (!userId) return () => {};
  
  const q = query(
    collection(db, "mock_interviews"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const records: MockInterviewRecord[] = [];
    snapshot.forEach((docSnap) => {
      records.push({ id: docSnap.id, ...docSnap.data() } as MockInterviewRecord);
    });
    
    // Sort descending by id (timestamp-based ID)
    const sorted = records.sort((a, b) => {
      const timeA = parseInt(a.id) || 0;
      const timeB = parseInt(b.id) || 0;
      return timeB - timeA;
    });
    
    callback(sorted);
  }, (err) => {
    console.error("Mock interviews subscription error:", err);
  });
}

// -----------------------------------------
// 2. Resumes & ATS Reports CRUD
// -----------------------------------------

/**
 * Saves a resume optimization/ATS report record to Firestore under the 'resumes' collection.
 */
export async function saveResumeReportToFirestore(userId: string, resumeData: Partial<ResumeRecord>): Promise<void> {
  if (!userId) return;
  try {
    const id = resumeData.id || Date.now().toString();
    const docRef = doc(db, "resumes", id);
    
    await setDoc(docRef, {
      ...resumeData,
      id,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log(`Successfully saved resume report ${id} to Firestore.`);
  } catch (err) {
    console.error("Error saving resume report to Firestore:", err);
    throw err;
  }
}

/**
 * Fetches all resume optimization reports for a user.
 */
export async function getResumeReportsFromFirestore(userId: string): Promise<ResumeRecord[]> {
  if (!userId) return [];
  try {
    const q = query(
      collection(db, "resumes"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const records: ResumeRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      records.push({ id: docSnap.id, ...docSnap.data() } as ResumeRecord);
    });
    
    return records.sort((a, b) => {
      const tA = new Date(a.createdDate).getTime() || 0;
      const tB = new Date(b.createdDate).getTime() || 0;
      return tB - tA;
    });
  } catch (err) {
    console.error("Error fetching resume reports:", err);
    return [];
  }
}

// -----------------------------------------
// 3. User Daily Tasks/Goals CRUD & Sync
// -----------------------------------------

/**
 * Saves/updates a user's task to Firestore.
 */
export async function saveTaskToFirestore(userId: string, task: TaskRecord): Promise<void> {
  if (!userId) return;
  try {
    const docRef = doc(db, "tasks", task.id);
    await setDoc(docRef, {
      ...task,
      userId,
      updatedDate: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error saving task to Firestore:", err);
  }
}

/**
 * Deletes a task from Firestore.
 */
export async function deleteTaskFromFirestore(taskId: string): Promise<void> {
  try {
    const docRef = doc(db, "tasks", taskId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Error deleting task from Firestore:", err);
  }
}

/**
 * Subscribes to the user's task list in real-time.
 */
export function subscribeTasks(userId: string, callback: (tasks: TaskRecord[]) => void) {
  if (!userId) return () => {};
  
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks: TaskRecord[] = [];
    snapshot.forEach((docSnap) => {
      tasks.push({ id: docSnap.id, ...docSnap.data() } as TaskRecord);
    });
    
    // Sort tasks: uncompleted first, then by date created
    const sorted = tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    });
    
    callback(sorted);
  }, (err) => {
    console.error("Tasks subscription error:", err);
  });
}

// -----------------------------------------
// 4. Learning Progress Sync
// -----------------------------------------

/**
 * Saves/updates user comprehensive progress stats in Firestore.
 */
export async function saveProgressToFirestore(userId: string, progressData: any): Promise<void> {
  if (!userId) return;
  try {
    const docRef = doc(db, "progress", userId);
    await setDoc(docRef, {
      userId,
      ...progressData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error("Error syncing progress to Firestore:", err);
  }
}

/**
 * Subscribes to real-time progress changes.
 */
export function subscribeProgress(userId: string, callback: (progress: any) => void) {
  if (!userId) return () => {};
  
  const docRef = doc(db, "progress", userId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (err) => {
    console.error("Progress subscription error:", err);
  });
}
