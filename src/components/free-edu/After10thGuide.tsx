import React, { useState } from "react";
import { GraduationCap, ArrowRight, BookOpen, Sparkles, Trophy, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { text: string; stream: "PCM" | "PCB" | "Commerce" | "Arts" }[];
}

export default function After10thGuide() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    PCM: 0,
    PCB: 0,
    Commerce: 0,
    Arts: 0,
  });
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      text: "What kind of problems do you enjoy solving the most?",
      options: [
        { text: "Mathematical puzzles, logic gates, and coding algorithms", stream: "PCM" },
        { text: "Understanding natural phenomena, human anatomy, and plant cells", stream: "PCB" },
        { text: "Analyzing business trends, stock markets, and managing money", stream: "Commerce" },
        { text: "Creating digital art, writing short stories, or discussing world history", stream: "Arts" },
      ],
    },
    {
      id: 2,
      text: "If you had to read a non-fiction book, which topic would you pick?",
      options: [
        { text: "How Quantum Computing or Rockets are engineered", stream: "PCM" },
        { text: "The secrets of DNA, CRISPR gene-editing, or neuro-biology", stream: "PCB" },
        { text: "How startup giants raise capital and scale globally", stream: "Commerce" },
        { text: "Sociological impacts, psychology, or creative writing styles", stream: "Arts" },
      ],
    },
    {
      id: 3,
      text: "Which project sounds most exciting to you?",
      options: [
        { text: "Building a robotics arm or writing a software application", stream: "PCM" },
        { text: "Doing a chemical analysis of water or dissecting virtual organisms", stream: "PCB" },
        { text: "Launching a mini mock-commerce store and auditing profits", stream: "Commerce" },
        { text: "Designing a graphical poster, writing a script, or directing a short video", stream: "Arts" },
      ],
    },
    {
      id: 4,
      text: "What is your dream working environment?",
      options: [
        { text: "High-tech software company, lab, or engineering firm", stream: "PCM" },
        { text: "Hospitals, medical clinics, research labs, or wildlife centers", stream: "PCB" },
        { text: "Corporate offices, finance institutions, or startup headquarters", stream: "Commerce" },
        { text: "Creative studios, writing spaces, advertising agencies, or NGOs", stream: "Arts" },
      ],
    },
  ];

  const handleAnswer = (stream: "PCM" | "PCB" | "Commerce" | "Arts") => {
    const updatedScores = { ...scores, [stream]: scores[stream] + 1 };
    setScores(updatedScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Find the stream with the highest score
      let highestStream = "PCM";
      let maxScore = -1;
      Object.entries(updatedScores).forEach(([key, value]) => {
        if (value > maxScore) {
          maxScore = value;
          highestStream = key;
        }
      });
      setQuizResult(highestStream);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScores({ PCM: 0, PCB: 0, Commerce: 0, Arts: 0 });
    setQuizResult(null);
  };

  const streamInfo = {
    PCM: {
      title: "Science (PCM - Physics, Chemistry, Math)",
      desc: "For aspiring engineers, computer scientists, architects, and physicists. Focuses heavily on mathematical reasoning, core quantitative logic, and technical building blocks.",
      careers: ["Software Engineer", "Data Scientist", "Robotics Specialist", "Aerospace Engineer", "Architect", "Cryptographer"],
      freeResources: [
        { name: "IIT PAL Lectures", link: "https://www.youtube.com/@iitpal" },
        { name: "Khan Academy AP Physics & Calculus", link: "https://www.khanacademy.org" },
        { name: "National Test Abhyas (JEE Mock Tests)", link: "https://www.nta.ac.in/Abhyas" },
      ],
    },
    PCB: {
      title: "Science (PCB - Physics, Chemistry, Biology)",
      desc: "For aspiring doctors, neuroscientists, biotechnologists, and environmental scientists. Deep-dives into organic life, chemical compositions, and evolutionary patterns.",
      careers: ["Medical Doctor (MBBS)", "Bio-Medical Researcher", "Neuroscientist", "Pharmacologist", "Marine Biologist", "Genetics Specialist"],
      freeResources: [
        { name: "HHMI BioInteractive", link: "https://www.biointeractive.org" },
        { name: "Khan Academy MCAT & AP Biology", link: "https://www.khanacademy.org" },
        { name: "National Test Abhyas (NEET Mock)", link: "https://www.nta.ac.in/Abhyas" },
      ],
    },
    Commerce: {
      title: "Commerce & Finance",
      desc: "For future entrepreneurs, financial analysts, economists, and management professionals. Focuses on asset allocation, bookkeeping, taxation, and market systems.",
      careers: ["Investment Banker", "Chartered Accountant (CA)", "Financial Analyst", "Economist", "Product Manager", "Startup Founder"],
      freeResources: [
        { name: "Corporate Finance Institute Free Courses", link: "https://corporatefinanceinstitute.com" },
        { name: "Edspira Accounting Tutorials", link: "https://www.youtube.com/@Edspira" },
        { name: "Crash Course Economics", link: "https://www.youtube.com/@crashcourse" },
      ],
    },
    Arts: {
      title: "Arts & Humanities",
      desc: "For designers, writers, journalists, lawyers, psychologists, and historians. Emphasizes creative expression, human behavior studies, history, and linguistic perfection.",
      careers: ["UX/UI Designer", "Journalist / Writer", "Corporate Attorney", "Psychotherapist", "Public Policy Advisor", "Creative Director"],
      freeResources: [
        { name: "Open Yale Courses (Humanities)", link: "https://oyc.yale.edu" },
        { name: "Canva Design School", link: "https://designschool.canva.com" },
        { name: "Coursera Free Humanities courses", link: "https://www.coursera.org" },
      ],
    },
  };

  return (
    <div className="w-full space-y-12">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#a855f7]/10 via-[#22d3ee]/5 to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>High School Transition Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            After 10th Class Transition Guide
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            Transitioning from high school to pre-university is the single most crucial step in a student's career. Find the right streams, prepare for board exams, and access top-tier JEE/NEET training completely free.
          </p>
        </div>
      </div>

      {/* Grid of stream selector & board resources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Stream Selection Quiz (5 cols) */}
        <div className="lg:col-span-5 bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#22d3ee]/5 rounded-full filter blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">AI-Guided Stream Advisor</h3>
            </div>

            {!quizStarted && !quizResult ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Confused between Math, Biology, Commerce, or Humanities? Take our 4-question profile assessment. We will analyze your analytical skills and interests to suggest the ideal pre-university path.
                </p>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Based on standardized aptitude markers and modern corporate career demand forecasts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuizStarted(true)}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
                >
                  <span>Start Stream Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : quizStarted && !quizResult ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-cyan-400">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed pt-2">
                  {questions[currentQuestion].text}
                </p>
                <div className="space-y-2">
                  {questions[currentQuestion].options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAnswer(opt.stream)}
                      className="w-full text-left p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-cyan-500/30 text-xs text-gray-300 hover:text-white transition-all duration-150 cursor-pointer flex items-center gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gray-400 flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-tr from-[#a855f7]/20 to-[#22d3ee]/20 border border-purple-500/30 rounded-2xl p-4 text-center">
                  <Trophy className="w-10 h-10 text-purple-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-semibold">Assessment Match</p>
                  <h4 className="text-lg font-bold text-white mt-1">
                    {quizResult ? streamInfo[quizResult as keyof typeof streamInfo].title : ""}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed text-center">
                  {quizResult ? streamInfo[quizResult as keyof typeof streamInfo].desc : ""}
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">Suggested Careers:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {quizResult && streamInfo[quizResult as keyof typeof streamInfo].careers.map((career) => (
                      <span key={career} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-300">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-2">
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                  {quizResult && (
                    <a
                      href={streamInfo[quizResult as keyof typeof streamInfo].freeResources[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="flex-1 py-2 px-4 rounded-xl text-xs font-bold text-center text-black bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Explore Lessons</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Curated High-Quality Free Hubs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#11101c]/45 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white tracking-tight">NCERT, Board Exams & Open Syllabus</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Access official secondary school books, solved guides, test series, and comprehensive video lessons mapped to government open education plans.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://ncert.nic.in" 
                target="_blank" 
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-purple-500/30 transition-all duration-200 group flex items-start justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">NCERT Official Bookshelf</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Complete digital PDFs of textbooks from class 1 to 12. Free to download.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </a>

              <a 
                href="https://epathshala.nic.in" 
                target="_blank" 
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-purple-500/30 transition-all duration-200 group flex items-start justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">ePathshala Portal</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Government resource with textbooks, audio guides, video lectures, and interactive items.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </a>

              <a 
                href="https://www.diksha.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-purple-500/30 transition-all duration-200 group flex items-start justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">DIKSHA Platform</h4>
                  <p className="text-[10px] text-gray-400 mt-1">National infrastructure for teacher-student training with interactive curriculum material.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </a>

              <a 
                href="https://www.khanacademy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-purple-500/30 transition-all duration-200 group flex items-start justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Khan Academy K-12</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Excellent localized curriculum in mathematics, physics, biology, chemistry and history.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Competitive Exams Section */}
          <div className="bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="text-base font-bold text-white tracking-tight">JEE, NEET & National Mock Exams</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Looking for mock platforms and video classes? Crack competitive examinations without spending on expensive tuition packages using these 100% free portals.
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-amber-500/20 transition-all">
                <div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono font-semibold uppercase">Official NTA Portal</span>
                  <h4 className="text-xs font-bold text-white mt-1">National Test Abhyas (Mock Tests)</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Mobile app and web portal containing thousands of free JEE & NEET mock papers designed by examiners.</p>
                </div>
                <a 
                  href="https://www.nta.ac.in/Abhyas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-semibold text-white transition-all whitespace-nowrap cursor-pointer"
                >
                  Start Tests
                </a>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-amber-500/20 transition-all">
                <div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono font-semibold uppercase">IIT Faculty Lectures</span>
                  <h4 className="text-xs font-bold text-white mt-1">IIT PAL (Professor Assisted Learning)</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">High-quality video resources created by IIT professors to aid high schoolers with Physics, Chemistry, and Math.</p>
                </div>
                <a 
                  href="https://www.youtube.com/@iitpal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-semibold text-white transition-all whitespace-nowrap cursor-pointer"
                >
                  Watch IIT PAL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Streams Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {Object.entries(streamInfo).map(([key, stream]) => (
          <div key={key} className="bg-[#11101c]/40 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-white tracking-tight">{stream.title}</h4>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 uppercase font-bold tracking-wider">{key} Stream</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mt-2.5">
                {stream.desc}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">Free Specialized Prep Resources:</p>
                <div className="grid grid-cols-1 gap-2">
                  {stream.freeResources.map((res, idx) => (
                    <a 
                      key={idx}
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="p-2 rounded bg-black/20 hover:bg-black/40 border border-white/5 hover:border-purple-500/30 text-[10px] text-gray-300 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span className="font-semibold">{res.name}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
