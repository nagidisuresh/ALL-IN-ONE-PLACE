export interface StartupListing {
  id: string;
  name: string;
  logoColor: string; // Tailwind hex or class name
  description: string;
  eligibility: string;
  category: 
    | "Cloud Credits"
    | "AI Credits"
    | "SaaS Discounts"
    | "Government Grants"
    | "Non-dilutive Funding"
    | "Accelerators"
    | "Incubators"
    | "Startup Competitions"
    | "Fellowships"
    | "Student Opportunities"
    | "Hackathons"
    | "Founder Resources"
    | "Startup Ideas"
    | "Startup Directory"
    | "Investor Directory"
    | "Community Programs";
  country: string;
  industry: string;
  startupStage: "Idea" | "Pre-seed" | "Seed" | "Growth" | "All Stages";
  applicationLink: string;
  value: string;
  deadline: string;
  verificationStatus: "Verified" | "Featured" | "Pending Review";
  updateHistory: string;
  tags: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  publishedAt: string;
  commentsCount: number;
}

export const LISTING_CATEGORIES = [
  "Cloud Credits",
  "AI Credits",
  "SaaS Discounts",
  "Government Grants",
  "Non-dilutive Funding",
  "Accelerators",
  "Incubators",
  "Startup Competitions",
  "Fellowships",
  "Student Opportunities",
  "Hackathons",
  "Founder Resources",
  "Startup Ideas",
  "Startup Directory",
  "Investor Directory",
  "Community Programs"
] as const;

export const STARTUP_LISTINGS: StartupListing[] = [
  // 1. Cloud Credits
  {
    id: "lst-aws",
    name: "AWS Activate",
    logoColor: "from-orange-500 to-amber-600",
    description: "Access up to $100,000 in AWS cloud credits, technical support, and training resources. Trusted by hundreds of thousands of high-growth technology startups.",
    eligibility: "Associated with an AWS Activate Provider (VC, Accelerator) and under $10M in lifetime funding.",
    category: "Cloud Credits",
    country: "Global",
    industry: "All Industries",
    startupStage: "Pre-seed",
    applicationLink: "https://aws.amazon.com/activate/",
    value: "$100,000 Cloud Credits",
    deadline: "Rolling",
    verificationStatus: "Featured",
    updateHistory: "Updated 3 days ago by AWS Team",
    tags: ["aws", "cloud", "hosting", "infrastructure", "credits"]
  },
  {
    id: "lst-gcp",
    name: "Google Cloud for Startups",
    logoColor: "from-blue-500 via-red-500 to-yellow-500",
    description: "Get Google Cloud and Firebase credits, dedicated mentor support, and access to Google Web3/AI ecosystem benefits. Covers up to $200k in credits over 2 years.",
    eligibility: "Pre-seed or Seed-stage startups, founded less than 5 years ago, and not yet public.",
    category: "Cloud Credits",
    country: "Global",
    industry: "Tech & Software",
    startupStage: "Pre-seed",
    applicationLink: "https://cloud.google.com/startup",
    value: "Up to $200,000 Credits",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Verified active for Q3 2026",
    tags: ["google", "gcp", "firebase", "ai", "kubernetes"]
  },
  {
    id: "lst-azure",
    name: "Microsoft for Startups Founders Hub",
    logoColor: "from-sky-500 to-indigo-600",
    description: "Open to anyone with an idea. Instantly receive up to $150,000 in Azure credits, free licenses for GitHub Enterprise, Microsoft 365, and OpenAI API credits.",
    eligibility: "All software developers and product builders. No funding requirement.",
    category: "Cloud Credits",
    country: "Global",
    industry: "Software & AI",
    startupStage: "Idea",
    applicationLink: "https://foundershub.startups.microsoft.com/",
    value: "$150,000 Azure + OpenAI",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated 5 days ago",
    tags: ["microsoft", "azure", "openai", "github", "office"]
  },

  // 2. AI Credits
  {
    id: "lst-openai",
    name: "OpenAI Startups Program",
    logoColor: "from-emerald-600 to-teal-800",
    description: "Unparalleled access to OpenAI API credits, early access to new generative model releases, and premium technical hours with core AI researchers.",
    eligibility: "Highly scalable seed-stage AI ventures backed by vetted investor networks.",
    category: "AI Credits",
    country: "Global",
    industry: "Artificial Intelligence",
    startupStage: "Seed",
    applicationLink: "https://openai.com/startups/",
    value: "Up to $10,000 API Credits",
    deadline: "Rolling",
    verificationStatus: "Featured",
    updateHistory: "Updated 2 days ago",
    tags: ["openai", "api", "gpt-4", "fine-tuning", "llm"]
  },
  {
    id: "lst-anthropic",
    name: "Anthropic Claude Developer Credits",
    logoColor: "from-rose-500 to-orange-600",
    description: "API access credits for building with Claude 3.5 Sonnet and Opus models. Includes priority rate limit tiers and system engineer advisory.",
    eligibility: "Innovative tech startups with a live AI-centered product in beta.",
    category: "AI Credits",
    country: "Global",
    industry: "Generative AI",
    startupStage: "Pre-seed",
    applicationLink: "https://anthropic.com",
    value: "$5,000 Claude API Credits",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Verified active for 2026",
    tags: ["claude", "anthropic", "llm", "api", "tokens"]
  },

  // 3. SaaS Discounts
  {
    id: "lst-stripe",
    name: "Stripe Atlas discount",
    logoColor: "from-indigo-500 to-purple-600",
    description: "Form your business, issue stock, and launch payments. FoundersPrime members receive 50% off Stripe Atlas formation fees plus fee-free payment processing.",
    eligibility: "Unincorporated startups globally looking to form a US C-Corp.",
    category: "SaaS Discounts",
    country: "Global",
    industry: "FinTech",
    startupStage: "Idea",
    applicationLink: "https://stripe.com/atlas",
    value: "50% Off Formation + Fee Free Processing",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated 1 week ago",
    tags: ["stripe", "payments", "legal", "incorporation", "atlas"]
  },
  {
    id: "lst-posthog",
    name: "PostHog for Startups",
    logoColor: "from-zinc-800 to-black",
    description: "Get $50,000 in platform credits covering session recordings, product analytics, and feature flags. Complete telemetry toolkit for product-market fit.",
    eligibility: "Founded under 2 years ago and raised less than $5M total funding.",
    category: "SaaS Discounts",
    country: "Global",
    industry: "SaaS",
    startupStage: "Pre-seed",
    applicationLink: "https://posthog.com/startups",
    value: "$50,000 Platform Credits",
    deadline: "Rolling",
    verificationStatus: "Featured",
    updateHistory: "Updated 4 days ago",
    tags: ["analytics", "posthog", "telemetry", "tracking", "saas"]
  },
  {
    id: "lst-datadog",
    name: "Datadog Startup Program",
    logoColor: "from-purple-500 to-indigo-700",
    description: "Gain complete visibility into your cloud-scale applications. Up to $100,000 in Datadog system credits covering server, APM, and security logging.",
    eligibility: "Early stage tech companies with a working product in cloud dev.",
    category: "SaaS Discounts",
    country: "Global",
    industry: "All Industries",
    startupStage: "Pre-seed",
    applicationLink: "https://datadoghq.com/startups/",
    value: "$100,000 Monitor Credits",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Verified active for Q3 2026",
    tags: ["datadog", "monitoring", "apm", "server", "logging"]
  },

  // 4. Government Grants
  {
    id: "lst-sbir",
    name: "US SBIR Phase I Grant",
    logoColor: "from-blue-800 to-sky-950",
    description: "Small Business Innovation Research (SBIR) non-dilutive federal grants supporting high-tech, high-risk research and commercialization efforts.",
    eligibility: "US-based small businesses with under 500 employees, owned majorly by US citizens.",
    category: "Government Grants",
    country: "United States",
    industry: "DeepTech / Biotech",
    startupStage: "Pre-seed",
    applicationLink: "https://www.sbir.gov/",
    value: "$150,000 to $275,000",
    deadline: "Dec 15, 2026",
    verificationStatus: "Verified",
    updateHistory: "Deadline updated for winter cycle",
    tags: ["government", "grant", "federal", "sbir", "non-dilutive"]
  },
  {
    id: "lst-nidhi",
    name: "NIDHI Prayas Grant India",
    logoColor: "from-orange-600 via-white to-green-600",
    description: "Department of Science and Technology (DST) initiative for converting an innovative idea into a functional prototype. Non-dilutive capital assistance.",
    eligibility: "Indian individual innovators or startups incubated at recognized tech centers.",
    category: "Government Grants",
    country: "India",
    industry: "Hardware, IoT, Biotech",
    startupStage: "Idea",
    applicationLink: "https://www.nidhi-prayas-dst.org",
    value: "₹10 Lakhs Prototypes Grant",
    deadline: "Quarterly Cycles",
    verificationStatus: "Verified",
    updateHistory: "Updated last month",
    tags: ["india", "dst", "nidhi", "prayas", "prototype"]
  },

  // 5. Non-dilutive Funding
  {
    id: "lst-lighter",
    name: "Lighter Capital Revenue Financing",
    logoColor: "from-cyan-600 to-indigo-800",
    description: "Equity-free revenue-based loans and financing. Structure repayments based on your monthly recurring revenue. No personal guarantees required.",
    eligibility: "Startups with over $15,000 in monthly recurring revenue (MRR) and healthy growth margins.",
    category: "Non-dilutive Funding",
    country: "Global",
    industry: "SaaS & Subscription",
    startupStage: "Growth",
    applicationLink: "https://lightercapital.com",
    value: "Up to $1,000,000 Loan",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated 10 days ago",
    tags: ["revenue", "loan", "debt", "funding", "non-dilutive"]
  },

  // 6. Accelerators
  {
    id: "lst-yc",
    name: "Y Combinator",
    logoColor: "from-orange-500 to-red-600",
    description: "The world's premier startup accelerator. YC invests $500,000 twice a year in promising tech teams, offering unrivaled ecosystem access and growth tools.",
    eligibility: "Unrivaled tech innovators across AI, Developer Tools, SaaS, biotech, climate tech, and defense.",
    category: "Accelerators",
    country: "Global",
    industry: "All Industries",
    startupStage: "Idea",
    applicationLink: "https://ycombinator.com",
    value: "$500,000 Investment + Perks",
    deadline: "Oct 15, 2026 (W27 Cycle)",
    verificationStatus: "Featured",
    updateHistory: "Deadline updated for W27",
    tags: ["yc", "ycombinator", "accelerator", "silicon-valley"]
  },
  {
    id: "lst-techstars",
    name: "Techstars Accelerator Programs",
    logoColor: "from-sky-700 to-indigo-950",
    description: "A 3-month intensive accelerator program operating across 50+ hubs worldwide. Techstars provides $120,000 in pre-seed funding and hands-on corporate partnerships.",
    eligibility: "High-potential startups with a solid co-founding team and proof-of-concept.",
    category: "Accelerators",
    country: "Global",
    industry: "All Industries",
    startupStage: "Pre-seed",
    applicationLink: "https://techstars.com",
    value: "$120,000 Capital + Mentorship",
    deadline: "Nov 30, 2026",
    verificationStatus: "Verified",
    updateHistory: "Updated 2 weeks ago",
    tags: ["techstars", "accelerator", "funding", "mentorship"]
  },

  // 7. Incubators
  {
    id: "lst-cii",
    name: "CIIE.CO India Tech Incubator",
    logoColor: "from-blue-600 to-teal-600",
    description: "Based at IIM Ahmedabad, CIIE.CO incubates deep-tech and social impact ventures, offering structured seed investment, physical spaces, and corporate networks.",
    eligibility: "Indian technology-enabled startups focusing on deep-tech, fintech, or climate action.",
    category: "Incubators",
    country: "India",
    industry: "FinTech, DeepTech, Climate",
    startupStage: "Idea",
    applicationLink: "https://ciie.co",
    value: "₹25 Lakhs Seed + Lab Space",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated 3 days ago",
    tags: ["incubator", "india", "iima", "lab", "deeptech"]
  },

  // 8. Startup Competitions
  {
    id: "lst-mit50k",
    name: "MIT $100K Entrepreneurship Competition",
    logoColor: "from-red-600 to-black",
    description: "One of the most famous student startup competitions globally. Multiple tracks spanning Elevate, Accelerate, and Launch. Offers non-dilutive prize capital.",
    eligibility: "Must include at least one active MIT degree-seeking student in the founding team.",
    category: "Startup Competitions",
    country: "Global",
    industry: "DeepTech, Biotech, Climate",
    startupStage: "Idea",
    applicationLink: "https://www.mit100k.org/",
    value: "$100,000 Prize Money",
    deadline: "Oct 20, 2026",
    verificationStatus: "Verified",
    updateHistory: "Verified active for 2026",
    tags: ["mit", "boston", "student", "competition", "prize"]
  },

  // 9. Fellowships
  {
    id: "lst-thiel",
    name: "Thiel Fellowship",
    logoColor: "from-zinc-700 to-zinc-900",
    description: "Founded by Peter Thiel, the fellowship gives $100,000 to young builders who want to build new things instead of sitting in a classroom.",
    eligibility: "Aged 22 or under, willing to drop out or defer university to build a technology startup.",
    category: "Fellowships",
    country: "Global",
    industry: "All Industries",
    startupStage: "Idea",
    applicationLink: "https://thielfellowship.org",
    value: "$100,000 Fellowship Grant",
    deadline: "Rolling",
    verificationStatus: "Featured",
    updateHistory: "Vetted Active Program",
    tags: ["thiel", "fellowship", "youth", "dropouts", "peter-thiel"]
  },

  // 10. Student Opportunities
  {
    id: "lst-student-git",
    name: "GitHub Student Developer Pack",
    logoColor: "from-purple-900 to-black",
    description: "The ultimate student toolbox. Access free premium tools, DigitalOcean credits, Heroku credits, Namecheap domains, Stripe Atlas credits, and complete developer courses.",
    eligibility: "Active high school or university student with a verified .edu email or school ID.",
    category: "Student Opportunities",
    country: "Global",
    industry: "All Industries",
    startupStage: "All Stages",
    applicationLink: "https://education.github.com/pack",
    value: "$1,500+ Value Tech Stack",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated 1 day ago",
    tags: ["student", "edu", "github", "free-tier", "hosting"]
  },

  // 11. Hackathons
  {
    id: "lst-hack-eth",
    name: "ETHGlobal Hackathons",
    logoColor: "from-sky-500 to-blue-700",
    description: "Weekend code hackathons focusing on building decentralized protocols, smart contracts, and Web3 products. Large cash prize pools sponsored by leading foundations.",
    eligibility: "Developers, designers, and web3 enthusiasts globally.",
    category: "Hackathons",
    country: "Global",
    industry: "Web3 & Blockchain",
    startupStage: "All Stages",
    applicationLink: "https://ethglobal.com",
    value: "$50,000+ Prize Pools",
    deadline: "Nov 12, 2026",
    verificationStatus: "Verified",
    updateHistory: "Updated 5 days ago",
    tags: ["ethereum", "hackathon", "web3", "solidity", "defi"]
  },

  // 12. Founder Resources
  {
    id: "lst-legal-templates",
    name: "Y Combinator Standard SAFE Templates",
    logoColor: "from-orange-500 to-red-500",
    description: "Industry-standard Simple Agreement for Future Equity (SAFE) legal documents used to raise seed investment quickly without high legal attorney fees.",
    eligibility: "Available to any entrepreneur looking to raise capital globally.",
    category: "Founder Resources",
    country: "Global",
    industry: "All Industries",
    startupStage: "All Stages",
    applicationLink: "https://www.ycombinator.com/documents/",
    value: "Free Pro Legal Templates",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated Q3 2026 standard",
    tags: ["safe", "legal", "fundraising", "equity", "templates"]
  },

  // 13. Startup Ideas
  {
    id: "lst-ideas-b2b",
    name: "Vetted Micro-SaaS Startup Ideas",
    logoColor: "from-[#a855f7] to-[#ec4899]",
    description: "Highly detailed, validated startup ideas mapping specific pain points in developer workflow, B2B AI agents, and workflow automations, including cost & competitor analyses.",
    eligibility: "Open database for founders looking to build their next profitable side project.",
    category: "Startup Ideas",
    country: "Global",
    industry: "SaaS & AI",
    startupStage: "Idea",
    applicationLink: "https://ais-dev-2ysxsj4syzux45dzyeonxt-368660833116.asia-east1.run.app",
    value: "Free Validation Research",
    deadline: "Weekly Drops",
    verificationStatus: "Verified",
    updateHistory: "Vetted and posted today",
    tags: ["ideas", "micro-saas", "validation", "ai-agents", "indie-hackers"]
  },

  // 14. Startup Directory
  {
    id: "lst-directory-beam",
    name: "Global Tech Directory",
    logoColor: "from-blue-600 via-[#10b981] to-[#22d3ee]",
    description: "Comprehensive public database showcasing active, early-stage software companies, SaaS utilities, and Web3 builders across the ecosystem.",
    eligibility: "Open to active product teams seeking early discovery, feedback, and recruiter eyes.",
    category: "Startup Directory",
    country: "Global",
    industry: "All Industries",
    startupStage: "All Stages",
    applicationLink: "https://beamstart.com",
    value: "Free Public Marketing Page",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated yesterday",
    tags: ["directory", "marketing", "startups", "launch", "outreach"]
  },

  // 15. Investor Directory
  {
    id: "lst-investor-map",
    name: "Signal NFX Founder-Investor Database",
    logoColor: "from-[#ec4899] to-red-600",
    description: "Largest open platform connecting founders with venture capitalists, angel networks, and syndicates. Filter investors by ticket size, industry sectors, and warm intros.",
    eligibility: "Founders seeking pre-seed, seed, or Series A financing.",
    category: "Investor Directory",
    country: "Global",
    industry: "All Industries",
    startupStage: "All Stages",
    applicationLink: "https://signal.nfx.com",
    value: "15,000+ Vetted Investor Contacts",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated 1 day ago",
    tags: ["vc", "angels", "investors", "fundraising", "directory"]
  },

  // 16. Community Programs
  {
    id: "lst-community-indie",
    name: "Indie Hackers Meetup Program",
    logoColor: "from-[#a855f7] to-[#11101c]",
    description: "The official network of offline and online builder meetups. Join local tech circles, pitch projects, share MRR achievements, and co-founder match with fellow makers.",
    eligibility: "Bootstrappers, software makers, designers, and product creators.",
    category: "Community Programs",
    country: "Global",
    industry: "All Industries",
    startupStage: "All Stages",
    applicationLink: "https://indiehackers.com",
    value: "Global Support Network",
    deadline: "Rolling",
    verificationStatus: "Verified",
    updateHistory: "Updated Q3 2026",
    tags: ["community", "meetups", "indiehackers", "networking", "collab"]
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "art-1",
    title: "How to Stack $500,000 in Startup Credits Without Dilution",
    slug: "stacking-credits-guide",
    excerpt: "A tactical masterclass on timing and staging cloud infrastructure, telemetry, and SaaS credits to extend your bootstrapper runway up to 18 months.",
    category: "Runway Extension",
    tags: ["credits", "cloud", "saas", "bootstrapping"],
    author: {
      name: "Suresh Nagidi",
      role: "Lead Platform Coach",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
    },
    readTime: "6 min read",
    publishedAt: "July 2, 2026",
    commentsCount: 14,
    content: `### Stacking Cloud and SaaS Credits Like a Pro

The single biggest cost center for early-stage software startups is **infrastructure** and operational tool overhead. Between hosting, monitoring, product analytics, and customer support databases, a pre-revenue product can easily burn **$1,500+ monthly** before securing its first paid subscriber.

Many serial founders utilize a tactic known as **perks stacking**. By mapping out provider timelines, you can effectively run your entire backend and frontend stacks for free.

#### 1. Phase 1: Pre-revenue and Sandbox Dev
- **AWS Activate Founders** or **Microsoft Founders Hub (Level 1)**: Start here. Avoid claiming high-tier credits until you are actively scaling traffic. Founders Hub provides $150,000 Azure credits with OpenAI API support out-of-the-box, no external sponsor required.
- **PostHog for Startups**: Rather than paying Mixpanel or Amplitude early, claim the $50k PostHog credits to track sessions and quantitative behavior without limit.

#### 2. Staging Your Rollout
Claiming all 200 deals on day one is a rookie mistake. Most startup credits have a **12-month expiration cycle**. Only claim a deal when that software is actively entering your core production roadmap.

\`\`\`
[Month 0-3: Sandbox]  --->  [Month 3-6: Beta Launch] --->  [Month 6-12: Scale]
Claim AWS/Stripe Atlas      Claim PostHog & Auth0         Claim Datadog & Sentry
\`\`\`

#### Conclusion
By strategically pacing your credits claiming pattern, you protect your cash runway, allowing you to iterate on product-market fit without investor-induced equity dilution.`
  },
  {
    id: "art-2",
    title: "Vetting Government Grants: The Indian & US Pathways",
    slug: "vetted-government-grants-pathways",
    excerpt: "A systematic structural analysis contrasting US SBIR programs with Indian NIDHI initiatives to fund deeptech hardware & biotech.",
    category: "Funding Strategies",
    tags: ["grants", "non-dilutive", "sbir", "nidhi"],
    author: {
      name: "Arjun Verma",
      role: "Venture Partner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
    },
    readTime: "8 min read",
    publishedAt: "June 28, 2026",
    commentsCount: 8,
    content: `### Navigating Non-Dilutive Government Grants

Venture capital is expensive. Diluting 15-20% of your equity in a pre-seed round should be a last resort, particularly for core research and hardware prototypes that have a long path to commercialization. This is where government grant instruments enter the picture.

#### The US SBIR Framework
The **Small Business Innovation Research (SBIR)** program is a highly competitive, phased federal funding vehicle.
1. **Phase I**: Aimed at establishing technical merit and commercial potential. Rewards range between **$150,000 and $275,000** over 6-12 months.
2. **Phase II**: Substantial expansion of research, often yielding up to **$1,000,000+** in non-dilutive capital.

#### The Indian Startup India & DST Pathway
For Indian innovators, the Department of Science and Technology (DST) has created the **NIDHI Prayas** grant.
- **Focus**: Targeted strictly at converting raw, high-potential research into working physical prototypes.
- **Value**: Up to **₹10 Lakhs** disbursed directly to the innovator or team, backed by designated university incubation hubs.

#### Summary Table of Requirements
| Criteria | US SBIR/STTR | India NIDHI Prayas |
|---|---|---|
| Focus | DeepTech Research | Prototyping Innovation |
| Citizens Requirement | >50% US Citizen Owned | Indian Residents / Incubated |
| Max Cap Value | $275,000 (Phase I) | ₹10,000,000 |

Always remember: grant compliance and reporting takes time. Keep detailed transactional records to ensure smooth auditing.`
  }
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "sub-free",
    name: "Free",
    price: "$0",
    billing: "Free Forever",
    popular: false,
    color: "border-slate-800",
    features: [
      "Access to 50+ basic SaaS deals",
      "Standard search functionality",
      "Monthly newsletter",
      "Community forum access"
    ]
  },
  {
    id: "sub-student",
    name: "Student Perks",
    price: "$12",
    billing: "Billed annually ($1/mo)",
    popular: false,
    color: "border-teal-500/30",
    badge: "For Academics",
    features: [
      "Unlock 900+ verified student deals",
      "DigitalOcean, Stripe Atlas, and GitHub premium packs",
      "Campus fellowships matching database",
      "Prioritized review for student hacks",
      "Full search and advanced eligibility filters"
    ]
  },
  {
    id: "sub-founder",
    name: "Founder",
    price: "$75",
    billing: "Billed annually ($6.25/mo)",
    popular: true,
    color: "border-cyan-500/50 shadow-cyan-500/10 shadow-lg",
    badge: "Most Popular",
    features: [
      "Unlock all $500,000+ cloud, AI, and SaaS deals",
      "Full $10M non-dilutive grant search engine",
      "Accelerator deadline alerts via email",
      "Smart AI Advisor with unlimited recommendations",
      "Weekly updated flash deal access",
      "Priority verification for claimed deals"
    ]
  },
  {
    id: "sub-pro",
    name: "Pro Scale",
    price: "$149",
    billing: "Billed annually",
    popular: false,
    color: "border-purple-500/30",
    badge: "For Scaling Teams",
    features: [
      "Everything in Founder plan",
      "Up to 5 team member seats included",
      "Anonymized VC investor database with Signal integration",
      "Custom stacking playbook designed by our team",
      "Live support channels (Discord/Slack access)"
    ]
  },
  {
    id: "sub-lifetime",
    name: "Legend Lifetime",
    price: "$299",
    billing: "One-time flat payment",
    popular: false,
    color: "border-amber-500/40",
    badge: "Best Value",
    features: [
      "LIFETIME access to all present & future listings",
      "No recurring annual fees ever",
      "Direct matchmaking with featured partner programs",
      "Premium ad-free navigation terminal",
      "1-on-1 private advisory session (30 mins)",
      "VIP beta updates and deal priorities"
    ]
  }
];

export const MOCK_USERS_LIST = [
  { id: "usr-1", name: "Suresh Nagidi", email: "nagidisuresh5727@gmail.com", role: "Super Admin", subscription: "Lifetime" },
  { id: "usr-2", name: "Ananya Roy", email: "ananya@startup.io", role: "Founder", subscription: "Founder" },
  { id: "usr-3", name: "Rohit Kumar", email: "rohit.k@mit.edu", role: "Member", subscription: "Student" },
  { id: "usr-4", name: "Deepak Sharma", email: "deepak@fintechlabs.co", role: "Member", subscription: "Pro Scale" },
  { id: "usr-5", name: "Sarah Jenkins", email: "sarah@ai-analytics.com", role: "Founder", subscription: "Free" }
];
