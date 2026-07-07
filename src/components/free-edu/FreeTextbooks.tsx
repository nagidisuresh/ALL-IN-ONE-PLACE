import React, { useState } from "react";
import { Book, ExternalLink, Search, Download, HelpCircle, FileText, Globe } from "lucide-react";

interface BookHub {
  title: string;
  category: "Academic" | "STEM" | "Literature" | "Archives";
  description: string;
  url: string;
  formats: string[];
  totalVolume: string;
}

export default function FreeTextbooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const bookHubs: BookHub[] = [
    {
      title: "OpenStax (Rice University)",
      category: "Academic",
      description: "100% free, peer-reviewed, high-quality college and high school textbooks in Math, Physics, Chemistry, Biology, Economics, and Social Sciences. Fully aligned with standard syllabi.",
      url: "https://openstax.org",
      formats: ["PDF", "Online Reader", "Kindle"],
      totalVolume: "80+ Premium Manuals"
    },
    {
      title: "Project Gutenberg",
      category: "Literature",
      description: "The world's premier library of free classic literature and historical texts. Access thousands of public domain titles including Shakespeare, Austen, Dickens, and philosophical treaties.",
      url: "https://www.gutenberg.org",
      formats: ["EPUB", "Kindle", "HTML", "Plain Text"],
      totalVolume: "70,000+ Free Ebooks"
    },
    {
      title: "LibreTexts Library",
      category: "STEM",
      description: "A collaborative, multi-university open textbook initiative. Contains highly granular modules and virtual laboratory guides for organic chemistry, mathematics, geological sciences, and social sciences.",
      url: "https://libretexts.org",
      formats: ["PDF", "Online Reader"],
      totalVolume: "120,000+ Mini Lessons"
    },
    {
      title: "Open Textbook Library (UMN)",
      category: "Academic",
      description: "Maintained by the Center for Open Education at the University of Minnesota. A curated clearinghouse of books that are legally licensed to be read, edited, and distributed.",
      url: "https://open.umn.edu/opentextbooks",
      formats: ["PDF", "Online Reader"],
      totalVolume: "1,200+ Full Manuals"
    },
    {
      title: "Internet Archive Books",
      category: "Archives",
      description: "A digital vault of millions of books, periodicals, and classic texts. Includes an interactive borrow engine where students can rent copyrighted academic books legally for free.",
      url: "https://archive.org/details/books",
      formats: ["PDF", "EPUB", "Online Borrow"],
      totalVolume: "20,000,000+ Scanned Texts"
    },
    {
      title: "BCcampus Open Education",
      category: "Academic",
      description: "Canada's primary repository of open-access college resources. Covers trade vocations, business management, statistics, and computer science.",
      url: "https://open.bccampus.ca",
      formats: ["PDF", "EPUB", "Online Reader"],
      totalVolume: "1,000+ Curated Books"
    },
    {
      title: "Bookboon (Free Student Section)",
      category: "STEM",
      description: "Curated, bite-sized textbooks focused on finance, mechanical engineering, business programming, and core computing.",
      url: "https://bookboon.com",
      formats: ["PDF"],
      totalVolume: "500+ Engineering Manuals"
    },
    {
      title: "PDF Drive (Search Filter Hub)",
      category: "Archives",
      description: "An aggregator and search engine indexing millions of academic and general PDF manuals. (Note: Check copyrights when downloading).",
      url: "https://www.pdfdrive.com",
      formats: ["PDF"],
      totalVolume: "80,000,000+ Files Indexed"
    }
  ];

  const categories = ["All", "Academic", "STEM", "Literature", "Archives"];

  const filtered = bookHubs.filter((hub) => {
    const matchesSearch = 
      hub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || hub.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full space-y-10">
      {/* Intro header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-transparent rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-4">
            <Book className="w-4 h-4 text-cyan-400" />
            <span>Open Access Bookshelf</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Free Academic Textbooks & Classic Ebooks
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed">
            Stop paying thousands of dollars for student textbook bundles. Direct access to elite public domain classics, peer-reviewed University math/science books, and legal open-access libraries around the world.
          </p>
        </div>
      </div>

      {/* Filter and search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search textbook hubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input text-sm text-white rounded-[14px] py-2.5 pl-11 pr-4 bg-black/20 border border-white/10 focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-500"
          />
        </div>

        {/* Categories row */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-[#11101c]/45 border border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Book Hub Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {filtered.map((hub) => (
          <div 
            key={hub.title}
            className="glass-card rounded-[22px] border border-white/5 bg-[#11101c]/45 hover:border-white/10 hover:bg-[#151424]/60 p-6 flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono uppercase tracking-wider text-cyan-300">
                  {hub.category} Ebooks
                </span>
                <span className="text-[10px] font-mono text-gray-500 font-semibold">{hub.totalVolume}</span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                {hub.title}
              </h3>
              
              <p className="text-gray-400 text-xs mt-2.5 leading-relaxed">
                {hub.description}
              </p>

              {/* Supported Formats */}
              <div className="mt-4 flex flex-wrap gap-1.5 items-center">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mr-1">Formats:</span>
                {hub.formats.map((f) => (
                  <span key={f} className="text-[9px] px-2 py-0.5 rounded bg-[#22d3ee]/5 border border-[#22d3ee]/25 text-cyan-300 font-mono">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                100% Free
              </span>
              
              <a
                href={hub.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-all cursor-pointer group-hover:translate-x-0.5 duration-200"
              >
                <span>Browse Library</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Tips Section */}
      <div className="bg-[#11101c]/45 rounded-2xl p-6 border border-white/5 relative">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/20 text-purple-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Pro Tip: Accessing Copyrighted Manuals Legally</h3>
            <p className="text-xs text-gray-400 leading-relaxed mt-2">
              If your college or school recommends a specific copyrighted textbook not listed in open-access directories, utilize the <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline">Internet Archive's Controlled Digital Lending</a> initiative. They allow users around the globe to borrow digitized versions of actual commercial textbooks for free for up to 1-hour or 14-days cycles, completely legally and safely!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
