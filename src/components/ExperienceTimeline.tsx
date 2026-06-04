import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { experiences } from "../data";
import { Experience } from "../types";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Filter,
  CheckCircle,
  XCircle,
  Search
} from "lucide-react";

export default function ExperienceTimeline() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCompanies, setExpandedCompanies] = useState<Record<string, boolean>>({
    "PFIZER": true, // Kept open by default for maximum immediate impact
    "ATHENAHEALTH": true
  });

  // Extract all unique technologies sorted by frequency/importance
  const allUniqueTech = useMemo(() => {
    const list = experiences.flatMap(e => e.technologies);
    const counts = list.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Sort by count, then by name
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  }, []);

  // Filter tech to only show upper frequency ones as quick tags (top 12)
  const popularTags = useMemo(() => {
    return allUniqueTech.slice(0, 11);
  }, [allUniqueTech]);

  // Handle accordion toggling
  const toggleExpand = (company: string) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [company]: !prev[company]
    }));
  };

  // Filter experiences based on selected tech and search query
  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchesTech = !selectedTech || exp.technologies.some(t => t.toLowerCase() === selectedTech.toLowerCase());
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        exp.company.toLowerCase().includes(query) ||
        exp.role.toLowerCase().includes(query) ||
        exp.bullets.some(b => b.toLowerCase().includes(query)) ||
        exp.technologies.some(t => t.toLowerCase().includes(query));
      
      return matchesTech && matchesSearch;
    });
  }, [selectedTech, searchQuery]);

  return (
    <div className="space-y-8" id="experience-section">
      {/* Search & Filter Matrix */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 md:p-6 backdrop-blur-2xl shadow-xl shadow-indigo-950/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-indigo-400" />
            <h4 className="font-display font-medium text-white text-sm uppercase tracking-wider">
              Filter Experience Matrix
            </h4>
          </div>
          
          {/* Quick Clear */}
          {(selectedTech || searchQuery) && (
            <button
              onClick={() => {
                setSelectedTech(null);
                setSearchQuery("");
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer font-mono font-bold"
            >
              <XCircle size={14} />
              Clear Filter Query
            </button>
          )}
        </div>

        {/* Input & Search box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
          <div className="relative md:col-span-1">
            <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-white/40">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Search keyword, technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 placeholder-white/30 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all font-sans"
            />
          </div>

          {/* Quick Popular Technology Filter tags */}
          <div className="md:col-span-2 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-mono text-white/30 mr-1.5 hidden lg:inline">Popular:</span>
            {popularTags.map((tech) => {
              const isSelected = selectedTech?.toLowerCase() === tech.toLowerCase();
              return (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(isSelected ? null : tech)}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                    isSelected 
                      ? "bg-indigo-500/20 border-indigo-500/45 text-indigo-300 font-semibold" 
                      : "bg-white/[0.01] border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Status indicator on filtered stats */}
        {(selectedTech || searchQuery) && (
          <div className="text-xs text-white/70 font-mono flex items-center gap-1.5 mt-2 bg-white/5 p-2 rounded-xl border border-white/10">
            <CheckCircle size={12} className="text-emerald-400" />
            <span>
              Showing {filteredExperiences.length} of {experiences.length} positions matching: 
              {selectedTech && <b className="text-indigo-305 ml-1 font-mono">[{selectedTech}]</b>}
              {searchQuery && <b className="text-indigo-305 ml-1 font-mono">"{searchQuery}"</b>}
            </span>
          </div>
        )}
      </div>

      {/* Main Experience Chain Timeline */}
      <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-6 md:pl-8 space-y-10">
        
        {/* Visual continuous pulse line */}
        <div className="absolute top-0 bottom-0 left-[-1px] w-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent pointer-events-none" />

        <AnimatePresence initial={false}>
          {filteredExperiences.map((exp) => {
            const isExpanded = expandedCompanies[exp.company] || false;
            
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Custom timeline node bullet */}
                <div className="absolute -left-[45px] md:-left-[53px] top-4 z-10 flex items-center justify-center">
                  <span className="flex h-5 w-5 rounded-full border-2 border-white/20 bg-indigo-950 items-center justify-center shadow-md">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  </span>
                </div>

                {/* Interactive Card wrapper */}
                <div className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-5 md:p-6 transition-all duration-300 backdrop-blur-2xl shadow-xl shadow-indigo-950/10">
                  
                  {/* Top Line: Role, Company metadata */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-lg font-display font-medium text-white tracking-tight">
                          {exp.role}
                        </h4>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono tracking-widest uppercase bg-white/5 border border-indigo-500/20 text-indigo-300 font-bold shadow-inner">
                          {exp.company}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono text-white/50">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-white/30" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-white/30" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Accordion toggle action button */}
                    <button
                      onClick={() => toggleExpand(exp.company)}
                      className="p-1.5 py-1 px-3 self-start md:self-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all text-[11px] font-mono rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <span>Hide Details</span>
                          <ChevronUp size={13} />
                        </>
                      ) : (
                        <>
                          <span>Expand Details</span>
                          <ChevronDown size={13} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Curated Metrics Boxes (Only Pfizer, Athenahealth, Mastercard, etc) */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3.5 mt-4">
                      {exp.metrics.map((m, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-center">
                          <span className="text-xs font-mono text-white/50 tracking-tight leading-tight">
                            {m.label}
                          </span>
                          <span className="text-base md:text-lg font-display font-semibold text-indigo-300 mt-1 flex items-center gap-1">
                            <TrendingUp size={13} className="text-indigo-400 shrink-0" />
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dropdown Content with Bullets details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-5 space-y-3 pl-1">
                          {exp.bullets.map((bullet, index) => (
                            <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-white/80 text-justify">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                              <p>{bullet}</p>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer Technologies list */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => {
                        const isMatch = selectedTech?.toLowerCase() === tech.toLowerCase();
                        return (
                          <span
                            key={tech}
                            onClick={() => setSelectedTech(isMatch ? null : tech)}
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-mono cursor-pointer transition-colors border ${
                              isMatch 
                                ? "bg-indigo-500/25 border-indigo-500/50 text-indigo-200" 
                                : "bg-white/[0.01] border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                            }`}
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredExperiences.length === 0 && (
          <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-2xl p-8 text-center">
            <XCircle className="text-white/40 mx-auto mb-2" size={24} />
            <h5 className="font-display font-medium text-white text-sm">No engineering roles found</h5>
            <p className="text-white/30 text-xs mt-1">Try relaxing or clearing your active technology filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
