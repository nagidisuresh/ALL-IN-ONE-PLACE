import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, BookOpen, Clock, Lightbulb, ExternalLink, RefreshCw } from "lucide-react";

interface PlanDay {
  day: number;
  mathTopic: string;
  physicsTopic: string;
  chemTopic: string;
  mathFormula: string;
  physicsFormula: string;
  chemFormula: string;
  practiceLink: "Mathematics" | "Physics" | "Chemistry";
}

const FIFTEEN_DAY_SPRINT: PlanDay[] = [
  {
    day: 1,
    mathTopic: "Calculus - Limits & Continuity",
    physicsTopic: "Mechanics - Kinematics in 1D & 2D",
    chemTopic: "Physical Chemistry - Atomic Structure",
    mathFormula: "lim (x->0) (sin x)/x = 1, lim (x->0) (e^x-1)/x = 1",
    physicsFormula: "v = u + at, s = ut + 0.5at^2, v^2 = u^2 + 2as",
    chemFormula: "λ = h / mv (De Broglie), E = hν (Planck's Relation)",
    practiceLink: "Mathematics"
  },
  {
    day: 2,
    mathTopic: "Algebra - Quadratic Equations",
    physicsTopic: "Mechanics - Laws of Motion",
    chemTopic: "Inorganic Chemistry - Periodic Classification",
    mathFormula: "Roots: x = [-b ± √(b^2 - 4ac)] / 2a",
    physicsFormula: "F = dp/dt = ma, Friction: f_max = μ * N",
    chemFormula: "Z_eff = Z - S (Slater's Rules), Ionization Energy ∝ 1/Atomic Size",
    practiceLink: "Chemistry"
  },
  {
    day: 3,
    mathTopic: "Vectors - Dot & Cross Products",
    physicsTopic: "Mechanics - Work, Energy & Power",
    chemTopic: "Physical Chemistry - Chemical Equilibrium",
    mathFormula: "A.B = |A||B|cosθ, |A x B| = |A||B|sinθ",
    physicsFormula: "Work = ∫F.dx, KE = p^2 / 2m, Power = F.v",
    chemFormula: "Kp = Kc * (RT)^Δn, pH = -log10[H+]",
    practiceLink: "Physics"
  },
  {
    day: 4,
    mathTopic: "Coordinate Geometry - Circles",
    physicsTopic: "Mechanics - System of Particles & Rotational Motion",
    chemTopic: "Organic Chemistry - Basic Principles (IUPAC)",
    mathFormula: "Eq: x^2 + y^2 + 2gx + 2fy + c = 0, Radius = √(g^2 + f^2 - c)",
    physicsFormula: "Torque: τ = r x F = Iα, Angular Momentum: L = r x p = Iω",
    chemFormula: "Priority: -COOH > -SO3H > -COOR > -COCl > -CONH2 > -CN > -CHO",
    practiceLink: "Mathematics"
  },
  {
    day: 5,
    mathTopic: "Calculus - Differentiation Techniques",
    physicsTopic: "Properties of Bulk Matter - Gravitation",
    chemTopic: "Physical Chemistry - Solutions & Colligative Prop",
    mathFormula: "(uv)' = u'v + uv', (u/v)' = (u'v - uv') / v^2",
    physicsFormula: "F_g = G*m1*m2 / r^2, Escape Velocity: v_e = √(2GM/R)",
    chemFormula: "Relative lowering: ΔP/P0 = X_solute, Osmotic: Π = iCRT",
    practiceLink: "Chemistry"
  }
];

const THIRTY_DAY_COMPLETE: PlanDay[] = [
  {
    day: 1,
    mathTopic: "Algebra - Matrices & Determinants",
    physicsTopic: "Mechanics - Physical World & Measurements",
    chemTopic: "Physical Chemistry - Some Basic Concepts (Mole Concept)",
    mathFormula: "A^-1 = adj(A) / |A|, Cramer's Rule: x = Δ1/Δ, y = Δ2/Δ",
    physicsFormula: "Dimensions of: [G] = [M^-1 L^3 T^-2], [h] = [M L^2 T^-1]",
    chemFormula: "Molarity (M) = moles of solute / Volume of soln (L)",
    practiceLink: "Mathematics"
  },
  {
    day: 2,
    mathTopic: "Calculus - Limits & Continuity",
    physicsTopic: "Mechanics - Motion in a Straight Line",
    chemTopic: "Physical Chemistry - Atomic Structure",
    mathFormula: "L'Hopital's Rule: lim f(x)/g(x) = lim f'(x)/g'(x)",
    physicsFormula: "Average Speed = Total Distance / Total Time",
    chemFormula: "Energy of hydrogenic orbit: E_n = -13.6 * Z^2 / n^2 eV",
    practiceLink: "Physics"
  },
  {
    day: 3,
    mathTopic: "Calculus - Derivatives & Applications",
    physicsTopic: "Mechanics - Motion in a Plane (Projectiles)",
    chemTopic: "Inorganic Chemistry - Classification of Elements",
    mathFormula: "Tangent Eq: y - y1 = m(x - x1) where m = dy/dx",
    physicsFormula: "Max Height: H = (u^2 * sin^2 θ) / 2g, Range: R = (u^2 * sin 2θ) / g",
    chemFormula: "Electronegativity (Pauling Scale): χA - χB = 0.208 * √Δ",
    practiceLink: "Mathematics"
  },
  {
    day: 4,
    mathTopic: "Algebra - Quadratic Expressions",
    physicsTopic: "Mechanics - Laws of Motion & Friction",
    chemTopic: "Inorganic Chemistry - Chemical Bonding & Geometry",
    mathFormula: "Sum of roots = -b/a, Product of roots = c/a",
    physicsFormula: "Centripetal Force: F_c = m*v^2 / r, Recoil: v_r = -m*v / M",
    chemFormula: "Bond Order = 0.5 * (N_b - N_a). SF6 is octahedral.",
    practiceLink: "Chemistry"
  },
  {
    day: 5,
    mathTopic: "Vectors - Vector Algebra fundamentals",
    physicsTopic: "Mechanics - Work, Energy & Power",
    chemTopic: "Physical Chemistry - States of Matter",
    mathFormula: "Unit Vector: â = A / |A|, Project of A on B = (A.B)/|B|",
    physicsFormula: "Work-Energy: W_net = ΔKE = KE_f - KE_i",
    chemFormula: "Ideal Gas Law: PV = nRT, Dalton's Law: P_i = X_i * P_total",
    practiceLink: "Physics"
  },
  {
    day: 6,
    mathTopic: "Coordinate Geometry - Straight Lines",
    physicsTopic: "Mechanics - System of Particles & Rotational Dynamics",
    chemTopic: "Physical Chemistry - Thermodynamics & Entropy",
    mathFormula: "Distance from (x0,y0) to Ax+By+C=0: |Ax0+By0+C| / √(A^2+B^2)",
    physicsFormula: "Moment of Inertia (Disk): I = 0.5*M*R^2, Radius of Gyration: k = √(I/M)",
    chemFormula: "First Law: ΔU = q + w, Gibbs Free Energy: ΔG = ΔH - TΔS",
    practiceLink: "Mathematics"
  },
  {
    day: 7,
    mathTopic: "Coordinate Geometry - Circles",
    physicsTopic: "Properties of Bulk Matter - Gravitation",
    chemTopic: "Physical Chemistry - Chemical Equilibrium",
    mathFormula: "Intercepts: x-intercept = 2√(g^2 - c), y-intercept = 2√(f^2 - c)",
    physicsFormula: "Acceleration due to gravity at depth d: g_d = g * (1 - d/R)",
    chemFormula: "Le Chatelier: Pressure increase shifts towards fewer gas moles.",
    practiceLink: "Chemistry"
  }
];

interface EAMCETPlansProps {
  onNavigate: (tab: string) => void;
  onSelectSubject?: (subject: "Mathematics" | "Physics" | "Chemistry") => void;
}

export default function EAMCETPlans({ onNavigate, onSelectSubject }: EAMCETPlansProps) {
  const [activePlan, setActivePlan] = useState<"15day" | "30day">("15day");
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Load progress on mount
  useEffect(() => {
    const key = `eamcet_plan_progress_${activePlan}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    } else {
      setCompletedDays({});
    }
    setExpandedDay(1); // Reset expanded day to 1
  }, [activePlan]);

  const toggleDayComplete = (day: number) => {
    const key = `eamcet_plan_progress_${activePlan}`;
    const updated = {
      ...completedDays,
      [day]: !completedDays[day]
    };
    setCompletedDays(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to clear your current plan progress?")) {
      const key = `eamcet_plan_progress_${activePlan}`;
      localStorage.removeItem(key);
      setCompletedDays({});
    }
  };

  const planData = activePlan === "15day" ? FIFTEEN_DAY_SPRINT : THIRTY_DAY_COMPLETE;
  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const totalDays = planData.length;
  const completionPercentage = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  return (
    <div id="eamcet-plans-view" className="space-y-8 py-6 px-4 md:px-8 max-w-5xl mx-auto relative z-10 font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Daily Study & Sprints Roadmaps</h1>
          <p className="text-gray-400 text-sm">
            Follow structured day-by-day study blueprints with key formulas to memorize and quick shortcuts to practice.
          </p>
        </div>
        <button
          onClick={resetProgress}
          className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 font-mono uppercase bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Clear Progress
        </button>
      </div>

      {/* Plan Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex bg-neutral-900 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActivePlan("15day")}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activePlan === "15day"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            15-Day Sprint Plan
          </button>
          <button
            onClick={() => setActivePlan("30day")}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activePlan === "30day"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            30-Day Complete Plan
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-4 w-full sm:w-80">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-xs font-mono text-gray-400 uppercase">
              <span>Sprint Progress</span>
              <span className="text-white font-bold">{completionPercentage}% ({completedCount}/{totalDays} Days)</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Days List Timeline */}
      <div className="space-y-4">
        {planData.map((item) => {
          const isCompleted = !!completedDays[item.day];
          const isExpanded = expandedDay === item.day;

          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCompleted 
                  ? "border-emerald-500/20 bg-emerald-950/5" 
                  : isExpanded 
                    ? "border-indigo-500/30 bg-white/[0.02]" 
                    : "border-white/5 bg-white/[0.01] hover:bg-white/[0.02]"
              }`}
            >
              {/* Header */}
              <div 
                className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpandedDay(isExpanded ? null : item.day)}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDayComplete(item.day);
                    }}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isCompleted 
                        ? "bg-emerald-500 text-neutral-900 scale-105" 
                        : "border-2 border-white/20 hover:border-white/40 bg-neutral-900"
                    }`}
                  >
                    {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 uppercase">DAY {item.day}</span>
                      {isCompleted && (
                        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                      {item.mathTopic.split(" - ")[0]} & {item.physicsTopic.split(" - ")[0]}
                    </h3>
                  </div>
                </div>

                <div className="text-xs font-mono text-gray-500 flex items-center gap-1 uppercase">
                  <span>{isExpanded ? "Collapse" : "Expand"}</span>
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-white/5 pt-5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Maths column */}
                    <div className="space-y-3 bg-blue-950/10 border border-blue-500/10 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Mathematics</span>
                      </div>
                      <div className="text-xs font-bold text-white">{item.mathTopic}</div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-blue-300 uppercase">Essential Formulas:</span>
                        <div className="bg-neutral-900/50 p-2.5 rounded-lg border border-white/5 text-[11px] font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
                          {item.mathFormula}
                        </div>
                      </div>
                    </div>

                    {/* Physics column */}
                    <div className="space-y-3 bg-purple-950/10 border border-purple-500/10 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Physics</span>
                      </div>
                      <div className="text-xs font-bold text-white">{item.physicsTopic}</div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-purple-300 uppercase">Essential Formulas:</span>
                        <div className="bg-neutral-900/50 p-2.5 rounded-lg border border-white/5 text-[11px] font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
                          {item.physicsFormula}
                        </div>
                      </div>
                    </div>

                    {/* Chemistry column */}
                    <div className="space-y-3 bg-emerald-950/10 border border-emerald-500/10 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Chemistry</span>
                      </div>
                      <div className="text-xs font-bold text-white">{item.chemTopic}</div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-300 uppercase">Essential Formulas:</span>
                        <div className="bg-neutral-900/50 p-2.5 rounded-lg border border-white/5 text-[11px] font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap">
                          {item.chemFormula}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations / Tips Box */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-gray-400">
                        <span className="text-amber-300 font-semibold">Tip of the Day:</span> Spend at least 30 minutes solving 10 questions on the active subject to wire down the formulas.
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (onSelectSubject) {
                          onSelectSubject(item.practiceLink);
                        }
                        onNavigate("practice");
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      Practice {item.practiceLink} MCQs
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
