import React, { useState, useEffect } from "react";
import { Video, BookOpen, GraduationCap, Briefcase, Sparkles, Linkedin, Youtube, Send, Instagram, Twitter } from "lucide-react";
import Navbar from "./components/Navbar";
import AuthView from "./components/AuthView";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import { useLanguage } from "./components/LanguageProvider";
import { useTheme } from "./components/ThemeProvider";
import InterviewView from "./components/InterviewView";
import RoadmapView from "./components/RoadmapView";
import JobPrepView from "./components/JobPrepView";
import ResumeView from "./components/ResumeView";
import PortfolioView from "./components/PortfolioView";
import ToolsDirectoryView from "./components/ToolsDirectoryView";
import ChatView from "./components/ChatView";
import FreePlatformsView from "./components/FreePlatformsView";
import RemoteJobsView from "./components/RemoteJobsView";
import AboutView from "./components/AboutView";
import TcsNqtView from "./components/TcsNqtView";
import FoundersPrimeView from "./components/FoundersPrimeView";
import ThreeDShowcaseView from "./components/ThreeDShowcaseView";
import LearnWithSureshView from "./components/LearnWithSureshView";
import DeveloperRoadmapsView from "./components/DeveloperRoadmapsView";
import ProfileDashboardModal from "./components/ProfileDashboardModal";
import GlassOrbBackground from "./components/GlassOrbBackground";
import CommandPalette from "./components/CommandPalette";

// Import EAMCET components
import EAMCETHome from "./components/EAMCETHome";
import EAMCETPlans from "./components/EAMCETPlans";
import EAMCETPractice from "./components/EAMCETPractice";
import EAMCETResources from "./components/EAMCETResources";
import EAMCETTips from "./components/EAMCETTips";
import EAMCETCounseling from "./components/EAMCETCounseling";
import EAMCETProfile from "./components/EAMCETProfile";
import EAMCETAITutor from "./components/EAMCETAITutor";
import StudentOSView from "./components/StudentOSView";
import NewAgeSchoolsView from "./components/NewAgeSchoolsView";
import NewsletterSuccessModal from "./components/NewsletterSuccessModal";
import LegalModal from "./components/LegalModal";
import HelpCenterView from "./components/HelpCenterView";
import GuestLockWall from "./components/GuestLockWall";
import { 
  subscribeMockInterviews, 
  subscribeTasks, 
  saveMockInterviewToFirestore, 
  saveTaskToFirestore 
} from "./lib/firebaseDb";

// Protected Route Component to require user authentication
interface ProtectedRouteProps {
  user: { email: string; name: string; isAnonymous?: boolean; provider?: string } | null;
  onLoginSuccess: (userData: any) => void;
  onSignUpRedirect: () => void;
  onHomeRedirect: () => void;
  isTabProtectedForGuest?: boolean;
  children: React.ReactNode;
}

function ProtectedRoute({ user, onSignUpRedirect, onHomeRedirect, isTabProtectedForGuest = false, children }: ProtectedRouteProps) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm font-mono">Redirecting to authorization...</p>
      </div>
    );
  }

  // Intercept if guest is attempting to access a premium/protected tab
  if ((user.isAnonymous || user.provider === "guest") && isTabProtectedForGuest) {
    return (
      <GuestLockWall 
        onSignUp={onSignUpRedirect} 
        onExploreFree={onHomeRedirect} 
      />
    );
  }

  return <>{children}</>;
}

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const [user, setUser] = useState<{ email: string; name: string; uid: string; isAnonymous?: boolean; provider?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("learn-suresh-home");
  const [intendedTab, setIntendedTab] = useState<string>("learn-suresh-home");
  const [platformMode, setPlatformMode] = useState<"career" | "eamcet" | "free-edu" | "remote-jobs" | "student-os" | "new-age-schools" | "learn-with-suresh">("learn-with-suresh");
  const [selectedSubject, setSelectedSubject] = useState<"Mathematics" | "Physics" | "Chemistry" | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);

  // Helper to calculate total XP based on active roadmap and interview history completions
  const calculatePoints = () => {
    let points = 0;
    
    // 1. Points from active roadmap (100 XP per completed step)
    const activeRoadmapStr = localStorage.getItem("nextroundprep_active_roadmap");
    if (activeRoadmapStr) {
      try {
        const parsed = JSON.parse(activeRoadmapStr);
        if (parsed && Array.isArray(parsed.steps)) {
          const completedStepsCount = parsed.steps.filter((s: any) => s.completed).length;
          points += completedStepsCount * 100;
        }
      } catch (e) {
        console.error("Failed to parse roadmap for points calculation", e);
      }
    }
    
    // 2. Points from interview history (250 XP per completed session)
    const interviewHistoryStr = localStorage.getItem("nextroundprep_interview_history");
    if (interviewHistoryStr) {
      try {
        const parsed = JSON.parse(interviewHistoryStr);
        if (Array.isArray(parsed)) {
          points += parsed.length * 250;
        }
      } catch (e) {
        console.error("Failed to parse interview history for points calculation", e);
      }
    }

    // 3. Baseline starting bonus for logged-in profile (150 XP)
    if (user) {
      points += 150;
    }

    // 4. Points from completed daily goals (25 XP per completed goal)
    const dailyGoalsStr = localStorage.getItem("nextroundprep_daily_goals");
    if (dailyGoalsStr) {
      try {
        const parsed = JSON.parse(dailyGoalsStr);
        if (Array.isArray(parsed)) {
          const completedCount = parsed.filter((g: any) => g.completed).length;
          points += completedCount * 25;
        }
      } catch (e) {
        console.error("Failed to parse daily goals for points calculation", e);
      }
    }

    return points;
  };

  useEffect(() => {
    const updatePoints = () => {
      setUserPoints(calculatePoints());
    };

    updatePoints();

    // Sync points across tabs or actions
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "nextroundprep_active_roadmap" ||
        e.key === "nextroundprep_interview_history" ||
        e.key === "nextroundprep_user"
      ) {
        updatePoints();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("update-user-points", updatePoints);
    
    // Periodic synchronization check
    const interval = setInterval(updatePoints, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("update-user-points", updatePoints);
      clearInterval(interval);
    };
  }, [user]);
  
  // Newsletter state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriptionError, setSubscriptionError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<"terms" | "privacy" | "accessibility">("terms");

  // Redirect to AuthView if user is not authenticated and attempts to access protected tabs
  useEffect(() => {
    if (!user && activeTab !== "about" && activeTab !== "auth" && activeTab !== "help-center" && !activeTab.startsWith("learn-suresh-")) {
      setIntendedTab(activeTab);
      setActiveTab("auth");
    }
  }, [user, activeTab]);

  // Global Keyboard Shortcuts (Ctrl + K or Cmd + K) and custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + K or Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    const handleOpenPaletteEvent = () => {
      setIsCommandPaletteOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenPaletteEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenPaletteEvent);
    };
  }, []);

  // Load and listen to authenticated user in real-time
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        
        // Listen to real-time changes in Firestore
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || data.email || "",
              name: data.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || (firebaseUser.isAnonymous ? "Guest Candidate" : "User"),
              provider: firebaseUser.isAnonymous ? "guest" : (data.provider || "local"),
              isAnonymous: firebaseUser.isAnonymous,
              createdAt: data.createdAt,
              points: data.points ?? 150,
              streak: data.streak ?? 1,
              lastActiveDate: data.lastActiveDate,
              // Extra profiles fields
              targetRole: data.targetRole || "Software Engineer",
              targetIndustry: data.targetIndustry || "Technology & SaaS",
              experienceLevel: data.experienceLevel || "Mid-Level",
              prepGoals: data.prepGoals || "Master behavior structure",
              phone: data.phone || "",
              gender: data.gender || "",
              age: data.age || ""
            };
            setUser(userData);
            localStorage.setItem("nextroundprep_user", JSON.stringify(userData));
          } else {
            // Profile document doesn't exist yet, build one
            const defaultUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || (firebaseUser.isAnonymous ? "Guest Candidate" : "User"),
              provider: firebaseUser.isAnonymous ? "guest" : "local",
              isAnonymous: firebaseUser.isAnonymous,
              createdAt: new Date().toISOString(),
              points: 150,
              streak: 1,
              lastActiveDate: new Date().toISOString()
            };
            setUser(defaultUser);
            localStorage.setItem("nextroundprep_user", JSON.stringify(defaultUser));
            
            // Try to create the Firestore document asynchronously
            setDoc(userRef, defaultUser).catch(err => console.error("Error creating profile", err));
          }
        }, (err) => {
          console.error("Firestore snapshot subscription error", err);
        });
      } else {
        // User logged out
        setUser(null);
        localStorage.removeItem("nextroundprep_user");
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        
        // Fallback to local storage cache if offline and not authenticated
        const savedUser = localStorage.getItem("nextroundprep_user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            setUser(null);
          }
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  // Real-time synchronization of Mock Interviews and other user data
  useEffect(() => {
    if (!user || user.isAnonymous) return;

    // 1. Subscribe to mock interviews from Firestore
    const unsubscribeInterviews = subscribeMockInterviews(user.uid, async (firestoreInterviews) => {
      try {
        const localHistoryStr = localStorage.getItem("nextroundprep_interview_history") || "[]";
        const localHistory = JSON.parse(localHistoryStr);
        
        let localUpdated = false;
        const mergedHistory = [...localHistory];

        // Add firestore interviews that don't exist locally
        for (const fItem of firestoreInterviews) {
          const exists = mergedHistory.some(lItem => lItem.id === fItem.id);
          if (!exists) {
            mergedHistory.push(fItem);
            localUpdated = true;
          }
        }

        // Upload local interviews that don't exist in Firestore
        for (const lItem of localHistory) {
          const exists = firestoreInterviews.some(fItem => fItem.id === lItem.id);
          if (!exists) {
            await saveMockInterviewToFirestore(user.uid, lItem);
          }
        }

        if (localUpdated || localHistory.length !== mergedHistory.length) {
          // Sort merged history descending by ID
          const sortedHistory = mergedHistory.sort((a, b) => {
            const timeA = parseInt(a.id) || 0;
            const timeB = parseInt(b.id) || 0;
            return timeB - timeA;
          });
          localStorage.setItem("nextroundprep_interview_history", JSON.stringify(sortedHistory));
          // Dispatch events to refresh UI
          window.dispatchEvent(new CustomEvent("update-user-points"));
        }
      } catch (err) {
        console.error("Failed to sync interviews", err);
      }
    });

    // 2. Subscribe to tasks from Firestore
    const unsubscribeTasks = subscribeTasks(user.uid, async (firestoreTasks) => {
      try {
        const localGoalsStr = localStorage.getItem("nextroundprep_daily_goals") || "[]";
        const localGoals = JSON.parse(localGoalsStr);
        
        let localUpdated = false;
        const mergedGoals = [...localGoals];

        // Sync firestore tasks to local
        for (const fItem of firestoreTasks) {
          const exists = mergedGoals.some(lItem => lItem.id === fItem.id);
          if (!exists) {
            mergedGoals.push({
              id: fItem.id,
              text: fItem.taskName,
              completed: fItem.completed
            });
            localUpdated = true;
          } else {
            // Check if status changed
            const localIdx = mergedGoals.findIndex(lItem => lItem.id === fItem.id);
            if (localIdx > -1 && mergedGoals[localIdx].completed !== fItem.completed) {
              mergedGoals[localIdx].completed = fItem.completed;
              localUpdated = true;
            }
          }
        }

        // Upload local tasks that don't exist in Firestore
        for (const lItem of localGoals) {
          const exists = firestoreTasks.some(fItem => fItem.id === lItem.id);
          if (!exists) {
            await saveTaskToFirestore(user.uid, {
              id: lItem.id,
              userId: user.uid,
              taskName: lItem.text,
              completed: lItem.completed,
              createdDate: new Date().toISOString()
            });
          }
        }

        if (localUpdated || localGoals.length !== mergedGoals.length) {
          localStorage.setItem("nextroundprep_daily_goals", JSON.stringify(mergedGoals));
          window.dispatchEvent(new CustomEvent("update-user-points"));
        }
      } catch (err) {
        console.error("Failed to sync tasks", err);
      }
    });

    return () => {
      unsubscribeInterviews();
      unsubscribeTasks();
    };
  }, [user?.uid]);

  const handleLoginSuccess = (userData: { email: string; name: string; uid: string; provider: string }) => {
    setUser(userData as any);
    localStorage.setItem("nextroundprep_user", JSON.stringify(userData));
    
    // Redirect to the personal details page
    setPlatformMode("eamcet");
    setActiveTab("eamcet-profile");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase logout failed:", error);
    }
    setUser(null);
    localStorage.removeItem("nextroundprep_user");
    localStorage.removeItem("nextroundprep_token");
    setActiveTab("about");
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white relative overflow-x-hidden font-sans flex flex-col justify-between">
      {/* Background Glow Bleed */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#22d3ee]/10 via-[#ec4899]/10 to-transparent rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <GlassOrbBackground />

      <div className="pb-24">
        {/* Persistent Top Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          platformMode={platformMode}
          setPlatformMode={setPlatformMode}
          user={user} 
          onLogout={handleLogout} 
          onOpenProfile={() => {
            if (platformMode === "eamcet") {
              setActiveTab("eamcet-profile");
            } else {
              setIsProfileOpen(true);
            }
          }}
          userPoints={userPoints}
        />

        {user && (user.isAnonymous || user.provider === "guest") && (
          <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-pink-500/20 via-[#a855f7]/20 to-[#22d3ee]/20 border-b border-[#ec4899]/30 backdrop-blur-md py-2 px-4 flex justify-between items-center text-xs animate-slide-down">
            <div className="flex items-center gap-2 max-w-[80%] mx-auto text-center justify-center">
              <span className="animate-pulse">✨</span>
              <p className="font-semibold text-gray-200">
                You are browsing in <span className="text-pink-400 font-bold">Guest Mode</span>. Any XP earned or progress made will not be saved. <button onClick={() => { setActiveTab("auth"); setIntendedTab(activeTab); }} className="text-[#22d3ee] hover:underline font-bold ml-1 cursor-pointer">Sign in / Create account</button> to preserve your journey!
              </p>
            </div>
          </div>
        )}

        {/* Profile Dashboard Modal */}
        {user && (
          <ProfileDashboardModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            user={user}
            onUserUpdate={(updated) => {
              setUser(prev => prev ? { ...prev, ...updated } : null);
              const cache = localStorage.getItem("nextroundprep_user");
              if (cache) {
                try {
                  const parsed = JSON.parse(cache);
                  localStorage.setItem("nextroundprep_user", JSON.stringify({ ...parsed, ...updated }));
                } catch (e) {
                  localStorage.setItem("nextroundprep_user", JSON.stringify(updated));
                }
              }
            }}
            onNavigateToRoadmap={() => {
              setIsProfileOpen(false);
              setPlatformMode("career");
              setActiveTab("roadmap");
            }}
            userPoints={userPoints}
          />
        )}

        {/* Global Command Palette */}
        {user && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setPlatformMode={setPlatformMode}
          />
        )}

        {/* Newsletter Subscription Success Modal */}
        <NewsletterSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          email={subscriberEmail}
        />

        {/* Legal Modal for Agreements & Accessibility */}
        <LegalModal
          isOpen={isLegalOpen}
          onClose={() => setIsLegalOpen(false)}
          initialSection={legalSection}
        />

         {/* Main Container */}
        <main className={`relative z-10 ${user ? "pt-28" : "pt-24"}`}>
          {platformMode === "student-os" ? (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
              <StudentOSView />
            </ProtectedRoute>
          ) : platformMode === "new-age-schools" ? (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
              <NewAgeSchoolsView />
            </ProtectedRoute>
          ) : platformMode === "learn-with-suresh" ? (
            <LearnWithSureshView activeSubTab={activeTab} setActiveSubTab={setActiveTab} />
          ) : (
            <>
              {/* Career & Interview Hub Views */}
              {activeTab === "interview" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <InterviewView />
                </ProtectedRoute>
              )}
              {activeTab === "learn-with-suresh" && (
                <LearnWithSureshView activeSubTab={activeTab} setActiveSubTab={setActiveTab} />
              )}
              {activeTab === "roadmap" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <RoadmapView />
                </ProtectedRoute>
              )}
              {activeTab === "developer-roadmaps" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
                  <DeveloperRoadmapsView />
                </ProtectedRoute>
              )}
              {activeTab === "job-prep" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <JobPrepView />
                </ProtectedRoute>
              )}
              {activeTab === "resume" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <ResumeView />
                </ProtectedRoute>
              )}
              {activeTab === "portfolio" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <PortfolioView />
                </ProtectedRoute>
              )}
              {activeTab === "tools-directory" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
                  <ToolsDirectoryView />
                </ProtectedRoute>
              )}
              {activeTab.startsWith("free-") && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
                  <FreePlatformsView activeTab={activeTab} setActiveTab={setActiveTab} />
                </ProtectedRoute>
              )}
              {activeTab === "about" && <AboutView onNavigate={(tabId) => setActiveTab(tabId)} user={user} userPoints={userPoints} />}
              {activeTab === "help-center" && <HelpCenterView />}
              {activeTab === "auth" && (
                <div className="flex items-center justify-center min-h-[70vh] py-12 px-4 w-full">
                  <div className="w-full max-w-md">
                    <AuthView onLoginSuccess={handleLoginSuccess} />
                  </div>
                </div>
              )}
              {activeTab === "tcs-nqt" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <TcsNqtView />
                </ProtectedRoute>
              )}
              {activeTab === "founders-prime" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <FoundersPrimeView />
                </ProtectedRoute>
              )}
              {activeTab === "3d-lab" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <ThreeDShowcaseView />
                </ProtectedRoute>
              )}
              {activeTab === "ai-chat" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <ChatView />
                </ProtectedRoute>
              )}
              {activeTab === "remote-dashboard" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
                  <RemoteJobsView />
                </ProtectedRoute>
              )}
            </>
          )}

          {/* EAMCET Hub Views */}
          {activeTab === "eamcet-home" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
              <EAMCETHome 
                onNavigate={(tab) => {
                  if (tab === "plans") setActiveTab("eamcet-plans");
                  else if (tab === "practice") setActiveTab("eamcet-practice");
                  else if (tab === "materials" || tab === "resources") setActiveTab("eamcet-resources");
                  else if (tab === "tips") setActiveTab("eamcet-tips");
                  else if (tab === "counseling") setActiveTab("eamcet-counseling");
                  else if (tab === "profile") setActiveTab("eamcet-profile");
                  else setActiveTab(`eamcet-${tab}`);
                }} 
                onSelectSubject={(sub) => {
                  setSelectedSubject(sub);
                  setActiveTab("eamcet-practice");
                }}
              />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-plans" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
              <EAMCETPlans 
                onNavigate={(tab) => {
                  if (tab === "plans") setActiveTab("eamcet-plans");
                  else if (tab === "practice") setActiveTab("eamcet-practice");
                  else if (tab === "materials" || tab === "resources") setActiveTab("eamcet-resources");
                  else if (tab === "tips") setActiveTab("eamcet-tips");
                  else if (tab === "counseling") setActiveTab("eamcet-counseling");
                  else if (tab === "profile") setActiveTab("eamcet-profile");
                  else setActiveTab(`eamcet-${tab}`);
                }} 
                onSelectSubject={(sub) => {
                  setSelectedSubject(sub);
                  setActiveTab("eamcet-practice");
                }}
              />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-practice" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
              <EAMCETPractice 
                onNavigate={(tab) => {
                  if (tab === "plans") setActiveTab("eamcet-plans");
                  else if (tab === "practice") setActiveTab("eamcet-practice");
                  else if (tab === "materials" || tab === "resources") setActiveTab("eamcet-resources");
                  else if (tab === "tips") setActiveTab("eamcet-tips");
                  else if (tab === "counseling") setActiveTab("eamcet-counseling");
                  else if (tab === "profile") setActiveTab("eamcet-profile");
                  else setActiveTab(`eamcet-${tab}`);
                }} 
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
              />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-resources" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
              <EAMCETResources />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-tips" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
              <EAMCETTips />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-counseling" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={false}>
              <EAMCETCounseling />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-profile" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess} onSignUpRedirect={() => setActiveTab("auth")} onHomeRedirect={() => { setPlatformMode("learn-with-suresh"); setActiveTab("learn-suresh-home"); }} isTabProtectedForGuest={true}>
              <EAMCETProfile />
            </ProtectedRoute>
          )}
        </main>
      </div>

      {/* Floating AI Doubt Tutor (Only in EAMCET Hub) */}
      {platformMode === "eamcet" && <EAMCETAITutor />}

      {/* Dynamic Rich Footer matching AboutView layout and screenshot */}
      <footer className={`w-full border-t transition-colors duration-200 pt-12 pb-8 px-6 sm:px-10 relative z-10 ${
        theme === "light"
          ? "bg-[#f8fafc] border-slate-200 text-slate-800"
          : "bg-[#0a0a14]/90 border-white/5 text-gray-400"
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          {/* Left Side: Brand with dynamic Name & Icon */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 bg-gradient-to-tr ${
                platformMode === "career" ? "from-[#ec4899] to-[#a855f7]" :
                platformMode === "eamcet" ? "from-[#3b82f6] to-[#10b981]" :
                platformMode === "free-edu" ? "from-[#a855f7] to-[#22d3ee]" :
                platformMode === "remote-jobs" ? "from-[#0D9488] to-[#3b82f6]" :
                platformMode === "student-os" ? "from-[#6366f1] to-pink-500" :
                platformMode === "new-age-schools" ? "from-rose-500 to-purple-500" :
                "from-[#a855f7] to-[#f59e0b]"
              } rounded-lg flex items-center justify-center`}>
                {platformMode === "career" && <Video className="w-4 h-4 text-white" />}
                {platformMode === "eamcet" && <BookOpen className="w-4 h-4 text-white" />}
                {platformMode === "free-edu" && <GraduationCap className="w-4 h-4 text-white" />}
                {platformMode === "remote-jobs" && <Briefcase className="w-4 h-4 text-white" />}
                {platformMode === "student-os" && <Sparkles className="w-4 h-4 text-white" />}
                {platformMode === "new-age-schools" && <GraduationCap className="w-4 h-4 text-white" />}
                {platformMode === "learn-with-suresh" && <GraduationCap className="w-4 h-4 text-white" />}
              </div>
              <span className={`text-md font-bold tracking-wider uppercase font-display ${theme === "light" ? "text-slate-950" : "text-white"}`}>
                {platformMode === "career" && <>NEXTROUND <span className="text-pink-400 font-extrabold">PREP</span></>}
                {platformMode === "eamcet" && <>EAMCET <span className="text-emerald-400 font-extrabold">PREP</span></>}
                {platformMode === "free-edu" && <>EDUFREE <span className="text-cyan-400 font-extrabold">HUB</span></>}
                {platformMode === "remote-jobs" && <>REMOTE <span className="text-teal-400 font-extrabold">JOBS</span></>}
                {platformMode === "student-os" && <>STUDENT <span className="text-pink-400 font-extrabold">OS</span></>}
                {platformMode === "new-age-schools" && <>NEW AGE <span className="text-rose-400 font-extrabold">SCHOOLS</span></>}
                {platformMode === "learn-with-suresh" && <>LEARN WITH <span className="text-amber-400 font-extrabold">SURESH</span></>}
              </span>
            </div>
            <p className={`text-[11px] leading-relaxed max-w-xs ${theme === "light" ? "text-slate-600" : "text-gray-400"}`}>
              Empowering Indian students with free education — from Class 1 all the way through college, coding, and career preparation.
            </p>
            
            {/* Social Icons & Newsletter Subscription matching Prompt */}
            <div className="space-y-4 pt-3">
              <div className="flex items-center gap-5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === "light" ? "text-slate-500 hover:text-[#0077b5]" : "text-slate-400 hover:text-[#0077b5]"} transition-all duration-200 transform hover:scale-110 cursor-pointer`}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 stroke-[1.75]" />
                </a>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === "light" ? "text-slate-500 hover:text-[#ff0000]" : "text-slate-400 hover:text-[#ff0000]"} transition-all duration-200 transform hover:scale-110 cursor-pointer`}
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 stroke-[1.75]" />
                </a>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === "light" ? "text-slate-500 hover:text-[#24A1DE]" : "text-slate-400 hover:text-[#24A1DE]"} transition-all duration-200 transform hover:scale-110 cursor-pointer`}
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5 stroke-[1.75]" />
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === "light" ? "text-slate-500 hover:text-[#e1306c]" : "text-slate-400 hover:text-[#e1306c]"} transition-all duration-200 transform hover:scale-110 cursor-pointer`}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 stroke-[1.75]" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme === "light" ? "text-slate-500 hover:text-[#1da1f2]" : "text-slate-400 hover:text-[#1da1f2]"} transition-all duration-200 transform hover:scale-110 cursor-pointer`}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 stroke-[1.75]" />
                </a>
              </div>

              {/* Newsletter Subscription Form */}
              <div className="space-y-2 pt-2">
                <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${theme === "light" ? "text-pink-600" : "text-pink-400"}`}>
                  {t("newsletterTitle")}
                </p>
                {isSubscribed ? (
                  <div className={`text-xs font-medium rounded-xl py-2 px-3 animate-fade-in ${
                    theme === "light"
                      ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                      : "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                  }`}>
                    {t("newsletterSuccess")}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!subscriberEmail || !subscriberEmail.includes("@")) {
                        setSubscriptionError(t("newsletterError"));
                        return;
                      }
                      setSubscriptionError("");
                      setIsSubscribed(true);
                      setIsSuccessModalOpen(true);
                      localStorage.setItem("nextroundprep_isSubscribed", "true");
                    }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={subscriberEmail}
                        onChange={(e) => {
                          setSubscriberEmail(e.target.value);
                          if (subscriptionError) setSubscriptionError("");
                        }}
                        placeholder={t("newsletterPlaceholder")}
                        className={`border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-pink-500 w-full transition-all ${
                          theme === "light"
                            ? "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                            : "bg-[#0e0e1a]/90 border-white/10 text-white placeholder-gray-500"
                        }`}
                        required
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                      >
                        {t("newsletterSubscribe")}
                      </button>
                    </div>
                    {subscriptionError && (
                      <p className={`text-[10px] font-mono ${theme === "light" ? "text-rose-600" : "text-rose-400"}`}>
                        {subscriptionError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Career Hub Category */}
          <div className="md:col-span-2 space-y-3">
            <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${theme === "light" ? "text-pink-600" : "text-pink-400"}`}>Career Hub</p>
            <ul className={`space-y-1.5 text-xs font-sans ${theme === "light" ? "text-slate-600" : "text-gray-400"}`}>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Interview Preparation"
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("interview");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("career");
                    setActiveTab("interview");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-pink-500/50" />
                Interview Prep
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Skill Roadmaps"
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("roadmap");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("career");
                    setActiveTab("roadmap");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-pink-500/50" />
                Skill Roadmaps
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Developer Roadmaps"
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("developer-roadmaps");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("career");
                    setActiveTab("developer-roadmaps");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-pink-500/50" />
                Developer Roadmaps
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Job Preparation Guide"
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("job-prep");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("career");
                    setActiveTab("job-prep");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-pink-500/50" />
                Job Prep
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-pink-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Resume Builder"
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("resume");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("career");
                    setActiveTab("resume");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-pink-500/50" />
                Resume Builder
              </li>
            </ul>
          </div>

          {/* EAMCET Hub Category */}
          <div className="md:col-span-2 space-y-3">
            <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`}>EAMCET Hub</p>
            <ul className={`space-y-1.5 text-xs font-sans ${theme === "light" ? "text-slate-600" : "text-gray-400"}`}>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to EAMCET Study Plans"
                onClick={() => {
                  setPlatformMode("eamcet");
                  setActiveTab("eamcet-plans");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("eamcet");
                    setActiveTab("eamcet-plans");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                Study Plans
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to EAMCET Practice MCQs"
                onClick={() => {
                  setPlatformMode("eamcet");
                  setActiveTab("eamcet-practice");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("eamcet");
                    setActiveTab("eamcet-practice");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                Practice MCQs
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to EAMCET Materials & PYQs"
                onClick={() => {
                  setPlatformMode("eamcet");
                  setActiveTab("eamcet-resources");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("eamcet");
                    setActiveTab("eamcet-resources");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                Materials & PYQs
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to EAMCET Expert Tips"
                onClick={() => {
                  setPlatformMode("eamcet");
                  setActiveTab("eamcet-tips");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("eamcet");
                    setActiveTab("eamcet-tips");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                Expert Tips
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to EAMCET Counseling Hub"
                onClick={() => {
                  setPlatformMode("eamcet");
                  setActiveTab("eamcet-counseling");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("eamcet");
                    setActiveTab("eamcet-counseling");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                Counseling Hub
              </li>
            </ul>
          </div>

          {/* Other Initiatives Category */}
          <div className="md:col-span-2 space-y-3">
            <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${theme === "light" ? "text-cyan-600" : "text-cyan-400"}`}>Initiatives & Platforms</p>
            <ul className={`space-y-1.5 text-xs font-sans ${theme === "light" ? "text-slate-600" : "text-gray-400"}`}>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Free Education Hub"
                onClick={() => {
                  setPlatformMode("free-edu");
                  setActiveTab("free-platforms");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("free-edu");
                    setActiveTab("free-platforms");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
                Free Education Hub
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Remote Jobs Board"
                onClick={() => {
                  setPlatformMode("remote-jobs");
                  setActiveTab("remote-dashboard");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("remote-jobs");
                    setActiveTab("remote-dashboard");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-teal-500/50" />
                Remote Jobs Board
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to StudentOS Platform"
                onClick={() => {
                  setPlatformMode("student-os");
                  setActiveTab("student-os");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("student-os");
                    setActiveTab("student-os");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                StudentOS Platform
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-rose-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to New Age Schools Directory"
                onClick={() => {
                  setPlatformMode("new-age-schools");
                  setActiveTab("new-age-schools");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("new-age-schools");
                    setActiveTab("new-age-schools");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-rose-500/50" />
                New Age Schools
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Learn with Suresh"
                onClick={() => {
                  setPlatformMode("learn-with-suresh");
                  setActiveTab("learn-suresh-home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlatformMode("learn-with-suresh");
                    setActiveTab("learn-suresh-home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                Learn with Suresh
              </li>
            </ul>
          </div>

          {/* Legal Category */}
          <div className="md:col-span-1 space-y-3">
            <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${theme === "light" ? "text-purple-600" : "text-purple-400"}`}>Legal</p>
            <ul className={`space-y-1.5 text-xs font-sans ${theme === "light" ? "text-slate-600" : "text-gray-400"}`}>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="View Terms of Service"
                onClick={() => {
                  setLegalSection("terms");
                  setIsLegalOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLegalSection("terms");
                    setIsLegalOpen(true);
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                Terms of Service
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="View Privacy Policy"
                onClick={() => {
                  setLegalSection("privacy");
                  setIsLegalOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLegalSection("privacy");
                    setIsLegalOpen(true);
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                Privacy Policy
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="View Accessibility Statement"
                onClick={() => {
                  setLegalSection("accessibility");
                  setIsLegalOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLegalSection("accessibility");
                    setIsLegalOpen(true);
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                Accessibility
              </li>
              <li 
                className={`hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 rounded px-1 -mx-1 ${theme === "light" ? "hover:text-slate-900" : "hover:text-white"}`}
                tabIndex={0}
                role="link"
                aria-label="Navigate to Help Center"
                onClick={() => {
                  setActiveTab("help-center");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveTab("help-center");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                Help Center
              </li>
            </ul>
          </div>

          {/* Right: Disclaimer */}
          <div className="md:col-span-2 space-y-3">
            <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${theme === "light" ? "text-amber-600" : "text-amber-400"}`}>Disclaimer</p>
            <p className={`text-[10px] leading-relaxed ${theme === "light" ? "text-slate-500" : "text-gray-400"}`}>
              We do not own any of the linked platforms. All resources are publicly available and credited to their respective owners. NextRoundPrep is an independent discovery hub.
            </p>
          </div>
        </div>

        {/* Extreme Bottom Line */}
        <div className={`border-t mt-10 pt-6 text-center text-[9px] font-mono tracking-widest uppercase flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto ${
          theme === "light"
            ? "border-slate-200 text-slate-500"
            : "border-white/5 text-gray-500"
        }`}>
          <div className="flex flex-wrap gap-4 items-center uppercase tracking-wider justify-center sm:justify-start">
            <span>Session ID: ZU-9821</span>
            <span>Status: Ready</span>
            <span>Voice: Enabled</span>
            <div className={`h-2.5 w-[1px] hidden sm:block ${theme === "light" ? "bg-slate-300" : "bg-white/10"}`} />
            <div className="flex items-center gap-1.5">
              <label 
                htmlFor="language-select-dropdown" 
                className={theme === "light" ? "text-slate-500 font-semibold cursor-pointer" : "text-gray-500 font-semibold cursor-pointer"}
              >
                Language:
              </label>
              <select
                id="language-select-dropdown"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                aria-label="Select system language"
                className={`text-[9px] font-mono tracking-wider font-bold bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-pink-500 rounded px-1 cursor-pointer uppercase ${
                  theme === "light"
                    ? "text-slate-700 hover:text-slate-950"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <option value="en" className={theme === "light" ? "bg-white text-slate-900" : "bg-[#0f0e17] text-white"}>English</option>
                <option value="hi" className={theme === "light" ? "bg-white text-slate-900" : "bg-[#0f0e17] text-white"}>हिन्दी</option>
                <option value="te" className={theme === "light" ? "bg-white text-slate-900" : "bg-[#0f0e17] text-white"}>తెలుగు</option>
              </select>
            </div>
          </div>
          <div>
            NEXTROUNDPREP · CRAFTED WITH <span className="text-rose-500 font-bold">❤️</span> FOR LEARNERS ACROSS INDIA.
          </div>
        </div>
      </footer>
    </div>
  );
}
