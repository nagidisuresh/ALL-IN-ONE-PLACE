import React, { useState, useEffect } from "react";
import { Bookmark, CheckSquare, Trash2, Play, Pause, RotateCcw, FileText, Plus, Check, Square, Heart, ExternalLink } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function BookmarkDashboard() {
  // Bookmarks state synced with general platforms
  const [bookmarkedNames, setBookmarkedNames] = useState<string[]>([]);
  
  const loadBookmarks = () => {
    const saved = localStorage.getItem("free_learning_bookmarks");
    if (saved) {
      setBookmarkedNames(JSON.parse(saved));
    } else {
      setBookmarkedNames([]);
    }
  };

  useEffect(() => {
    loadBookmarks();
    // Watch for local storage updates (e.g. from the other tab)
    window.addEventListener("storage", loadBookmarks);
    return () => window.removeEventListener("storage", loadBookmarks);
  }, []);

  const removeBookmark = (name: string) => {
    const updated = bookmarkedNames.filter(b => b !== name);
    setBookmarkedNames(updated);
    localStorage.setItem("free_learning_bookmarks", JSON.stringify(updated));
    // Dispatch event so other components reflect change immediately
    window.dispatchEvent(new Event("storage"));
  };

  // Study tasks list state
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("edu_study_tasks");
    return saved ? JSON.parse(saved) : [
      { id: "1", text: "Watch Harvard CS50 lecture 1 (C programming basics)", completed: false },
      { id: "2", text: "Complete trigonometry challenges on Khan Academy", completed: true },
      { id: "3", text: "Draft a HTML/CSS layout in Coding sandbox", completed: false }
    ];
  });
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("edu_study_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Pomodoro Focus Timer State
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerMode, setTimerMode] = useState<"study" | "break">("study");
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            // Timer expired
            if (timerMode === "study") {
              setTimerMode("break");
              setMinutes(5);
              alert("Great study session! Take a 5-minute breather.");
            } else {
              setTimerMode("study");
              setMinutes(25);
              alert("Break's over! Let's resume focus.");
            }
            setIsTimerRunning(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, minutes, seconds, timerMode]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMode("study");
    setMinutes(25);
    setSeconds(0);
  };

  // Scratchpad notepad state
  const [scratchpad, setScratchpad] = useState(() => {
    const saved = localStorage.getItem("edu_scratchpad");
    return saved ? saved : "EduFree Scratchpad\n------------------\nWrite notes, formula guides, or temporary web tags here. This automatically persists in your browser's secure cache so you never lose your progress.";
  });

  const handleScratchpadChange = (val: string) => {
    setScratchpad(val);
    localStorage.setItem("edu_scratchpad", val);
  };

  // List of matching details (to fetch platform metadata if bookmarks exist)
  // We can display a list of bookmarked tools elegantly
  return (
    <div className="w-full space-y-12">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
            <Bookmark className="w-4 h-4 text-purple-400" />
            <span>Personal Workspace Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            My Bookmark Shelf & Study Suite
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            Manage your bookmarks, track your curriculum goals using our study checklists, run pomodoro focus intervals, and log formulas inside your persistent scratchpad.
          </p>
        </div>
      </div>

      {/* Grid: Tasks checklist & Focus timer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Study checklist (7 cols) */}
        <div className="lg:col-span-7 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">Active Curriculum Checklist</h3>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Establish concrete milestones. Type in lessons from CS50 or Khan Academy and complete them step-by-step.
            </p>

            {/* Input bar */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add a custom study task (e.g. Solve 10 Math equations)..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1 glass-input text-xs text-white rounded-xl py-2 px-4 bg-black/20 border border-white/10 outline-none focus:border-purple-500/50"
              />
              <button
                onClick={addTask}
                className="p-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs transition-all flex items-center justify-center cursor-pointer flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tasks render */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin">
              {tasks.length === 0 ? (
                <p className="text-xs text-gray-500 italic text-center py-6">Checklist is empty. Establish a goal above!</p>
              ) : (
                tasks.map((t) => (
                  <div 
                    key={t.id} 
                    className="p-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-3 group hover:border-white/10 transition-all"
                  >
                    <button
                      onClick={() => toggleTask(t.id)}
                      className="flex items-start gap-2.5 text-left text-xs flex-1 cursor-pointer"
                    >
                      {t.completed ? (
                        <span className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="w-4 h-4 rounded border border-white/20 text-transparent flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Square className="w-3 h-3" />
                        </span>
                      )}
                      <span className={`text-xs ${t.completed ? "line-through text-gray-500" : "text-gray-200"}`}>{t.text}</span>
                    </button>
                    
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="p-1 text-gray-500 hover:text-rose-400 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column: Pomodoro Focus Timer (5 cols) */}
        <div className="lg:col-span-5 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Play className="w-4 h-4 text-purple-400 fill-current animate-pulse" />
              <h3 className="text-base font-bold text-white tracking-tight">Pomodoro Study Clock</h3>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Leverage high-intensity concentration blocks. Study for 25 minutes, rest for 5 minutes.
            </p>

            {/* Timer visual */}
            <div className="relative py-8 flex flex-col items-center">
              {/* Glowing back orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="text-4xl font-mono font-bold text-white tracking-widest relative z-10 select-none">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
              
              <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 mt-2 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full relative z-10 border border-cyan-500/20">
                {timerMode === "study" ? "📝 Study Focus" : "☕ Break Rest"}
              </span>
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center pt-2">
              <button
                onClick={toggleTimer}
                className={`py-2 px-6 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTimerRunning 
                    ? "bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/25"
                    : "bg-emerald-500 text-black hover:bg-emerald-400"
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Timer</span>
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className="py-2 px-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked list display & Scratchpad notes (Split row) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Left: Bookmarked platforms (6 cols) */}
        <div className="lg:col-span-6 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white tracking-tight">My Saved Directories</h3>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              These are educational repositories you bookmarked inside the Worldwide Directory catalog. Open them directly from this launcher shelf.
            </p>

            <div className="space-y-3.5 max-h-[220px] overflow-y-auto scrollbar-thin">
              {bookmarkedNames.length === 0 ? (
                <div className="text-center py-8">
                  <Bookmark className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 italic">No bookmarks saved yet.</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Explore Global Directory and click bookmark pins!</p>
                </div>
              ) : (
                bookmarkedNames.map((name) => (
                  <div key={name} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-xs font-bold text-white">{name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeBookmark(name)}
                        className="text-[10px] text-gray-500 hover:text-rose-400 px-2 py-1 rounded hover:bg-rose-500/10 font-semibold transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: persistent scratchpad (6 cols) */}
        <div className="lg:col-span-6 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white tracking-tight">Active Learning Notepad</h3>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Draft mathematical equations, copy-paste terminal arguments, or write notes. Saves automatically.
            </p>

            <textarea
              value={scratchpad}
              onChange={(e) => handleScratchpadChange(e.target.value)}
              className="w-full h-36 p-4 rounded-xl border border-white/10 bg-black/60 font-mono text-[11px] text-gray-300 outline-none resize-none focus:text-white focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
