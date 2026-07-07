import React, { useState } from "react";
import { Laptop, Play, Code, RefreshCw, Layers, CheckCircle2, Terminal, ArrowRight, Star, Heart } from "lucide-react";

interface ProjectIdea {
  title: string;
  difficulty: "Beginner" | "Intermediate";
  description: string;
  tech: string[];
  steps: string[];
}

export default function CodingCareers() {
  const [selectedLanguage, setSelectedLanguage] = useState<"html" | "javascript" | "python">("javascript");
  const [htmlCode, setHtmlCode] = useState(`<div class="p-6 text-center rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 glow-accent animate-rec-pulse">
  <h2 class="text-xl font-extrabold text-white">Hello, World!</h2>
  <p class="text-xs text-cyan-300 mt-2">Welcome to your first web project!</p>
</div>`);
  const [jsCode, setJsCode] = useState(`const name = "EduFree Learner";
console.log("Hello, World!");
console.log(\`Ready to build high-scale apps, \${name}?\`);`);
  const [pythonCode, setPythonCode] = useState(`message = "Hello, World!"
print(message)
print("Python is simple, clean, and incredibly powerful!")`);

  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput(["Initializing runtime...", "Executing code..."]);

    setTimeout(() => {
      if (selectedLanguage === "javascript") {
        setConsoleOutput([
          "Initializing node.js engine...",
          "Hello, World!",
          "Ready to build high-scale apps, EduFree Learner?",
          "Process completed with exit code 0",
        ]);
      } else if (selectedLanguage === "python") {
        setConsoleOutput([
          "Python 3.10.8 active",
          "Hello, World!",
          "Python is simple, clean, and incredibly powerful!",
          "Process completed successfully",
        ]);
      } else {
        setConsoleOutput(["HTML Rendered successfully in output preview!"]);
      }
      setIsRunning(false);
    }, 800);
  };

  // Python libraries dataset
  const [selectedLib, setSelectedLib] = useState("numpy");
  const pythonLibs = {
    numpy: {
      name: "NumPy",
      useCase: "Scientific computing, multi-dimensional array math, linear algebra operations.",
      code: `import numpy as np

# Create a 2D array and compute eigenvalues
matrix = np.array([[4, 2], [1, 3]])
eigenvalues = np.linalg.eigvals(matrix)

print("Matrix:\\n", matrix)
print("Eigenvalues:", eigenvalues)`,
      resource: "https://numpy.org/doc/stable/user/absolute_beginners.html"
    },
    pandas: {
      name: "Pandas",
      useCase: "Data manipulation, file parsing (CSV/JSON), tabular analysis & analytics engines.",
      code: `import pandas as pd

# Load census details and compute avg salaries
data = {"Name": ["Alice", "Bob", "Charlie"], "Salary": [95000, 110000, 75000]}
df = pd.DataFrame(data)

print(df.describe())
print("\\nMean Salary:", df["Salary"].mean())`,
      resource: "https://pandas.pydata.org/docs/getting_started/index.html"
    },
    matplotlib: {
      name: "Matplotlib",
      useCase: "2D plotting and interactive charts. Essential for visual analytics pipelines.",
      code: `import matplotlib.pyplot as plt
import numpy as np

# Generate wave plot data
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y, label="Sine wave", color="cyan")
plt.title("Wave Visualizer")
plt.show()`,
      resource: "https://matplotlib.org/stable/users/getting_started/"
    },
    scikit: {
      name: "Scikit-Learn",
      useCase: "Machine Learning models. Classification, clustering, and regression models in three lines.",
      code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Quick linear model fit
X = np.array([[1], [2], [3]])
y = np.dot(X, [2]) + 3 # y = 2x + 3

model = LinearRegression().fit(X, y)
print("Coefficient (Slope):", model.coef_)
print("Prediction for X=5:", model.predict([[5]]))`,
      resource: "https://scikit-learn.org/stable/getting_started.html"
    },
    fastapi: {
      name: "FastAPI",
      useCase: "Building highly concurrent production-grade REST APIs with auto-generated Swagger UI.",
      code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!", "status": "online"}

# Command: uvicorn main:app --reload`,
      resource: "https://fastapi.tiangolo.com/tutorial/"
    },
    pygame: {
      name: "Pygame",
      useCase: "2D game design. Create sprites, handle physical collisions, and play audio files.",
      code: `import pygame

pygame.init()
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("My First Game")

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False`,
      resource: "https://www.pygame.org/wiki/GettingStarted"
    }
  };

  // Mini Projects list
  const projectIdeas: ProjectIdea[] = [
    {
      title: "Interactive Pomodoro Focus Timer",
      difficulty: "Beginner",
      description: "A gorgeous single-page browser countdown timer with discrete intervals for study sessions (25 min) and deep rest cycles (5 min). Saves total completed study counts in localStorage.",
      tech: ["HTML5", "CSS Grid", "Vanilla JavaScript"],
      steps: [
        "Create standard HTML layouts containing clock displays and control action buttons (Start, Pause, Reset).",
        "Implement a standard javascript setInterval loop to countdown active seconds.",
        "Add trigger sound notifications when timers reach zero, and append a counter to the storage state."
      ]
    },
    {
      title: "Task Organizer Kanban Board",
      difficulty: "Intermediate",
      description: "A clean Trello-like kanban interface allowing students to drag-and-drop study tasks across 'Todo', 'In Progress', and 'Completed' visual columns.",
      tech: ["React.js", "Tailwind CSS", "HTML5 Drag & Drop API"],
      steps: [
        "Initialize columns using react lists in local component state.",
        "Bind HTML5 drag events (onDragStart, onDragOver, onDrop) on items and columns.",
        "Add local persistence layer so checklists remain saved on page refresh."
      ]
    },
    {
      title: "Local Weather API Dashboard",
      difficulty: "Beginner",
      description: "Ask users for a city name, search their geographic coordinates, and query free public weather APIs to display current climate, humidity, and a dynamic 5-day forecast with custom theme icons.",
      tech: ["HTML5", "Tailwind CSS", "Fetch API", "OpenWeatherMap API"],
      steps: [
        "Sign up for a free developer app key from OpenWeatherMap API portal.",
        "Implement a fetch function retrieving city coordinates on search input clicks.",
        "Map JSON response attributes to gorgeous weather cards using tailwind borders and badges."
      ]
    },
    {
      title: "Typing Speed Tester Console",
      difficulty: "Intermediate",
      description: "Provide users with randomized tech quotes. Track their keyboard input speeds, count typos in real-time, and display words-per-minute (WPM) accuracy calculations on completion.",
      tech: ["React.js", "CSS Transitions", "Framer Motion"],
      steps: [
        "Store sample quotes and bind an input value to keyboard onChange handlers.",
        "Start counting time on the first keyboard strike and compute differences when text matches.",
        "Style incorrect letters in bright red and correct characters in glowing cyan."
      ]
    }
  ];

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const nextProject = () => {
    setActiveProjectIdx((activeProjectIdx + 1) % projectIdeas.length);
  };

  return (
    <div className="w-full space-y-12">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-4">
            <Laptop className="w-4 h-4 text-cyan-400" />
            <span>Developer Career Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            IT & Coding Careers Path
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            Discover complete, zero-cost developer learning paths, test real code snippets in our interactive sandbox, and unlock beginner project specifications to beef up your portfolio.
          </p>
        </div>
      </div>

      {/* Grid: Code Playground & Project Spec */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Hello World live playground (7 cols) */}
        <div className="lg:col-span-7 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white tracking-tight">Interactive Code Sandbox</h3>
              </div>
              <div className="flex bg-black/40 border border-white/5 p-0.5 rounded-lg text-[10px] font-semibold">
                {(["javascript", "python", "html"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2 py-1 rounded cursor-pointer uppercase font-mono ${
                      selectedLanguage === lang ? "bg-purple-500/20 text-purple-300" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Explore "Hello, World!" structures, edit the code directly below, and execute it using our virtual browser compiler to witness terminal logs instantly!
            </p>

            {/* Code editor */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60 font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
                <span className="text-gray-500 text-[10px] uppercase">{selectedLanguage === "html" ? "index.html" : selectedLanguage === "python" ? "main.py" : "index.js"}</span>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 hover:bg-emerald-500/35 transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </button>
              </div>

              {selectedLanguage === "javascript" && (
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  className="w-full h-32 p-4 bg-transparent text-gray-300 outline-none resize-none focus:text-white"
                />
              )}

              {selectedLanguage === "python" && (
                <textarea
                  value={pythonCode}
                  onChange={(e) => setPythonCode(e.target.value)}
                  className="w-full h-32 p-4 bg-transparent text-gray-300 outline-none resize-none focus:text-white"
                />
              )}

              {selectedLanguage === "html" && (
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-32 p-4 bg-transparent text-gray-300 outline-none resize-none focus:text-white"
                />
              )}
            </div>

            {/* Sandbox Outputs */}
            <div className="mt-4 space-y-2">
              <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Console output & Visuals:</span>
              
              {selectedLanguage === "html" ? (
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#07070d] border border-white/10 font-mono text-[11px] text-emerald-400 space-y-1 min-h-[100px] max-h-[150px] overflow-y-auto">
                  {consoleOutput.length === 0 ? (
                    <span className="text-gray-600">Console is idle. Click "Run" to process snippet outputs...</span>
                  ) : (
                    consoleOutput.map((log, idx) => (
                      <div key={idx} className={log.startsWith("Init") || log.startsWith("Process") ? "text-purple-400" : ""}>
                        &gt; {log}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Mini Project Specification randomizer (5 cols) */}
        <div className="lg:col-span-5 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">Mini Portfolio Projects</h3>
              </div>
              <button
                onClick={nextProject}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-semibold"
                title="Shuffle project specs"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Next Project</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-extrabold text-white">{projectIdeas[activeProjectIdx].title}</h4>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                    projectIdeas[activeProjectIdx].difficulty === "Beginner" 
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/10 border border-amber-500/20 text-amber-300"
                  }`}>
                    {projectIdeas[activeProjectIdx].difficulty}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed mt-2">
                  {projectIdeas[activeProjectIdx].description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">Tech Stack Needed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {projectIdeas[activeProjectIdx].tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps list */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">How to build this step-by-step:</span>
                <ul className="space-y-1.5">
                  {projectIdeas[activeProjectIdx].steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[10px] text-gray-400 leading-relaxed">
                      <span className="w-3.5 h-3.5 rounded-full bg-purple-500/10 text-purple-300 flex items-center justify-center font-mono text-[9px] font-bold mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Python Libraries Interactive Section */}
      <div className="bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400 animate-pulse" />
              <h3 className="text-base font-bold text-white tracking-tight">Advanced Python Libraries Guide</h3>
            </div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Explore essential libraries for modern AI, data visualization, and micro-servers with production syntaxes and complete direct tutorials.
            </p>
          </div>

          {/* Library Selectors */}
          <div className="flex flex-wrap gap-1 bg-black/40 p-1 border border-white/5 rounded-xl">
            {Object.keys(pythonLibs).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedLib(key)}
                className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg capitalize cursor-pointer transition-all duration-200 ${
                  selectedLib === key ? "bg-purple-500 text-white shadow-md shadow-purple-500/10" : "text-gray-400 hover:text-white"
                }`}
              >
                {pythonLibs[key as keyof typeof pythonLibs].name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Lib Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Text details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/20 text-purple-300 uppercase font-bold tracking-wider">Scientific Package</span>
              <h4 className="text-lg font-bold text-white mt-2">{pythonLibs[selectedLib as keyof typeof pythonLibs].name} Library</h4>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                {pythonLibs[selectedLib as keyof typeof pythonLibs].useCase}
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-[11px] text-gray-300">100% Free Open-Source learning documentation, exercises, and badges.</span>
            </div>

            <a
              href={pythonLibs[selectedLib as keyof typeof pythonLibs].resource}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer group"
            >
              <span>Explore official tutorial manual</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 duration-200" />
            </a>
          </div>

          {/* Code sample preview (7 cols) */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 bg-black/60 font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
              <span className="text-gray-500 text-[10px]">example_snippet.py</span>
              <span className="text-cyan-400 text-[10px] animate-pulse">Python Console Ready</span>
            </div>
            <pre className="p-4 overflow-x-auto text-gray-300 max-h-[220px] scrollbar-thin">
              <code>
                {pythonLibs[selectedLib as keyof typeof pythonLibs].code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
