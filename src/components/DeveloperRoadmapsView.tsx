import React, { useState } from "react";
import { 
  Map, 
  Copy, 
  Check, 
  ExternalLink, 
  Code, 
  ListTodo, 
  MessageSquare, 
  Sparkles, 
  Compass, 
  Cpu, 
  ArrowRight, 
  Laptop, 
  Briefcase, 
  FileText, 
  Workflow,
  Share2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DeveloperRoadmapsView() {
  const [activeSubSection, setActiveSubSection] = useState<"manychat" | "roadmap-sh" | "prompts" | "checklist">("manychat");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
  });

  const handleToggleCheck = (key: string) => {
    const nextVal = !checkedItems[key];
    setCheckedItems(prev => ({ ...prev, [key]: nextVal }));
    if (nextVal) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#10b981", "#c084fc"]
      });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.8 },
      colors: ["#22d3ee", "#3b82f6"]
    });
    setTimeout(() => setCopiedText(null), 2000);
  };

  const masterSaaS_Prompt = `Build a premium SaaS platform similar to ManyChat with a modern UI inspired by Linear, Framer, and Notion.

The platform should allow creators and businesses to connect Instagram Business accounts using Meta OAuth and build advanced Instagram DM automations with an intuitive drag-and-drop flow builder.

Include:
• Beautiful landing page with hero animation, feature sections, pricing, testimonials, FAQs, CTA, and dark/light mode.
• Secure authentication (Google, Facebook, Email).
• Dashboard showing followers, conversations, automations, leads, conversion rate, click rate, and revenue.
• Instagram account connection using Meta APIs.
• Visual drag-and-drop automation builder.
• Automation blocks: Message, Image, Video, Buttons, Delay, Conditions, User Input, AI Response, API Request, Tags, Email Capture, Phone Capture, Webhook.
• Triggers: Comment Trigger, Story Reply, DM Keyword, Reel Comment, Live Comment, Follow Trigger, Referral URL Trigger, Mention Trigger.
• AI chatbot powered by GPT/Gemini for natural conversations.
• CRM to manage contacts, tags, custom fields, notes, conversation history, and segmentation.
• Broadcast campaigns with scheduling, recurring messages, and analytics.
• Referral URL generator that opens Instagram DMs and automatically starts a selected flow with campaign tracking parameters.
• Analytics dashboard with charts, funnels, conversion tracking, click-through rate, response rate, and revenue attribution.
• Pre-built templates for Ecommerce, Coaching, Education, Real Estate, SaaS, Restaurants, and Fitness.
• Integrations with WhatsApp, Facebook Messenger, Telegram, Shopify, WooCommerce, Stripe, Razorpay, Google Sheets, Zapier, HubSpot, and Salesforce.
• Team roles (Owner, Admin, Manager, Support Agent).
• Subscription management with Stripe and Razorpay.
• Admin dashboard for managing users, templates, billing, reports, and support.
• Responsive design for desktop, tablet, and mobile.
• Premium animations using Framer Motion.
• Backend using Node.js, PostgreSQL, Prisma, Redis, and REST APIs.
• Frontend using Next.js, React, TypeScript, Tailwind CSS, and Shadcn UI.
• Clean architecture, reusable components, production-ready code, SEO optimization, accessibility, and high performance.`;

  const webChatbot_Prompt = `Act as an expert full-stack developer and conversion rate optimization (CRO) specialist. I want to build a high-converting, single-page, conversational chatbot landing page that functions exactly like an advanced Instagram ManyChat automation funnel. 

Please generate the complete, clean, and responsive code (HTML, CSS, and modern JavaScript) for this website based on the following specifications:

1. Design & UI:
- A clean, modern, mobile-first design that looks like a sleek chat application (similar to Instagram DMs or WhatsApp).
- A dark mode theme with vibrant accent colors for buttons (e.g., electric blue, purple, or neon green) to drive clicks.
- Smooth animation transitions when new chat messages appear (a slight delay to simulate a real human typing).

2. The Conversation Flow Functionality:
- Step 1 (Welcome): The bot automatically types an engaging hook message introducing a valuable resource (e.g., a free ebook, course, or case study) and displays two quick-reply buttons: [Yes, send it to me!] and [Tell me more first].
- Step 2 (Information/Data Capture): If they click "Yes", the bot replies asking for their Email Address. Create an input field right inside the chat window that validates if it's a real email format.
- Step 3 (Qualification): Once the email is entered, the bot asks a qualifying question, such as "What is your biggest challenge right now?" with three button options: [Option A], [Option B], [Option C].
- Step 4 (Delivery): After they select an option, show a loading animation ("Analyzing your response...") for 1.5 seconds, then display the final message with a large, high-contrast CTA button containing the download/access link.

3. Technical Requirements:
- Use vanilla JavaScript for the chat logic state management (no heavy external frameworks unless necessary).
- Include a mock function block where I can later plug in a Webhook or API call (like Formspree, Make.com, or Zapier) to send the captured email data to a Google Sheet.
- Ensure the chat automatically scrolls down to the newest message as it appears.
- Make the layout completely optimized for mobile screens, as 90% of traffic will come from social media links.`;

  const manychatBlueprint_Prompt = `I want to build an automated Instagram DM funnel using ManyChat. The goal of this funnel is to convert traffic from a custom Ref Link into email subscribers and booked sales calls. 

Please write the exact script, button labels, and logical blueprint I need to set up inside the ManyChat Flow Builder:

1. Define the Trigger: A custom M.me / Ref URL link.
2. Message 1 (The Hook): Write an engaging, friendly 2-sentence opening message welcoming them from the link and giving them a clear Call to Action button to claim their free guide.
3. Message 2 (User Input): Write the message that asks for their email address, ensuring ManyChat saves it to the "System Field: Email" and triggers a validation error message if they type something invalid.
4. Message 3 (Segmentation): Create a multiple-choice question to segment the audience based on their current budget or skill level. Provide 3 specific button choices.
5. Message 4 (The Delivery & Next Step): Write the final delivery message containing the link to the free guide, plus a soft pitch to click a second button to book a strategy call on Calendly.

Please format this clearly as a step-by-step blueprint so I can copy the text and structure straight into the ManyChat visual builder.`;

  const roadmapClone_Prompt = `Project Overview:
Please generate a developer growth platform website named "DevPath". The website aims to provide systematic learning roadmaps, community networking, and progress tracking for software engineers.

Core Slogan: "Plan your tech career, starting from DevPath."
Target Audience: Junior to senior software engineers, CS students, tech professionals.

Features:
1. Landing Page:
   - Header with Logo, Navigation links, Login/Signup button.
   - Hero Section with strong Slogan, descriptive subtitle, and 'Explore Roadmaps' CTA button.
   - Social Proof: Metric statistics card representing GitHub Stars (350k+), registered users (2.8M+), Discord members (49K+).
   - Popular Roadmaps Grid showcasing Front-end, Back-end, DevOps, and Python with neat tech tags.
2. Interactive Roadmap Details Page (using nodes and connection lines like React Flow):
   - Node-based interactive journey. Clicking on a node shows details (technology overview, importance level, curated resources).
   - Interactive progress bar enabling users to check off learned skills.
3. Community Integrations (Discord links, resource sharing submission form).
4. Auth & User profile (saving checked-off roadmap progress, personal study plan creator).

Tech Stack:
- Frontend: React or Vue with Tailwind CSS.
- Diagram/Graph Library: React Flow or vis.js to render highly responsive interactive roadmaps.
- Database: PostgreSQL with Prisma ORM to save user configurations.`;

  return (
    <div className="min-h-screen bg-[#06060c] text-slate-100 py-6 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Decorative Gradient Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0e0d1d] border border-white/5 p-8 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
        
        <div className="space-y-3 z-10">
          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full px-3 py-1 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">Creator Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Roadmaps Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl font-sans">
            Discover complete guides, conversational marketing scripts, manychat automation secrets, and ready-to-run master AI builder prompts to construct highly profitable lead-generation developer platforms.
          </p>
        </div>
        
        <button 
          onClick={() => copyToClipboard(masterSaaS_Prompt, "saas")}
          className="relative z-10 flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-2.5 px-5 rounded-xl border border-white/10 transition-all shadow-md group cursor-pointer"
        >
          {copiedText === "saas" ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Master SaaS Prompt Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <span>Copy Master SaaS Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-4 select-none">
        <button
          onClick={() => setActiveSubSection("manychat")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeSubSection === "manychat"
              ? "bg-[#18162e] border-purple-500/30 text-white shadow-lg"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Workflow className="w-4 h-4" />
          Instagram & ManyChat Systems
        </button>

        <button
          onClick={() => setActiveSubSection("roadmap-sh")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeSubSection === "roadmap-sh"
              ? "bg-[#18162e] border-purple-500/30 text-white shadow-lg"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Map className="w-4 h-4" />
          Roadmap.sh Platform Blueprint
        </button>

        <button
          onClick={() => setActiveSubSection("prompts")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeSubSection === "prompts"
              ? "bg-[#18162e] border-purple-500/30 text-white shadow-lg"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Code className="w-4 h-4" />
          Prompt Library Repository
        </button>

        <button
          onClick={() => setActiveSubSection("checklist")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeSubSection === "checklist"
              ? "bg-[#18162e] border-purple-500/30 text-white shadow-lg"
              : "bg-transparent border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <ListTodo className="w-4 h-4" />
          Step-by-Step Setup Tracker
        </button>
      </div>

      {/* Dynamic Content Display */}
      <div className="space-y-8">
        
        {/* Tab 1: ManyChat Systems */}
        {activeSubSection === "manychat" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Core Blueprint & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#121124]/30 border border-white/5 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 font-sans">
                  <Workflow className="w-5 h-5 text-cyan-400" />
                  What is a "Click-to-DM" lead generation flow?
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  This funnel is triggered when a user clicks a referral URL or replies to a key term on Instagram. Instead of redirecting to a boring static web page where conversions drop off, the link triggers a Meta API handshake that automatically opens an Instagram Direct Message chat sequence.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Step 1: Click Trigger</span>
                    <p className="text-[11px] text-gray-400">User clicks customized referral URL</p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Step 2: Instant Chat</span>
                    <p className="text-[11px] text-gray-400">IG direct message opens instantly</p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Step 3: Capture Lead</span>
                    <p className="text-[11px] text-gray-400">Validate emails & deliver assets</p>
                  </div>
                </div>
              </div>

              {/* Core Features list */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Replicated System Core Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Dynamic Landing Page", desc: "Minimal hero grids, real-time conversion stats and custom social proof vectors." },
                    { title: "Flow Automations", desc: "Keyword triggers, reel comment capture, auto story reply hooks, and story mentions." },
                    { title: "Drag & Drop Canvas", desc: "Create branching node logics with customizable conditions, user field inputs, and delays." },
                    { title: "CRM Sync & Integrations", desc: "Instantly stream email registrations directly to Stripe, HubSpot, and Google Sheets." }
                  ].map((feat, i) => (
                    <div key={i} className="p-4 bg-[#121124]/30 border border-white/5 rounded-xl space-y-1.5 hover:border-white/10 transition-colors">
                      <h4 className="text-xs font-bold text-white font-sans">{feat.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Chat Interface */}
            <div className="lg:col-span-5 bg-[#0a0a14] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
              {/* Phone Status bar */}
              <div className="bg-[#121124]/60 border-b border-white/5 px-4 py-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-300">Instagram DM Simulator</span>
                </div>
                <span className="text-[9px] font-mono text-gray-500">Live Delivery Flow</span>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
                
                {/* Bot Message 1 */}
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white select-none">
                    SN
                  </div>
                  <div className="bg-[#121124] border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs text-gray-200 font-sans space-y-1 shadow">
                    <p className="font-bold text-[10px] text-cyan-400">Suresh Nagidi • Chatbot</p>
                    <p>Hi there! Thanks for stopping by. Click the button below to instantly claim your Free Full-Stack Developer Guide! 🚀</p>
                  </div>
                </div>

                {/* User Click Action */}
                <div className="flex justify-end">
                  <div className="bg-purple-600/20 border border-purple-500/20 text-purple-200 p-2.5 rounded-2xl rounded-tr-none text-xs font-semibold max-w-[80%] font-sans">
                    👉 Yes, send it to me!
                  </div>
                </div>

                {/* Bot Message 2 */}
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white select-none">
                    SN
                  </div>
                  <div className="bg-[#121124] border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs text-gray-200 font-sans space-y-1 shadow">
                    <p className="font-bold text-[10px] text-cyan-400">Suresh Nagidi • Chatbot</p>
                    <p>Awesome choice! Where should I send your PDF? Please reply with your email address below.</p>
                  </div>
                </div>

                {/* User Input Action */}
                <div className="flex justify-end">
                  <div className="bg-purple-600/20 border border-purple-500/20 text-purple-200 p-2.5 rounded-2xl rounded-tr-none text-xs font-semibold max-w-[80%] font-sans">
                    dev.candidate@gmail.com
                  </div>
                </div>

                {/* Bot Message 3 */}
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white select-none">
                    SN
                  </div>
                  <div className="bg-[#121124] border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs text-gray-200 font-sans space-y-1 shadow">
                    <p className="font-bold text-[10px] text-cyan-400">Suresh Nagidi • Chatbot</p>
                    <p>Email validated & synced to Google Sheets! Here is your custom access link:</p>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); confetti({ particleCount: 30 }); }}
                      className="mt-1.5 inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 font-bold px-3 py-1.5 rounded-lg text-[10px] hover:bg-cyan-500/30 transition-colors"
                    >
                      Download Full-Stack Roadmap <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Chat Input */}
              <div className="border-t border-white/5 p-3 bg-black/40 flex items-center gap-2">
                <input 
                  type="text" 
                  disabled
                  placeholder="Automated chat session..." 
                  className="flex-1 bg-black/50 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-gray-400 cursor-not-allowed focus:outline-none"
                />
                <button 
                  disabled
                  className="bg-cyan-600/30 text-cyan-400 px-3 py-1.5 rounded-xl text-xs font-bold cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Roadmap.sh Clone Guide */}
        {activeSubSection === "roadmap-sh" && (
          <div className="space-y-6 animate-fade-in">
            {/* Intro Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "GitHub Stars", val: "359K+", desc: "Ranked #6 Globally" },
                { label: "Registered Users", val: "2.8M+", desc: "Daily Active Students" },
                { label: "Community", val: "49K+", desc: "Discord Members" },
                { label: "Architecture", val: "Community-driven", desc: "Open-source nodes" }
              ].map((stat, i) => (
                <div key={i} className="bg-[#121124]/30 border border-white/5 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{stat.label}</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">{stat.val}</div>
                  <p className="text-[10px] text-gray-400">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Core Strategy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Concept & Layout */}
              <div className="bg-[#121124]/20 border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Map className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-sans">Interactive Node Engine</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  The primary pillar of roadmap.sh is visual representation. Utilizing tree rendering libraries like <strong>React Flow</strong> or <strong>D3.js</strong> allows users to expand nodes, reveal contextual knowledge bases, and mark items as finished in database hooks.
                </p>
              </div>

              {/* CRM Integration */}
              <div className="bg-[#121124]/20 border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-sans">Dynamic User CRM</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Persist student learning paths across sessions. Each checkable node is tracked in PostgreSQL, enabling users to export custom PDF progress sheets, share accomplishments on LinkedIn, and request AI next-step reviews.
                </p>
              </div>

              {/* Community Integration */}
              <div className="bg-[#121124]/20 border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-sans">Resource Submissions</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Crowdsourced knowledge validation. Community members suggest learning articles, video playlists, and open-source sandboxes. Content remains pristine through administrator moderation dashboards.
                </p>
              </div>

            </div>

            {/* Code Box */}
            <div className="bg-black border border-white/5 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-mono text-gray-400">roadmap_clone_prompt.txt</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(roadmapClone_Prompt, "roadmap-clone")}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[10px] font-mono uppercase bg-white/5 py-1 px-2.5 rounded-md border border-white/10"
                >
                  {copiedText === "roadmap-clone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedText === "roadmap-clone" ? "Copied" : "Copy Prompt"}
                </button>
              </div>
              <pre className="text-[11px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60 scrollbar-thin">
                {roadmapClone_Prompt}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Prompt Library */}
        {activeSubSection === "prompts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            
            {/* Prompt Card 1 */}
            <div className="bg-[#121124]/30 border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded font-bold">Web Conversational Builder</span>
                  <Laptop className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white font-sans">AI Chatbot Landing Page Prompt</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Best for generating a bespoke client-side web application interface simulating real conversation logs, smart email captures, and progress triggers.
                </p>
              </div>

              <div className="bg-black/50 border border-white/5 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-[10px] text-gray-400 scrollbar-thin">
                {webChatbot_Prompt}
              </div>

              <button 
                onClick={() => copyToClipboard(webChatbot_Prompt, "web-chatbot")}
                className="w-full flex items-center justify-center gap-2 bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 font-bold text-xs py-2 px-4 rounded-xl border border-cyan-500/10 transition-colors cursor-pointer"
              >
                {copiedText === "web-chatbot" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedText === "web-chatbot" ? "Prompt Copied Successfully!" : "Copy Web-Based Chatbot Prompt"}
              </button>
            </div>

            {/* Prompt Card 2 */}
            <div className="bg-[#121124]/30 border border-white/5 rounded-3xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded font-bold">ManyChat Software Flow</span>
                  <Workflow className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-bold text-white font-sans">ManyChat Script & Logical Blueprint</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  Generates the visual conversation structure, quick reply button setups, conditional validation scripts, and lead capture maps.
                </p>
              </div>

              <div className="bg-black/50 border border-white/5 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-[10px] text-gray-400 scrollbar-thin">
                {manychatBlueprint_Prompt}
              </div>

              <button 
                onClick={() => copyToClipboard(manychatBlueprint_Prompt, "manychat-blueprint")}
                className="w-full flex items-center justify-center gap-2 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 font-bold text-xs py-2 px-4 rounded-xl border border-purple-500/10 transition-colors cursor-pointer"
              >
                {copiedText === "manychat-blueprint" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedText === "manychat-blueprint" ? "Prompt Copied Successfully!" : "Copy ManyChat Script Prompt"}
              </button>
            </div>

          </div>
        )}

        {/* Tab 4: Step-by-Step Setup Checklist */}
        {activeSubSection === "checklist" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-[#121124]/30 border border-white/5 rounded-2xl p-6 space-y-2">
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-amber-400" />
                SaaS Integration Checklist Tracker
              </h3>
              <p className="text-xs text-gray-400">
                Ensure perfect alignment with Meta/ManyChat policies by completing these manual workspace steps.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: "step1", num: "01", title: "Establish ManyChat Workspace", desc: "Create your workspace on ManyChat.com and link your Instagram Professional/Business account." },
                { key: "step2", num: "02", title: "Configure Automation Triggers", desc: "Head over to Automations -> New Flow and select 'User Clicks a Link' (Referral URL) as the core trigger." },
                { key: "step3", num: "03", title: "Build Chat Sequences", desc: "Use the drag-and-drop flow builder to configure the Welcome message nodes and custom button hooks." },
                { key: "step4", num: "04", title: "Integrate Contact Form Validation", desc: "Force email data type validation during user typing state in the text capture node." },
                { key: "step5", num: "05", title: "Synchronize CRM Services", desc: "Hook up Zapier or native ManyChat extensions to push lead records straight into Google Sheets." },
                { key: "step6", num: "06", title: "Configure Facebook Meta Pixel", desc: "Inject tracking tags inside the initial landing page to capture registration actions." },
                { key: "step7", num: "07", title: "Complete Mobile Sandbox Testing", desc: "Tap 'Preview' on ManyChat and execute a dry run of the full sequence on a physical phone." }
              ].map((step, i) => (
                <div 
                  key={step.key}
                  onClick={() => handleToggleCheck(step.key)}
                  className={`flex items-start gap-4 p-4 border rounded-xl transition-all cursor-pointer select-none ${
                    checkedItems[step.key]
                      ? "bg-emerald-500/5 border-emerald-500/10"
                      : "bg-[#121124]/10 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                    checkedItems[step.key]
                      ? "bg-emerald-500 border-emerald-400"
                      : "border-slate-600 bg-black/40"
                  }`}>
                    {checkedItems[step.key] && <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-500">{step.num}</span>
                      <h4 className={`text-xs font-bold font-sans ${checkedItems[step.key] ? "text-slate-400 line-through" : "text-white"}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
