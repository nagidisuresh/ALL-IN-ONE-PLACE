import React from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Clock, 
  Calendar, 
  User, 
  PieChart as PieIcon, 
  BarChart2, 
  TrendingUp, 
  CheckCircle,
  Lightbulb,
  Award
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { MOCK_STRATEGY_TIPS } from "./eamcetMockData";

export default function EAMCETTips() {
  const COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f59e0b"];

  const genericWeightage = [
    { name: "Algebra", weight: 28 },
    { name: "Calculus", weight: 25 },
    { name: "Coordinate Geometry", weight: 22 },
    { name: "Vectors & Trig", weight: 15 },
    { name: "Probability", weight: 10 }
  ];

  return (
    <div id="eamcet-tips-view" className="space-y-8 py-6 px-4 md:px-8 max-w-5xl mx-auto relative z-10 font-sans">
      {/* Header */}
      <div className="border-b border-white/5 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Strategy Board & Weightage Charts</h1>
        <p className="text-gray-400 text-sm">
          Plan your focus chapters using data-backed weightage charts and learn time-management blueprints from state rankers.
        </p>
      </div>

      {/* Visual Charts Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject wise allocation Pie Chart */}
        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Exam Marks Breakup (160 Total)</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            With Mathematics accounting for half the total marks (80 out of 160), spending substantial time on Mathematics is crucial.
          </p>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Mathematics", value: 80 },
                    { name: "Physics", value: 40 },
                    { name: "Chemistry", value: 40 }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#a855f7" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0c0c16", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  formatter={(val: number) => [`${val} Marks`, "Weight"]}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "11px", fontFamily: "monospace" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Math Core Chapter Weightage Bar Chart */}
        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Mathematics Weightage (%)</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Focus heavily on Algebra and Calculus as they combined account for more than 50% of the entire Mathematics score.
          </p>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genericWeightage} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0c0c16", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  formatter={(val: number) => [`${val}% Weightage`, "Topic"]}
                />
                <Bar dataKey="weight" radius={[6, 6, 0, 0]}>
                  {genericWeightage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategy Articles */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white tracking-tight">Verified Topper Strategies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_STRATEGY_TIPS.map((tip, idx) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/[0.02] transition-colors relative"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase text-gray-500">
                  <span className="text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                    {tip.category}
                  </span>
                  <span>{tip.readTime} Read</span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {tip.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-4">
                  {tip.content}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] font-mono text-gray-400 truncate max-w-40">{tip.author}</span>
                </div>
                <Award className="w-4 h-4 text-indigo-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Time Allocation Cheat-Sheet */}
      <div className="bg-gradient-to-r from-emerald-950/20 via-blue-950/10 to-transparent border border-emerald-500/10 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">The Golden EAMCET Formula: Solve Fast</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <div className="text-emerald-400 font-bold">1. Solve Chemistry First</div>
            <p className="text-[10px] text-gray-400 leading-relaxed">Spend exactly 25 minutes. Ideal target: secure 25+ easy memory-based marks without calculations.</p>
          </div>
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <div className="text-indigo-400 font-bold">2. Take Chemistry Gains to Physics</div>
            <p className="text-[10px] text-gray-400 leading-relaxed">Spend 45 minutes on Physics. Solve formula-direct numericals. Mark conceptual options quickly.</p>
          </div>
          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
            <div className="text-purple-400 font-bold">3. Dedicate 110m on Mathematics</div>
            <p className="text-[10px] text-gray-400 leading-relaxed">Mathematics is half the battle. Use remaining time to solve calculus, coordinate geometry and algebra step-by-step.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
