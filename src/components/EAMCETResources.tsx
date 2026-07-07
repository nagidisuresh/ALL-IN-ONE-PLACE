import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  BookMarked, 
  Search, 
  FolderDown, 
  Award,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  X
} from "lucide-react";
import { MOCK_PAPERS, MOCK_STUDY_MATERIALS } from "./eamcetMockData";
import { StudyMaterial } from "../eamcetTypes";

export default function EAMCETResources() {
  const [activeSection, setActiveSection] = useState<"papers" | "notes">("papers");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<StudyMaterial | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Filter study notes based on search
  const filteredNotes = MOCK_STUDY_MATERIALS.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadSuccess(id);
    setTimeout(() => {
      setDownloadSuccess(null);
      // Simulate real download by showing alert
      alert(`Downloading: "${title}" as PDF successfully. In a real environment, this transfers the file asset directly.`);
    }, 1200);
  };

  return (
    <div id="eamcet-resources-view" className="space-y-8 py-6 px-4 md:px-8 max-w-5xl mx-auto relative z-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Resources & Study Library</h1>
          <p className="text-gray-400 text-sm">
            Download previous year question papers (PYQs) or study revision guides written by top-rankers.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-white/5 w-full md:w-auto shrink-0">
          <button
            onClick={() => setActiveSection("papers")}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSection === "papers"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FolderDown className="w-3.5 h-3.5" />
            <span>Solved PYQs (PDF)</span>
          </button>
          <button
            onClick={() => setActiveSection("notes")}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSection === "notes"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Subject Study Notes</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSection === "papers" ? (
        /* SOLVED PYQS VIEW */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_PAPERS.map((paper, idx) => {
              const isDownloading = downloadSuccess === paper.id;

              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 p-6 rounded-2xl flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 text-red-400 rounded-xl group-hover:bg-red-500/20 transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono bg-white/5 text-gray-400 border border-white/10 px-2 py-0.5 rounded uppercase">
                        YEAR {paper.year}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight pt-1">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono">
                        {(paper.downloads / 1000).toFixed(1)}k+ downloads
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(paper.id, paper.title)}
                    disabled={isDownloading}
                    className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center border shrink-0 ${
                      isDownloading
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
                    }`}
                  >
                    {isDownloading ? (
                      <CheckCircle2 className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* External resources list */}
          <div className="bg-indigo-950/10 border border-indigo-500/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">Reputable External Resources Links</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-400">
              <li className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                <span className="truncate">APSCHE Official Portal for AP EAPCET Notifications</span>
                <a href="https://sche.ap.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5">
                  Visit <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                <span className="truncate">TGCHE Official Portal for TS EAMCET Services</span>
                <a href="https://tgeapcet.nic.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5">
                  Visit <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* STUDY NOTES VIEW */
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search notes by subject, topic or formula name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 focus:border-indigo-500 focus:outline-none rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNotes.map((note, idx) => {
              let tagColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
              if (note.subject === "Physics") tagColor = "bg-purple-500/10 text-purple-400 border-purple-500/20";
              if (note.subject === "Chemistry") tagColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-500/20 hover:bg-white/[0.02] transition-all group h-[220px]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border uppercase ${tagColor}`}>
                        {note.subject}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono uppercase">{note.topic}</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors">
                      {note.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedNote(note)}
                    className="w-full py-2.5 bg-white/5 hover:bg-indigo-600 hover:text-white border border-white/10 hover:border-indigo-500 text-gray-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    Read Revision Note <Eye className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}

            {filteredNotes.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500 text-xs">
                No revision notes found matching "{searchTerm}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Note Modal/Detail Overlay */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0c0c16] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-md uppercase">
                {selectedNote.subject} &bull; {selectedNote.topic}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
                {selectedNote.title}
              </h2>
            </div>

            {/* Note Content */}
            <div className="space-y-4 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 pt-4">
              <p>{selectedNote.content}</p>

              {/* Formulas */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Core Mathematical Formulations:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedNote.formulas.map((form, i) => (
                    <div key={i} className="bg-neutral-900 border border-white/5 p-3 rounded-lg text-xs font-mono text-gray-300">
                      {form}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Top-Ranker Key Takeaways:</span>
                <ul className="space-y-1 text-xs">
                  {selectedNote.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-4 flex justify-end border-t border-white/5">
              <button
                onClick={() => {
                  const noteTitle = selectedNote.title;
                  setSelectedNote(null);
                  handleDownload(selectedNote.id, noteTitle);
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                Download Note PDF <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
