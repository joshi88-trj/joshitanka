import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Server, 
  ArrowRight, 
  Database, 
  TrendingUp, 
  Zap, 
  BarChart, 
  Settings, 
  ShieldAlert, 
  Sparkles,
  HelpCircle
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  details: string[];
  icon: any;
  color: string;
}

export default function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState<string>("silver");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const stages: PipelineStage[] = [
    {
      id: "ingestion",
      name: "Ingestion",
      title: "Universal Ingestion Flow",
      subtitle: "High-Throughput Batch & Stream Processing",
      description: "Real-time and batch integration of heterogeneous data sources, clinical streams, and high-frequency financial messages.",
      technologies: ["Apache Kafka", "GCP Pub/Sub", "AWS Kinesis", "Azure Event Hubs", "DynamoDB", "MongoDB", "Sqoop"],
      metrics: [
        { label: "Throughput Limit", value: "Hundreds of Millions / Month" },
        { label: "Ingestion Latency", value: "< 2 Seconds" }
      ],
      details: [
        "Implemented real-time streaming pipelines using AWS Kinesis, Kafka, and Databricks Structured Streaming for low latency clinical events.",
        "Built Sqoop-based ingestion from relational databases into HDFS with schema contracts.",
        "Integrated document / NoSQL databases (DynamoDB, MongoDB) directly into unified pipeline workflows."
      ],
      icon: Zap,
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-400"
    },
    {
      id: "bronze",
      name: "Bronze (Raw)",
      title: "Bronze Lakehouse Layer",
      subtitle: "Append-only Historical Immutable Storage",
      description: "Captures and stores original source data structures unconditionally in cloud object stores, preserving lineage integrity.",
      technologies: ["AWS S3", "ADLS Gen2", "GCP Cloud Storage", "HDFS", "Delta Lake (Raw)", "AWS Glue Data Catalog"],
      metrics: [
        { label: "Storage Scale", value: "Multi-Terabyte Scale" },
        { label: "Lineage Tracking", value: "Lineage Aware" }
      ],
      details: [
        "Consolidated multi-terabyte legacy data lakes into unified cloud object storage paths.",
        "Created partition pruning strategies to reduce indexing overheads and prepare raw datasets for structured queries.",
        "Used AWS Glue Data Catalog and metadata tagging to improve visibility from the initial point of entry."
      ],
      icon: Server,
      color: "from-amber-600/20 to-yellow-500/10 border-amber-500/40 text-amber-400"
    },
    {
      id: "silver",
      name: "Silver (Cleaned)",
      title: "Silver Transformation Layer",
      subtitle: "Deduplicated, Validated & Curated Pipelines",
      description: "Performs schema enforcement, data quality validation, and historical time-travel compaction using high-performance compute kernels.",
      technologies: ["Apache Spark", "PySpark", "Databricks Workflows", "dbt Core", "Great Expectations", "Monte Carlo"],
      metrics: [
        { label: "Query Optimization", value: "60% Performance Gain" },
        { label: "Cost Efficiency", value: "$250K+ Saved Annually" }
      ],
      details: [
        "Optimized Databricks pipelines with partition pruning, predicate pushdown, file compaction, and broadcast joins.",
        "Created robust testing architectures utilizing dbt tests, Great Expectations, and Monte Carlo to detect anomalies early.",
        "Engineered Medallion Architecture with ACID-compliant, time-travel enabled layers across hundreds of millions of logs."
      ],
      icon: Settings,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400"
    },
    {
      id: "gold",
      name: "Gold (Enriched)",
      title: "Gold Analytical Warehouse",
      subtitle: "Dimensional Modeling & Star Schemas",
      description: "Aggregates, compiles, and structures business logic into analytical tables optimized for high-speed metrics and BI consumers.",
      technologies: ["Snowflake", "Google BigQuery", "AWS Redshift", "Azure Synapse", "dbt Stars", "PostgreSQL"],
      metrics: [
        { label: "Daily Warehousing Volume", value: "100+ GB / Day" },
        { label: "Database Speed", value: "3x Index Optimization" }
      ],
      details: [
        "Designed dimensional schemas (Star Schemas and Snowflake Schemas) in dbt to unify cross-department business definitions.",
        "Applied clustering, sorting, distribution keys, and heavy SQL refactoring to reduce compute resource consumption in Snowflake & Redshift.",
        "Implemented rigorous Row-Level and Column-Level Security structures to satisfy PHI, PII, HIPAA, and SOC 2 compliance."
      ],
      icon: Database,
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-400"
    },
    {
      id: "analytics",
      name: "Analytics & BI",
      title: "Analytics / BI & Reverse ETL",
      subtitle: "Downstream Action and Executable Insights",
      description: "Powers business-critical executive dashboards and synchronizes curated data back into operational systems via reverse tunnels.",
      technologies: ["Power BI", "Tableau", "Looker", "Salesforce CRM", "BigQuery BI Engine", "Custom REST APIs"],
      metrics: [
        { label: "Active Dashboards", value: "30+ Maintained" },
        { label: "Data Accessibility", value: "Self-Service Ready" }
      ],
      details: [
        "Delivered critical dashboards in Power BI, Looker, and Tableau to clinical, billing, and executive stakeholders.",
        "Developed custom Reverse ETL pipelines to sync key behavioral vectors out of Snowflake back into operational CRMs.",
        "Partnered with data scientists to package custom feature-engineered training datasets for ML threat & fraud models."
      ],
      icon: BarChart,
      color: "from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-400"
    }
  ];

  // Auto-play interval for demonstrating pipeline data flow
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        const currentIndex = stages.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % stages.length;
        return stages[nextIndex].id;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStageData = stages.find((s) => s.id === activeStage)!;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden shadow-xl shadow-[#02050c]/80" id="pipeline-visualizer">
      {/* Abstract Grid Tech Details */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.01] pointer-events-none" />
      
      {/* Header section with status toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-indigo-400 font-mono text-xs tracking-widest uppercase flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Core Architect Architecture
          </span>
          <h3 className="text-2xl font-display font-medium text-white tracking-tight mt-1">
            Interactive Medallion Pipeline
          </h3>
          <p className="text-white/60 text-sm mt-1 max-w-xl">
            Click on any phase to trace how raw streams transform into secure, high-utility business assets.
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/14 transition-all font-mono text-xs text-white/80 pointer cursor-pointer"
          id="btn-pipeline bg-playback"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`} />
          {isPlaying ? "Simulating Live Flow" : "Flow Paused"}
        </button>
      </div>

      {/* Visual Pipeline Block Train */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 relative z-10 mb-8">
        {stages.map((stage, idx) => {
          const IconComponent = stage.icon;
          const isSelected = stage.id === activeStage;
          
          return (
            <div key={stage.id} className="relative flex flex-col items-center">
              {/* Box */}
              <button
                onClick={() => {
                  setActiveStage(stage.id);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-305 relative group cursor-pointer ${
                  isSelected 
                    ? `bg-gradient-to-br ${stage.color} ring-1 ring-white/15 shadow-lg shadow-[#02050c]/85` 
                    : "bg-white/[0.01] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
                id={`stage-card-${stage.id}`}
              >
                {/* Micro flowing data indicator */}
                {isPlaying && isSelected && (
                  <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden rounded-t-xl">
                    <motion.div 
                      className={`h-full bg-gradient-to-r from-transparent via-${stage.id === 'ingestion' ? 'blue' : stage.id === 'bronze' ? 'amber' : stage.id === 'silver' ? 'emerald' : stage.id === 'gold' ? 'purple' : 'pink'}-450 to-transparent`}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      style={{ width: "80%" }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className={`p-2 rounded-xl bg-white/5 border border-white/10 ${isSelected ? "text-white" : "text-white/40"}`}>
                    <IconComponent size={18} />
                  </span>
                  <span className="font-mono text-[10px] text-white/30 font-semibold uppercase">
                    Step 0{idx+1}
                  </span>
                </div>

                <h4 className="font-display font-medium text-sm text-white mt-4 tracking-tight group-hover:text-indigo-305 transition-colors">
                  {stage.name}
                </h4>
                
                <p className="text-[11px] text-white/40 mt-1 line-clamp-1">
                  {stage.subtitle}
                </p>

                {/* Highlight dot indicator */}
                <div className={`absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isSelected ? "bg-indigo-400 scale-125 shadow-lg shadow-indigo-500/50" : "bg-transparent group-hover:bg-white/20"
                }`} />
              </button>

              {/* Connecting line helper */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-[6px] transform -translate-y-1/2 z-20 pointer-events-none">
                  <ArrowRight size={12} className={`${
                    idx === stages.findIndex(s => s.id === activeStage) ? "text-indigo-400 translate-x-0.5" : "text-white/10"
                  } transition-all duration-300`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Pane for Curated Selected Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Context & Overview */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-1 px-2.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-indigo-400 tracking-wider">
                    {currentStageData.subtitle.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-xl font-display font-medium text-white tracking-tight">
                  {currentStageData.title}
                </h4>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  {currentStageData.description}
                </p>

                {/* Key Details bullets */}
                <div className="mt-5 space-y-2.5">
                  <h5 className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                    Core Design Execution
                  </h5>
                  {currentStageData.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                      <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
                      <p className="leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies list */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <h5 className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">
                  Stack Applied
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentStageData.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-[11px] text-indigo-305 font-mono transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Specific Metrics / Proof of Performance */}
            <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h5 className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-4 flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-indigo-400" />
                  Verified Metrics
                </h5>
                <div className="space-y-6">
                  {currentStageData.metrics.map((metric, index) => (
                    <div key={index} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="text-3xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs text-white/60 mt-1 font-sans">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-white/40 italic leading-snug flex gap-2">
                <Sparkles size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  All metrics are fully sourced directly from production releases at Pfizer, Athenahealth, and corporate clients.
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
