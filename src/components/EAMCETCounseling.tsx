import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Search, 
  GitCompare, 
  MapPin, 
  Briefcase, 
  HelpCircle, 
  Check, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  Award, 
  FileCheck, 
  Sparkles, 
  BookOpen, 
  Map, 
  Globe, 
  Mail, 
  Phone,
  ArrowRight,
  Plus,
  Trash2,
  Calendar,
  AlertCircle
} from "lucide-react";
import { MOCK_COLLEGES, MOCK_CUTOFFS, MOCK_BRANCHES, MOCK_COUNSELING_TIMELINE } from "./eamcetMockData";
import { College, CutoffData, Branch } from "../eamcetTypes";

export default function EAMCETCounseling() {
  const [activeSubTab, setActiveSubTab] = useState<"predictor" | "search" | "comparison" | "branches" | "timeline">("predictor");
  
  // Predictor states
  const [rankInput, setRankInput] = useState<number | "">("");
  const [categoryInput, setCategoryInput] = useState<string>("OC_GEN");
  const [genderInput, setGenderInput] = useState<string>("Male");
  const [regionInput, setRegionInput] = useState<string>("OU");
  const [districtInput, setDistrictInput] = useState<string>("All");
  const [branchInput, setBranchInput] = useState<string>("CSE");
  const [predictorResults, setPredictorResults] = useState<{
    dream: { college: College; cutoff: number; prob: number }[];
    target: { college: College; cutoff: number; prob: number }[];
    safe: { college: College; cutoff: number; prob: number }[];
    aiExplanation: string;
  } | null>(null);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  // Search/Detail states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [feesLimit, setFeesLimit] = useState<number>(150000);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Comparison states
  const [compareList, setCompareList] = useState<College[]>([]);

  // Allotment simulation tracker
  const [allotmentStatus, setAllotmentStatus] = useState<{
    allotted: boolean;
    college: College | null;
    branchCode: string | null;
    message: string;
  } | null>(null);

  // Required docs checklist state
  const [docChecklist, setDocChecklist] = useState<Record<string, boolean>>({
    "Rank Card": false,
    "Hall Ticket": false,
    "SSC Mark Sheet": false,
    "Intermediate Mark Sheet": false,
    "Study Certificates (Class 6-12)": false,
    "Transfer Certificate (TC)": false,
    "Income Certificate": false,
    "Caste Certificate": false
  });

  // Load preset rank if saved in user profile on load
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("nextroundprep_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        if (u.rank) setRankInput(u.rank);
        if (u.category) {
          const catMap: Record<string, string> = {
            "OC": "OC_GEN",
            "BC-A": "BC_A_GEN",
            "SC": "SC_GEN",
            "ST": "ST_GEN"
          };
          setCategoryInput(catMap[u.category] || "OC_GEN");
        }
        if (u.gender) setGenderInput(u.gender);
        if (u.preferredBranch) setBranchInput(u.preferredBranch);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePredict = () => {
    if (!rankInput || rankInput <= 0) {
      alert("Please enter a valid rank first.");
      return;
    }

    setIsPredicting(true);
    setPredictorResults(null);

    // Simulated short delay for premium feel
    setTimeout(() => {
      const parsedRank = Number(rankInput);
      
      // Match cutoffs
      const matchedCutoffs = MOCK_CUTOFFS.filter(
        (c) => c.branchCode === branchInput && c.category === categoryInput
      );

      const dream: { college: College; cutoff: number; prob: number }[] = [];
      const target: { college: College; cutoff: number; prob: number }[] = [];
      const safe: { college: College; cutoff: number; prob: number }[] = [];

      matchedCutoffs.forEach((cutoff) => {
        const col = MOCK_COLLEGES.find((c) => c.id === cutoff.collegeId);
        if (!col) return;

        // District filter
        if (districtInput !== "All" && col.district !== districtInput) return;

        const diff = cutoff.cutoffRank - parsedRank;

        if (diff < -500) {
          // Rank is significantly worse than cutoff -> Dream College
          // Probability: 10% - 35%
          const prob = Math.max(10, Math.min(35, Math.round(50 + (diff / 100))));
          dream.push({ college: col, cutoff: cutoff.cutoffRank, prob });
        } else if (diff >= -500 && diff <= 1000) {
          // Rank is very close to cutoff -> Target College
          // Probability: 45% - 75%
          const prob = Math.round(60 + (diff / 100));
          target.push({ college: col, cutoff: cutoff.cutoffRank, prob: Math.min(75, Math.max(45, prob)) });
        } else {
          // Rank is significantly better than cutoff -> Safe College
          // Probability: 80% - 99%
          const prob = Math.min(99, Math.round(85 + (diff / 500)));
          safe.push({ college: col, cutoff: cutoff.cutoffRank, prob });
        }
      });

      // Generate AI style explanation string
      const aiExplanationText = `Based on our data model for AP/TG EAMCET counseling, with a rank of ${parsedRank} in the ${categoryInput.split("_").join(" ")} category, you have an exceptional probability of securing admission in several tier-2 institutions. Your best 'Safe' options include ${safe.length > 0 ? safe.map(s => s.college.code).join(", ") : "VRSEC, GVP"}. For 'Dream' options like ${dream.length > 0 ? dream.map(d => d.college.code).join(", ") : "OUCE, JNTH"}, we highly recommend listing them at the absolute top of your Web Options form (choices 1-5). There is zero penalty for listing dream colleges first.`;

      setPredictorResults({
        dream: dream.slice(0, 3),
        target: target.slice(0, 3),
        safe: safe.slice(0, 3),
        aiExplanation: aiExplanationText
      });
      setIsPredicting(false);
    }, 1200);
  };

  const toggleCompare = (col: College) => {
    if (compareList.find((c) => c.id === col.id)) {
      setCompareList(compareList.filter((c) => c.id !== col.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 colleges at once.");
        return;
      }
      setCompareList([...compareList, col]);
    }
  };

  const handleSimulateAllotment = () => {
    if (!rankInput) {
      alert("Please input your rank first in the Predictor tab.");
      return;
    }
    const parsed = Number(rankInput);
    
    // Find matching college with cutoff closest to but higher than user rank
    const match = MOCK_CUTOFFS
      .filter((c) => c.branchCode === branchInput && c.category === categoryInput && c.cutoffRank >= parsed)
      .sort((a, b) => a.cutoffRank - b.cutoffRank)[0];

    if (match) {
      const col = MOCK_COLLEGES.find((c) => c.id === match.collegeId);
      if (col) {
        setAllotmentStatus({
          allotted: true,
          college: col,
          branchCode: match.branchCode,
          message: `CONGRATULATIONS! Based on rank ${parsed} and selected option, you have been mock-allotted a seat at ${col.name} in the ${match.branchCode} branch. (Mock Phase-1 allotment simulation complete)`
        });
        return;
      }
    }

    setAllotmentStatus({
      allotted: false,
      college: null,
      branchCode: null,
      message: `No seat allotted in Phase-1 for selected criteria. Your rank (${parsed}) was higher than the cutoff thresholds of the available colleges in our mock library. Try adding more safe colleges to your options or changing branch priorities.`
    });
  };

  // Filter colleges for list
  const filteredColleges = MOCK_COLLEGES.filter((col) => {
    const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase()) || col.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || col.district === selectedDistrict;
    const matchesType = selectedType === "All" || col.type === selectedType;
    const matchesFees = col.feesPerYear <= feesLimit;
    return matchesSearch && matchesDistrict && matchesType && matchesFees;
  });

  const districts = ["All", ...Array.from(new Set(MOCK_COLLEGES.map((c) => c.district)))];

  return (
    <div id="eamcet-counseling-view" className="space-y-8 py-6 px-4 md:px-8 max-w-6xl mx-auto relative z-10 font-sans">
      {/* Tab Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Building2 className="w-8 h-8 text-indigo-400" />
            <span>Premium EAMCET Counseling Assistant</span>
          </h1>
          <p className="text-gray-400 text-sm">
            AI-powered predictions, detailed cutoffs, college comparisons, and structural option-entry trackers.
          </p>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex flex-wrap bg-neutral-900 p-1 rounded-xl border border-white/5 max-w-full overflow-x-auto gap-0.5">
          {[
            { id: "predictor", label: "Rank Predictor", icon: TrendingUp },
            { id: "search", label: "College Finder", icon: Search },
            { id: "comparison", label: "Compare Colleges", icon: GitCompare },
            { id: "branches", label: "Branch Explorer", icon: BookOpen },
            { id: "timeline", label: "Timeline & Docs", icon: FileCheck }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main tab content */}
      <div className="min-h-[500px]">
        {activeSubTab === "predictor" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Input Card */}
              <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl space-y-6 h-fit">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Predictor Settings</h3>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Rank input */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 uppercase font-mono text-[10px]">Your EAMCET Rank</label>
                    <input
                      type="number"
                      placeholder="e.g. 5200"
                      value={rankInput}
                      onChange={(e) => setRankInput(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Category input */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 uppercase font-mono text-[10px]">Reservation Category</label>
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="OC_GEN">OC - General</option>
                      <option value="OC_GIRLS">OC - Girls Only</option>
                      <option value="BC_A_GEN">BC-A - General</option>
                      <option value="SC_GEN">SC - General</option>
                      <option value="ST_GEN">ST - General</option>
                    </select>
                  </div>

                  {/* Gender input */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 uppercase font-mono text-[10px]">Gender</label>
                    <select
                      value={genderInput}
                      onChange={(e) => setGenderInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Region input */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 uppercase font-mono text-[10px]">Local Region</label>
                    <select
                      value={regionInput}
                      onChange={(e) => setRegionInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="OU">OU (Osmania Region)</option>
                      <option value="AU">AU (Andhra Region)</option>
                      <option value="SVU">SVU (Venkateswara Region)</option>
                      <option value="NL">NL (Non-Local)</option>
                    </select>
                  </div>

                  {/* Preferred Branch */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 uppercase font-mono text-[10px]">Preferred Branch</label>
                    <select
                      value={branchInput}
                      onChange={(e) => setBranchInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="CSE">CSE (Computer Science)</option>
                      <option value="ECE">ECE (Electronics & Comm)</option>
                      <option value="INF">INF (Information Tech)</option>
                      <option value="EEE">EEE (Electrical & Electronics)</option>
                      <option value="MECH">MECH (Mechanical)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-500/10"
                >
                  {isPredicting ? "Predicting Options..." : "Predict Colleges"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Predictor Results Block */}
              <div className="lg:col-span-2 space-y-6">
                {isPredicting ? (
                  <div className="h-96 flex flex-col items-center justify-center space-y-4 bg-white/[0.01] border border-white/5 rounded-3xl p-6">
                    <div className="relative w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-gray-400 uppercase">Simulating cutoffs and allotment matrices...</span>
                  </div>
                ) : predictorResults ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* AI explanation block */}
                    <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-6 space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-5">
                        <Sparkles className="w-24 h-24 text-indigo-400" />
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono uppercase">
                        <Sparkles className="w-4 h-4" />
                        <span>AI Enrollment Strategy Explanation</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-light">
                        {predictorResults.aiExplanation}
                      </p>
                    </div>

                    {/* Dream / Target / Safe lists */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Dream Colleges */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-pink-400 font-mono uppercase border-b border-pink-500/20 pb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-pink-500" />
                          <span>Dream Options (10-35%)</span>
                        </div>
                        {predictorResults.dream.length === 0 ? (
                          <div className="text-center py-6 text-gray-500 text-[10px] font-mono uppercase bg-white/[0.01] rounded-xl border border-white/5">
                            No dream matches
                          </div>
                        ) : (
                          predictorResults.dream.map((item) => (
                            <div key={item.college.id} className="bg-white/[0.01] border border-white/5 hover:border-pink-500/20 p-4 rounded-2xl space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-white">{item.college.code}</span>
                                <span className="text-[10px] font-mono text-pink-400">{item.prob}% Prob</span>
                              </div>
                              <p className="text-[10px] text-gray-400 line-clamp-1">{item.college.name}</p>
                              <div className="text-[10px] font-mono text-gray-500 flex justify-between uppercase pt-1">
                                <span>Cutoff: {item.cutoff}</span>
                                <span>LPA: {item.college.averagePackage}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Target Colleges */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-indigo-400 font-mono uppercase border-b border-indigo-500/20 pb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          <span>Target Options (45-75%)</span>
                        </div>
                        {predictorResults.target.length === 0 ? (
                          <div className="text-center py-6 text-gray-500 text-[10px] font-mono uppercase bg-white/[0.01] rounded-xl border border-white/5">
                            No target matches
                          </div>
                        ) : (
                          predictorResults.target.map((item) => (
                            <div key={item.college.id} className="bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 p-4 rounded-2xl space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-white">{item.college.code}</span>
                                <span className="text-[10px] font-mono text-indigo-400">{item.prob}% Prob</span>
                              </div>
                              <p className="text-[10px] text-gray-400 line-clamp-1">{item.college.name}</p>
                              <div className="text-[10px] font-mono text-gray-500 flex justify-between uppercase pt-1">
                                <span>Cutoff: {item.cutoff}</span>
                                <span>LPA: {item.college.averagePackage}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Safe Colleges */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-emerald-400 font-mono uppercase border-b border-emerald-500/20 pb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Safe Options (80-99%)</span>
                        </div>
                        {predictorResults.safe.length === 0 ? (
                          <div className="text-center py-6 text-gray-500 text-[10px] font-mono uppercase bg-white/[0.01] rounded-xl border border-white/5">
                            No safe matches
                          </div>
                        ) : (
                          predictorResults.safe.map((item) => (
                            <div key={item.college.id} className="bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 p-4 rounded-2xl space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-white">{item.college.code}</span>
                                <span className="text-[10px] font-mono text-emerald-400">{item.prob}% Prob</span>
                              </div>
                              <p className="text-[10px] text-gray-400 line-clamp-1">{item.college.name}</p>
                              <div className="text-[10px] font-mono text-gray-500 flex justify-between uppercase pt-1">
                                <span>Cutoff: {item.cutoff}</span>
                                <span>LPA: {item.college.averagePackage}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center space-y-4 bg-white/[0.01] border border-white/5 rounded-3xl p-6 text-center">
                    <Building2 className="w-12 h-12 text-gray-600" />
                    <h3 className="text-base font-bold text-white">Predictions Pending</h3>
                    <p className="text-gray-400 text-xs max-w-sm">
                      Enter your EAMCET rank and categories on the left pane and press "Predict" to run state cutoff algorithms.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "search" && (
          <div className="space-y-6">
            {/* Search Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-gray-500">Search Colleges</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by name or code (e.g. JNTU)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500">District Location</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-500">College Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Govt">Govt Only</option>
                  <option value="Private Autonomous">Private Autonomous</option>
                </select>
              </div>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((col) => {
                const isComparing = !!compareList.find((c) => c.id === col.id);

                return (
                  <div
                    key={col.id}
                    className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 hover:border-indigo-500/20 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <img src={col.logo} alt={col.code} className="w-10 h-10 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer" />
                        <span className="text-[10px] font-mono bg-white/5 text-gray-400 border border-white/10 px-2 py-0.5 rounded uppercase">
                          {col.type}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">{col.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{col.district} &bull; Region: {col.region}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                        <div className="p-2.5 bg-neutral-950/40 rounded-xl border border-white/5 space-y-0.5">
                          <div className="text-[9px] text-gray-500 uppercase">Avg Package</div>
                          <div className="text-xs font-bold text-emerald-400">{col.averagePackage} LPA</div>
                        </div>
                        <div className="p-2.5 bg-neutral-950/40 rounded-xl border border-white/5 space-y-0.5">
                          <div className="text-[9px] text-gray-500 uppercase">Annual Fee</div>
                          <div className="text-xs font-bold text-indigo-400">₹{(col.feesPerYear / 1000).toFixed(0)}K</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setSelectedCollege(col)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white transition-all cursor-pointer border border-white/5"
                      >
                        Details Page
                      </button>
                      <button
                        onClick={() => toggleCompare(col)}
                        className={`px-3.5 py-2.5 text-xs rounded-xl border transition-all cursor-pointer ${
                          isComparing
                            ? "bg-indigo-600 text-white border-indigo-500"
                            : "bg-transparent border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSubTab === "comparison" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Side-by-Side Comparison</h3>
              <span className="text-xs font-mono text-gray-400 uppercase">Selected: {compareList.length}/3 Colleges</span>
            </div>

            {compareList.length === 0 ? (
              <div className="py-20 text-center space-y-3 bg-white/[0.01] border border-white/5 rounded-3xl">
                <GitCompare className="w-10 h-10 text-gray-600 mx-auto animate-pulse" />
                <h4 className="text-sm font-semibold text-white">No Colleges Selected for Comparison</h4>
                <p className="text-gray-500 text-xs max-w-sm mx-auto">
                  Go back to the "College Finder" tab and select up to 3 colleges to compare using the compare icon.
                </p>
                <button
                  onClick={() => setActiveSubTab("search")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Search Colleges
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white/[0.01] border border-white/5 rounded-3xl">
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/5 bg-neutral-950/55">
                      <th className="p-4 uppercase text-gray-500">Metric</th>
                      {compareList.map((col) => (
                        <th key={col.id} className="p-4 text-sm font-bold text-white relative">
                          <button
                            onClick={() => toggleCompare(col)}
                            className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div>{col.code}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Full Name</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-white font-sans">{col.name}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Type</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-indigo-300">{col.type}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">District</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-white">{col.district}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Annual Fees</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-indigo-400 font-bold">₹{(col.feesPerYear).toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Average Package</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-emerald-400 font-bold">{col.averagePackage} LPA</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Highest Package</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-emerald-300 font-bold">{col.highestPackage} LPA</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Placement Rate</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-white">{col.placementPercentage}%</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Hostel Available</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-white">{col.hostelAvailable}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-400 uppercase">Expert Rating</td>
                      {compareList.map((col) => (
                        <td key={col.id} className="p-4 text-amber-400">★ {col.rating}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeSubTab === "branches" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_BRANCHES.map((branch) => (
              <div
                key={branch.code}
                className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-indigo-500/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-white font-mono">{branch.code}</span>
                    <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md uppercase">
                      {branch.futureDemand} DEMAND
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{branch.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{branch.description}</p>

                  <div className="space-y-1.5 pt-2 text-xs">
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Career Paths:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.opportunities.map((o) => (
                        <span key={o} className="bg-white/5 border border-white/15 px-2 py-1 rounded-md text-[10px] text-gray-300">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 text-xs">
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Top Hiring MNCs:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.recruiters.map((r) => (
                        <span key={r} className="bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-md text-[10px]">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-2 flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">AVG SALARY START:</span>
                  <span className="text-emerald-400 font-bold">{branch.averageSalary} LPA</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "timeline" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side checklist */}
            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl space-y-6 h-fit">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-5 h-5 text-indigo-400" />
                  <span>Required Documents Checklist</span>
                </h3>
                <p className="text-gray-500 text-[11px] leading-relaxed">Ensure you have scanned PDF copies of all these certs prior to Phase 1 registration.</p>
              </div>

              <div className="space-y-3">
                {Object.keys(docChecklist).map((doc) => {
                  const checked = docChecklist[doc];
                  return (
                    <button
                      key={doc}
                      onClick={() => setDocChecklist({ ...docChecklist, [doc]: !checked })}
                      className="w-full flex items-center gap-3 p-3 bg-neutral-900/40 border border-white/5 rounded-xl hover:bg-neutral-900/80 text-left cursor-pointer transition-colors"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                        checked ? "bg-emerald-500 border-emerald-400 text-neutral-900" : "border-white/20 bg-neutral-950"
                      }`}>
                        {checked && <Check className="w-4.5 h-4.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs text-white/95">{doc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Allotment Simulator trigger */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <div className="flex items-start gap-2.5 bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10 text-[10px] text-gray-400 leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>
                    <strong className="text-indigo-300">Phase 1 Allotment Tracker:</strong> You can simulate option-matching instantly against your rank!
                  </span>
                </div>
                <button
                  onClick={handleSimulateAllotment}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Run Mock Seat Allotment
                </button>

                {/* Allotment results */}
                {allotmentStatus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl text-xs border ${
                      allotmentStatus.allotted 
                        ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300" 
                        : "bg-red-950/20 border-red-500/20 text-red-300"
                    }`}
                  >
                    {allotmentStatus.message}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right side timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Official Counseling Timeline</h3>
              </div>

              <div className="space-y-6 relative border-l border-white/10 pl-6 ml-3">
                {MOCK_COUNSELING_TIMELINE.map((event, idx) => (
                  <div key={event.id} className="relative space-y-2">
                    {/* Circle bullet on vertical line */}
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 bg-[#0a0a14] border-2 border-indigo-500 rounded-full" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded uppercase">
                          {event.phase}
                        </span>
                        <h4 className="text-sm font-bold text-white tracking-tight">{event.title}</h4>
                      </div>
                      <span className="text-xs text-indigo-400 font-mono">{event.dateRange}</span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed font-light">{event.description}</p>
                  </div>
                ))}
              </div>

              {/* Web Options Guide */}
              <div className="bg-white/[0.01] border border-white/5 p-6 rounded-3xl space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Option-Entry Choice Strategy Guide</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  To maximize admission chance, list options in descending order of actual cutoff ranks. Divide options into 3 pools:
                  <br />
                  1. <strong className="text-white">Dream Pool (Choices 1-5):</strong> Colleges with cutoffs 500-1000 ranks above your rank.
                  <br />
                  2. <strong className="text-white">Target Pool (Choices 6-15):</strong> Colleges matching your rank closely (within 10%).
                  <br />
                  3. <strong className="text-white">Safe Pool (Choices 16-25):</strong> Safeguards. Colleges with cutoffs at least 2000 ranks below your rank.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* College Detail Modal Overlay */}
      {selectedCollege && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0c0c16] border border-white/10 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto relative shadow-2xl font-sans"
          >
            <button
              onClick={() => setSelectedCollege(null)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header banner */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={selectedCollege.logo} alt={selectedCollege.code} className="w-14 h-14 rounded-2xl object-cover border border-white/10" referrerPolicy="no-referrer" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                        {selectedCollege.code}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">{selectedCollege.type}</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight pt-1 leading-snug">{selectedCollege.name}</h2>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-amber-400 text-sm font-bold">★ {selectedCollege.rating} / 5</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Expert Score</div>
                </div>
              </div>

              {/* Photos carousels / single photo */}
              <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-white/5 relative">
                <img src={selectedCollege.images[0]} alt={selectedCollege.code} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex justify-between text-xs text-white">
                  <span>{selectedCollege.district}, AP/TG</span>
                  <span>Region: {selectedCollege.region}</span>
                </div>
              </div>
            </div>

            {/* Main content grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-gray-300">
              <div className="md:col-span-2 space-y-4 font-light leading-relaxed">
                <p>{selectedCollege.description}</p>

                {/* Infrastructure list */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">Campus Infrastructure</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedCollege.infrastructure.map((inf) => (
                      <div key={inf} className="flex items-center gap-1.5 text-gray-400">
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{inf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mock map visual placeholder */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                    <Map className="w-3.5 h-3.5" /> Campus Location Map
                  </h4>
                  <div className="w-full h-32 bg-indigo-950/10 border border-white/5 rounded-xl flex items-center justify-center text-[10px] text-gray-500 font-mono uppercase gap-2">
                    <span>GPS COORDINATES: 17.3850° N, 78.4867° E (HYDERABAD)</span>
                  </div>
                </div>
              </div>

              {/* Side facts block */}
              <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4 h-fit text-xs font-mono">
                <div className="border-b border-white/5 pb-2">
                  <span className="text-gray-500 block">TUITION FEE / YEAR</span>
                  <strong className="text-indigo-400 text-sm">₹{selectedCollege.feesPerYear.toLocaleString()}</strong>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <span className="text-gray-500 block">PLACEMENT %</span>
                  <strong className="text-white text-sm">{selectedCollege.placementPercentage}% PLACED</strong>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <span className="text-gray-500 block">AVERAGE RECRUIT PACKAGE</span>
                  <strong className="text-emerald-400 text-sm">{selectedCollege.averagePackage} LPA</strong>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <span className="text-gray-500 block">HIGHEST ANNUAL PACKAGE</span>
                  <strong className="text-emerald-300 text-sm">{selectedCollege.highestPackage} LPA</strong>
                </div>

                <div className="border-b border-white/5 pb-2">
                  <span className="text-gray-500 block">FACULTY STRENGTH</span>
                  <strong className="text-white text-xs">{selectedCollege.facultyCount} Professors</strong>
                </div>

                {/* Contact details */}
                <div className="space-y-1.5 pt-2 text-[10px] text-gray-400 uppercase font-mono border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <a href={selectedCollege.website} target="_blank" rel="noopener noreferrer" className="hover:text-white lowercase">{selectedCollege.website}</a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="lowercase">{selectedCollege.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedCollege.contactPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setSelectedCollege(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
