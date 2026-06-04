import { useState } from "react";
import { motion } from "motion/react";
import { skillCategories } from "../data";
import { SkillCategory } from "../types";
import { 
  Cloud, 
  Database, 
  Cpu, 
  HardDrive, 
  GitBranch, 
  Sliders, 
  Sparkles,
  Layers,
  Award
} from "lucide-react";

// Helper to resolve icon key names to Lucide Icon components
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Cloud":
      return Cloud;
    case "Database":
      return Database;
    case "Cpu":
      return Cpu;
    case "HardDrive":
      return HardDrive;
    case "GitBranch":
      return GitBranch;
    case "Sliders":
      return Sliders;
    default:
      return Layers;
  }
};

export default function SkillMatrix() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Custom static estimations based on 8+ years Senior Data Engineer track
  const coreCompetencies = [
    { name: "Apache Spark / PySpark", level: "95%", icon: Cpu, desc: "Large-scale batch and Structured Streaming" },
    { name: "Databricks & Delta Lake", level: "95%", icon: Layers, desc: "Lakehouse Medallion structures and optimization" },
    { name: "Snowflake & Cloud Warehousing", level: "92%", icon: Database, desc: "Dimensional schemas, clustering and SQL optimization" },
    { name: "AWS Cloud Environments", level: "90%", icon: Cloud, desc: "S3, Glue, Redshift, Lambda, Kinesis, IAM" },
    { name: "Apache Airflow / Ingestion", level: "92%", icon: GitBranch, desc: "Workflows automation and dependency management" },
    { name: "Data Quality & dbt Tests", level: "88%", icon: Sliders, desc: "Great Expectations, Monte Carlo quality assertions" }
  ];

  return (
    <div className="space-y-10" id="skills-section">
      
      {/* Section 1: Core Heavyweight Competencies */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Award size={16} className="text-indigo-400" />
          <h4 className="font-display font-medium text-white text-xs uppercase tracking-widest">
            Core Competencies & Proficiencies
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreCompetencies.map((comp) => {
            const CompIcon = comp.icon;
            return (
              <div 
                key={comp.name}
                className="bg-white/[0.03] border border-white/10 hover:border-white/20 p-4 rounded-2xl flex flex-col justify-between transition-all group hover:bg-white/[0.06] shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      <CompIcon size={16} />
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-450/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      {comp.level}
                    </span>
                  </div>
                  <h5 className="font-display font-medium text-white mt-3 text-sm">
                    {comp.name}
                  </h5>
                  <p className="text-white/60 text-[11px] mt-1 leading-snug">
                    {comp.desc}
                  </p>
                </div>

                {/* Simulated proficiency bar */}
                <div className="w-full bg-white/10 rounded-full h-1 mt-4 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-400 h-1 rounded-full" 
                    initial={{ width: 0 }}
                    whileInView={{ width: comp.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Complete Skills Matrix Categories Grid */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Layers size={16} className="text-indigo-400" />
          <h4 className="font-display font-medium text-white text-xs uppercase tracking-widest">
            Technical Skill Taxonomy matrix
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const IconComp = getCategoryIcon(cat.icon);
            return (
              <div 
                key={idx}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all shadow-xl shadow-indigo-950/5 flex flex-col justify-between"
              >
                <div>
                  {/* Category Title Header */}
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/10 mb-4">
                    <span className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                      <IconComp size={16} />
                    </span>
                    <h5 className="font-display font-medium text-slate-100 text-sm tracking-tight">
                      {cat.category}
                    </h5>
                  </div>

                  {/* Skills lists */}
                  <ul className="space-y-2">
                    {cat.skills.map((skill, sIdx) => (
                      <li 
                        key={sIdx} 
                        className="flex items-start gap-2 text-xs text-white/70 transition-all"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="text-indigo-400 shrink-0 mt-1">•</span>
                        <span className={`leading-relaxed ${hoveredSkill === skill ? "text-indigo-305 font-medium" : ""}`}>
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Meta Indicator Footer */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/30">
                  <span>CATEGORY INDEX</span>
                  <span>[0{idx + 1}]</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-indigo-950/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-1 border-b border-white/10 md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-4">
            <span className="font-mono text-[10px] text-indigo-400 tracking-wider flex items-center gap-1 uppercase mb-1">
              <Sparkles size={11} className="animate-pulse text-yellow-400" />
              Trained & Vetted
            </span>
            <h5 className="text-lg font-display font-medium text-white tracking-tight">
              Verified Certifications
            </h5>
            <p className="text-white/60 text-xs mt-1">
              Certified across major cloud architecture and DevOps orchestrators.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-white/40 uppercase">GOOGLE CLOUD</span>
              <h6 className="font-display font-medium text-white text-xs mt-1.5 leading-snug">
                Professional Data Engineer
              </h6>
              <div className="text-[10px] font-mono text-indigo-400 mt-3 font-semibold">VALIDATED</div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-white/40 uppercase">HASHICORP</span>
              <h6 className="font-display font-medium text-white text-xs mt-1.5 leading-snug">
                Terraform Associate (IaC)
              </h6>
              <div className="text-[10px] font-mono text-indigo-400 mt-3 font-semibold">VALIDATED</div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
              <span className="font-mono text-[9px] text-white/40 uppercase">SNOWFLAKE</span>
              <h6 className="font-display font-medium text-white text-xs mt-1.5 leading-snug">
                SnowPro Advanced: Architect
              </h6>
              <div className="text-[10px] font-mono text-indigo-400 mt-3 font-semibold">VALIDATED</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
