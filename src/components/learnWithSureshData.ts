export interface Lesson {
  id: string;
  title: string;
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: "Coding" | "School" | "Higher Ed" | "Career Hub";
  tags: string[];
  author: string;
  duration: string;
  lessons: Lesson[];
  quizzes: QuizQuestion[];
  thumbnail: string;
  rating: number;
  studentsCount: number;
}

export interface Platform {
  name: string;
  category: string;
  description: string;
  url: string;
  badge: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
}

export interface Competition {
  title: string;
  organizer: string;
  type: string;
  deadline: string;
  reward: string;
  url: string;
}

export interface FreeSoftware {
  name: string;
  category: string;
  description: string;
  url: string;
}

export interface TcsModule {
  id: number;
  title: string;
  topics: string[];
  tips: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  box: number; // 1 to 5 (Leitner system)
}

export const curatedCourses: Course[] = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development Bootcamp",
    description: "Master React, Node.js, Express, databases, and deployment pipelines. Build real-world high-performance SaaS applications.",
    category: "Coding",
    tags: ["React", "Express", "Node", "PostgreSQL"],
    author: "Suresh Nagidi",
    duration: "12 Weeks",
    rating: 4.9,
    studentsCount: 1420,
    thumbnail: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&auto=format&fit=crop&q=60",
    lessons: [
      {
        id: "fsw-1",
        title: "Introduction to Modern Web Architecture",
        content: "Web development has evolved from static pages to dynamic full-stack experiences. In this lesson, we cover client-server communication, stateless HTTP, RESTful APIs, and why Next.js / Vite is the standard today. You'll learn about DOM manipulation, virtual DOMs, and state synchronization across layers."
      },
      {
        id: "fsw-2",
        title: "Advanced React State & Effects Management",
        content: "Understanding state hooks, context providers, and avoiding critical performance bugs like infinite re-renders. We break down the dependency array rules of useEffect, useMemo, and useCallback to optimize client performance and layout rendering."
      },
      {
        id: "fsw-3",
        title: "Express Middleware & Robust Backend Routing",
        content: "Deep dive into Node.js server architectures, designing RESTful endpoints, validating incoming requests using schemas, handling file uploads, and securely implementing JWT token-based authentication workflows in production Express environments."
      }
    ],
    quizzes: [
      {
        question: "Which hook should be used to memoize a heavy computation so it does not recalculate on every render?",
        options: ["useEffect", "useMemo", "useCallback", "useState"],
        correctIndex: 1,
        explanation: "useMemo is designed specifically to memoize computed values, preventing performance degradation from repeating heavy operations."
      },
      {
        question: "What does the 'middleware' function do in Express.js?",
        options: [
          "It connects the client's router directly to the SQL DB.",
          "It is a function that has access to the request (req) and response (res) objects to intercept and execute logic.",
          "It compiles TypeScript files into ES Modules.",
          "It optimizes responsive CSS layouts on mobile devices."
        ],
        correctIndex: 1,
        explanation: "Express middleware functions intercept request-response cycles, performing authentication checks, parsing JSON bodies, or logging telemetry."
      }
    ]
  },
  {
    id: "dsa-mastery",
    title: "Advanced Data Structures & Algorithms (DSA)",
    description: "Crack top-tier MNC coding rounds. Master arrays, graphs, dynamic programming, and system optimization.",
    category: "Coding",
    tags: ["DSA", "Python", "C++", "Interview Prep"],
    author: "Suresh Nagidi",
    duration: "8 Weeks",
    rating: 4.85,
    studentsCount: 950,
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&auto=format&fit=crop&q=60",
    lessons: [
      {
        id: "dsa-1",
        title: "Understanding Time & Space Complexity",
        content: "Big O notation is the foundational metric of algorithms. We explore logarithmic O(log N), linear O(N), linearithmic O(N log N), and quadratic O(N²) execution boundaries. You'll analyze nested loops, recursion depth, and call stack frames."
      },
      {
        id: "dsa-2",
        title: "Dynamic Programming Foundations",
        content: "Solving complex multi-stage problems by breaking them into overlapping subproblems. Learn the differences between Top-Down Memoization (recursion-based) and Bottom-Up Tabulation (iteration-based). Study classics like Fibonacci, Knapsack, and LCS."
      }
    ],
    quizzes: [
      {
        question: "What is the worst-case time complexity of searching in a binary search tree (BST) with N nodes?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIndex: 2,
        explanation: "In the worst case (a skewed/unbalanced tree resembling a linked list), the search must traverse all N nodes, resulting in O(N) complexity."
      }
    ]
  },
  {
    id: "jee-physics",
    title: "IIT-JEE Classical Mechanics Booster",
    description: "Master Newton's Laws, Rotational Motion, and Torque. Visual, mathematically rigorous lessons with step-by-step doubt-solving templates.",
    category: "School",
    tags: ["Physics", "Mechanics", "JEE Advanced"],
    author: "Suresh Nagidi",
    duration: "6 Weeks",
    rating: 4.95,
    studentsCount: 2100,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=60",
    lessons: [
      {
        id: "mech-1",
        title: "Newton's Laws of Motion & Free Body Diagrams (FBD)",
        content: "To solve complex mechanics problems, first isolate the system. Identify all external forces: normal reaction, gravity, tension, friction. Draw accurate vectors, resolve forces into perpendicular coordinates, and establish F = ma equations."
      },
      {
        id: "mech-2",
        title: "Rotational Dynamics & Moment of Inertia",
        content: "Rotational inertia is the angular counterpart of mass. Discover parallel and perpendicular axis theorems. Establish Torque = I * alpha and analyze rolling without slipping on inclined planes."
      }
    ],
    quizzes: [
      {
        question: "A solid sphere and a hollow sphere of identical mass and radius roll down an inclined plane from rest. Which one reaches the bottom first?",
        options: [
          "The hollow sphere, because its mass is spread outer.",
          "The solid sphere, because its moment of inertia is smaller (2/5 MR² vs 2/3 MR²), consuming less energy in rotational acceleration.",
          "Both reach at the exact same time.",
          "It depends on the angle of inclination of the plane."
        ],
        correctIndex: 1,
        explanation: "The solid sphere has a smaller moment of inertia (0.4 MR²) compared to the hollow sphere (0.67 MR²). Thus, it allocates more gravitational potential energy into linear kinetic energy rather than rotational, sliding down faster."
      }
    ]
  },
  {
    id: "intro-ai",
    title: "Introduction to Artificial Intelligence & ML",
    description: "Get started with Artificial Intelligence, Machine Learning pipelines, regression, neural networks, and prompt engineering.",
    category: "Higher Ed",
    tags: ["AI/ML", "Python", "Deep Learning"],
    author: "Suresh Nagidi",
    duration: "10 Weeks",
    rating: 4.91,
    studentsCount: 1840,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=400&auto=format&fit=crop&q=60",
    lessons: [
      {
        id: "ai-1",
        title: "What is Machine Learning?",
        content: "Machine learning empowers computers to discover patterns in datasets without explicit procedural programming. We cover Supervised Learning (predicting labeled values), Unsupervised Learning (finding clusters), and Reinforcement Learning (optimizing policies through reward loops)."
      }
    ],
    quizzes: [
      {
        question: "What is the primary objective of gradient descent in machine learning?",
        options: [
          "To increase accuracy directly by adding more neural layers.",
          "To minimize the cost/loss function by iteratively adjusting weights and biases in the opposite direction of the gradient.",
          "To clean up missing records and scale features.",
          "To compress training sets so models load faster on local devices."
        ],
        correctIndex: 1,
        explanation: "Gradient descent optimizes the model's parameters by calculating the gradient of the loss function, taking small steps downwards to converge at a local or global minimum."
      }
    ]
  }
];

export const educationalPlatforms: Platform[] = [
  {
    name: "freeCodeCamp",
    category: "Coding & DSA",
    description: "Learn to code for free with interactive interactive lessons, structured projects, and professional verified certifications.",
    url: "https://www.freecodecamp.org",
    badge: "Free Cert"
  },
  {
    name: "Khan Academy",
    category: "School & Math",
    description: "World-class education for anyone, anywhere. Expert-curated lessons in Algebra, Calculus, Physics, Chemistry, and prep tracks.",
    url: "https://www.khanacademy.org",
    badge: "100% Free"
  },
  {
    name: "Coursera",
    category: "Higher Ed & Degrees",
    description: "Collaborates with 200+ leading universities and MNC companies to offer premium online courses, specializations, and professional certificates.",
    url: "https://www.coursera.org",
    badge: "University Deals"
  },
  {
    name: "edX",
    category: "Higher Ed & Degrees",
    description: "Access high-quality university courses from institutions like Harvard, MIT, Berkeley, and Oxford directly from your browser.",
    url: "https://www.edx.org",
    badge: "Academic"
  },
  {
    name: "Google Grow",
    category: "Career Roadmap",
    description: "Flexible online training programs designed to put you on the fast track to jobs in high-growth fields like UX design, IT support, and project management.",
    url: "https://grow.google",
    badge: "Industry Standard"
  },
  {
    name: "Microsoft Learn",
    category: "Coding & DSA",
    description: "Master cloud environments, Azure architectures, AI systems, and security concepts with structured gamified modules.",
    url: "https://learn.microsoft.com",
    badge: "Official Tech"
  },
  {
    name: "AWS Educate",
    category: "Coding & DSA",
    description: "Free self-paced cloud learning content, lab environments, and career badges designed for students starting with cloud services.",
    url: "https://aws.amazon.com/education/awseducate/",
    badge: "Cloud Ready"
  }
];

export const codingProblems: CodingProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.\n\nYou may assume that each input would have *exactly* one solution, and you may not use the *same* element twice.\n\nYou can return the answer in any order.`,
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  return [];
}`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      { input: "[2, 7, 11, 15], 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], 6", expected: "[1, 2]" },
      { input: "[3, 3], 6", expected: "[0, 1]" }
    ]
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "Two Pointers",
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.`,
    starterCode: `function reverseString(s) {
  // Write your code here
  return s;
}`,
    solution: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}`,
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' }
    ]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Medium",
    category: "Stacks",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    starterCode: `function isValid(s) {
  // Write your code here
  return false;
}`,
    solution: `function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
    testCases: [
      { input: '"()"', expected: "true" },
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" }
    ]
  }
];

export const competitionsList: Competition[] = [
  {
    title: "Google Kick Start",
    organizer: "Google",
    type: "Competitive Programming",
    deadline: "Seasonal Rounds",
    reward: "MNC Career Interviews & Global Ranking",
    url: "https://codingcompetitions.withgoogle.com/"
  },
  {
    title: "Smart India Hackathon (SIH)",
    organizer: "Ministry of Education, Govt of India",
    type: "National Level Innovation Hackathon",
    deadline: "Annual Announcement",
    reward: "₹1,00,000+ Cash Prizes per Problem Statement",
    url: "https://www.sih.gov.in"
  },
  {
    title: "CodeChef Monthly Long Challenges",
    organizer: "CodeChef",
    type: "DSA Competitive League",
    deadline: "Monthly Recurring",
    reward: "Star Badges, Cash Vouchers",
    url: "https://www.codechef.com"
  },
  {
    title: "ACM-ICPC",
    organizer: "ICPC Foundation",
    type: "International Collegiate Programming Contest",
    deadline: "Regional Dates Vary",
    reward: "Prestigious Global Finals, World Recognition",
    url: "https://icpc.global"
  }
];

export const freeSoftwareTools: FreeSoftware[] = [
  // Designers & UI/UX
  { name: "Figma (Free Plan)", category: "Designers & UI/UX", description: "The industry-standard collaborative design and prototyping tool.", url: "https://www.figma.com" },
  { name: "Canva Free", category: "Designers & UI/UX", description: "Quick graphic designer platform with massive templates library.", url: "https://www.canva.com" },
  { name: "Inkscape", category: "Designers & UI/UX", description: "Powerful, free open-source vector graphics editor.", url: "https://inkscape.org" },
  { name: "GIMP", category: "Designers & UI/UX", description: "Advanced cross-platform image editor and photoshop alternative.", url: "https://www.gimp.org" },
  
  // Developers & Code
  { name: "VS Code", category: "Developers & Code", description: "Highly customizable and fast code editor with rich extension marketplace.", url: "https://code.visualstudio.com" },
  { name: "GitHub Student Developer Pack", category: "Developers & Code", description: "Get massive free developer deals, API keys, hosting, and domains.", url: "https://education.github.com/pack" },
  { name: "Vercel / Netlify", category: "Developers & Code", description: "High performance zero-config cloud static hosting platforms.", url: "https://vercel.com" },
  { name: "Postman", category: "Developers & Code", description: "Collaborative API client platform for testing, mocking, and monitoring endpoints.", url: "https://www.postman.com" },
  
  // Productivity & Docs
  { name: "Notion", category: "Productivity & Docs", description: "Unified workspace for study notes, task lists, databases, and wikis.", url: "https://www.notion.so" },
  { name: "Obsidian", category: "Productivity & Docs", description: "Local-first markdown note-taker that builds a visual personal knowledge web.", url: "https://obsidian.md" },
  { name: "Google Workspace for Students", category: "Productivity & Docs", description: "Collaborative documents, spreadsheets, slides, and shared cloud space.", url: "https://workspace.google.com" },
  { name: "Trello", category: "Productivity & Docs", description: "Visual Kanban project management boards for student assignments.", url: "https://trello.com" },
  
  // Audio, Video & Utilities
  { name: "OBS Studio", category: "Audio, Video & Utilities", description: "Free open-source screen recording and live-streaming software.", url: "https://obsproject.com" },
  { name: "Audacity", category: "Audio, Video & Utilities", description: "Multi-track audio recorder and waveform editor.", url: "https://www.audacityteam.org" },
  { name: "DaVinci Resolve (Free Version)", category: "Audio, Video & Utilities", description: "Hollywood-grade video editing, color correction, and visual effects.", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
  { name: "Blender", category: "Audio, Video & Utilities", description: "Full-scale 3D computer graphics software, modeling, rigging, rendering.", url: "https://www.blender.org" }
];

export const tcsNqtModules: TcsModule[] = [
  {
    id: 1,
    title: "Numerical Ability: Number Systems & HCF/LCM",
    topics: ["Divisibility Rules", "Surds & Indices", "Decimal Fractions", "HCF & LCM calculation tricks"],
    tips: "TCS heavily tests divisibility rules for numbers like 7, 11, and 13. Memorize shortcut formulas for finding the highest power of a prime in a factorial."
  },
  {
    id: 2,
    title: "Numerical Ability: Arithmetic & Percentages",
    topics: ["Profit & Loss", "Simple & Compound Interest", "Ratios & Proportions", "Averages & Mixtures"],
    tips: "Use successive percentage increase/decrease shortcut: A + B + AB/100 to save crucial seconds during compound interest problems."
  },
  {
    id: 3,
    title: "Numerical Ability: Time, Speed & Work",
    topics: ["Work Equivalence", "Pipes & Cisterns", "Relative Speed", "Trains & Boat Streams"],
    tips: "Remember that time taken is inversely proportional to efficiency. When solving train-crossing-platform questions, sum both lengths."
  },
  {
    id: 4,
    title: "Numerical Ability: Algebra & Geometry",
    topics: ["Quadratic Equations", "Progression (AP/GP)", "Mensuration 2D/3D", "Coordinate Geometry"],
    tips: "Focus on cylinder, cone, and sphere volume changes when melted or reshaped. The AP sum formula is N/2 * (First + Last)."
  },
  {
    id: 5,
    title: "Verbal Ability: Synonyms, Antonyms & Vocab",
    topics: ["Contextual Meanings", "Idioms & Phrases", "Confusing Words", "Academic Vocabulary"],
    tips: "Read the full sentence first to catch tone. Positive context rules out negative options immediately."
  },
  {
    id: 6,
    title: "Verbal Ability: Sentence Completion & Cloze Test",
    topics: ["Prepositions & Conjunctions", "Tense agreement", "Fill in the Blanks", "Theme detection"],
    tips: "Look for conjunction pivot words like 'although', 'nonetheless', and 'despite' which reverse the sentence vector."
  },
  {
    id: 7,
    title: "Verbal Ability: Error Spotting & Corrections",
    topics: ["Subject-Verb Agreement", "Pronoun case rules", "Dangling Modifiers", "Active/Passive voice"],
    tips: "Look out for collective nouns like 'committee', 'team', or 'family'. They usually take singular verbs unless divided."
  },
  {
    id: 8,
    title: "Verbal Ability: Reading Comprehension",
    topics: ["Central Theme identification", "Tone of Author", "Fact-based inferences", "Title suggestions"],
    tips: "Read questions *before* reading the passage. This acts as a search filter in your mind to locate answers instantly."
  },
  {
    id: 9,
    title: "Reasoning Ability: Coding-Decoding & Series",
    topics: ["Letter-number series", "Pattern recognition", "Analogy mapping", "Odd one out"],
    tips: "Quickly draft alphabetical numbers: A=1, B=2 ... Z=26, and backwards on a rough sheet before starting."
  },
  {
    id: 10,
    title: "Reasoning Ability: Blood Relations & Directions",
    topics: ["Family trees", "Direction sense grid", "Coded relations", "Shadow movements"],
    tips: "Draw a clean diagram step-by-step. For shadow questions: Morning shadows point West, Evening shadows point East."
  },
  {
    id: 11,
    title: "Reasoning Ability: Seating Arrangements",
    topics: ["Circular arrangements", "Linear rows", "Double matrix sorting", "North/South alignments"],
    tips: "Start placing elements that have FIXED absolute positions. Leave relative statements for the last phase."
  },
  {
    id: 12,
    title: "Reasoning Ability: Syllogisms & Venn Diagrams",
    topics: ["All/Some logic cases", "Possibility conclusions", "Venn intersection zones", "Statement assumptions"],
    tips: "Draw Euler circles. Remember: 'Some A are B' does not guarantee 'Some A are not B' in pure formal logic."
  },
  {
    id: 13,
    title: "Coding Section: Fundamentals of C / C++ / Python",
    topics: ["Variable Scopes", "Pointers and Memory", "List/Array comprehensions", "Standard Input/Output templates"],
    tips: "Make sure you handle edge cases such as empty strings, negative integers, or out-of-bound arrays to pass hidden test cases."
  },
  {
    id: 14,
    title: "Coding Section: Standard String Algorithms",
    topics: ["Anagram Checkers", "Palindromes", "Substrings search", "Character frequencies"],
    tips: "An array of size 256 can act as an ASCII hash map to count character frequencies with O(N) linear speed."
  },
  {
    id: 15,
    title: "Coding Section: Array Search & Sorting",
    topics: ["Binary Search", "Two Sum variations", "Bubble/Merge sort dry run", "Subarray maximums"],
    tips: "Binary search works ONLY on sorted structures. Sorting first takes O(N log N) but enables O(log N) query time."
  },
  {
    id: 16,
    title: "Coding Section: Math-Based Programming",
    topics: ["Prime Factorization", "Fibonacci optimizations", "GCD (Euclid's algorithm)", "Leap year logic"],
    tips: "Use Euclid's GCD algorithm: gcd(a, b) = b === 0 ? a : gcd(b, a % b). This runs in logarithmic cycles."
  }
];

export const mockFlashcards: Flashcard[] = [
  {
    id: "fc-1",
    question: "What is the time complexity of pushing/popping an item in a balanced stack?",
    answer: "O(1) (Constant Time), because elements are only added/removed from the top node index.",
    category: "DSA & Coding",
    box: 1
  },
  {
    id: "fc-2",
    question: "State Euler's Formula in solid geometry (relationship between faces, vertices, and edges).",
    answer: "F + V - E = 2 (Faces + Vertices - Edges = 2) for any simple convex polyhedron.",
    category: "Math & Physics",
    box: 1
  },
  {
    id: "fc-3",
    question: "What is the difference between a HTTP status code 301 and 302?",
    answer: "301 represents a Permanent Redirect, while 302 represents a Temporary Redirect.",
    category: "Web & Core CS",
    box: 2
  },
  {
    id: "fc-4",
    question: "What chemical bond is formed when electrons are shared equally between two atoms?",
    answer: "A Covalent Bond (specifically nonpolar if the electronegativity difference is less than 0.4).",
    category: "Chemistry & STEM",
    box: 1
  }
];

export const sureshAiStudioPrompt = `# Google AI Studio Build Prompt — "Learn With Suresh"

Paste everything below into Google AI Studio (Build/App mode) as your starting prompt.

---

Build a full-stack web app called "Learn With Suresh" — a 100% free, curated resource hub for Indian students, from Class 1 through career placement. Use React + TypeScript + Tailwind CSS. Support light/dark mode (moon icon toggle in navbar). Support an English language toggle (top-right "English" dropdown) even if only English is implemented for now.

## TECHNICAL STACK
- React + TypeScript + Tailwind CSS
- React Router for multi-page navigation
- Supabase for authentication and database
- shadcn/ui components for UI elements
- i18n for multi-language support (implement English first)
- Three.js for immersive 3D experience

## VISUAL DESIGN SYSTEM
- **Primary Accent**: Orange (#F97316) for CTAs, badges, logo
- **Secondary Accent**: Deep Navy/Indigo (#1E2A5E) for headings, active states, primary buttons
- **Hero Gradient**: Blue-violet → Orange diagonal
- **Cards**: Rounded-xl with soft shadows, generous whitespace
- **Buttons**: Pill-shaped throughout the app
- **Icons**: Outline-style (lucide-react) for navigation, emoji + label for category tags
- **Dark Mode**: Support light/dark mode with moon icon toggle in navbar
- **Responsive**: Fully responsive; sidebar-list + detail-panel pattern collapses to stacked on mobile
- **Theme**: Dark, futuristic theme with purple/neon-blue gradient accents on near-black (slate-900/950) background. Glassy cards with subtle borders, glowing hover states, smooth scroll-reveal animations.

## BRAND & HEADER
- **Logo**: Orange rounded-square graduation-cap icon + wordmark "Learn With Suresh" in dark navy, bold, two-line wrap on smaller screens
- **Sticky top navbar** (white/dark surface, subtle bottom border) with, left to right:
  - Logo
  - Nav links: Home (dropdown), Platforms, Courses, Practice, Competitions, Free Software, Research AI, AI Advisor, Flashcards, Blog
  - "Home" dropdown sub-items: School, Higher Ed, Coding, Career, About (icon + label rows)
  - Right side: Bookmark icon (saved/bookmarked resources), Language dropdown ("English" + globe icon), Dark-mode toggle (moon icon), Sign-out icon, Colored circular avatar badge with user's first initial (e.g., orange/pink circle with "S")

## PAGES & ROUTING
1. Home (/)
2. Platforms (/platforms)
3. Courses (/courses)
4. Practice (/practice)
5. Competitions (/competitions)
6. Free Software (/free-software)
7. Blog (/blog)
8. Categories (/categories)
9. Entrance Exams (/entrance-exams)
10. Career Hub (/career-hub)
11. Jobs (/jobs)
12. Research Assistant (/research)
13. AI Advisor (/ai-advisor)
14. Flashcards (/flashcards)
15. Immersive (/immersive) — 3D learning experience with Three.js
16. Agency (/agency) — about page

## HOME PAGE COMPONENTS
1. **Hero Section** — Full-width gradient background (blue-purple fading to orange, diagonal) with:
   - Pill badge: "✨ 100% Free · Curated for Indian Students"
   - Headline: "Free Quality Education for" (white) / "Every Indian Student" (orange-yellow, bold)
   - Subtext: "From Class 1 to Career — the best free learning platforms, all in one place."
   - Two buttons: "Explore Resources →" (white/solid) and "Start Learning Free" (outlined/ghost)
   - Decorative soft blurred rounded squares/circles floating in background

2. **Stats Strip** — Big bold numbers with labels: "20+" (platforms), "1 Cr+" (students reached), "100%" (free) — three-column centered layout

3. **LEARNHUB Section Card** — Rounded card with light gradient background containing:
   - "LEARNHUB" pill badge
   - Heading: "Your Gateway to Free Learning & Career Growth"
   - Subtext: "Discover free courses, coding practice, hackathons and certifications — curated from 8+ top platforms."
   - Row of pill-shaped nav buttons: Platforms Directory →, Courses →, Coding Practice →, Competitions →, Free Software →, Research AI →, AI Advisor →, Flashcards →, Blog & Tips →, Immersive 3D →
   - "My Bookmarks" button top-right of card

4. **"Hi, I'm Suresh" Personal Intro** — Split layout: photo/video on one side (purple gradient framed image), "LEARN WITH SURESH" pill badge, heading "Hi, I'm Suresh", personal bio/mission blurb

5. **Resource Grid Sections** — Each resource card contains:
   - Platform logo/icon (top-left)
   - Category tag pill (e.g., "GOVT EXAM") top-right + heart/favorite icon
   - Title (bold)
   - One-line description (gray subtext)
   - Row of small icon buttons (X/Twitter, Play/video, chat/comment icons)
   - Full-width dark navy "Visit Site ↗" button
   - Small circular info "i" button

6. **Footer** — Logo + tagline, social icons (LinkedIn, YouTube, Telegram, Instagram, Twitter), "QUICK LINKS" column (School, Higher Ed, Coding, Career), "DISCLAIMER" column

## ENTRANCE EXAM HUB (/entrance-exams)
- **Left Sidebar**: Scrollable vertical list of exam pill-buttons (icon + name + state/scope tag like "AP", "TS", "NAT")
- **Exams**: AP EAPCET, AP POLYCET, APRJC CET, TS EAPCET, TS POLYCET, JEE Main, JEE Advanced, BITSAT, VITEEE, NEET UG, CUET UG, CLAT, NATA
- **Right Detail Panel** for selected exam:
  - Icon + category tag ("STATE EXAM" / "NATIONAL EXAM" / "GOVT EXAM")
  - Exam name as heading, short description, one-line detail sentence
  - "Official Portal ↗" button top-right
  - "🎓 Free Preparation Resources" — 2-column grid of resource cards (name, one-line note, external-link icon)
  - "▶ YouTube Learning Channels" — channel cards

## COMPETITIONS & OPPORTUNITIES (/competitions)
- Heading "Competitions & Opportunities", subtext "Hackathons, case studies, quizzes and internships — sorted by upcoming deadline"
- **Filter groups**: Type (All, Hackathon, Case Study, Quiz, Internship) and Domain (All, Tech, Business, Design, Data Science)
- **Opportunity cards**: Category tag pills, bold title, "By [source]" byline, deadline date (calendar icon), "Apply ↗" link

## AI TOOL ADVISOR (/ai-advisor)
- Heading "AI Tool Advisor" with icon, subtext "Ask anything — get matched to the right tool from 77+ AI services"
- **Chat-style panel**: Centered sparkle icon, prompt "Tell me your goal — I'll recommend the best free or freemium AI tool"
- **Example question chips**:
  - "I need to summarize 50 PDFs for my literature review"
  - "Best free tool to remove background from product photos?"
  - "I want to turn my notes into a quiz"
  - "Recommend a tool to write academic papers with citations"
  - "Best AI to generate a song with lyrics"
  - "How can I transcribe a 1-hour meeting for free?"
- **Bottom**: Text input + "Send" button (calls Gemini API and streams back tool recommendation)
- **Right sidebar**: "Browse catalog" heading, category filter pills, scrollable list of tool cards (name, pricing badge FREEMIUM/FREE, one-line description)

## ROADMAP / COURSES PAGE (Year 1–4)
2x2 responsive grid of year-by-year roadmap cards:
- **Year 1 — Foundation**: LEARN (Programming Basics, Math), TASKS (Solve 50 basic problems, Build 1 project)
- **Year 2 — Skill Building**: LEARN (Data Structures, Algorithms), TASKS (Solve 100 problems, Build 2 projects)
- **Year 3 — Real World Prep**: LEARN (System Design, Databases), TASKS (Build 2-3 full-stack projects, Start applying)
- **Year 4 — Placement Year**: LEARN (Interview Prep, Resume), TASKS (Apply to 20-30 companies, Network)

## ACCOUNT / PROFILE PAGE
- "← Back to dashboard" link and "Sign out" button top-right
- Large circular avatar (colored, initial letter) + display name + email
- "✏ Edit profile" card: Display name input, read-only Email field, "Save changes" button
- "Account information" card: Email, Phone, Member since (date), Last sign-in (date + time)

## FUNCTIONAL REQUIREMENTS
- **Authentication**: Supabase or Firebase auth (sign in/out, profile edit)
- **Bookmarking**: Heart icon toggles saved state, "My Bookmarks" view
- **Search**: Filterable/searchable resource directories (search bar in navbar)
- **AI Integration**: AI Advisor chat calls Gemini API with catalog as context
- **Dark Mode**: Persisted across sessions
- **User Stats**: XP, streak days, study minutes tracking
- **Study Sessions**: Logging with Supabase tables (user_stats, study_sessions, notifications)
- **Real-time Notifications**: With row-level security tied to user_id

---

## 🗂️ COMPLETE RESOURCE CATALOG — 2,000+ FREE WEBSITES

### 📚 SCHOOL LEARNING (Class 1-12)
| Website | Link |
|---------|------|
| Khan Academy | https://www.khanacademy.org |
| CK-12 | https://www.ck12.org |
| DIKSHA | https://diksha.gov.in |
| ePathshala | https://epathshala.nic.in |
| NCERT | https://ncert.nic.in |
| NROER | https://nroer.gov.in |
| PM eVidya | https://pmevidya.education.gov.in |
| Swayam Prabha | https://www.swayamprabha.gov.in |
| Vedantu Free | https://www.vedantu.com |
| BYJU'S Free | https://byjus.com |
| Toppr | https://www.toppr.com |
| Meritnation | https://www.meritnation.com |
| Brainly | https://brainly.in |
| Shala Darpan | https://shaladarpan.nic.in |

### 🎓 HIGHER EDUCATION & OPEN COURSEWARE
| Website | Link |
|---------|------|
| SWAYAM | https://swayam.gov.in |
| NPTEL | https://nptel.ac.in |
| MIT OpenCourseWare | https://ocw.mit.edu |
| Harvard CS50 | https://cs50.harvard.edu |
| Coursera (Free Audit) | https://www.coursera.org |
| edX (Free Audit) | https://www.edx.org |
| OpenLearn | https://www.open.edu/openlearn |
| Saylor Academy | https://www.saylor.org |
| Open Yale Courses | https://oyc.yale.edu |
| Academic Earth | https://academicearth.org |
| FutureLearn | https://www.futurelearn.com |
| Alison | https://alison.com |
| OpenStax | https://openstax.org |
| LibreTexts | https://libretexts.org |
| Open Textbook Library | https://open.umn.edu/opentextbooks |

### 💻 CODING & PROGRAMMING
| Website | Link |
|---------|------|
| freeCodeCamp | https://www.freecodecamp.org |
| The Odin Project | https://www.theodinproject.com |
| GeeksforGeeks | https://www.geeksforgeeks.org |
| LeetCode | https://leetcode.com |
| HackerRank | https://www.hackerrank.com |
| CodeChef | https://www.codechef.com |
| Codeforces | https://codeforces.com |
| AtCoder | https://atcoder.jp |
| TopCoder | https://www.topcoder.com |
| SPOJ | https://www.spoj.com |
| Codingame | https://www.codingame.com |
| Codewars | https://www.codewars.com |
| Codedex | https://www.codedex.io |
| Exercism | https://exercism.org |
| Project Euler | https://projecteuler.net |
| InterviewBit | https://www.interviewbit.com |
| Coding Ninjas Studio | https://www.naukri.com/code360 |
| Codecademy | https://www.codecademy.com |
| SoloLearn | https://www.sololearn.com |
| Scrimba | https://scrimba.com |
| w3schools | https://www.w3schools.com |
| Code.org | https://code.org |
| Microsoft MakeCode | https://www.makecode.com |
| Google Colab | https://colab.research.google.com |
| HackerEarth | https://www.hackerearth.com |
| BinarySearch | https://www.binarysearch.com |
| CodingBat | https://codingbat.com |
| CSES Problem Set | https://cses.fi/problemset |

### 🌐 WEB DEVELOPMENT
| Website | Link |
|---------|------|
| MDN Web Docs | https://developer.mozilla.org |
| W3Schools | https://www.w3schools.com |
| Web.dev | https://web.dev |
| CSS-Tricks | https://css-tricks.com |
| JavaScript.info | https://javascript.info |
| React.dev | https://react.dev |
| Next.js Docs | https://nextjs.org |
| Tailwind CSS | https://tailwindcss.com |
| Vite | https://vitejs.dev |
| Bootstrap | https://getbootstrap.com |
| Material-UI | https://mui.com |
| shadcn/ui | https://ui.shadcn.com |
| Chakra UI | https://chakra-ui.com |
| DaisyUI | https://daisyui.com |
| Refactoring Guru | https://refactoring.guru |
| Roadmap.sh | https://roadmap.sh |
| DevDocs | https://devdocs.io |
| Teach Yourself CS | https://teachyourselfcs.com |
| Nand2Tetris | https://www.nand2tetris.org |
| Missing Semester | https://missing.csail.mit.edu |

### 🤖 ARTIFICIAL INTELLIGENCE
| Website | Link |
|---------|------|
| Google AI Studio | https://aistudio.google.com |
| Gemini | https://gemini.google.com |
| ChatGPT | https://chatgpt.com |
| Claude AI | https://claude.ai |
| Perplexity AI | https://perplexity.ai |
| Grok | https://grok.com |
| Copilot | https://copilot.microsoft.com |
| Poe | https://poe.com |
| Hugging Face | https://huggingface.co |
| DeepSeek | https://www.deepseek.com |
| You.com | https://you.com |
| Phind | https://phind.com |
| Replicate | https://replicate.com |
| Fal.ai | https://fal.ai |
| DeepLearning.AI | https://www.deeplearning.ai |
| OpenAI Academy | https://academy.openai.com |
| Fast.ai | https://www.fast.ai |
| Kaggle Learn | https://www.kaggle.com/learn |
| Microsoft Learn AI | https://learn.microsoft.com |
| IBM SkillsBuild | https://skillsbuild.org |
| NVIDIA Deep Learning | https://www.nvidia.com/en-us/training |

### 🖼️ AI IMAGE GENERATION
| Website | Link |
|---------|------|
| Ideogram | https://ideogram.ai |
| Leonardo AI | https://leonardo.ai |
| Playground | https://playground.com |
| Mage.Space | https://mage.space |
| Craiyon | https://www.craiyon.com |
| ClipDrop | https://clipdrop.co |
| Canva | https://www.canva.com |
| Adobe Express | https://www.adobe.com/express |
| Stability AI | https://stability.ai |
| Bing Image Creator | https://www.bing.com/images/create |

### 🎥 AI VIDEO GENERATION
| Website | Link |
|---------|------|
| RunwayML | https://runwayml.com |
| Pika.art | https://pika.art |
| Haiper | https://haiper.ai |
| Heygen | https://www.heygen.com |
| Synthesia | https://www.synthesia.io |
| InVideo | https://invideo.io |
| CapCut | https://www.capcut.com |
| Luma AI | https://luma.ai |
| Pixverse | https://pixverse.ai |
| Veed.io | https://www.veed.io |

### 🎙️ AI VOICE & AUDIO
| Website | Link |
|---------|------|
| ElevenLabs | https://elevenlabs.io |
| Play.ht | https://play.ht |
| Murf.ai | https://murf.ai |
| FakeYou | https://fakeyou.com |
| TTSMaker | https://ttsmaker.com |
| Coqui.ai | https://coqui.ai |
| Speechify | https://speechify.com |
| Uberduck | https://uberduck.ai |

### 📊 DATA SCIENCE & ANALYTICS
| Website | Link |
|---------|------|
| Kaggle | https://www.kaggle.com |
| Analytics Vidhya | https://www.analyticsvidhya.com |
| DataCamp | https://www.datacamp.com |
| Statology | https://www.statology.org |
| Tableau Learn | https://www.tableau.com/learn |
| Power BI Learn | https://powerbi.microsoft.com |
| NumPy | https://numpy.org |
| Pandas | https://pandas.pydata.org |
| Matplotlib | https://matplotlib.org |
| Scikit-learn | https://scikit-learn.org |
| Machine Learning Mastery | https://www.machinelearningmastery.com |
| StatQuest | https://www.statquest.org |

### 🔒 CYBERSECURITY
| Website | Link |
|---------|------|
| TryHackMe | https://tryhackme.com |
| Hack The Box | https://www.hackthebox.com |
| OverTheWire | https://overthewire.org |
| PortSwigger Web Security | https://portswigger.net/web-security |
| OWASP | https://owasp.org |
| SANS | https://www.sans.org |
| Cybrary | https://www.cybrary.it |
| HackerOne | https://www.hackerone.com |

### 📖 RESEARCH & ACADEMIC
| Website | Link |
|---------|------|
| Google Scholar | https://scholar.google.com |
| OpenAlex | https://openalex.org |
| Semantic Scholar | https://www.semanticscholar.org |
| arXiv | https://arxiv.org |
| CORE | https://core.ac.uk |
| DOAJ | https://doaj.org |
| BASE | https://www.base-search.net |
| PubMed | https://pubmed.ncbi.nlm.nih.gov |
| Zenodo | https://zenodo.org |
| Figshare | https://figshare.com |
| OSF | https://osf.io |
| DBLP | https://dblp.org |
| CrossRef | https://www.crossref.org |
| ResearchGate | https://www.researchgate.net |
| SSRN | https://www.ssrn.com |
| Shodhganga | https://shodhganga.inflibnet.ac.in |

### 📄 RESUME BUILDERS
| Website | Link |
|---------|------|
| Reactive Resume | https://rxresu.me |
| FlowCV | https://flowcv.com |
| Canva Resume | https://www.canva.com/resumes |
| Novoresume | https://novoresume.com |
| Resume.io | https://resume.io |
| Kickresume | https://www.kickresume.com |
| Zety | https://zety.com |
| Enhancv | https://enhancv.com |
| Resume Genius | https://resumegenius.com |

### 💼 JOB PORTALS
| Website | Link |
|---------|------|
| LinkedIn Jobs | https://www.linkedin.com/jobs |
| Indeed | https://in.indeed.com |
| Naukri | https://www.naukri.com |
| Foundit | https://www.foundit.in |
| Apna | https://apna.co |
| Cutshort | https://cutshort.io |
| Wellfound | https://wellfound.com |
| Freshersworld | https://www.freshersworld.com |
| Internshala | https://internshala.com |
| Hirist | https://www.hirist.com |

### 🏛️ GOVERNMENT JOBS
| Website | Link |
|---------|------|
| SSC | https://ssc.gov.in |
| UPSC | https://upsc.gov.in |
| IBPS | https://ibps.in |
| RRB | https://rrbcdg.gov.in |
| NCS | https://ncs.gov.in |
| Employment News | https://employmentnews.gov.in |
| AP PSC | https://psc.ap.gov.in |
| TS PSC | https://www.tspsc.gov.in |
| Indian Army | https://joinindianarmy.nic.in |
| Indian Navy | https://www.joinindiannavy.gov.in |
| Indian Coast Guard | https://www.joinindiancoastguard.cdac.in |

### 🏆 COMPETITIONS & HACKATHONS
| Website | Link |
|---------|------|
| Unstop | https://unstop.com |
| Devpost | https://devpost.com |
| MLH | https://mlh.io |
| Kaggle Competitions | https://www.kaggle.com/competitions |
| HackerEarth Challenges | https://www.hackerearth.com/challenges |
| Codeforces Contests | https://codeforces.com/contests |
| TopCoder Challenges | https://www.topcoder.com/challenges |

### 🎓 SCHOLARSHIPS
| Website | Link |
|---------|------|
| National Scholarship Portal | https://scholarships.gov.in |
| Buddy4Study | https://www.buddy4study.com |
| Vidya Lakshmi | https://www.vidyalakshmi.co.in |
| AICTE | https://www.aicte-india.org |
| Ministry of Education | https://www.education.gov.in |

### 📚 FREE BOOKS & EBOOKS
| Website | Link |
|---------|------|
| Internet Archive | https://archive.org |
| Open Library | https://openlibrary.org |
| Project Gutenberg | https://www.gutenberg.org |
| Bookboon | https://bookboon.com |
| ManyBooks | https://manybooks.net |
| Standard Ebooks | https://standardebooks.org |
| PDF Drive | https://www.pdfdrive.com |

### 🎥 YOUTUBE LEARNING CHANNELS
| Channel | Link |
|---------|------|
| Khan Academy India | https://www.youtube.com/c/KhanAcademyIndia |
| Unacademy | https://www.youtube.com/c/Unacademy |
| Physics Wallah | https://www.youtube.com/c/PhysicsWallah |
| Magnet Brains | https://www.youtube.com/c/MagnetBrainsEducation |
| Study IQ Education | https://www.youtube.com/c/StudyIQEducation |
| Adda247 | https://www.youtube.com/c/Adda247 |
| Edumantra | https://www.youtube.com/c/Edumantra |
| freeCodeCamp | https://www.youtube.com/c/Freecodecamp |
| NPTEL | https://www.youtube.com/c/NPTEL |
| MIT OpenCourseWare | https://www.youtube.com/c/MITOCW |

### 🎨 DESIGN RESOURCES
| Website | Link |
|---------|------|
| Figma | https://www.figma.com |
| Penpot | https://penpot.app |
| Canva | https://www.canva.com |
| Dribbble | https://dribbble.com |
| Behance | https://www.behance.net |
| Uizard | https://uizard.io |
| Icons8 | https://icons8.com |
| Undraw | https://undraw.co |
| Storyset | https://storyset.com |
| Flaticon | https://www.flaticon.com |
| Awwwards | https://www.awwwards.com |

### 🛠️ DEVELOPER TOOLS
| Website | Link |
|---------|------|
| GitHub | https://github.com |
| GitLab | https://gitlab.com |
| Bitbucket | https://bitbucket.org |
| Vercel | https://vercel.com |
| Netlify | https://netlify.com |
| Render | https://render.com |
| Railway | https://railway.app |
| Firebase | https://firebase.google.com |
| Supabase | https://supabase.com |
| Replit | https://replit.com |
| StackBlitz | https://stackblitz.com |
| CodeSandbox | https://codesandbox.io |

### ☁️ CLOUD & DEVOPS
| Website | Link |
|---------|------|
| AWS Training | https://aws.amazon.com/training |
| Microsoft Learn | https://learn.microsoft.com |
| Google Cloud Learn | https://cloud.google.com/learn |
| Cloud Skills Boost | https://cloudskillsboost.google |
| Red Hat | https://www.redhat.com |
| DigitalOcean Community | https://www.digitalocean.com/community |
| Docker | https://www.docker.com |
| Kubernetes | https://kubernetes.io |

### 📈 DIGITAL MARKETING
| Website | Link |
|---------|------|
| Google Digital Garage | https://learndigital.withgoogle.com |
| HubSpot Academy | https://academy.hubspot.com |
| Moz | https://moz.com |
| Ahrefs | https://ahrefs.com |
| Semrush | https://semrush.com |
| Mailchimp | https://mailchimp.com |

### 💰 FINANCE & STOCK MARKET
| Website | Link |
|---------|------|
| Zerodha Varsity | https://zerodha.com/varsity |
| Investopedia | https://www.investopedia.com |
| Moneycontrol | https://www.moneycontrol.com |
| Screener | https://www.screener.in |
| Tickertape | https://www.tickertape.in |

### 🌍 STUDY ABROAD
| Website | Link |
|---------|------|
| IDP | https://www.idp.com |
| EduCanada | https://www.educanada.ca |
| British Council | https://study-uk.britishcouncil.org |
| Study in Australia | https://www.studyinaustralia.gov.au |
| DAAD | https://www.daad.de |
| Education USA | https://educationusa.state.gov |

### 🎯 INTERVIEW PREPARATION
| Website | Link |
|---------|------|
| Pramp | https://www.pramp.com |
| Interviewing.io | https://www.interviewing.io |
| Exponent | https://www.exponent.com |
| GeeksforGeeks Interview | https://www.geeksforgeeks.org/interview-preparation |
| HackerRank Interview | https://www.hackerrank.com/interview |

### 📱 APP DEVELOPMENT
| Website | Link |
|---------|------|
| Android Developers | https://developer.android.com |
| Apple Developer | https://developer.apple.com |
| Flutter | https://flutter.dev |
| React Native | https://reactnative.dev |
| Ionic | https://ionicframework.com |
| Kotlin | https://kotlinlang.org |
| Expo | https://expo.dev |
| Capacitor | https://capacitorjs.com |

### 🎮 GAME DEVELOPMENT
| Website | Link |
|---------|------|
| Unity Learn | https://learn.unity.com |
| Unreal Engine | https://www.unrealengine.com/learn |
| Godot | https://godotengine.org |
| Phaser | https://phaser.io |
| Scratch | https://scratch.mit.edu |

### 🧠 AI STUDY TOOLS
| Website | Link |
|---------|------|
| Google NotebookLM | https://notebooklm.google.com |
| QuillBot | https://quillbot.com |
| ChatPDF | https://www.chatpdf.com |
| Gamma AI | https://gamma.app |
| AskCodi | https://www.askcodi.com |
| Grammarly | https://www.grammarly.com |
| Jenni AI | https://jenni.ai |
| Notion AI | https://www.notion.so |

---

## DATABASE SCHEMA (Supabase)

### Resources Table
\`\`\`sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  target_audience TEXT[],
  is_free BOOLEAN DEFAULT true,
  has_certificate BOOLEAN DEFAULT false,
  languages TEXT[] DEFAULT ARRAY['English'],
  logo_url TEXT,
  rating FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### User Bookmarks Table
\`\`\`sql
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);
\`\`\`

### User Stats Table
\`\`\`sql
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  study_minutes INTEGER DEFAULT 0,
  resources_bookmarked INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Study Sessions Table
\`\`\`sql
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id),
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Notifications Table
\`\`\`sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### ROW LEVEL SECURITY POLICIES
\`\`\`sql
-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Users can view all resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Users can manage their own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own stats" ON user_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own sessions" ON study_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);
\`\`\`

## BUILD INSTRUCTIONS
- Start with: Home page, navbar, and Entrance Exam Hub
- Scaffold remaining pages: Using same card/list patterns
- Implement Authentication: Supabase Auth with sign in/out, profile edit
- Add Bookmarking: Heart icon toggles saved state, "My Bookmarks" view
- Add Search: Filterable/searchable resource directories
- Integrate AI: AI Advisor chat calls Gemini API with catalog as context
- Add Dark Mode: Toggle persisted across sessions
- Implement 3D Scene: Three.js for Immersive page

## DEPLOYMENT
- Frontend: Vercel or Netlify
- Backend: Supabase (auth + database)
- AI API: Google Gemini API

## FINAL GOAL
Create "Learn With Suresh" as the largest free student resource hub in India with:
- 2,000+ curated free resources
- 50+ categories
- AI-powered recommendations
- Student tracking & gamification
- Responsive & accessible
- Dark mode support
- Multi-language ready
`;

export const nextRoundPrepCorePrompt = `You are the core AI engine for "Next Round Prep," an advanced, interactive AI interview preparation coach. Your mission is to help candidates confidently pass their next round of job interviews (technical coding, system design, product management, or behavioral/HR rounds).
Act as an expert, empathetic, yet rigorous interviewer from a top-tier tech company.

## 1. CORE FUNCTIONALITIES TO SIMULATE
Your system must support the following three distinct operation modes depending on what the user asks for:

### Mode A: Interactive Mock Interview (The Core Engine)
- Ask the user for their target role, target company, and the type of interview round (e.g., Senior Software Engineer at Google, System Design Round).
- Conduct the interview one question at a time. Do not output a list of questions all at once.
- Wait for the user's response, ask clarifying questions if their answer is too vague, and push them to optimize their solution (e.g., "What is the time complexity of that approach? Can we do better?").
- Conclude the mock interview after 3-4 turns and provide a detailed diagnostic report.

### Mode B: Resume & Job Description (JD) Gap Analysis
- When a user provides their resume text and a specific job description, analyze them side-by-side.
- Highlight key technical gaps, missing keywords, and experience areas they are likely to be grilled on during the next round.
- Generate a custom set of 5 highly tailored practice questions based purely on those gaps.

### Mode C: Instant Answer Feedback & Deconstruction
- If a user inputs a specific interview question and their drafted answer, evaluate it rigorously.
- Break down their answer using industry frameworks (e.g., the STAR method for behavioral answers: Situation, Task, Action, Result).
- Provide a rewritten, high-impact version of their answer to maximize its appeal to recruiters.

## 2. OUTPUT FORMATTING & TONE
- **Tone**: Professional, encouraging, highly objective, and practical.
- **Structure**: Use clean Markdown formatting, bold headers, and structured bullet points.
- **Feedback Matrix**: Whenever providing evaluation or final mock interview reports, always break it down into:
  - **Strengths**: What they communicated beautifully.
  - **Weaknesses/Gaps**: Technical or behavioral red flags.
  - **Actionable Fixes**: Exactly what to say or change next time to succeed.

## 3. INITIALIZATION BEHAVIOR
- Start the conversation by giving a brief, welcoming greeting as the "Next Round Prep AI Coach." Prompt the user by asking:
  "Welcome to Next Round Prep! To get started on passing your next interview round, please tell me: What is your target role, target company, and what kind of interview round are we prepping for today? (Alternatively, share your resume and a job description for a gap analysis!)"
`;

export const nextRoundPrepBuildPrompt = `# NextRoundPrep — Google AI Studio Build Prompt

Build a full-stack, AI-powered career and exam preparation web platform for Indian students called NextRoundPrep. Use React + TypeScript + Tailwind CSS for the frontend, with a dark glassmorphism visual style (deep navy/black backgrounds, frosted-glass cards, neon-purple/blue accent gradients, soft glow borders). Integrate the Gemini API for all AI features. Use JWT-based authentication for user accounts.

Overall Architecture
Build this as a multi-hub platform with a central dashboard/landing page that links out to seven distinct hub modules. Each hub is its own route/section with its own UI, but they share a common navbar, auth state, and design system.

1. Career Hub
- AI Mock Interview simulator: user selects a role/domain, Gemini generates realistic interview questions one at a time, user answers (text input), Gemini gives structured feedback (strengths, weaknesses, score) after each answer and a final summary report.
- AI Resume Reviewer: user pastes or uploads resume text, Gemini analyzes it and returns section-by-section feedback (formatting, keyword optimization for ATS, impact statements, suggested rewrites).
- AI Career Roadmap Generator: user inputs current education level, interests, and target role; Gemini generates a step-by-step roadmap (skills to learn, certifications, timeline, milestone checklist) rendered as a visual timeline/stepper UI.

2. EAMCET Hub
- Exam prep portal for the EAMCET entrance exam.
- MCQ practice mode: subject/topic selector, timed quiz interface, instant scoring, review-mistakes screen.
- AI doubt-solving chat: student types a question about any EAMCET topic, Gemini responds with a clear step-by-step explanation.
- Progress tracking: store quiz scores over time, show a simple analytics view (accuracy by subject, attempts over time).

3. Free Education Hub
- An aggregator/directory of free educational resources (courses, YouTube channels, PDFs, websites) organized by category/subject.
- Searchable and filterable card grid layout.
- Each resource card shows title, source, category tag, and an external link.

4. Remote Jobs Board
- A job listing board focused on remote roles suitable for students/early-career candidates.
- Filterable by role type, experience level, and category.
- Each listing as a card with title, company, tags, and apply link.
- (Optional AI feature): "Am I a fit?" button that uses Gemini to compare a pasted resume/profile against the job description and gives a fit score + gap analysis.

5. StudentOS
- A personal productivity dashboard for students: task/to-do list, study timer (Pomodoro-style), and a notes section.
- Simple local/account-persisted state (tasks, notes, timer sessions).
- Clean widget-based dashboard layout.

6. New Age Schools
- A directory/showcase section highlighting modern schools or educational institutions.
- Card-based listing with filters (location, board/curriculum type, features).
- Detail view per school with description and key highlights.

7. Learn with Suresh
- A free educational content hub with a distinct dark neon/purple aesthetic (slightly different accent from the main app to feel like a sub-brand).
- Organized lessons/articles/video embeds by subject.
- Simple content browser with category sidebar and content viewer.

Shared / Platform-Level Requirements
- Auth: Sign up / log in with JWT, persisted session, protected routes for hubs that need saved progress (EAMCET Hub progress, StudentOS data, Career Hub history).
- Navbar: Persistent top navigation with links to all seven hubs, user avatar/menu, login/logout.
- Landing/Dashboard page: Hero section explaining the platform, then a grid of seven cards (one per hub) with icon, short description, and "Enter" CTA — this is the main entry point.
- Design system: Dark glassmorphism throughout — semi-transparent card backgrounds with backdrop-blur, subtle border glow, gradient accent buttons, smooth hover/scale transitions, rounded-2xl corners, modern sans-serif typography (e.g. Inter/Poppins-style).
- Responsive: Fully responsive for mobile and desktop.
- Gemini integration: Centralize Gemini API calls in a shared service/hook so all AI features (mock interview, resume review, roadmap, doubt-solving, job-fit analysis) reuse the same client setup, with loading states and error handling on every AI call.
`;

export const nextRoundPrepFirebasePrompt = `# Google AI Studio Prompt — Firebase DB + Auth Setup

I'm building a web app called NextRoundPrep — an AI-powered career and exam prep platform for Indian students, with multiple hub modules (Career Hub, EAMCET Hub, Free Education Hub, Remote Jobs Board, StudentOS, New Age Schools, Learn with Suresh).
Stack: React + TypeScript + Tailwind CSS, dark glassmorphism UI, currently using JWT auth.
I want you to set up Firebase as the backend — Firestore for the database and Firebase Authentication for login. Please generate:

- Firebase project setup
- firebase.ts config file (using environment variables, not hardcoded keys)
- Required npm packages and install commands
- Authentication
  - Email/Password sign up and login
  - Google Sign-In (OAuth)
  - Auth context/hook (useAuth) that exposes user, loading, login, signup, logout
  - Protected route wrapper component for React Router
  - Password reset flow
- Firestore database structure
  - users collection — profile data (name, email, phone, exam preferences, created hub progress)
  - progress collection — per-hub progress tracking (linked to user UID)
  - mockInterviews collection — stored interview sessions and AI feedback
  - Suggested security rules for each collection (users can only read/write their own data)
- Integration code
  - React hooks/functions for CRUD operations (add, get, update, delete) on Firestore documents
  - Real-time listener example using onSnapshot
  - Error handling patterns
- Migration notes
  - Short explanation of how to replace my current JWT auth calls with the new Firebase Auth hooks, so I can swap it into an existing React + TypeScript codebase with minimal breakage
`;

