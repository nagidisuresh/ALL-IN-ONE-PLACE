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
