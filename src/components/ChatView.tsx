import React, { useState, useRef, useEffect } from "react";
import { 
  Send, Sparkles, User, Mic, FileText, Briefcase, 
  CornerDownLeft, Compass, Info, Trash2, ShieldAlert
} from "lucide-react";
import { Message } from "../types";
import Markdown from "react-markdown";

type CoachTab = "chat" | "industry" | "salary" | "outreach";

export default function ChatView() {
  const [activeCoachTab, setActiveCoachTab] = useState<CoachTab>("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "model",
      text: "Hi! I'm NextRoundPrep's AI Career Coach ✨ — ask me anything about interviews, coding, careers, or exams.\n\nYou can also use the specialized templates above for **Industry Strategies**, **Salary Negotiation Prep**, or **Outreach Outreach Templates**!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Industry advice states
  const [indIndustry, setIndIndustry] = useState("Software & Tech");
  const [indLevel, setIndLevel] = useState("Entry-Level / Graduate");
  const [indCompanyType, setIndCompanyType] = useState("Fortune 500 / Big Tech");

  // Salary Negotiation states
  const [salTitle, setSalTitle] = useState("");
  const [salCompany, setSalCompany] = useState("");
  const [salBase, setSalBase] = useState("");
  const [salLocation, setSalLocation] = useState("");
  const [salEquity, setSalEquity] = useState(false);
  const [salSignOn, setSalSignOn] = useState(false);
  const [salPTO, setSalPTO] = useState(false);

  // Outreach states
  const [outRecipient, setOutRecipient] = useState("Recruiter");
  const [outPlatform, setOutPlatform] = useState("LinkedIn Connection (Limit: 300 chars)");
  const [outContext, setOutContext] = useState("Found an open role online");
  const [outTargetCompany, setOutTargetCompany] = useState("");

  const suggestedPrompts = [
    "Tips to crack Google SDE interview",
    "How to structure my salary counter-offer?",
    "Explain Two Sum in Python",
    "How to ask a Senior Dev for a referral on LinkedIn"
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, activeCoachTab]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Build history payload for the backend
      const historyPayload = [...messages, userMessage].map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!response.ok) {
        throw new Error("Failed to receive coach feedback.");
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "model",
          text: "⚠️ I encountered an error communicating with the career pipeline. However, here are some quick guidelines: keep your algorithms structured, focus on metrics in your resume, and practice mock tests weekly to master your interviews!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "m1",
        role: "model",
        text: "Hi! I'm NextRoundPrep's AI Career Coach ✨ — ask me anything about interviews, coding, careers, or exams.\n\nYou can also use the specialized templates above for **Industry Strategies**, **Salary Negotiation Prep**, or **Outreach Outreach Templates**!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Generate handlers
  const handleGenerateIndustryAdvice = () => {
    const prompt = `As my AI Career Coach, please provide industry-specific advice for entering or progressing in the **${indIndustry}** sector as a **${indLevel}** professional targeting **${indCompanyType}** companies. 

Structure your response as follows:
1. 📈 **Industry Landscape & Trends**: Current hiring activity, key technologies, and skills in high demand.
2. 🎯 **Strategic Positioning**: How to structure my profile, resume, and portfolio specifically to grab their attention.
3. 🗺️ **30-60-90 Day Action Plan**: Bulletproof step-by-step roadmap to land interviews or secure promotions.`;

    setActiveCoachTab("chat");
    handleSend(prompt);
  };

  const handleGenerateSalaryNegotiation = () => {
    if (!salTitle.trim() || !salCompany.trim()) {
      return;
    }
    const targets = [];
    if (salEquity) targets.push("Equity/Stock Options");
    if (salSignOn) targets.push("Sign-on Bonus");
    if (salPTO) targets.push("Extra PTO / Flexible Hours");
    if (targets.length === 0) targets.push("Higher Base Salary");

    const prompt = `As my AI Career Coach, help me negotiate a job offer. Here are the details of the offer:
- 💼 **Job Title**: ${salTitle}
- 🏢 **Company**: ${salCompany}
- 💵 **Initial Base Offer**: ${salBase ? `$${salBase}` : "To be negotiated / market rate"}
- 📍 **Location**: ${salLocation || "Unspecified"}
- 🎯 **Target Areas of Negotiation**: ${targets.join(", ")}

Please provide:
1. ⚖️ **Offer Analysis & Leverage**: What specific bargaining power I have for this type of company and role.
2. 📧 **Polite & Powerful Email Template**: A high-converting, copy-pasteable email draft to send back to the recruiter asking for a counter-offer.
3. 💬 **Live Conversation Script**: Precise verbal responses to handle common recruiter rebuttals (like "our bands are strictly fixed").`;

    setActiveCoachTab("chat");
    handleSend(prompt);
  };

  const handleGenerateOutreach = () => {
    const prompt = `As my AI Career Coach, draft outreach templates for connecting with a **${outRecipient}** on **${outPlatform}**${outTargetCompany ? ` at **${outTargetCompany}**` : ""}. 
- 🔗 **Outreach Channel**: ${outPlatform}
- 💼 **Recipient Role**: ${outRecipient}
- 💡 **Context / Connection**: ${outContext}

Please provide:
1. 🎯 **Outreach Strategy**: 2-3 specific behavioral psychology tactics to increase their response rate.
2. ✍ *Copy-Paste Message Drafts*: 2 distinct, highly compelling templates tailored specifically for this platform and context (honoring any character restrictions like LinkedIn's 300-character limit).
3. ⏱️ **Follow-up Cadence**: Guidelines on when and how to follow up politely if they do not reply.`;

    setActiveCoachTab("chat");
    handleSend(prompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-24 pb-16 px-4">
      
      {/* Headings */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
          Your always-on <span className="text-gradient">AI Career Coach.</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
          Ask anything. Get personalized industry strategy blueprints, salary negotiation scripts, or high-converting networking outreach templates.
        </p>
      </div>

      {/* Main Chat card */}
      <div className="glass-card rounded-[22px] overflow-hidden flex flex-col h-[600px] shadow-2xl relative border border-[rgba(255,255,255,0.08)]">
        
        {/* Chat Card Header */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-black/15 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-gradient rounded-full flex items-center justify-center font-bold text-white shadow-md">
              N
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">NextRoundPrep Coach Core</h3>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live AI Assistant
              </span>
            </div>
          </div>

          <button 
            onClick={handleClearHistory}
            className="p-1.5 text-gray-500 hover:text-rose-400 rounded-lg hover:bg-black/20 transition-colors"
            title="Clear History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs selector */}
        <div className="flex border-b border-[rgba(255,255,255,0.06)] bg-black/10 p-1.5 gap-1.5">
          {[
            { id: "chat", name: "💬 Chat Coach" },
            { id: "industry", name: "👔 Industry Strategy" },
            { id: "salary", name: "💰 Salary Negotiation" },
            { id: "outreach", name: "🤝 Outreach Builder" },
          ].map((tab) => {
            const isSelected = activeCoachTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCoachTab(tab.id as CoachTab)}
                className={`flex-1 text-center py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-500/15 text-purple-200 border border-purple-500/30 shadow-[0_2px_10px_rgba(168,85,247,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Contents: Standard Chat */}
        {activeCoachTab === "chat" && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m) => {
              const isModel = m.role === "model";
              return (
                <div 
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {/* Avatar circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isModel ? 'bg-accent-gradient text-white shadow-sm' : 'bg-gray-800 text-gray-300 border border-[rgba(255,255,255,0.05)]'
                  }`}>
                    {isModel ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-1">
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isModel 
                        ? 'bg-[#15141f] text-gray-200 border border-[rgba(255,255,255,0.04)]' 
                        : 'bg-accent-gradient text-white font-medium'
                    }`}>
                      {isModel ? (
                        <div className="markdown-body">
                          <Markdown>{m.text}</Markdown>
                        </div>
                      ) : (
                        m.text
                      )}
                    </div>
                    <span className={`block text-[8px] font-mono text-gray-500 ${isModel ? 'text-left' : 'text-right'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Ellipsis */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 bg-accent-gradient rounded-full flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-[#15141f] rounded-2xl px-4 py-3 border border-[rgba(255,255,255,0.04)] flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Tab Contents: Industry Strategy Advice */}
        {activeCoachTab === "industry" && (
          <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 text-purple-400 border-b border-[rgba(255,255,255,0.06)] pb-3">
                <Briefcase className="w-5 h-5 text-purple-400" />
                <div>
                  <h4 className="font-display font-semibold text-base text-white">Custom Industry Blueprint</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Map out strategic milestones and requirements for your target industry and level.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Industry Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Target Industry</label>
                  <select
                    value={indIndustry}
                    onChange={(e) => setIndIndustry(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3 bg-[#0d0c18] border border-white/10"
                  >
                    <option value="Software & Tech">💻 Software & Tech</option>
                    <option value="Product Management">📊 Product Management</option>
                    <option value="Finance & Investment Banking">🏦 Finance & Investment Banking</option>
                    <option value="Digital Marketing">🎯 Digital Marketing</option>
                    <option value="Healthcare & Biotech">🩺 Healthcare & Biotech</option>
                  </select>
                </div>

                {/* Level */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Experience Level</label>
                  <select
                    value={indLevel}
                    onChange={(e) => setIndLevel(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3 bg-[#0d0c18] border border-white/10"
                  >
                    <option value="Entry-Level / Graduate">🎓 Entry-Level / Graduate</option>
                    <option value="Mid-Career Professional">🚀 Mid-Career Professional</option>
                    <option value="Senior Lead / Executive">👑 Senior Lead / Executive</option>
                  </select>
                </div>

                {/* Company Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Target Company Type</label>
                  <select
                    value={indCompanyType}
                    onChange={(e) => setIndCompanyType(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3 bg-[#0d0c18] border border-white/10"
                  >
                    <option value="Fortune 500 / Big Tech">🌐 Fortune 500 / Big Tech</option>
                    <option value="High-Growth Startup">🦄 High-Growth Startup</option>
                    <option value="Medium Enterprise">🏢 Medium Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="bg-purple-500/5 rounded-2xl p-4 border border-purple-500/10 flex gap-3 text-xs text-purple-300 leading-relaxed">
                <Info className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  This custom playbook covers technical skills in high demand, profile optimization hacks, and a structured 30-60-90 day entry schedule to successfully break into your dream sector.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex justify-end">
              <button
                onClick={handleGenerateIndustryAdvice}
                className="bg-accent-gradient hover:opacity-95 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" /> Generate Strategy Blueprint
              </button>
            </div>
          </div>
        )}

        {/* Tab Contents: Salary Negotiation Planner */}
        {activeCoachTab === "salary" && (
          <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 text-emerald-400 border-b border-[rgba(255,255,255,0.06)] pb-3">
                <Compass className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="font-display font-semibold text-base text-white">Offer Negotiation Planner</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Prepare structured emails and responses to negotiate higher base pay, bonuses, or equity.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Job Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    value={salTitle}
                    onChange={(e) => setSalTitle(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Company Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Stripe"
                    value={salCompany}
                    onChange={(e) => setSalCompany(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Initial Base Offer ($ / Year)</label>
                  <input
                    type="text"
                    placeholder="e.g., 145,000"
                    value={salBase}
                    onChange={(e) => setSalBase(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Job Location / Remote Status</label>
                  <input
                    type="text"
                    placeholder="e.g., San Francisco, CA (Remote)"
                    value={salLocation}
                    onChange={(e) => setSalLocation(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3"
                  />
                </div>
              </div>

              {/* Checkbox multi-selectors */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Key Target Compensation Areas</label>
                <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={salEquity}
                      onChange={(e) => setSalEquity(e.target.checked)}
                      className="accent-purple-500 h-4 w-4 rounded border-gray-600 bg-[#0d0c18]"
                    />
                    Stock Options / Equity
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={salSignOn}
                      onChange={(e) => setSalSignOn(e.target.checked)}
                      className="accent-purple-500 h-4 w-4 rounded border-gray-600 bg-[#0d0c18]"
                    />
                    Sign-on Bonus
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={salPTO}
                      onChange={(e) => setSalPTO(e.target.checked)}
                      className="accent-purple-500 h-4 w-4 rounded border-gray-600 bg-[#0d0c18]"
                    />
                    Extra PTO & Flexible Hours
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex justify-end">
              <button
                onClick={handleGenerateSalaryNegotiation}
                disabled={!salTitle.trim() || !salCompany.trim()}
                className="bg-accent-gradient hover:opacity-95 disabled:opacity-40 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" /> Build Negotiation Strategy
              </button>
            </div>
          </div>
        )}

        {/* Tab Contents: Outreach & Referral Builder */}
        {activeCoachTab === "outreach" && (
          <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 text-cyan-400 border-b border-[rgba(255,255,255,0.06)] pb-3">
                <Compass className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="font-display font-semibold text-base text-white">Outreach & Referral Strategist</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Draft high-converting templates and sequence guides to establish direct connection.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recipient */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Outreach Target</label>
                  <select
                    value={outRecipient}
                    onChange={(e) => setOutRecipient(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3 bg-[#0d0c18] border border-white/10"
                  >
                    <option value="Recruiter">🧑‍💼 Recruiter / Talent Sourcer</option>
                    <option value="Hiring Manager">👔 Hiring Manager / Tech Lead</option>
                    <option value="Alumnus / Peer Employee">👥 Alumnus / Peer Employee</option>
                  </select>
                </div>

                {/* Platform */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Outreach Channel</label>
                  <select
                    value={outPlatform}
                    onChange={(e) => setOutPlatform(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3 bg-[#0d0c18] border border-white/10"
                  >
                    <option value="LinkedIn Connection (Limit: 300 chars)">💬 LinkedIn Connection Request (Under 300 Chars)</option>
                    <option value="Cold Email / LinkedIn InMail">📧 Cold Email / Full InMail Draft</option>
                  </select>
                </div>

                {/* Context */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Context & Shared Ground</label>
                  <select
                    value={outContext}
                    onChange={(e) => setOutContext(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3 bg-[#0d0c18] border border-white/10"
                  >
                    <option value="Found an open role online">🔍 Found an active job posting online</option>
                    <option value="Alumni of the same school/bootcamp">🤝 Alumni of the same university/bootcamp</option>
                    <option value="Admire their team's product/articles">💡 Admire their work / Pure networking</option>
                  </select>
                </div>

                {/* Target Company */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Target Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Apple, Microsoft"
                    value={outTargetCompany}
                    onChange={(e) => setOutTargetCompany(e.target.value)}
                    className="w-full glass-input text-xs text-white rounded-xl py-2.5 px-3"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex justify-end">
              <button
                onClick={handleGenerateOutreach}
                className="bg-accent-gradient hover:opacity-95 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" /> Draft Outreach Campaign
              </button>
            </div>
          </div>
        )}

        {/* Suggested Prompt Chips container (only shows on standard chat when user hasn't sent custom questions) */}
        {activeCoachTab === "chat" && messages.length === 1 && (
          <div className="px-5 py-3.5 bg-black/10 border-t border-[rgba(255,255,255,0.04)]">
            <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase mb-2">SUGGESTED ENQUIRIES</span>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-xs bg-[#131520] hover:bg-black/50 border border-[rgba(255,255,255,0.06)] hover:border-transparent text-gray-300 py-1.5 px-3.5 rounded-full transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Card Input form (only shows on standard chat) */}
        {activeCoachTab === "chat" && (
          <form onSubmit={handleFormSubmit} className="p-4 border-t border-[rgba(255,255,255,0.06)] bg-black/15 flex gap-3 items-center">
            <input 
              type="text" 
              placeholder="Ask anything about coding, careers, or exams..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-grow glass-input text-sm text-white rounded-[12px] py-3 px-4"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-11 h-11 bg-accent-gradient hover:opacity-90 disabled:opacity-40 text-white rounded-full flex items-center justify-center shadow-lg transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-4.5 h-4.5 text-white" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

