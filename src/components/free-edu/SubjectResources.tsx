import React, { useState } from "react";
import { BookOpen, ExternalLink, Compass, GraduationCap, Lightbulb, Search, Book } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  description: string;
  keyFeature: string;
  isPopular?: boolean;
}

export default function SubjectResources() {
  const [activeSubject, setActiveSubject] = useState<"math" | "physics" | "chemistry" | "biology" | "cs" | "english">("math");

  const subjects = [
    { id: "math", label: "Mathematics", icon: "📐" },
    { id: "physics", label: "Physics", icon: "⚛️" },
    { id: "chemistry", label: "Chemistry", icon: "🧪" },
    { id: "biology", label: "Biology", icon: "🧬" },
    { id: "cs", label: "Computer Science", icon: "💻" },
    { id: "english", label: "English & Aptitude", icon: "✍️" },
  ];

  const resourceData: Record<string, Resource[]> = {
    math: [
      {
        name: "Khan Academy Math",
        url: "https://www.khanacademy.org",
        description: "Exhaustive, step-by-step masterclasses in Algebra, Geometry, Calculus, Statistics, and Differential Equations.",
        keyFeature: "Personalized path with auto-graded tasks and immediate explanations.",
        isPopular: true
      },
      {
        name: "Paul's Online Math Notes",
        url: "https://tutorial.math.lamar.edu",
        description: "The gold standard for college-level mathematics. Clear, algebraic lecture summaries and fully solved cheat sheets.",
        keyFeature: "In-depth cheat sheets for Calculus I to III and Linear Algebra."
      },
      {
        name: "Wolfram MathWorld",
        url: "https://mathworld.wolfram.com",
        description: "The web's most extensive mathematical encyclopedia, built and maintained by Wolfram Research researchers.",
        keyFeature: "Exhaustive formulas, plotting references, and logical proofs."
      },
      {
        name: "Desmos Classroom Resources",
        url: "https://teacher.desmos.com",
        description: "Interactive browser-based geometry, curves, and equation modules that build math intuition.",
        keyFeature: "Gamified, click-and-drag plotting widgets."
      }
    ],
    physics: [
      {
        name: "Flipping Physics",
        url: "https://www.flippingphysics.com",
        description: "Highly engaging, real-world Physics videos designed to prepare students for core curriculum and college physics.",
        keyFeature: "Animated physics formulas explained with humorous video clips.",
        isPopular: true
      },
      {
        name: "Walter Fendt Physics Applets",
        url: "https://www.walter-fendt.de/html5/phen/",
        description: "HTML5 dynamic applets demonstrating mechanics, electromagnetism, wave oscillations, and nuclear physics.",
        keyFeature: "Adjust physical constants (mass, speed) and watch the animation react."
      },
      {
        name: "PhET Physics simulations",
        url: "https://phet.colorado.edu/en/simulations/filter?subj=Physics",
        description: "Award-winning interactive simulation workspace from University of Colorado Boulder. Explore vectors, lasers, or balloon electricity.",
        keyFeature: "Full sandbox simulation workspace on standard browsers."
      },
      {
        name: "MinutePhysics",
        url: "https://www.youtube.com/@minutephysics",
        description: "Cool hand-drawn whiteboard animations answering deep, mind-bending physics riddles and astrophysical paradigms.",
        keyFeature: "Excellent bite-sized concepts explained in 3-5 minutes."
      }
    ],
    chemistry: [
      {
        name: "ChemGuide UK",
        url: "https://www.chemguide.co.uk",
        description: "Superb, plain-English reference explaining complex organic mechanisms, physical reactions, and atomic patterns.",
        keyFeature: "Simplified diagrams detailing complex chemical equations.",
        isPopular: true
      },
      {
        name: "PubChem Periodical Periodic Table",
        url: "https://pubchem.ncbi.nlm.nih.gov/periodic-table/",
        description: "Interactive and visual periodic table displaying boiling points, isotopes, ionization energies, and discoverers.",
        keyFeature: "Direct integration with global medical research databases."
      },
      {
        name: "Crash Course Chemistry",
        url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr",
        description: "Fast-paced, colorful animations taking you from atomic structures to stoichiometry, equilibrium, and biochemistry.",
        keyFeature: "Fun, highly engaging visual storytelling."
      }
    ],
    biology: [
      {
        name: "HHMI BioInteractive",
        url: "https://www.biointeractive.org",
        description: "Stunning real-world biology labs, microscopic animations, evolutionary trees, and virus modeling software.",
        keyFeature: "Virtual experiments tracking actual laboratory processes.",
        isPopular: true
      },
      {
        name: "BioDigital Virtual Human (Free tier)",
        url: "https://www.biodigital.com",
        description: "An absolute masterpiece. A 3D interactive map of the human body, circulatory pathways, muscular layers, and clinical conditions.",
        keyFeature: "Fully rotational 3D anatomical models."
      },
      {
        name: "Crash Course Biology",
        url: "https://www.youtube.com/@crashcourse",
        description: "Whiteboard journeys covering cellular respiration, photosynthesis, genetics, and global taxonomy systems.",
        keyFeature: "Animated biological cycle blueprints."
      }
    ],
    cs: [
      {
        name: "Harvard CS50",
        url: "https://cs50.harvard.edu/x",
        description: "Arguably the most famous computer science course on earth. Teaches C, Python, SQL, HTML, CSS, and general algorithms.",
        keyFeature: "Legendary presentation, comprehensive problems, and direct cloud sandboxes.",
        isPopular: true
      },
      {
        name: "freeCodeCamp Curriculum",
        url: "https://www.freecodecamp.org",
        description: "A comprehensive developer pipeline. Interactive browser coding in responsive HTML, CSS, React, and Python data structures.",
        keyFeature: "Completely non-profit. Includes certs that look excellent on resumes."
      },
      {
        name: "DevDocs API Catalog",
        url: "https://devdocs.io",
        description: "Combines official references for 100+ technologies (JavaScript, React, Python, C++, Go) in a single fast, searchable hub.",
        keyFeature: "Fully offline capable. Instantly finds any function syntax."
      }
    ],
    english: [
      {
        name: "BBC Learning English",
        url: "https://www.bbc.co.uk/learningenglish",
        description: "The global gold standard for grammar, vocabulary, pronunciation, business english, and interactive quizzes.",
        keyFeature: "High-quality weekly podcasts and downloadable summaries.",
        isPopular: true
      },
      {
        name: "Indiabix Verbal Aptitude",
        url: "https://www.indiabix.com",
        description: "Highly regarded test catalog for placement exams, competitive entrance mocks, grammar correctives, and logical syllogisms.",
        keyFeature: "Massive pool of solved questions with community explanations."
      },
      {
        name: "MyEnglishPages",
        url: "https://www.myenglishpages.com",
        description: "Straightforward textbook-style layouts covering syntax patterns, active/passive conversions, and comprehension worksheets.",
        keyFeature: "Hundreds of free interactive grammar drills."
      }
    ]
  };

  return (
    <div className="w-full space-y-10">
      {/* Subject Selector Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Subject-wise Curated Libraries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Global Subject-wise Directories
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            Skip search noise. Instantly load the worlds' most authoritative, completely free platforms categorized by standard science, coding, and verbal disciplines.
          </p>
        </div>
      </div>

      {/* Dynamic Tabs list (Scrollable) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 border-b border-white/5 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubject(sub.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex-shrink-0 ${
              activeSubject === sub.id
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold shadow-md shadow-purple-500/10"
                : "bg-[#11101c]/45 border border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="text-sm">{sub.icon}</span>
            <span>{sub.label}</span>
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {resourceData[activeSubject].map((res) => (
          <div 
            key={res.name}
            className="glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45 hover:border-white/10 hover:bg-[#151424]/60 p-6 flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono uppercase tracking-wider text-purple-300">
                  {subjects.find(s => s.id === activeSubject)?.label}
                </span>

                {res.isPopular && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    ⭐ Highly Recommended
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {res.name}
              </h3>
              
              <p className="text-gray-400 text-xs mt-2.5 leading-relaxed">
                {res.description}
              </p>

              {/* Intuitive highlight feature */}
              <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/[0.03] flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-gray-400 leading-normal">
                  <span className="font-bold text-gray-300">Key highlight:</span> {res.keyFeature}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                No Sign-Up Needed
              </span>
              
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-all cursor-pointer group-hover:translate-x-0.5 duration-200"
              >
                <span>Access Free Lessons</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
