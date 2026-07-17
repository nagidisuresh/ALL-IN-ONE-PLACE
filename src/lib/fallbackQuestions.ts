import { Question, Roadmap, ResumeEnhancement } from "../types";

// Comprehensive fallback database of highly realistic and challenging interview questions
export function getFallbackQuestions(
  role: string,
  field: string,
  type: string,
  level: string
): Question[] {
  const cleanRole = role || "Software Engineer";
  const cleanLevel = level || "Mid-level";
  const cleanType = type || "Behavioral";

  // Check categories and return appropriate question list
  const lowerType = cleanType.toLowerCase();

  let questions: { text: string; category: string; difficulty: "Easy" | "Medium" | "Hard"; estimatedTime: string }[] = [];

  if (lowerType.includes("system") || lowerType.includes("design")) {
    questions = [
      {
        text: `How would you design a highly scalable, real-time chat application (like WhatsApp or Slack) supporting millions of daily active users for a ${cleanLevel} role? Describe the connection protocol (WebSockets vs. Long Polling) and database architecture.`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "5-6 mins",
      },
      {
        text: `Design a global Content Delivery Network (CDN) caching layer. Explain how you would handle cache invalidation, edge routing, and cache stampede prevention for ${cleanRole} operations.`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How would you design a highly available, distributed unique ID generator (like Twitter Snowflake) at scale? Discuss constraints around clock synchronization and collision prevention.`,
        category: "System Design",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Design a URL shortener service (like Bit.ly) with a high read-to-write ratio. Detail your schema design, API structure, and how you would optimize redirects.`,
        category: "System Design",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `How would you design an activity feed or news feed service (like Twitter or LinkedIn) for a ${cleanLevel} position? Discuss Push vs. Pull models for celebrity/high-follower accounts.`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "5-6 mins",
      },
      {
        text: `Design a highly consistent, fault-tolerant distributed key-value store. Explain how consensus algorithms (like Raft or Paxos) are used to handle partition tolerance.`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How would you design a video streaming service (like Netflix or YouTube) to handle low-latency playback globally? Detail how video encoding, adaptive bitrate streaming, and storage tiering work.`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "5-6 mins",
      },
      {
        text: `Design an API Gateway that handles user authentication, rate limiting (Token Bucket vs. Leaky Bucket), and request routing for modern microservices.`,
        category: "System Design",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `How would you design a distributed metric monitoring and alerting system (like Prometheus and Grafana) to ingest millions of data points per second?`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `Design a collaborative real-time document editor (like Google Docs). Detail the conflicts resolution strategies, such as Operational Transformation (OT) or Conflict-Free Replicated Data Types (CRDT).`,
        category: "System Design",
        difficulty: "Hard",
        estimatedTime: "5-6 mins",
      }
    ];
  } else if (lowerType.includes("technical") || lowerType.includes("dsa") || lowerType.includes("coding") || lowerType.includes("algorithm")) {
    questions = [
      {
        text: `In your work as a ${cleanRole}, how would you design a highly efficient rate limiter for an API endpoint? Explain the concrete data structures (such as Redis sorted sets or token buckets) you would use.`,
        category: "Technical",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `Explain the fundamental difference between optimistic and pessimistic locking, and detail specific production scenarios where you would choose one over the other.`,
        category: "Technical",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Discuss the difference between Time and Space Complexity. Walk through a common algorithm (e.g., QuickSort or MergeSort) and analyze its best, average, and worst-case complexities.`,
        category: "Technical",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `As a ${cleanLevel} engineer, how do you prevent common web vulnerabilities like SQL injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF) in your codebase?`,
        category: "Technical",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Describe how garbage collection works in your primary runtime engine (e.g., V8, JVM, or Go runtime). What are the performance implications of stop-the-world phases?`,
        category: "Technical",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `What is database indexing? Under the hood, how does a B-Tree index structure differ from a Hash index, and how do they impact read vs. write performance?`,
        category: "Technical",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Explain the CAP theorem. How do you balance Consistency and Availability when designing a distributed data layer for a highly traffic-heavy service?`,
        category: "Technical",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How would you optimize a slow SQL database query performing multiple joins on tables containing millions of rows? Walk through execution plans and indexing strategies.`,
        category: "Technical",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `What are the key architectural differences between REST and gRPC? In what scenarios would a ${cleanRole} choose gRPC over traditional REST APIs?`,
        category: "Technical",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Describe the event loop model. How does Node.js or browser engines handle non-blocking asynchronous I/O, and what is the difference between microtasks and macrotasks?`,
        category: "Technical",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      }
    ];
  } else if (lowerType.includes("leader") || lowerType.includes("manager")) {
    questions = [
      {
        text: `As a ${cleanLevel} leader, how do you balance managing technical debt while delivering critical product features on extremely tight business schedules?`,
        category: "Leadership",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Describe your concrete delegation style. How do you ensure high-quality technical outcomes while still empowering other engineers to grow and own modules?`,
        category: "Leadership",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `How do you build alignment and consensus among team members when they have deeply divided opinions on a critical architectural decision?`,
        category: "Leadership",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `Tell me about a time you had to deliver difficult feedback or bad news to your team or stakeholders. How did you handle it and maintain morale?`,
        category: "Leadership",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `How do you mentor more junior engineers in your team as a ${cleanRole}? Walk me through a specific success story where your coaching had a clear impact.`,
        category: "Leadership",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Describe a time you spearheaded a strategic technical initiative that had a direct, measurable impact on the company's business metrics.`,
        category: "Leadership",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How do you handle persistent underperformance in an engineering team member? Walk through your steps from identification to resolution.`,
        category: "Leadership",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `How do you align your team's daily technical tasks and backlog with the company's broader corporate product vision?`,
        category: "Leadership",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Tell me about a time you had to make a highly critical technical or architectural decision with incomplete or highly ambiguous data. What was your framework?`,
        category: "Leadership",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How do you manage client or stakeholder expectations when a highly visible project delivery is facing unavoidable delays?`,
        category: "Leadership",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      }
    ];
  } else if (lowerType.includes("hr") || lowerType.includes("general")) {
    questions = [
      {
        text: `Why are you interested in joining our company as a ${cleanRole} at this stage in your career? How does our product vision align with your personal goals?`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `What do you consider your greatest professional strength and your biggest technical weakness as a ${cleanLevel} engineer?`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Where do you see yourself in five years in terms of career progression, technical expertise, or leadership responsibilities?`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `How do you manage high-pressure situations and prevent burnout while maintaining excellent delivery in a fast-paced environment?`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Describe the type of work culture and team dynamics in which you thrive the most and feel most productive.`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Tell me about a time you disagreed with a specific company policy or direct management decision. How did you handle it?`,
        category: "General",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `How do you define success in your role as a ${cleanRole}? Is it delivery of features, code quality, or user impact?`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `What are the major engineering or organizational challenges you are hoping to tackle in your next career role?`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `How do you receive critical or highly corrective feedback from your engineering manager or peers? Give an example of how you acted on it.`,
        category: "General",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Why should we hire you over other qualified candidates for this specific ${cleanRole} position?`,
        category: "General",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      }
    ];
  } else {
    // Default to Behavioral
    questions = [
      {
        text: `Tell me about a time you had a significant technical disagreement with a peer while working as a ${cleanLevel} ${cleanRole}. How did you resolve it?`,
        category: "Behavioral",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Describe the most challenging engineering project you spearheaded as a ${cleanRole}. What was the specific impact on your team or users?`,
        category: "Behavioral",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How do you handle extremely tight deadlines and prioritize competing tasks under pressure in your day-to-day work?`,
        category: "Behavioral",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Tell me about a time you made a major technical mistake or bad design choice in a production environment. What did you learn and how did you resolve it?`,
        category: "Behavioral",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Describe a situation where you had to persuade senior stakeholders or product managers about a critical technical proposal. What was your strategy?`,
        category: "Behavioral",
        difficulty: "Hard",
        estimatedTime: "4-5 mins",
      },
      {
        text: `How do you handle highly ambiguous requirements when starting a critical new initiative or feature as a ${cleanRole}?`,
        category: "Behavioral",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Tell me about a time you went significantly above and beyond your core engineering responsibilities to deliver a high-value outcome.`,
        category: "Behavioral",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `How do you stay updated with the latest trends and best practices in your field, and how have you introduced them into your work as a ${cleanRole}?`,
        category: "Behavioral",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      },
      {
        text: `Describe a time you had to work closely with a difficult colleague. What steps did you take to maintain collaboration and project delivery?`,
        category: "Behavioral",
        difficulty: "Medium",
        estimatedTime: "3-4 mins",
      },
      {
        text: `Tell me about a time you mentored or coached a junior engineer. What specific advice did you provide and what was the final outcome?`,
        category: "Behavioral",
        difficulty: "Easy",
        estimatedTime: "2-3 mins",
      }
    ];
  }

  // Map to fully structured Question format matching types
  return questions.map((q, idx) => ({
    id: `fallback-q-${idx + 1}`,
    text: q.text,
    category: q.category,
    difficulty: q.difficulty,
    estimatedTime: q.estimatedTime,
  }));
}

export function getFallbackRoadmap(
  goal?: string,
  level?: string,
  timeline?: string
): Roadmap {
  const cleanGoal = goal || "Full Stack Software Engineer";
  const cleanLevel = level || "Beginner";
  const cleanTimeline = timeline || "6 Months";

  return {
    title: `${cleanLevel} to Professional ${cleanGoal} Roadmap`,
    goal: cleanGoal,
    level: cleanLevel,
    timeline: cleanTimeline,
    steps: [
      {
        id: "step-1",
        title: "Foundations & Core Fundamentals",
        duration: "Weeks 1-4",
        description: `Master the essential building blocks, language runtimes, syntax rules, and programming models required for ${cleanGoal}.`,
        theory: `Focus on computer science fundamentals, language basics (variables, control flows, data structures), clean coding principles, and standard package management systems.`,
        quiz: {
          question: "Which of the following is considered a best practice for writing clean, maintainable code?",
          options: [
            "Writing deeply nested conditions to handle all paths in one function",
            "Keeping functions small, self-contained, and focused on a single responsibility",
            "Using short, single-character names for all variables to reduce file size",
            "Avoiding documentation or comments to keep the files clean"
          ],
          correctIndex: 1,
          explanation: "The Single Responsibility Principle (SRP) states that a function or class should have only one reason to change, promoting readability and reusability."
        },
        resources: [
          { name: "MDN Web Docs - Language Guide", url: "https://developer.mozilla.org", type: "Documentation" },
          { name: "Clean Code Handbook", url: "https://github.com/collections/clean-code-linter", type: "Book Reference" }
        ],
        completed: false
      },
      {
        id: "step-2",
        title: "Architecture & Framework Masterclass",
        duration: "Weeks 5-8",
        description: `Deep-dive into professional libraries, components state lifecycle patterns, and advanced architectural abstractions.`,
        theory: `Understand structural design patterns, separation of concerns, routing systems, API consumption models, and state management engines.`,
        quiz: {
          question: "What is the primary benefit of decoupled architecture and client-server model separation?",
          options: [
            "It speeds up initial CSS compilation times",
            "It allows frontend and backend systems to scale, deploy, and evolve independently",
            "It completely eliminates the need for security rules and user authentication",
            "It guarantees zero latency on slow networks"
          ],
          correctIndex: 1,
          explanation: "Separating concerns into independent client and server layers allows each subsystem to scale and deploy individually, enhancing fault tolerance and developer velocity."
        },
        resources: [
          { name: "Architectural Patterns Blueprint", url: "https://martinfowler.com", type: "Architecture Guide" },
          { name: "Framework Core Tutorials", url: "https://react.dev/reference/react", type: "Official Guide" }
        ],
        completed: false
      },
      {
        id: "step-3",
        title: "Databases, API Integrations & State Security",
        duration: "Weeks 9-12",
        description: `Connect persistent data layers, design secure REST/GraphQL contracts, and handle server-side sessions.`,
        theory: `Learn schema migrations, relational database modeling, indexing strategies, authorization standards, and token-based state verification.`,
        quiz: {
          question: "Which database technique is primarily used to optimize query performance on frequently queried columns?",
          options: [
            "Normalizing tables into 5th Normal Form",
            "Adding a Database Index (such as a B-Tree index)",
            "Compressing the SQL dump file",
            "Disabling foreign key constraints entirely"
          ],
          correctIndex: 1,
          explanation: "Indices act as lookup lookup structures, allowing the database engine to find specific records rapidly without performing a slow full-table scan."
        },
        resources: [
          { name: "SQL Indexing and Tuning", url: "https://use-the-index-luke.com", type: "Optimization Guide" },
          { name: "OAuth 2.0 Security Best Practices", url: "https://oauth.net/2/", type: "Security Docs" }
        ],
        completed: false
      },
      {
        id: "step-4",
        title: "Testing, CI/CD Pipelines & DevOps Fundamentals",
        duration: "Weeks 13-16",
        description: `Establish unit testing pipelines, automated build checks, and containerized deployment setups.`,
        theory: `Master writing unit, integration, and end-to-end tests. Understand GitHub Actions, containerization (Docker), and automated container delivery.`,
        quiz: {
          question: "What is the goal of Continuous Integration (CI) in professional development workflows?",
          options: [
            "To constantly chat with other team members in real-time",
            "To automatically build, lint, and run tests on every code change to catch issues early",
            "To deploy directly to production without any reviews or approvals",
            "To completely automate the writing of all business code"
          ],
          correctIndex: 1,
          explanation: "Continuous Integration merges developer changes into a shared repository frequently, where automated builds and test pipelines run to validate code correctness immediately."
        },
        resources: [
          { name: "Testing Library Best Practices", url: "https://testing-library.com", type: "Tutorials" },
          { name: "DevOps Lifecycle Roadmap", url: "https://roadmap.sh/devops", type: "Visual Map" }
        ],
        completed: false
      },
      {
        id: "step-5",
        title: "System Scaling, Cloud Services & Portfolio Capstone",
        duration: "Weeks 17-24",
        description: `Deploy a production-grade full-stack application and optimize system scalability for performance under load.`,
        theory: `Understand horizontal vs. vertical scaling, redis caching mechanisms, server-side caching policies, and CDN edge deliveries.`,
        quiz: {
          question: "Which scaling method involves adding more computer servers in parallel to distribute heavy web traffic?",
          options: [
            "Vertical Scaling (Scaling Up)",
            "Horizontal Scaling (Scaling Out)",
            "Database Normalization",
            "Memory Profiling"
          ],
          correctIndex: 1,
          explanation: "Horizontal scaling distributes incoming load across multiple server instances, providing higher resilience and capacity than increasing a single server's resources."
        },
        resources: [
          { name: "System Design Primer Guide", url: "https://github.com/donnemartin/system-design-primer", type: "System Design Guide" },
          { name: "Cloud Run and Containers Scaling", url: "https://cloud.google.com/run/docs", type: "Cloud Docs" }
        ],
        completed: false
      }
    ]
  };
}

export function getFallbackResumeEnhancement(role?: string): ResumeEnhancement {
  const cleanRole = role || "Software Engineer";

  return {
    resumeScore: 84,
    professionalSummary: `Results-driven ${cleanRole} with a proven track record of designing, building, and delivering high-performance scalable web platforms. Adept at collaborating across multifunctional technical teams to architect cloud solutions, establish secure authentication architectures, and implement responsive client-side experiences that drive user metrics.`,
    optimizedBulletPoints: [
      `Architected a secure full-stack customer portal for ${cleanRole} operations, boosting user session duration by 25% and reducing client-side load latencies by 40%.`,
      `Engineered high-performance real-time search queries and structured data pipelines, lowering database execution overhead by 30% under peak loads.`,
      `Led the migration of legacy monolithic frameworks into modular component libraries, reducing developer feature-onboarding cycles by 3 weeks.`,
      `Implemented automated continuous integration (CI/CD) pipelines and unit testing suites, improving deployment stability and achieving 90% code coverage.`,
      `Designed responsive, high-contrast, fully accessible user interfaces utilizing modern utility-first styles, leading to a 15% increase in mobile web conversions.`
    ],
    keywordOptimization: [
      "TypeScript & ES6",
      "System Architecture",
      "Scalable RESTful APIs",
      "CI/CD Pipelines & DevOps",
      "Performance Tuning & Caching"
    ],
    grammarTips: [
      "Replace passive verbs (like 'helped in building') with active action verbs (e.g., 'Engineered', 'Architected').",
      "Keep all experiences in the consistent past tense (e.g. 'Optimized', 'Developed'), unless describing your current ongoing role.",
      "Incorporate clear numerical metrics and outcomes (percentage increases, time saved) into every bullet point to prove concrete impact."
    ]
  };
}

export function getFallbackAtsMatch(resumeText: string, jobDescription: string): any {
  // Simple word frequency match calculation for realistic ATS feedback
  const cleanText = (str: string) => {
    return (str || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 3);
  };

  const resumeWords = new Set(cleanText(resumeText));
  const jdWords = Array.from(new Set(cleanText(jobDescription)));

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  const techKeywords = [
    "react", "typescript", "javascript", "node", "express", "firebase", "firestore", "auth",
    "python", "django", "flask", "java", "spring", "docker", "kubernetes", "aws", "gcp",
    "cloud", "sql", "postgres", "mongodb", "graphql", "rest", "api", "git", "ci/cd",
    "html", "css", "tailwind", "next", "redux", "jest", "testing", "agile", "scrum", "devops",
    "performance", "scaling", "security", "database", "analytics", "microservices", "system"
  ];

  jdWords.forEach(word => {
    if (techKeywords.includes(word)) {
      if (resumeWords.has(word)) {
        matchedKeywords.push(word.charAt(0).toUpperCase() + word.slice(1));
      } else {
        missingKeywords.push(word.charAt(0).toUpperCase() + word.slice(1));
      }
    }
  });

  // Default lists in case matching yielded too few items
  const finalMatched = matchedKeywords.length > 0 
    ? matchedKeywords.slice(0, 5) 
    : ["TypeScript", "React", "REST APIs", "Git", "System Design"];
  const finalMissing = missingKeywords.length > 0 
    ? missingKeywords.slice(0, 5) 
    : ["Docker", "CI/CD Pipelines", "Redis Caching", "Cloud Services (AWS/GCP)", "Automated Testing"];

  const matchPercentage = Math.min(
    95,
    Math.max(
      60,
      Math.round((finalMatched.length / (finalMatched.length + finalMissing.length || 1)) * 100)
    )
  );

  return {
    matchPercentage,
    scoreBreakdown: {
      keywordMatch: Math.max(55, matchPercentage - 5),
      skillsMatch: Math.min(100, matchPercentage + 3),
      experienceRelevance: Math.max(55, matchPercentage - 2),
      formattingStyle: 88
    },
    matchedKeywords: finalMatched,
    missingKeywords: finalMissing,
    gapsAnalysis: `The resume demonstrates excellent alignment with key core skills like ${finalMatched.slice(0, 2).join(" and ")}, but displays noticeable keyword gaps in engineering execution areas, specifically missing ${finalMissing.slice(0, 2).join(" and ")}. Adding these will dramatically improve your visibility.`,
    actionableSuggestions: [
      `Integrate keywords like '${finalMissing[0]}' and '${finalMissing[1] || "Cloud Services"}' naturally into your professional summary and experience bullet points.`,
      `Structure your technical achievements using the STAR methodology, explicitly showcasing the technical challenge, actions taken, and the numeric business outcomes.`,
      `Create a dedicated 'Technical Skills' section grouped by category (Frontend, Backend, Tools) to ensure ATS parser engines extract your competencies seamlessly.`
    ],
    atsOptimizedSummary: `Skilled technical professional offering deep expertise in engineering execution, specifically utilizing ${finalMatched.join(", ")} to design and deliver secure, scalable web systems. Passionate about leveraging robust code design and container architectures to resolve complex business bottlenecks.`
  };
}

export function getFallbackResumeTips(industry?: string): any {
  const cleanInd = industry || "Software Engineering";
  return {
    industry: cleanInd,
    tips: [
      {
        title: "Incorporate Hard Technical Skills in Context",
        description: "ATS scanner systems index skills inside sentence fragments rather than floating lists. Make sure your core competencies appear alongside actual projects and responsibilities.",
        exampleBefore: "Skills: React, Node, WebSockets, Redis.",
        exampleAfter: "Engineered a low-latency chat service using React and Node, integrating WebSockets and a Redis cache to optimize message delivery times by 35%."
      },
      {
        title: "Lead with Powerful, Metric-Driven Results",
        description: "Resume screens are completed in seconds. Highlighting measurable results (cost reductions, speed increases, revenue growth, developer hours saved) immediately signals high-value impact.",
        exampleBefore: "Worked on optimization of backend queries to make search run faster.",
        exampleAfter: "Optimized relational database search queries and indexes, reducing backend API response times by 45% and lowering memory utilization by 12%."
      },
      {
        title: "Eradicate Passive and First-Person Phrasing",
        description: "Avoid using 'I', 'we', 'responsible for', or 'assisted in'. Use strong, definitive action-oriented verbs at the beginning of every experience bullet point.",
        exampleBefore: "I was responsible for maintaining the authentication flow and assisting teammates.",
        exampleAfter: "Maintained secure JWT token-based authentication modules and mentored 3 junior engineering hires in framework best practices."
      }
    ]
  };
}

export function getFallbackCareerChat(messages: any[]): string {
  const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
  
  if (lastUserMsg.includes("resume") || lastUserMsg.includes("cv")) {
    return `### 📝 Professional Resume Coaching Guidance

To construct a resume that consistently passes both automated **ATS screens** and catches the attention of elite technical recruiters, focus on these three core structural principles:

1. **STAR/CAR Bullet Framework**: Avoid simply listing responsibilities. For every single experience bullet point, follow the **STAR framework**:
   - **S**ituation / **T**ask: What was the challenge or engineering bottleneck? (e.g., *Slow search queries overloading the DB*)
   - **A**ction: What specific action did you take? (e.g., *Refactored query paths and built composite indexing*)
   - **R**esult: What was the quantifiable outcome? (e.g., *Reduced response times by 40%*)
2. **Strict Keyword Density**: Cross-reference the target job description. Ensure core technologies, architectures, and practices (e.g., *TypeScript, Microservices, CI/CD*) are populated multiple times in actual project descriptions, not just floating in a list.
3. **Pristine Formatting**: Avoid complex multi-column grid templates or visual graphic charts (e.g., "75% skill bars"). Standard ATS parsers read single-column layouts linearly and often fail to extract text from complex table designs.

Would you like me to help you draft or polish a specific bullet point for your target role?`;
  }
  
  if (lastUserMsg.includes("interview") || lastUserMsg.includes("behavioral")) {
    return `### 🎙️ Behavioral Interview Execution Strategy

The absolute gold standard for answering behavioral questions is the **STAR Method** (Situation, Task, Action, Result). Here is how to pace a 3-minute verbal answer perfectly:

- **Situation & Task (30-45 seconds)**: Paint a clear but brief picture. Define the technical stack, the urgency of the issue, and what your exact responsibility was. Keep it objective—no complaining about the legacy codebase or teammates.
- **Action (60-90 seconds)**: This is the **most critical** part. Focus on *your* contributions. Use "I" instead of "we". Explain the technical trade-offs you evaluated and why you selected your specific path. Show your engineering depth.
- **Result (30-45 seconds)**: Conclude with a strong, definitive outcome. Highlight quantitative metrics if possible (e.g., *we shipped 2 days ahead of schedule, CPU usage dropped by 15%, customer tickets fell by 50%*).

**Pro-Tip**: When asked about a time you failed, select a genuine technical mistake, take full responsibility immediately, detail what you learned from it, and explain the concrete processes you implemented to ensure that failure never happens again.

What behavioral question would you like to mock-interview or practice right now?`;
  }

  if (lastUserMsg.includes("system design") || lastUserMsg.includes("architecture")) {
    return `### 📐 Core System Design Interview Blueprint

When tackling a system design interview, follow this structured, battle-tested engineering checklist:

1. **Requirements Gathering (3-5 mins)**:
   - **Functional**: What are the features? (e.g., *Can users post images? Can they search?*)
   - **Non-Functional**: Scale and constraints (e.g., *Daily Active Users, Read-to-Write ratio, Latency SLA, Consistency model*).
2. **High-Level Design (5-7 mins)**:
   - Sketch the complete end-to-end data flow (Client ➔ API Gateway ➔ App Servers ➔ Cache ➔ Database).
   - Establish API endpoints and request-response payloads early.
3. **Deep-Dive & Scaling (15-20 mins)**:
   - Identify critical performance bottlenecks.
   - Explain scaling solutions: database replication, sharding schemes, caching layers (Redis/Memcached), message queues (Kafka) for async processing, and CDNs for static media delivery.
4. **Reliability & Security (3-5 mins)**:
   - Describe authentication, rate-limiting rules, fault tolerance, and disaster recovery.

Would you like to design a system (e.g., TinyURL, Uber, or Instagram) together right now?`;
  }

  // General helpful Response
  return `### 👋 Welcome to NextRoundPrep AI Career Coaching!

I am your always-on elite career advisor. I can help you with:
- **Mock Interviews**: Simulating behavioral or technical mock-interviews with real-time feedback.
- **Resume Enhancements**: ATS keyword optimizations, bullet crafting, and overall structural scoring.
- **Career Roadmaps**: Custom-tailored learning and skills development plans to reach your target engineering role.
- **System Design & Coding Advice**: Architecting scalable cloud systems and solving algorithmic coding questions.

What career goal or preparation topic can we tackle today? Let me know, and we can get started!`;
}

export function getFallbackEamcetTutor(messages: any[]): string {
  const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";

  if (lastUserMsg.includes("math") || lastUserMsg.includes("algebra") || lastUserMsg.includes("integration")) {
    return `### 📐 Mathematics - Step-by-Step Doubt Resolution

**Subject**: Calculus - Definite Integration
**Topic**: Integration of Trigonometric Functions for EAMCET

**Problem / Concept**: Solve the definite integral:  
$$\\int_{0}^{\\frac{\\pi}{2}} \\frac{\\sin x}{\\sin x + \\cos x} \\, dx$$

#### **Detailed Formulaic Breakdown**
We will apply the standard integral reflection property:
$$\\int_{a}^{b} f(x) \\, dx = \\int_{a}^{b} f(a + b - x) \\, dx$$

#### **Step-by-Step Analytical Solution**

1. Let the given integral be $I$:
   $$I = \\int_{0}^{\\frac{\\pi}{2}} \\frac{\\sin x}{\\sin x + \\cos x} \\, dx \\quad \\text{--- (Equation 1)}$$

2. Apply the reflection property ($x \\rightarrow \\frac{\\pi}{2} - x$):
   $$I = \\int_{0}^{\\frac{\\pi}{2}} \\frac{\\sin(\\frac{\\pi}{2} - x)}{\\sin(\\frac{\\pi}{2} - x) + \\cos(\\frac{\\pi}{2} - x)} \\, dx$$

3. Using standard trigonometric reduction formulas ($\\sin(\\frac{\\pi}{2} - x) = \\cos x$ and $\\cos(\\frac{\\pi}{2} - x) = \\sin x$):
   $$I = \\int_{0}^{\\frac{\\pi}{2}} \\frac{\\cos x}{\\cos x + \\sin x} \\, dx \\quad \\text{--- (Equation 2)}$$

4. Add Equation 1 and Equation 2:
   $$2I = \\int_{0}^{\\frac{\\pi}{2}} \\frac{\\sin x + \\cos x}{\\sin x + \\cos x} \\, dx$$
   $$2I = \\int_{0}^{\\frac{\\pi}{2}} 1 \\, dx$$

5. Integrate and evaluate:
   $$2I = [x]_0^{\\frac{\\pi}{2}} = \\frac{\\pi}{2} - 0$$
   $$I = \\frac{\\pi}{4}$$

#### **Conclusion & EAMCET Exam Tip**
- **Correct Answer**: $\\frac{\\pi}{4}$
- **Short-Cut Trick**: For any definite integral of the form $\\int_{0}^{\\frac{\\pi}{2}} \\frac{f(\\sin x)}{f(\\sin x) + f(\\cos x)} \\, dx$, the result is always **half of the upper limit**, which is $\\frac{\\pi}{4}$. Memorizing this pattern saves valuable minutes during EAMCET!

What other Math or Calculus doubt would you like to solve?`;
  }

  if (lastUserMsg.includes("physics") || lastUserMsg.includes("force") || lastUserMsg.includes("velocity")) {
    return `### ⚡ Physics - Step-by-Step Doubt Resolution

**Subject**: Mechanics - Work, Energy & Power
**Topic**: Conservation of Linear Momentum & Kinetic Energy

**Problem / Concept**: A particle of mass $m$ moving with velocity $v$ makes a head-on elastic collision with an identical particle at rest. What are their velocities after collision?

#### **Detailed Formulaic Breakdown**
1. **Conservation of Linear Momentum**:
   $$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$
2. **Coefficient of Restitution ($e$)** for elastic collisions is $1$:
   $$e = \\frac{v_2 - v_1}{u_1 - u_2} = 1 \\implies v_2 - v_1 = u_1 - u_2$$

#### **Step-by-Step Analytical Solution**

1. Given data:
   - $m_1 = m_2 = m$
   - Initial velocity of particle 1: $u_1 = v$
   - Initial velocity of particle 2: $u_2 = 0$ (at rest)

2. Apply Conservation of Momentum:
   $$m(v) + m(0) = m(v_1) + m(v_2)$$
   Divide by $m$:
   $$v = v_1 + v_2 \\quad \\text{--- (Equation 1)}$$

3. Apply Coefficient of Restitution formula:
   $$v_2 - v_1 = v - 0 \\implies v_2 - v_1 = v \\quad \\text{--- (Equation 2)}$$

4. Solve Equations 1 and 2:
   - Add the equations:
     $$2v_2 = 2v \\implies v_2 = v$$
   - Subtract Equation 2 from Equation 1:
     $$2v_1 = 0 \\implies v_1 = 0$$

#### **Conclusion & EAMCET Exam Tip**
- **Correct Answer**: The incoming particle comes to a **complete stop** ($v_1 = 0$), and the target particle moves off with the **original velocity** ($v_2 = v$).
- **Key Takeaway**: When two equal masses undergo a perfectly elastic head-on collision, they **completely swap their velocities**. This concept is highly tested in EAMCET mechanics!

Do you have another Physics question on kinematics or mechanics you want to solve?`;
  }

  // Default chemistry or generic reply
  return `### 🧪 Chemistry - Step-by-Step Doubt Resolution

**Subject**: Physical Chemistry
**Topic**: Chemical Kinetics - Order of Reaction

**Concept/Formula**:
For a **First-Order Reaction**, the rate constant ($k$) and half-life ($t_{1/2}$) are related by the equation:
$$k = \\frac{0.693}{t_{1/2}}$$

The integrated rate equation for a first-order reaction is:
$$k = \\frac{2.303}{t} \\log\\left(\\frac{[A]_0}{[A]_t}\\right)$$
Where:
- $[A]_0$ = Initial concentration of the reactant.
- $[A]_t$ = Concentration of reactant at time $t$.

#### **Typical EAMCET Numerical Example**:
If a first-order reaction is 90% complete in 100 minutes, calculate its rate constant ($k$).

**Step-by-Step Solution**:
1. If the reaction is 90% complete, the remaining concentration $[A]_t$ is:
   $$[A]_t = 100\\% - 90\\% = 10\\% \\text{ of } [A]_0$$
   $$\\frac{[A]_0}{[A]_t} = \\frac{100}{10} = 10$$

2. Substitute values into the rate formula:
   $$k = \\frac{2.303}{100} \\log(10)$$
   Since $\\log(10) = 1$:
   $$k = \\frac{2.303}{100} = 0.02303 \\text{ min}^{-1}$$

#### **Conclusion & EAMCET Exam Tip**:
- **Correct Answer**: $0.02303 \\text{ min}^{-1}$
- **Key Takeaway**: Always double-check the units of the rate constant to identify the order of the reaction instantly:
  - First-order: $\\text{time}^{-1}$ (e.g. $\\text{s}^{-1}$ or $\\text{min}^{-1}$)
  - Zero-order: $\\text{mol L}^{-1} \\text{s}^{-1}$
  - Second-order: $\\text{L mol}^{-1} \\text{s}^{-1}$

What other physical, organic, or inorganic chemistry doubt can I explain for you?`;
}

export function getFallbackFoundersPrime(
  stage?: string,
  location?: string,
  industry?: string,
  goals?: string
): any {
  const cleanStage = stage || "Pre-seed / Idea";
  const cleanLoc = location || "Global";
  const cleanInd = industry || "SaaS & AI";
  const cleanGoal = goals || "Build prototype and scale";

  return {
    summary: `Tailored capital and resource guide for a ${cleanStage} startup in ${cleanLoc} building in the ${cleanInd} space, focusing on your key goal to ${cleanGoal}.`,
    strategies: [
      "Incorporate in Delaware (C-Corp) or your local tech hub to easily claim cloud credits and clear the legal path for venture investments.",
      "Activate free credits sequentially: start with $5,000 in AWS Activate, then transition to $2,000 Google Cloud for startup credits to maximize cash runways.",
      "Build a high-fidelity landing page with waitlists first to prove early user intent before committing massive hours to deep engineering systems."
    ],
    timelinePlaybook: [
      "Month 0-3: Set up core domain names, launch landing page, and claim AWS Activate/Google Cloud $2,000 credit pipelines to construct your initial MVP free of cloud hosting costs.",
      "Month 3-6: Complete high-value customer interviews, ship your beta product to first 100 test accounts, and apply for government-sponsored equity-free pre-seed grant programs.",
      "Month 6-12: Launch publicly, integrate comprehensive analytics, claim next tier cloud credits (up to $100k AWS/GCP credits), and prepare your seed-round investor slide decks."
    ],
    targetedAdvice: "During this early phase, prioritize equity preservation. Defer hiring expensive agencies; instead, leverage modern visual prototyping tools and cloud credits. Protect your cap table—do not dilute more than 15-20% of founder equity in pre-seed rounds."
  };
}

