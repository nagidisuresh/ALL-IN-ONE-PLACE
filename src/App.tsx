import React, { useState, useEffect } from "react";
import { Video, BookOpen, GraduationCap, Briefcase, Sparkles, Linkedin, Youtube, Send, Instagram, Twitter } from "lucide-react";
import Navbar from "./components/Navbar";
import AuthView from "./components/AuthView";
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

// Protected Route Component to require user authentication
interface ProtectedRouteProps {
  user: { email: string; name: string } | null;
  onLoginSuccess: (userData: { email: string; name: string }) => void;
  children: React.ReactNode;
}

function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm font-mono">Redirecting to authorization...</p>
      </div>
    );
  }
  return <>{children}</>;
}

export default function App() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("about");
  const [intendedTab, setIntendedTab] = useState<string>("interview");
  const [platformMode, setPlatformMode] = useState<"career" | "eamcet" | "free-edu" | "remote-jobs" | "student-os" | "new-age-schools" | "learn-with-suresh">("career");
  const [selectedSubject, setSelectedSubject] = useState<"Mathematics" | "Physics" | "Chemistry" | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Redirect to AuthView if user is not authenticated and attempts to access protected tabs
  useEffect(() => {
    if (!user && activeTab !== "about" && activeTab !== "auth") {
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

  // Load user from secure session or localStorage on mount
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("nextroundprep_token");
      if (token) {
        try {
          const response = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem("nextroundprep_user", JSON.stringify(data.user));
            return;
          }
        } catch (error) {
          console.error("Session verification failed:", error);
        }
      }

      // Fallback to local storage cache if offline or no token verification endpoint responded
      const savedUser = localStorage.getItem("nextroundprep_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    verifySession();
  }, []);

  const handleLoginSuccess = (userData: { email: string; name: string }) => {
    setUser(userData);
    localStorage.setItem("nextroundprep_user", JSON.stringify(userData));
    
    if (activeTab === "about" || activeTab === "auth") {
      // Redirect back to the intended tab that they were prevented from accessing
      if (intendedTab && intendedTab !== "auth" && intendedTab !== "about") {
        if (intendedTab.startsWith("eamcet-")) {
          setPlatformMode("eamcet");
        } else if (intendedTab.startsWith("free-")) {
          setPlatformMode("free-edu");
        } else if (intendedTab.startsWith("learn-suresh-")) {
          setPlatformMode("learn-with-suresh");
        } else {
          setPlatformMode("career");
        }
        setActiveTab(intendedTab);
      } else {
        setPlatformMode("career");
        setActiveTab("interview");
      }
    }
  };

  const handleLogout = () => {
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
        />

        {/* Profile Dashboard Modal */}
        {user && (
          <ProfileDashboardModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            user={user}
            onUserUpdate={(updated) => {
              setUser(updated);
              localStorage.setItem("nextroundprep_user", JSON.stringify(updated));
            }}
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

         {/* Main Container */}
        <main className={`relative z-10 ${user ? "pt-28" : "pt-24"}`}>
          {platformMode === "student-os" ? (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <StudentOSView />
            </ProtectedRoute>
          ) : platformMode === "new-age-schools" ? (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <NewAgeSchoolsView />
            </ProtectedRoute>
          ) : platformMode === "learn-with-suresh" ? (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <LearnWithSureshView activeSubTab={activeTab} setActiveSubTab={setActiveTab} />
            </ProtectedRoute>
          ) : (
            <>
              {/* Career & Interview Hub Views */}
              {activeTab === "interview" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <InterviewView />
                </ProtectedRoute>
              )}
              {activeTab === "learn-with-suresh" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <LearnWithSureshView activeSubTab={activeTab} setActiveSubTab={setActiveTab} />
                </ProtectedRoute>
              )}
              {activeTab === "roadmap" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <RoadmapView />
                </ProtectedRoute>
              )}
              {activeTab === "developer-roadmaps" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <DeveloperRoadmapsView />
                </ProtectedRoute>
              )}
              {activeTab === "job-prep" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <JobPrepView />
                </ProtectedRoute>
              )}
              {activeTab === "resume" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <ResumeView />
                </ProtectedRoute>
              )}
              {activeTab === "portfolio" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <PortfolioView />
                </ProtectedRoute>
              )}
              {activeTab === "tools-directory" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <ToolsDirectoryView />
                </ProtectedRoute>
              )}
              {activeTab.startsWith("free-") && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <FreePlatformsView activeTab={activeTab} setActiveTab={setActiveTab} />
                </ProtectedRoute>
              )}
              {activeTab === "about" && <AboutView onNavigate={(tabId) => setActiveTab(tabId)} />}
              {activeTab === "auth" && (
                <div className="flex items-center justify-center min-h-[70vh] py-12 px-4 w-full">
                  <div className="w-full max-w-md">
                    <AuthView onLoginSuccess={handleLoginSuccess} />
                  </div>
                </div>
              )}
              {activeTab === "tcs-nqt" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <TcsNqtView />
                </ProtectedRoute>
              )}
              {activeTab === "founders-prime" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <FoundersPrimeView />
                </ProtectedRoute>
              )}
              {activeTab === "3d-lab" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <ThreeDShowcaseView />
                </ProtectedRoute>
              )}
              {activeTab === "ai-chat" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <ChatView />
                </ProtectedRoute>
              )}
              {activeTab === "remote-dashboard" && (
                <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
                  <RemoteJobsView />
                </ProtectedRoute>
              )}
            </>
          )}

          {/* EAMCET Hub Views */}
          {activeTab === "eamcet-home" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
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
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
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
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
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
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <EAMCETResources />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-tips" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <EAMCETTips />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-counseling" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <EAMCETCounseling />
            </ProtectedRoute>
          )}
          {activeTab === "eamcet-profile" && (
            <ProtectedRoute user={user} onLoginSuccess={handleLoginSuccess}>
              <EAMCETProfile />
            </ProtectedRoute>
          )}
        </main>
      </div>

      {/* Floating AI Doubt Tutor (Only in EAMCET Hub) */}
      {platformMode === "eamcet" && <EAMCETAITutor />}

      {/* Dynamic Rich Footer matching AboutView layout and screenshot */}
      <footer className="w-full border-t border-white/5 bg-[#0a0a14]/90 backdrop-blur-md pt-12 pb-8 px-6 sm:px-10 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          {/* Left Side: Brand with dynamic Name & Icon */}
          <div className="md:col-span-5 space-y-4">
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
              <span className="text-md font-bold tracking-wider text-white uppercase font-display">
                {platformMode === "career" && <>NEXTROUND <span className="text-pink-400 font-extrabold">PREP</span></>}
                {platformMode === "eamcet" && <>EAMCET <span className="text-emerald-400 font-extrabold">PREP</span></>}
                {platformMode === "free-edu" && <>EDUFREE <span className="text-cyan-400 font-extrabold">HUB</span></>}
                {platformMode === "remote-jobs" && <>REMOTE <span className="text-teal-400 font-extrabold">JOBS</span></>}
                {platformMode === "student-os" && <>STUDENT <span className="text-pink-400 font-extrabold">OS</span></>}
                {platformMode === "new-age-schools" && <>NEW AGE <span className="text-rose-400 font-extrabold">SCHOOLS</span></>}
                {platformMode === "learn-with-suresh" && <>LEARN WITH <span className="text-amber-400 font-extrabold">SURESH</span></>}
              </span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed max-w-xs">
              Empowering Indian students with free education — from Class 1 all the way through college, coding, and career preparation.
            </p>
            
            {/* Social Icons matching Screenshot */}
            <div className="flex items-center gap-5 pt-3 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0077b5] transition-all duration-200 transform hover:scale-110 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 stroke-[1.75]" />
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#ff0000] transition-all duration-200 transform hover:scale-110 cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 stroke-[1.75]" />
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#24A1DE] transition-all duration-200 transform hover:scale-110 cursor-pointer"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5 stroke-[1.75]" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#e1306c] transition-all duration-200 transform hover:scale-110 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 stroke-[1.75]" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#1da1f2] transition-all duration-200 transform hover:scale-110 cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 stroke-[1.75]" />
              </a>
            </div>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Quick Links</p>
            <ul className="space-y-1.5 text-xs text-gray-400 font-sans">
              <li 
                className="hover:text-white transition-colors cursor-pointer" 
                onClick={() => {
                  setPlatformMode("learn-with-suresh");
                  setActiveTab("learn-suresh-learn");
                }}
              >
                School
              </li>
              <li 
                className="hover:text-white transition-colors cursor-pointer" 
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("roadmap");
                }}
              >
                Higher Ed
              </li>
              <li 
                className="hover:text-white transition-colors cursor-pointer" 
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("job-prep");
                }}
              >
                Coding
              </li>
              <li 
                className="hover:text-white transition-colors cursor-pointer" 
                onClick={() => {
                  setPlatformMode("career");
                  setActiveTab("interview");
                }}
              >
                Career
              </li>
            </ul>
          </div>

          {/* Right: Disclaimer */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Disclaimer</p>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              We do not own any of the linked platforms. All resources are publicly available and credited to their respective owners. NextRoundPrep is an independent discovery hub.
            </p>
          </div>
        </div>

        {/* Extreme Bottom Line */}
        <div className="border-t border-white/5 mt-10 pt-6 text-center text-[9px] font-mono tracking-widest text-gray-500 uppercase flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 uppercase tracking-wider justify-center sm:justify-start">
            <span>Session ID: ZU-9821</span>
            <span>Status: Ready</span>
            <span>Voice: Enabled</span>
          </div>
          <div>
            NEXTROUNDPREP · CRAFTED WITH <span className="text-rose-500 font-bold">❤️</span> FOR LEARNERS ACROSS INDIA.
          </div>
        </div>
      </footer>
    </div>
  );
}
