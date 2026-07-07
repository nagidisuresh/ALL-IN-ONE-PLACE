import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  RefreshCw, 
  Award, 
  HelpCircle, 
  Filter,
  Flame,
  ArrowRight
} from "lucide-react";
import { MOCK_QUESTIONS } from "./eamcetMockData";
import { EAMCETQuestion } from "../eamcetTypes";

interface EAMCETPracticeProps {
  onNavigate: (tab: string) => void;
  selectedSubject: "Mathematics" | "Physics" | "Chemistry" | null;
  setSelectedSubject: (subject: "Mathematics" | "Physics" | "Chemistry" | null) => void;
}

export default function EAMCETPractice({ onNavigate, selectedSubject, setSelectedSubject }: EAMCETPracticeProps) {
  const [activeSubject, setActiveSubject] = useState<"Mathematics" | "Physics" | "Chemistry">("Mathematics");
  const [activeTopic, setActiveTopic] = useState<string>("All");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  
  // State for current quiz session
  const [filteredQuestions, setFilteredQuestions] = useState<EAMCETQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [sessionAnswers, setSessionAnswers] = useState<{ questionId: string; selected: number; correct: boolean }[]>([]);

  // Synchronize with external selection (e.g. from Home page subject cards or plans shortcuts)
  useEffect(() => {
    if (selectedSubject) {
      setActiveSubject(selectedSubject);
      setActiveTopic("All");
      // Reset after consuming
      setSelectedSubject(null);
    }
  }, [selectedSubject, setSelectedSubject]);

  // Load and filter questions
  useEffect(() => {
    let list = MOCK_QUESTIONS.filter((q) => q.subject === activeSubject);
    if (activeTopic !== "All") {
      list = list.filter((q) => q.topic === activeTopic);
    }
    if (activeDifficulty !== "All") {
      list = list.filter((q) => q.difficulty === activeDifficulty);
    }
    setFilteredQuestions(list);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setSessionCompleted(false);
    setSessionAnswers([]);
  }, [activeSubject, activeTopic, activeDifficulty]);

  // Get unique topics for the selected subject
  const availableTopics = ["All", ...Array.from(new Set(MOCK_QUESTIONS.filter((q) => q.subject === activeSubject).map((q) => q.topic)))];

  const handleOptionSelect = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optIndex);
    setIsAnswered(true);
    
    const correct = optIndex === filteredQuestions[currentIndex].correctAnswer;
    if (correct) {
      setScore((prev) => prev + 1);
    }

    setSessionAnswers((prev) => [
      ...prev,
      {
        questionId: filteredQuestions[currentIndex].id,
        selected: optIndex,
        correct
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    setSessionCompleted(true);
    
    // Save attempts to local storage practice history
    try {
      const savedHistory = localStorage.getItem("eamcet_practice_history");
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      
      const newAttempt = {
        id: "attempt_" + Date.now(),
        date: new Date().toLocaleDateString(),
        subject: activeSubject,
        totalQuestions: filteredQuestions.length,
        score: score + (selectedOption === filteredQuestions[currentIndex].correctAnswer ? 1 : 0),
        accuracy: Math.round(((score + (selectedOption === filteredQuestions[currentIndex].correctAnswer ? 1 : 0)) / filteredQuestions.length) * 100),
        timestamp: Date.now()
      };

      history.unshift(newAttempt);
      localStorage.setItem("eamcet_practice_history", JSON.stringify(history));

      // Trigger standard window storage event to refresh profile view
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Error saving practice history", e);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setSessionCompleted(false);
    setSessionAnswers([]);
  };

  const currentQuestion = filteredQuestions[currentIndex];
  const progressPercent = filteredQuestions.length > 0 
    ? Math.round(((currentIndex + (isAnswered ? 1 : 0)) / filteredQuestions.length) * 100) 
    : 0;

  return (
    <div id="eamcet-practice-view" className="space-y-8 py-6 px-4 md:px-8 max-w-5xl mx-auto relative z-10 font-sans">
      {/* Subject Selectors & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Interactive MCQ Practice Engine</h1>
          <p className="text-gray-400 text-sm">
            Solve top-tier, exam-mapped questions with immediate feedback, detailed solutions, and progress tracking.
          </p>
        </div>

        {/* Quick subject select */}
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-white/5 w-full md:w-auto">
          {(["Mathematics", "Physics", "Chemistry"] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubject === sub
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Options */}
      {!sessionCompleted && filteredQuestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl text-xs font-mono">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span>FILTER BY:</span>
          </div>

          {/* Topic Select */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Topic:</span>
            <select
              value={activeTopic}
              onChange={(e) => setActiveTopic(e.target.value)}
              className="bg-neutral-900 border border-white/10 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 text-xs"
            >
              {availableTopics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Difficulty:</span>
            <select
              value={activeDifficulty}
              onChange={(e) => setActiveDifficulty(e.target.value)}
              className="bg-neutral-900 border border-white/10 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 text-xs"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Reset Filters Shortcut */}
          {(activeTopic !== "All" || activeDifficulty !== "All") && (
            <button
              onClick={() => {
                setActiveTopic("All");
                setActiveDifficulty("All");
              }}
              className="ml-auto text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Main Practice Container */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-16 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
          <HelpCircle className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No Questions Found</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            We don't have questions matching the selected filter: {activeTopic} ({activeDifficulty}). Try resetting filters.
          </p>
          <button
            onClick={() => {
              setActiveTopic("All");
              setActiveDifficulty("All");
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : sessionCompleted ? (
        /* Quiz Finished View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-b from-indigo-950/20 via-blue-950/10 to-neutral-900/50 border border-indigo-500/10 rounded-3xl p-8 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Practice Session Completed!</h2>
            <p className="text-gray-400 text-xs max-w-md mx-auto">
              Outstanding effort! Your session results have been recorded to your history. Compare your performance below.
            </p>
          </div>

          {/* Scoreboard Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4">
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-1">
              <div className="text-xs font-mono text-gray-400 uppercase">Correct</div>
              <div className="text-2xl font-bold text-emerald-400">{score}/{filteredQuestions.length}</div>
            </div>
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-1">
              <div className="text-xs font-mono text-gray-400 uppercase">Accuracy</div>
              <div className="text-2xl font-bold text-indigo-400">
                {Math.round((score / filteredQuestions.length) * 100)}%
              </div>
            </div>
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-1">
              <div className="text-xs font-mono text-gray-400 uppercase">Subject</div>
              <div className="text-[10px] font-mono font-bold text-purple-400 uppercase mt-1">{activeSubject.slice(0, 4)}</div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Restart Session
            </button>
            <button
              onClick={() => onNavigate("plans")}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              Back to Study Plans <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Quiz Active View */
        <div className="space-y-6">
          {/* Header Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-400">
                QUESTION <span className="text-white font-bold">{currentIndex + 1}</span> OF {filteredQuestions.length}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                <Flame className="w-4 h-4" />
                <span>Score: {score} Correct</span>
              </div>
            </div>

            {/* Micro progress bar */}
            <div className="flex items-center gap-3 w-full sm:w-60">
              <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-gray-500">{progressPercent}%</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                {currentQuestion.topic}
              </span>
              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${
                currentQuestion.difficulty === "Easy" 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : currentQuestion.difficulty === "Medium" 
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                    : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-xl font-bold leading-relaxed text-white">
              {currentQuestion.questionText}
            </h2>

            {/* Option Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;
                
                let btnStyle = "border-white/5 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]";
                let iconBlock = null;

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500/30 bg-emerald-950/20 text-emerald-300 font-medium";
                    iconBlock = <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />;
                  } else if (isSelected) {
                    btnStyle = "border-red-500/30 bg-red-950/20 text-red-300 font-medium";
                    iconBlock = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
                  } else {
                    btnStyle = "border-white/5 bg-neutral-900/40 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left text-sm flex items-center justify-between gap-3 transition-all ${btnStyle} cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isAnswered && isCorrect 
                          ? "bg-emerald-500 text-neutral-900" 
                          : isAnswered && isSelected 
                            ? "bg-red-500 text-neutral-900" 
                            : "bg-white/5 text-gray-400"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-white/90">{option}</span>
                    </div>
                    {iconBlock}
                  </button>
                );
              })}
            </div>

            {/* Animated Explanation Card */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-500/[0.02] border border-indigo-500/20 rounded-2xl p-5 sm:p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs font-mono uppercase">
                  <CheckCircle className="w-4 h-4 text-indigo-400" />
                  <span>Instant Explanation & Steps</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {currentIndex === filteredQuestions.length - 1 ? "Complete Session" : "Next Question"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
