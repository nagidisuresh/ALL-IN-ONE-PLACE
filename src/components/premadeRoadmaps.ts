import { Roadmap } from "../types";

export const premadeRoadmaps: Record<string, Roadmap> = {
  "Frontend Developer": {
    title: "Modern Frontend Engineer Path",
    goal: "Frontend Developer",
    level: "Beginner",
    timeline: "12 weeks",
    steps: [
      {
        id: "fe-step-1",
        title: "Semantic HTML & Advanced CSS Layouts",
        duration: "Week 1-2",
        description: "Master document structure, accessibility, Flexbox, CSS Grid, and responsive layout foundations.",
        theory: "Ensure accessibility by using correct landmarks (main, nav, article). Flexbox is ideal for 1D distribution, while CSS Grid handles complex 2D layouts. Always use mobile-first media queries to maintain fluid visual balance.",
        quiz: {
          question: "Which HTML element represents an independent, self-contained piece of content that is reusable?",
          options: ["<section>", "<article>", "<div>", "<aside>"],
          correctIndex: 1,
          explanation: "The <article> element is specifically designed for content that stands on its own and is distributable, such as forum posts, news stories, or blog entries."
        },
        resources: [
          { name: "MDN Semantic HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics", type: "Docs" },
          { name: "CSS Tricks Complete Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "Article" }
        ],
        completed: true
      },
      {
        id: "fe-step-2",
        title: "JavaScript ES6+ & Asynchronous State",
        duration: "Week 3-5",
        description: "Understand Promises, async/await, closures, prototypical inheritance, and API consumption.",
        theory: "JavaScript asynchronous execution runs via the Event Loop. Microtasks (like Promise callbacks) have priority over Macrotasks (like setTimeout). Managing state asynchronously is critical for responsive interfaces.",
        quiz: {
          question: "What is the output of checking console.log(typeof null) in JavaScript?",
          options: ["'null'", "'undefined'", "'object'", "'string'"],
          correctIndex: 2,
          explanation: "In JavaScript, typeof null returns 'object'. This is a legacy bug in the language implementation that has been preserved for backward compatibility."
        },
        resources: [
          { name: "You Don't Know JS Yet", url: "https://github.com/getify/You-Dont-Know-JS", type: "Book" },
          { name: "JavaScript.info - Promises", url: "https://javascript.info/promise-basics", type: "Docs" }
        ],
        completed: false
      },
      {
        id: "fe-step-3",
        title: "React Component lifecycle & Rendering Engine",
        duration: "Week 6-8",
        description: "Learn functional components, hooks, custom state management, performance profiling, and memoization.",
        theory: "React uses a Virtual DOM to optimize updates. Reconciliation uses the diffing algorithm (O(n) complexity under assumptions) with unique keys to selectively re-render elements. Avoid updates directly in effect bodies to prevent loops.",
        quiz: {
          question: "Which React hook should you use to memorize a expensive computed value between component re-renders?",
          options: ["useCallback", "useEffect", "useMemo", "useRef"],
          correctIndex: 2,
          explanation: "useMemo caches the result of a calculation, whereas useCallback caches the function definition itself to prevent unnecessary instantiation."
        },
        resources: [
          { name: "New React Dev Documentation", url: "https://react.dev", type: "Docs" },
          { name: "Dan Abramov - Overreacted", url: "https://overreacted.io", type: "Blog" }
        ],
        completed: false
      },
      {
        id: "fe-step-4",
        title: "State Management & Performance Tuning",
        duration: "Week 9-10",
        description: "Scale with tools like Zustand, Redux Toolkit, or React Context, and profile render bottlenecks.",
        theory: "Centralized state prevents prop-drilling. When choosing Zustand or Redux, atomic slice selectors prevent unnecessary re-renders of consumer components. Bundle split with React.lazy and Suspense.",
        quiz: {
          question: "What does atomic state selection in Zustand prevent?",
          options: ["Server-side crashes", "Component re-renders when unrelated state properties change", "TypeScript compilation failures", "API retrieval delays"],
          correctIndex: 1,
          explanation: "By selecting only the specific primitive slice of state required, the component is only subscribed to changes in those specific variables, bypassing updates on other properties."
        },
        resources: [
          { name: "Zustand Core Documentation", url: "https://github.com/pmndrs/zustand", type: "Docs" },
          { name: "Chrome DevTools Profiler", url: "https://developer.chrome.com/docs/devtools/evaluate-performance/", type: "Tool" }
        ],
        completed: false
      },
      {
        id: "fe-step-5",
        title: "Testing, CI/CD, and Production Deployment",
        duration: "Week 11-12",
        description: "Unit testing with Vitest/Jest, integration tests with Playwright, and deployment to CDNs.",
        theory: "A robust testing matrix secures frontend features against regression. Unit tests cover core mathematical helpers or standalone hooks, while Playwright simulates complete user clicks and cross-page routes in headless browsers.",
        quiz: {
          question: "Which tool executes fast browser-based integration tests simulating realistic visual user clicks?",
          options: ["Jest", "Playwright", "Eslint", "Vite"],
          correctIndex: 1,
          explanation: "Playwright is a modern end-to-end framework that runs real chromium, webkit, and firefox sessions to guarantee user-level flows operate safely."
        },
        resources: [
          { name: "Playwright Integration Testing Guide", url: "https://playwright.dev", type: "Docs" },
          { name: "Vercel / Cloud Run CD workflows", url: "https://vercel.com/docs", type: "Guide" }
        ],
        completed: false
      }
    ]
  },
  "Backend Developer": {
    title: "Robust Systems & API Engineer Path",
    goal: "Backend Developer",
    level: "Intermediate",
    timeline: "12 weeks",
    steps: [
      {
        id: "be-step-1",
        title: "Relational Modeling & Advanced SQL Optimization",
        duration: "Week 1-3",
        description: "Database normalization, primary/foreign key relationships, indexing, query execution plans, and transaction safety.",
        theory: "Databases organize schemas into normal forms (1NF, 2NF, 3NF) to reduce redundancy. Indexes speed up SELECT operations but introduce write overhead on INSERT/UPDATE. Execution plans show table scans vs index seeks.",
        quiz: {
          question: "Which database index structure is highly optimized for range queries and sorting operations?",
          options: ["Hash Index", "B-Tree Index", "Inverted Index", "GIST Index"],
          correctIndex: 1,
          explanation: "B-Tree (Balanced Tree) indexes maintain data in a sorted order, making searches, range queries, and ordering extremely quick."
        },
        resources: [
          { name: "Use The Index, Luke!", url: "https://use-the-index-luke.com", type: "Guide" },
          { name: "PostgreSQL Query Explanations", url: "https://www.postgresql.org/docs/current/using-explain.html", type: "Docs" }
        ],
        completed: true
      },
      {
        id: "be-step-2",
        title: "API Design Patterns & High-Throughput REST/gRPC",
        duration: "Week 4-6",
        description: "Design robust, idempotent APIs with proper status codes, rate limiting, and binary protocol serialization.",
        theory: "REST APIs use standard HTTP verbs (GET, POST, PUT, DELETE). gRPC uses Protocol Buffers over HTTP/2 for low-latency, binary RPC communication, optimizing server-to-server internal network transfers.",
        quiz: {
          question: "Which HTTP status code signifies that a request could not be processed due to conflicts, such as parallel edits?",
          options: ["401 Unauthorized", "404 Not Found", "409 Conflict", "422 Unprocessable Entity"],
          correctIndex: 2,
          explanation: "HTTP 409 Conflict indicates that the request conflicts with the current state of the server (e.g., trying to write stale resource versions)."
        },
        resources: [
          { name: "RESTful API Best Practices", url: "https://restfulapi.net", type: "Guide" },
          { name: "gRPC Official Architecture", url: "https://grpc.io/docs/what-is-grpc/introduction/", type: "Docs" }
        ],
        completed: false
      },
      {
        id: "be-step-3",
        title: "Distributed Caching & Message Queues",
        duration: "Week 7-9",
        description: "Deploy Redis caches and message brokers like RabbitMQ or Kafka to decouple async operations.",
        theory: "Caching layers reduce database pressure. Use eviction strategies like LRU. Message brokers decoupling allows workers to consume events at their own pace, securing high system tolerance during flash traffic spikes.",
        quiz: {
          question: "What strategy solves the 'Cache Stampede' problem where multiple clients request missing keys simultaneously?",
          options: ["Increasing memory bounds", "Locking / Single flight grouping requests", "Decreasing TTL to zero", "Switching database engines"],
          correctIndex: 1,
          explanation: "Mutual exclusion locks (single flight) force only one thread to write back the missing cache key from the DB, while subsequent requests wait."
        },
        resources: [
          { name: "Redis Core Architecture", url: "https://redis.io/docs/", type: "Docs" },
          { name: "Kafka Core Concepts Illustrated", url: "https://kafka.apache.org/documentation/", type: "Docs" }
        ],
        completed: false
      },
      {
        id: "be-step-4",
        title: "System Security, Encryption, and Identity",
        duration: "Week 10-12",
        description: "Master OAuth 2.0, JWT signatures, bcrypt password hashing, TLS handshakes, and input sanitization.",
        theory: "Never store passwords in plain text. Use cryptographically secure salted hashes like bcrypt. Validate all incoming payload boundaries on the server to prevent SQL injection or Buffer overflow exploits.",
        quiz: {
          question: "What is the critical purpose of adding a random 'Salt' value before hashing a user's password?",
          options: ["To speed up validation", "To defeat Rainbow Table lookup attacks", "To compress the database row", "To encrypt user cookies"],
          correctIndex: 1,
          explanation: "Salting ensures identical passwords produce entirely unique hashes, making precomputed dictionary/rainbow tables useless for brute forcing."
        },
        resources: [
          { name: "OWASP Top 10 Security Risks", url: "https://owasp.org/www-project-top-ten/", type: "Docs" },
          { name: "JWT.io Introduction", url: "https://jwt.io/introduction", type: "Guide" }
        ],
        completed: false
      }
    ]
  },
  "Data Scientist": {
    title: "Data Science & Predictive AI Pathway",
    goal: "Data Scientist",
    level: "Advanced",
    timeline: "12 weeks",
    steps: [
      {
        id: "ds-step-1",
        title: "Statistical Modeling & Feature Engineering",
        duration: "Week 1-3",
        description: "Hypothesis testing, probability distributions, outlier treatment, feature scaling, and correlation analyses.",
        theory: "Feature engineering transforms raw values into inputs that algorithms can parse effectively. Use standardization (mean=0, variance=1) for algorithms assuming normal distribution, or normalization (0-1) for gradient descent convergence.",
        quiz: {
          question: "When applying Ridge (L2) regression, what behavior does the regularizer apply to feature weights?",
          options: ["Shrinks coefficients close to zero but keeps them non-zero", "Drives coefficients completely to absolute zero", "Increases model variance to fit training data", "Removes random data dimensions"],
          correctIndex: 0,
          explanation: "Ridge regression shrinks weights close to zero squaredly (L2), preventing high variance. Lasso (L1) regression is what drives weights completely to zero."
        },
        resources: [
          { name: "StatQuest with Josh Starmer", url: "https://statquest.org", type: "Video" },
          { name: "Scikit-Learn Feature Scaling docs", url: "https://scikit-learn.org/stable/modules/preprocessing.html", type: "Docs" }
        ],
        completed: true
      },
      {
        id: "ds-step-2",
        title: "Supervised Learning & Validation Matrices",
        duration: "Week 4-7",
        description: "Decision Trees, Random Forests, XGBoost, Cross-Validation, ROC-AUC, and Confusion Matrix metrics.",
        theory: "Classification requires solid validation models. Accuracy is misleading on imbalanced datasets; always review Precision, Recall, and F1-Score. ROC-AUC evaluates true positive rate versus false positive rate trade-offs.",
        quiz: {
          question: "If a medical diagnostics test demands zero false negatives (missing a sick patient), which metric should we maximize?",
          options: ["Precision", "Recall (Sensitivity)", "Specificity", "Overall Accuracy"],
          correctIndex: 1,
          explanation: "Recall measures the proportion of actual positives correctly identified. Maximizing Recall minimizes false negatives, ensuring critical events are caught."
        },
        resources: [
          { name: "Introduction to Statistical Learning", url: "https://www.statlearning.com", type: "Book" },
          { name: "XGBoost Core Documentation", url: "https://xgboost.readthedocs.io", type: "Docs" }
        ],
        completed: false
      },
      {
        id: "ds-step-3",
        title: "Deep Learning Foundations & Large Language Models",
        duration: "Week 8-12",
        description: "Backpropagation, neural architectures, attention mechanisms, fine-tuning LLMs, and vector embeddings.",
        theory: "Neural networks utilize activation layers to model non-linear boundaries. Attention mechanisms track contextual relations across distant words, serving as the mathematical backbone for modern LLM transformers.",
        quiz: {
          question: "Which neural network layer is the fundamental component enabling sequence-to-sequence translation in LLM Transformers?",
          options: ["Convolutional Layer", "Self-Attention Block", "Max Pooling Layer", "Recurrent Unit"],
          correctIndex: 1,
          explanation: "Self-Attention calculates representation vectors of inputs by attending to other tokens in the context window simultaneously."
        },
        resources: [
          { name: "Hugging Face Course NLP", url: "https://huggingface.co/learn", type: "Course" },
          { name: "PyTorch Deep Learning Guides", url: "https://pytorch.org/tutorials/", type: "Docs" }
        ],
        completed: false
      }
    ]
  },
  "Product Manager": {
    title: "Product Strategy & Technical Leadership Pathway",
    goal: "Product Manager",
    level: "Intermediate",
    timeline: "12 weeks",
    steps: [
      {
        id: "pm-step-1",
        title: "Product Discovery & Market Research",
        duration: "Week 1-3",
        description: "Define user personas, conduct qualitative interviews, map customer journeys, and validate assumptions.",
        theory: "Product discovery minimizes risk by proving viability, usability, and business value before code is written. Frame assumptions as hypotheses and prioritize them by impact versus confidence.",
        quiz: {
          question: "What is the primary objective of a Minimum Viable Product (MVP)?",
          options: ["To launch a fully featured product", "To maximize immediate revenue", "To learn from actual users with the least effort", "To replace future development iterations"],
          correctIndex: 2,
          explanation: "An MVP is designed to validate core value propositions and accelerate continuous learning from real-world usage while investing minimal development hours."
        },
        resources: [
          { name: "SVPG - Product Discovery Basics", url: "https://www.svpg.com/product-discovery-overview/", type: "Article" },
          { name: "The Lean Startup - Eric Ries", url: "https://theleanstartup.com", type: "Book" }
        ],
        completed: true
      },
      {
        id: "pm-step-2",
        title: "Agile Execution & Strategic Roadmapping",
        duration: "Week 4-7",
        description: "Prioritization frameworks (RICE, Kano), writing high-quality PRDs/user stories, and managing sprint backlogs.",
        theory: "Product managers coordinate cross-functional teams. Prioritize tasks by calculating RICE scores: Reach * Impact * Confidence / Effort. Keep backlogs pruned to maintain velocity.",
        quiz: {
          question: "Under the RICE prioritization framework, what does the 'E' stand for?",
          options: ["Engagement", "Effort", "Execution", "Evaluation"],
          correctIndex: 1,
          explanation: "RICE stands for Reach, Impact, and Confidence divided by Effort (measured in person-months or development velocity)."
        },
        resources: [
          { name: "Product School - Ultimate Guide to PRDs", url: "https://productschool.com", type: "Guide" },
          { name: "Atlassian Scrum & Kanban Workflows", url: "https://www.atlassian.com/agile", type: "Docs" }
        ],
        completed: false
      }
    ]
  }
};
