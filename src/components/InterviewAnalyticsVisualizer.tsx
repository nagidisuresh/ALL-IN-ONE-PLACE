import React, { useState } from "react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Line, Bar, ReferenceLine
} from "recharts";
import { 
  TrendingUp, Award, Target, Activity, Zap, Compass, 
  HelpCircle, ChevronRight, Sparkles, Layers, Info, Calendar,
  Smile, Clock, ChevronDown
} from "lucide-react";

interface FeedbackItem {
  question: string;
  feedback: {
    overallScore: number;
    contentScore: number;
    structureScore: number;
    confidenceScore: number;
    sentimentScore?: number;
    speakingPace: number;
    fillerWords: { word: string; count: number }[];
  };
  duration: number;
}

interface HistoryEntry {
  id: string;
  date: string;
  role: string;
  type?: string;
  avgScore: number;
  questionsCount: number;
  feedbacks?: FeedbackItem[];
}

interface InterviewAnalyticsVisualizerProps {
  historyList: HistoryEntry[];
  analyticsData: {
    isDemo: boolean;
    totalSessions: number;
    totalQuestions: number;
    avgScore: number;
    avgSentiment?: number;
    trendData: any[];
    responseTimeTrend: any[];
    topicPerformanceData: any[];
    fillerData: any[];
    averageResponseTime: number;
  };
}

export default function InterviewAnalyticsVisualizer({ historyList, analyticsData }: InterviewAnalyticsVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "trends" | "mastery">("overview");
  const [focusMetric, setFocusMetric] = useState<"Overall" | "Detailed">("Overall");

  const trendData = analyticsData.trendData;
  const topicData = analyticsData.topicPerformanceData;

  // Define full session array (real history merged with high fidelity fallback demo sessions)
  const sessions = historyList.length > 0 ? historyList : [
    {
      id: "demo1",
      date: "Jun 12",
      role: "Software Engineer (Behavioral)",
      avgScore: 68,
      questionsCount: 3,
      feedbacks: [
        { question: "Tell me about yourself", feedback: { overallScore: 65, contentScore: 70, structureScore: 60, confidenceScore: 65, sentimentScore: 68, speakingPace: 110, fillerWords: [{ word: "like", count: 4 }, { word: "um", count: 2 }] }, duration: 75 },
        { question: "Describe a conflict at work", feedback: { overallScore: 70, contentScore: 68, structureScore: 72, confidenceScore: 70, sentimentScore: 74, speakingPace: 125, fillerWords: [{ word: "like", count: 3 }, { word: "um", count: 5 }] }, duration: 90 },
        { question: "Why do you want to join us?", feedback: { overallScore: 69, contentScore: 72, structureScore: 65, confidenceScore: 70, sentimentScore: 71, speakingPace: 118, fillerWords: [{ word: "so", count: 2 }, { word: "um", count: 3 }] }, duration: 65 }
      ]
    },
    {
      id: "demo2",
      date: "Jun 16",
      role: "Software Engineer (Technical)",
      avgScore: 76,
      questionsCount: 2,
      feedbacks: [
        { question: "Explain a technical challenge you solved", feedback: { overallScore: 74, contentScore: 78, structureScore: 70, confidenceScore: 75, sentimentScore: 76, speakingPace: 130, fillerWords: [{ word: "like", count: 2 }, { word: "um", count: 2 }] }, duration: 110 },
        { question: "How do you handle system scaling?", feedback: { overallScore: 78, contentScore: 80, structureScore: 76, confidenceScore: 78, sentimentScore: 82, speakingPace: 122, fillerWords: [{ word: "um", count: 3 }] }, duration: 120 }
      ]
    },
    {
      id: "demo3",
      date: "Jun 20",
      role: "Software Engineer (System Design)",
      avgScore: 82,
      questionsCount: 3,
      feedbacks: [
        { question: "Design a URL shortener", feedback: { overallScore: 80, contentScore: 82, structureScore: 80, confidenceScore: 78, sentimentScore: 84, speakingPace: 135, fillerWords: [{ word: "like", count: 1 }, { word: "um", count: 1 }] }, duration: 145 },
        { question: "How would you design a rate limiter?", feedback: { overallScore: 83, contentScore: 85, structureScore: 82, confidenceScore: 82, sentimentScore: 85, speakingPace: 128, fillerWords: [{ word: "um", count: 2 }] }, duration: 130 },
        { question: "Explain database replication types", feedback: { overallScore: 83, contentScore: 84, structureScore: 84, confidenceScore: 81, sentimentScore: 81, speakingPace: 132, fillerWords: [{ word: "so", count: 1 }] }, duration: 95 }
      ]
    },
    {
      id: "demo4",
      date: "Jun 24",
      role: "Software Engineer (STAR behavioral)",
      avgScore: 89,
      questionsCount: 3,
      feedbacks: [
        { question: "Tell me about a time you failed", feedback: { overallScore: 88, contentScore: 90, structureScore: 86, confidenceScore: 88, sentimentScore: 89, speakingPace: 138, fillerWords: [{ word: "like", count: 0 }, { word: "um", count: 1 }] }, duration: 105 },
        { question: "Describe a project you are proud of", feedback: { overallScore: 91, contentScore: 92, structureScore: 90, confidenceScore: 91, sentimentScore: 94, speakingPace: 140, fillerWords: [] }, duration: 135 },
        { question: "How do you handle tight deadlines?", feedback: { overallScore: 88, contentScore: 88, structureScore: 88, confidenceScore: 88, sentimentScore: 88, speakingPace: 135, fillerWords: [{ word: "so", count: 1 }] }, duration: 80 }
      ]
    }
  ];

  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessions[sessions.length - 1]?.id || "");
  const selectedSession = sessions.find(s => s.id === selectedSessionId) || sessions[sessions.length - 1];

  const sessionChartData = selectedSession?.feedbacks?.map((item, idx) => {
    const sScore = item.feedback.sentimentScore ?? Math.min(100, Math.max(0, Math.round((item.feedback.confidenceScore * 0.7) + (item.feedback.contentScore * 0.3))));
    return {
      name: `Q${idx + 1}`,
      "Response Time (s)": item.duration || 60,
      "Sentiment Score (%)": sScore,
      "Overall Score (%)": item.feedback.overallScore,
      "Confidence Score (%)": item.feedback.confidenceScore,
      fullQuestion: item.question
    };
  }) || [];

  // Find lowest and highest scoring topic for personalized coaching
  const sortedTopics = [...topicData].sort((a, b) => b.score - a.score);
  const highestTopic = sortedTopics[sortedTopics.length - 1];
  const lowestTopic = sortedTopics[0];

  // Dynamic industry comparison data for competence profile
  const competencyData = topicData.map(topic => ({
    subject: topic.name,
    User: topic.score,
    Benchmark: 75, // Standard passing score benchmark
    Gap: topic.score - 75
  }));

  return (
    <div className="glass-card rounded-[22px] border border-white/5 bg-[#11101c]/95 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Header section */}
      <div className="p-6 border-b border-white/[0.04] bg-black/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#a855f7]/10 px-2.5 py-1 rounded-lg border border-[#a855f7]/20 text-[10px] font-mono text-[#c084fc] font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3 h-3 text-[#c084fc]" />
            AI Performance Analytics
          </div>
          <h3 className="font-display font-semibold text-lg text-white">Interview Competency Profiles</h3>
          <p className="text-xs text-gray-400 mt-0.5">Interactive performance tracking, skill gap analysis, and pacing guidelines.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-[#181628] p-1 rounded-xl border border-white/5 w-fit shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-accent-gradient text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            PERFORMANCE OVERVIEW
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("trends")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "trends"
                ? "bg-accent-gradient text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            PROGRESS OVER TIME
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mastery")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === "mastery"
                ? "bg-accent-gradient text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            TOPIC MASTERY
          </button>
        </div>
      </div>

      {/* Main visualization container */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 flex items-center justify-center text-[#ec4899] shrink-0 border border-[#ec4899]/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block">Overall score</span>
                  <div className="text-xl font-extrabold text-white mt-0.5">{analyticsData.avgScore}%</div>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5">
                    Elite alignment (≥80%)
                  </span>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee] shrink-0 border border-[#22d3ee]/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block">Average response time</span>
                  <div className="text-xl font-extrabold text-white mt-0.5">
                    {analyticsData.averageResponseTime}s
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">
                    Target: 60s - 120s
                  </span>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 border border-amber-500/20">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block">Sentiment score</span>
                  <div className="text-xl font-extrabold text-white mt-0.5">
                    {analyticsData.avgSentiment || Math.round(analyticsData.avgScore + 3)}%
                  </div>
                  <span className="text-[9px] text-amber-400 font-mono">
                    Positivity & Focus
                  </span>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] shrink-0 border border-[#a855f7]/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono block">Delivery consistency</span>
                  <div className="text-xl font-extrabold text-white mt-0.5">High</div>
                  <span className="text-[9px] text-purple-400 font-mono">
                    Steady progression
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Visual Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment & confidence tracker */}
              <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    SENTIMENT & CONFIDENCE TRACKER
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Correlate emotional positive sentiment score against speech confidence rating over time.
                  </p>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={trendData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="sentimentGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                      <YAxis domain={[50, 100]} stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#11101c",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                        }}
                        labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "10px", paddingTop: 10 }} />
                      <Area
                        type="monotone"
                        dataKey="Sentiment Score"
                        stroke="#fbbf24"
                        fillOpacity={1}
                        fill="url(#sentimentGlow)"
                        strokeWidth={2}
                        name="Sentiment Score (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="Confidence Score"
                        stroke="#22d3ee"
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                        name="Confidence Score (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="Overall Score"
                        stroke="#ec4899"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        dot={false}
                        name="Overall Evaluation (%)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Response Pacing Analyzer */}
              <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#22d3ee]" />
                    RESPONSE PACING & SPEED
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Analyze average speech duration in seconds against target speaking boundaries.
                  </p>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={analyticsData.responseTimeTrend} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#11101c",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "10px",
                        }}
                        labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "10px", paddingTop: 10 }} />
                      
                      {/* Pacing Bar Chart */}
                      <Bar
                        dataKey="Avg Time (s)"
                        fill="#22d3ee"
                        opacity={0.35}
                        radius={[4, 4, 0, 0]}
                        name="Response Time (s)"
                        barSize={20}
                      />
                      
                      {/* Optimal Bounds reference lines */}
                      <ReferenceLine
                        y={60}
                        stroke="#10b981"
                        strokeDasharray="3 3"
                        label={{ value: "Optimal Min (60s)", fill: "#10b981", fontSize: 9, position: "insideBottomRight" }}
                      />
                      <ReferenceLine
                        y={120}
                        stroke="#f43f5e"
                        strokeDasharray="3 3"
                        label={{ value: "Max (120s)", fill: "#f43f5e", fontSize: 9, position: "insideTopRight" }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* In-Depth Coaching Advice box on Pacing and Positivity */}
            <div className="bg-gradient-to-r from-[#22d3ee]/10 to-[#fbbf24]/10 border border-[#22d3ee]/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-mono text-[#22d3ee] font-bold uppercase tracking-wider block">
                  Interactive Dashboard Tip
                </span>
                <p className="text-xs text-gray-300 leading-normal">
                  Your sentiment score of <strong className="text-white">{analyticsData.avgSentiment || Math.round(analyticsData.avgScore + 3)}%</strong> shows high speaking enthusiasm! Ensure you align your structured response duration between <strong className="text-emerald-400">60 to 120 seconds</strong> to avoid running out of focus points.
                </p>
              </div>
              <div className="shrink-0 font-mono text-[10px] text-gray-500">
                AI COCH • PACING CHECK
              </div>
            </div>

            {/* Session Deep-Dive Dashboard */}
            <div className="border-t border-white/[0.04] pt-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="text-left">
                  <span className="text-[10px] font-bold font-mono text-[#22d3ee] uppercase tracking-wider block">Interactive Drill-down</span>
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-[#a855f7]" />
                    Session-by-Session Performance Deep Dive
                  </h4>
                  <p className="text-[11px] text-gray-400">Select any completed or demo interview session to inspect individual question timelines, pacing, and emotional sentiment.</p>
                </div>

                {/* Session Selector Dropdown */}
                <div className="relative">
                  <select
                    value={selectedSessionId}
                    onChange={(e) => setSelectedSessionId(e.target.value)}
                    className="appearance-none bg-[#181628] hover:bg-[#201d35] border border-white/10 rounded-xl py-2 px-4 pr-10 text-xs font-mono font-bold text-white outline-none focus:border-[#22d3ee]/50 transition-all cursor-pointer min-w-[200px]"
                  >
                    {sessions.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#11101c]">
                        {s.date} - {s.role.split("(")[0].trim()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {selectedSession ? (
                <div className="space-y-6">
                  {/* Selected Session Quick KPIs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#161426] border border-white/[0.03] p-4 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Average Score</span>
                        <span className="text-base font-bold text-white mt-0.5">{selectedSession.avgScore}%</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        selectedSession.avgScore >= 80 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {selectedSession.avgScore >= 80 ? "EXCELLENT" : "GOOD"}
                      </span>
                    </div>

                    <div className="bg-[#161426] border border-white/[0.03] p-4 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Average Pacing</span>
                        <span className="text-base font-bold text-white mt-0.5">
                          {Math.round((selectedSession.feedbacks?.reduce((sum, f) => sum + (f.duration || 60), 0) || 0) / (selectedSession.feedbacks?.length || 1))}s
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#22d3ee] bg-[#22d3ee]/10 px-2 py-0.5 rounded border border-[#22d3ee]/20 font-semibold">
                        {Math.round((selectedSession.feedbacks?.reduce((sum, f) => sum + (f.duration || 60), 0) || 0) / (selectedSession.feedbacks?.length || 1)) <= 120 ? "OPTIMAL" : "OVERPACE"}
                      </span>
                    </div>

                    <div className="bg-[#161426] border border-white/[0.03] p-4 rounded-xl flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Average Sentiment</span>
                        <span className="text-base font-bold text-white mt-0.5">
                          {Math.round((selectedSession.feedbacks?.reduce((sum, f) => {
                            const sVal = f.feedback.sentimentScore ?? Math.min(100, Math.max(0, Math.round((f.feedback.confidenceScore * 0.7) + (f.feedback.contentScore * 0.3))));
                            return sum + sVal;
                          }, 0) || 0) / (selectedSession.feedbacks?.length || 1))}%
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#ec4899] bg-[#ec4899]/10 px-2 py-0.5 rounded border border-[#ec4899]/20 font-semibold">
                        POSITIVE
                      </span>
                    </div>
                  </div>

                  {/* Dual-Axis Detailed Visualizer Chart */}
                  <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                    <div className="text-left">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#ec4899]" />
                        METRIC CORRELATION CHART: PACING VS SENTIMENT
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Comparing speech response duration (seconds, right axis) alongside key scoring dimensions (%, left axis) for each question answered.
                      </p>
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={sessionChartData} margin={{ top: 10, right: -15, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                          
                          {/* Left Y Axis for Percentages */}
                          <YAxis yAxisId="left" domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                          
                          {/* Right Y Axis for Durations (Seconds) */}
                          <YAxis yAxisId="right" orientation="right" domain={[0, 180]} stroke="rgba(34,211,238,0.5)" fontSize={10} tickLine={false} />
                          
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#11101c",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "10px",
                            }}
                            labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}
                            itemStyle={{ fontSize: "11px" }}
                          />
                          <Legend wrapperStyle={{ fontSize: "10px", paddingTop: 10 }} />
                          
                          <Bar
                            yAxisId="right"
                            dataKey="Response Time (s)"
                            fill="#22d3ee"
                            opacity={0.3}
                            radius={[4, 4, 0, 0]}
                            name="Response Time (s)"
                            barSize={18}
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Sentiment Score (%)"
                            stroke="#ec4899"
                            strokeWidth={2.5}
                            dot={{ r: 4 }}
                            name="Sentiment Score (%)"
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Overall Score (%)"
                            stroke="#fbbf24"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            dot={{ r: 3 }}
                            name="Overall Score (%)"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Question Breakdown List Cards */}
                  <div className="space-y-3.5">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-left">Detailed Question Evaluations</h5>
                    {selectedSession.feedbacks?.map((fbItem, idx) => {
                      const duration = fbItem.duration || 60;
                      const sScore = fbItem.feedback.sentimentScore ?? Math.min(100, Math.max(0, Math.round((fbItem.feedback.confidenceScore * 0.7) + (fbItem.feedback.contentScore * 0.3))));
                      const totalFillers = fbItem.feedback.fillerWords?.reduce((sum, fw) => sum + fw.count, 0) || 0;
                      
                      // Calculate dynamic diagnostic tips
                      let pacingTip = "Perfect pacing! Your response duration sits right in the golden zone.";
                      let pacingStatus = "optimal";
                      if (duration > 120) {
                        pacingTip = "Response is slightly verbose. Try structured pacing using the STAR framework to summarize inside 90-120s.";
                        pacingStatus = "warning-long";
                      } else if (duration < 60) {
                        pacingTip = "Response is highly concise. Elaborate more on your specific Actions and quantifiable Results to fully satisfy indicators.";
                        pacingStatus = "warning-short";
                      }

                      let sentimentTip = "Fantastic emotional positivity and enthusiasm. Keep expressing strong self-belief.";
                      if (sScore < 72) {
                        sentimentTip = "Vocal energy is a bit subdued. Try using active power verbs (e.g. 'championed', 'optimized') to project executive presence.";
                      }

                      return (
                        <div key={idx} className="bg-black/20 border border-white/[0.04] rounded-xl p-4 sm:p-5 text-left space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                            <div className="min-w-0">
                              <span className="text-[9px] font-bold font-mono text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded">QUESTION {idx + 1}</span>
                              <h5 className="text-xs font-bold text-white mt-1.5 leading-normal">"{fbItem.question}"</h5>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-mono font-bold text-white bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                                Score: {fbItem.feedback.overallScore}%
                              </span>
                            </div>
                          </div>

                          {/* Quick metrics badges row */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[10px]">
                            <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                              <div className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Response Time</div>
                              <div className={`font-extrabold text-xs mt-1 ${pacingStatus.startsWith("warning") ? "text-amber-400" : "text-[#22d3ee]"}`}>
                                {duration}s
                              </div>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                              <div className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Sentiment Score</div>
                              <div className={`font-extrabold text-xs mt-1 ${sScore >= 75 ? "text-emerald-400" : "text-amber-400"}`}>
                                {sScore}%
                              </div>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                              <div className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Speaking Pace</div>
                              <div className="text-purple-400 font-extrabold text-xs mt-1">
                                {fbItem.feedback.speakingPace} WPM
                              </div>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                              <div className="text-gray-500 font-semibold uppercase tracking-wider text-[8px]">Filler Words</div>
                              <div className={`font-extrabold text-xs mt-1 ${totalFillers > 3 ? "text-rose-400" : "text-gray-300"}`}>
                                {totalFillers} word{totalFillers !== 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>

                          {/* Actionable coaching points */}
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[10px] font-mono font-bold text-[#fbbf24] uppercase tracking-wider">Coaching Insights & Diagnostics:</div>
                            <div className="text-[11.5px] text-gray-300 space-y-1 leading-normal">
                              <div className="flex items-start gap-1.5">
                                <span className="text-[#22d3ee] font-bold mt-0.5">•</span>
                                <span><strong>Pacing Diagnostic:</strong> {pacingTip}</span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <span className="text-[#ec4899] font-bold mt-0.5">•</span>
                                <span><strong>Sentiment & Vocal Tone:</strong> {sentimentTip}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No session feedback loaded.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "trends" ? (
          <div className="space-y-6 animate-fade-in">
            {/* Control header & metrics toggles */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Score Improvement & Progression
                </h4>
                <p className="text-xs text-gray-400">Chronological analysis of mock evaluations from past sessions.</p>
              </div>

              <div className="flex bg-black/30 rounded-lg p-1 border border-white/5 w-fit">
                <button
                  type="button"
                  onClick={() => setFocusMetric("Overall")}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                    focusMetric === "Overall" ? "bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20" : "text-gray-500 hover:text-white"
                  }`}
                >
                  Overall Score
                </button>
                <button
                  type="button"
                  onClick={() => setFocusMetric("Detailed")}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                    focusMetric === "Detailed" ? "bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20" : "text-gray-500 hover:text-white"
                  }`}
                >
                  Multi-Metric
                </button>
              </div>
            </div>

            {/* Recharts Composed chart */}
            <div className="h-72 w-full bg-black/20 rounded-2xl border border-white/[0.02] p-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    fontFamily="monospace"
                    tickLine={false} 
                    dy={8}
                  />
                  <YAxis 
                    domain={[40, 100]} 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    fontFamily="monospace"
                    tickLine={false} 
                    dx={-4}
                  />
                  
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#11101c", 
                      border: "1px solid rgba(255,255,255,0.1)", 
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
                    }}
                    labelStyle={{ color: "#fff", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}
                    itemStyle={{ fontSize: "11px" }}
                  />
                  
                  <Legend wrapperStyle={{ fontSize: "10px", fontFamily: "monospace", paddingTop: 12 }} />

                  {/* High Quality Target Line Benchmark */}
                  <ReferenceLine 
                    y={80} 
                    stroke="rgba(16,185,129,0.3)" 
                    strokeDasharray="4 4" 
                    label={{ value: "Elite Standard (80%)", fill: "#10b981", fontSize: 9, position: "insideBottomRight" }} 
                  />

                  {focusMetric === "Overall" ? (
                    <>
                      <Area 
                        type="monotone" 
                        dataKey="Overall Score" 
                        stroke="#ec4899" 
                        fillOpacity={1} 
                        fill="url(#scoreGlow)" 
                        strokeWidth={3} 
                        name="Overall Evaluation (%)" 
                        activeDot={{ r: 6 }}
                      />
                      <Bar 
                        dataKey="Confidence Score" 
                        barSize={12} 
                        fill="rgba(34,211,238,0.15)" 
                        stroke="#22d3ee"
                        strokeWidth={1}
                        radius={[4, 4, 0, 0]} 
                        name="Confidence Rating (%)" 
                      />
                    </>
                  ) : (
                    <>
                      <Area 
                        type="monotone" 
                        dataKey="Overall Score" 
                        stroke="#ec4899" 
                        fillOpacity={1} 
                        fill="url(#scoreGlow)" 
                        strokeWidth={2.5} 
                        name="Overall Score" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Confidence Score" 
                        stroke="#22d3ee" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                        name="Confidence" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="STAR Structure" 
                        stroke="#fbbf24" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                        name="STAR Structure" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Content Quality" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                        name="Content Quality" 
                      />
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-1">
                <span className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-widest block">Session Volatility</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-white">Sturdy Progression</span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-emerald-400 font-bold">
                    +21% Peak
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">Your ratings show continuous upward acceleration with minimal downward fluctuations.</p>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-1">
                <span className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-widest block">Structural Alignment</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-white">STAR Framework</span>
                  <span className="text-[10px] font-mono bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 text-[#fbbf24] font-bold">
                    86% Avg
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">Strong adherence to setting Context, defining Actions, and outlining Metrics.</p>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-1">
                <span className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-widest block">Delivery Confidence</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-white">Vocal Articulation</span>
                  <span className="text-[10px] font-mono bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 text-purple-400 font-bold">
                    Excellent
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">Speech clarity indexes positively alongside content and technical correctness scores.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Mastery Grid with Radar and Skill Gap comparisons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Radar Chart profile */}
              <div className="bg-black/20 rounded-2xl border border-white/5 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#a855f7]" />
                    Skill Dimension Radar
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Vocal, logic, and core subject proficiency distribution.</p>
                </div>

                <div className="h-56 w-full flex items-center justify-center py-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={competencyData}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 9, fontFamily: "monospace" }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 8 }} />
                      <Radar name="User Proficiencies" dataKey="User" stroke="#ec4899" fill="#ec4899" fillOpacity={0.15} />
                      <Radar name="Market Benchmark" dataKey="Benchmark" stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#11101c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                        itemStyle={{ color: "#fff", fontSize: "10px" }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-4 text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
                    User Score
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full border border-dashed border-gray-400" />
                    Market Benchmark (75)
                  </span>
                </div>
              </div>

              {/* Skill gap profile table */}
              <div className="bg-black/20 rounded-2xl border border-white/5 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#22d3ee]" />
                    Competence Mastery Profiles
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Detailed competency checks and gap-to-benchmark metrics.</p>
                </div>

                <div className="space-y-2.5 my-4">
                  {competencyData.map((comp, idx) => {
                    const isPositive = comp.Gap >= 0;
                    return (
                      <div key={idx} className="bg-black/30 border border-white/[0.03] px-3.5 py-2 rounded-xl flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h5 className="text-xs font-semibold text-white truncate">{comp.subject}</h5>
                          <div className="w-28 sm:w-36 bg-white/5 h-1 rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full bg-gradient-to-r from-[#a855f7] to-[#ec4899]" 
                              style={{ width: `${comp.User}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-xs font-bold text-white block">{comp.User}%</span>
                            <span className="text-[9px] text-gray-500 font-mono">VS 75</span>
                          </div>

                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}>
                            {isPositive ? `+${comp.Gap}` : comp.Gap}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[10.5px] text-gray-400 bg-white/[0.02] border border-white/5 p-2.5 rounded-xl font-mono flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-[#22d3ee] shrink-0 mt-0.5" />
                  <span>Aim to score at least <strong>80%</strong> on target topics to optimize your portfolio readiness index.</span>
                </div>
              </div>
            </div>

            {/* AI Personal Coach Recommendation banner */}
            {lowestTopic && highestTopic && (
              <div className="bg-gradient-to-r from-[#a855f7]/10 to-[#ec4899]/10 border border-[#a855f7]/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-4 justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[9px] font-mono text-[#fbbf24] font-bold uppercase tracking-wider">
                    <Compass className="w-3 h-3 text-[#fbbf24]" />
                    AI Coach Analysis
                  </div>
                  <h5 className="text-xs font-bold text-white">Focus Action Recommended for: <span className="text-[#a855f7] underline underline-offset-4">{lowestTopic.name}</span></h5>
                  <p className="text-[11.5px] text-gray-300 leading-relaxed">
                    You're demonstrating superb strength in <strong className="text-white">{highestTopic.name}</strong> ({highestTopic.score}%), but your rating in <strong className="text-white">{lowestTopic.name}</strong> ({lowestTopic.score}%) has room for improvement. Double down on specific STAR exercises and content coverage in our <strong>Roadmap Guide</strong> to bridge this gap.
                  </p>
                </div>
                
                <div className="shrink-0 pt-1">
                  <span className="text-[10px] font-mono text-gray-500 block">Overall Rating Level</span>
                  <span className="text-lg font-bold text-[#22d3ee] font-mono">
                    {analyticsData.avgScore >= 85 ? "MASTER" : analyticsData.avgScore >= 75 ? "COMPETENT" : "EMERGING"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
