import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  BookOpen, 
  ArrowRight, 
  ChevronRight, 
  Printer, 
  Download, 
  ExternalLink,
  Cpu,
  Database,
  Cloud,
  CheckCircle2,
  Lock,
  ChevronDown
} from "lucide-react";
import { professionalSummary, contactDetails, certifications, education } from "./data";
import PipelineVisualizer from "./components/PipelineVisualizer";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillMatrix from "./components/SkillMatrix";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Monitor scrolling to highlight navigation nodes dynamically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "pipeline", "experience", "skills", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const element = document.getElementById(`${section}-section-anchor`);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      
      {/* ---------------------------------------------------------------------- */}
      {/* SCREEN / BROWSER INTERACTION LAYOUT (Hidden when printing) */}
      {/* ---------------------------------------------------------------------- */}
      <div className="print:hidden">
        
        {/* Ambient Backdrops, Grid Overlay glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] left-[5%] w-[40%] h-[40%] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

        {/* Global tech background grid accent */}
        <div className="absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent pointer-events-none" />

        {/* Floating System Banner Node */}
        <header className="sticky top-0 z-50 bg-white/[0.02] border-b border-white/10 backdrop-blur-xl">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo terminal widget */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-indigo-400 font-bold text-lg select-none">
                &lt;T<span className="text-purple-400">.</span>J&gt;
              </span>
              <div className="hidden sm:block border-l border-white/10 pl-2.5">
                <span className="font-display text-[11px] font-semibold tracking-wider text-white/60 uppercase">
                  Data Platform Engineer
                </span>
              </div>
            </div>

            {/* Navigation links targeting anchor sections */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
              {[
                { id: "overview", label: "Overview" },
                { id: "pipeline", label: "Medallion Ingestion" },
                { id: "experience", label: "Milestones" },
                { id: "skills", label: "Technical Matrix" },
                { id: "contact", label: "Establish Stream" }
              ].map((lnk) => (
                <a
                  key={lnk.id}
                  href={`#${lnk.id}-section-anchor`}
                  className={`transition-colors relative py-1.5 ${
                    activeSection === lnk.id ? "text-indigo-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  {lnk.label}
                  {activeSection === lnk.id && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-indigo-400 to-purple-450"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Quick Actions Panel */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-[11px] font-mono text-white/80 hover:text-white transition-all cursor-pointer shadow-sm"
                title="Print CV in high-fidelity PDF format"
                id="btn-print-cv"
              >
                <Printer size={13} className="text-indigo-400" />
                <span className="hidden sm:inline">Print CV (A4)</span>
              </button>

              <a
                href="#contact-section-anchor"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:border-indigo-500/50 hover:from-indigo-500/20 hover:to-purple-500/20 rounded-lg text-[11px] font-mono text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer"
                id="btn-stream-link"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-505"></span>
                </span>
                <span>Get in Touch</span>
              </a>
            </div>

          </div>
        </header>

        {/* MAIN GRID BODY LAYOUT */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-24 relative z-10">
          
          {/* 1. HERO HERO SECTION */}
          <section id="overview-section-anchor" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left text display */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md">
                  <span className="flex h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                    Available for Contracts & Contracts to Hire
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.08]">
                    Tanka Raj Joshi
                  </h1>
                  <h2 className="text-lg sm:text-xl font-sans text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-medium leading-relaxed tracking-tight">
                    Senior Data Engineer | Data Architect | Cloud Platform Specialist
                  </h2>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed max-w-xl text-justify">
                  Architecting resilient pipeline topologies, Lakehouse systems, and distributed stream processors processing hundreds of millions of clinical, monetary, and customer logs daily. Fully validated across GCP, AWS, Azure, Snowflake, and Terraform.
                </p>

                {/* Quantitative Badges Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-lg hover:bg-white/[0.08] transition-all">
                    <div className="text-2xl font-display font-semibold text-white tracking-tight">8+ Years</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase mt-0.5">Enterprise engineering</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-lg hover:bg-white/[0.08] transition-all">
                    <div className="text-2xl font-display font-semibold text-white tracking-tight">100+ GB /d</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase mt-0.5">Workload Volume</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-lg hover:bg-white/[0.08] transition-all">
                    <div className="text-2xl font-display font-semibold text-white tracking-tight">30%</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase mt-0.5">Runtime Speedup</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-lg hover:bg-white/[0.08] transition-all">
                    <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-350 tracking-tight">$250K+</div>
                    <div className="text-[10px] font-mono text-white/40 uppercase mt-0.5">Annual Compute Savings</div>
                  </div>
                </div>

                {/* Primary action handles */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="#contact-section-anchor"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-400 hover:to-purple-550 text-white hover:brightness-110 rounded-xl transition-all font-mono text-xs uppercase tracking-wider shadow-lg shadow-indigo-950/40 cursor-pointer"
                  >
                    <span>Connect Live Stream</span>
                    <ArrowRight size={13} />
                  </a>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white rounded-xl transition-all font-mono text-xs cursor-pointer"
                  >
                    <Mail size={13} className="text-indigo-400" />
                    <span>{copiedText ? "Email Copied!" : "Copy Email Ingestion"}</span>
                  </button>
                </div>
              </div>

              {/* Right technical interactive terminal card */}
              <div className="lg:col-span-5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-[40px] opacity-[0.08] pointer-events-none" />
                
                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/10 p-5 relative overflow-hidden font-mono text-xs text-white/60 leading-relaxed shadow-2xl shadow-indigo-950/50">
                  {/* Top Bar window nodes */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4 text-white/30">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    <span className="text-[10px] text-white/40 tracking-wider font-semibold">TankaJoshi.init()</span>
                  </div>

                  <div className="space-y-3.5 text-left font-mono">
                    <div>
                      <span className="text-indigo-400 font-bold">&gt; Tanka.professionalSummary</span>
                      <p className="text-white/80 pl-4 mt-0.5 italic text-justify leading-relaxed">
                        "8+ years of enterprise-grade cloud data engineering. Architected Medallion structures, real-time stream ingestion, and consolidated multi-terabyte fragmented sources into governed modern Lakehouses."
                      </p>
                    </div>

                    <div>
                      <span className="text-indigo-400 font-bold">&gt; Tanka.vouchedPlatforms</span>
                      <div className="flex flex-wrap gap-1.5 pl-4 mt-1.5">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-purple-300 font-mono">AWS</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-purple-300 font-mono">Azure</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-purple-300 font-mono">GCP</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-purple-300 font-mono">Databricks</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-purple-300 font-mono">Snowflake</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-purple-300 font-mono">BigQuery</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-indigo-400 font-bold">&gt; Tanka.contactDetails</span>
                      <div className="space-y-1 pl-4 mt-1.5 text-white/80 text-[11px]">
                        <div><span className="text-white/40 font-semibold uppercase">LOC:</span> {contactDetails.location}</div>
                        <div><span className="text-white/40 font-semibold uppercase">EML:</span> {contactDetails.email}</div>
                        <div><span className="text-white/40 font-semibold uppercase">PHN:</span> {contactDetails.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 2. SUMMARY ACCORDION AS PRINCIPLES FIELD */}
          <section className="bg-white/[0.03] border border-white/10 backdrop-blur-xl divide-y divide-white/10 rounded-3xl overflow-hidden shadow-xl shadow-indigo-950/20">
            <div className="p-5 md:p-6 bg-white/[0.01]">
              <span className="text-xs font-mono text-indigo-400 tracking-wider">01 // STRUCTURAL DIRECTIVES</span>
              <h3 className="text-xl font-display font-medium text-white tracking-tight mt-1">
                Engineering Tenets & Vision
              </h3>
            </div>
            <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              {professionalSummary.map((summary, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <span className="font-mono text-indigo-400/50 group-hover:text-indigo-400 transition-colors font-bold text-xs mt-0.5">
                    [0{idx + 1}]
                  </span>
                  <p className="text-white/80 text-xs sm:text-[13px] leading-relaxed text-justify">
                    {summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. INTERACTIVE MEDALLION PIPELINE VISUALIZER */}
          <section id="pipeline-section-anchor" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <span className="font-mono text-sm text-indigo-400">02 //</span>
              <h3 className="text-xl font-display font-medium text-white tracking-tight uppercase">
                Interactive Pipeline Architecture
              </h3>
            </div>

            <PipelineVisualizer />
          </section>

          {/* 4. WORK EXPERIENCE TIMELINE WITH TAG FILTER MATRIX */}
          <section id="experience-section-anchor" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <span className="font-mono text-sm text-indigo-400">03 //</span>
              <h3 className="text-xl font-display font-medium text-white tracking-tight uppercase">
                Professional Milestones Experience
              </h3>
            </div>

            <ExperienceTimeline />
          </section>

          {/* 5. COMPLETE TECHNICAL SKILL MATRICES */}
          <section id="skills-section-anchor" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <span className="font-mono text-sm text-indigo-400">04 //</span>
              <h3 className="text-xl font-display font-medium text-white tracking-tight uppercase">
                Compilers, Engines & Compliance Matrix
              </h3>
            </div>

            <SkillMatrix />
          </section>

          {/* 6. EDUCATION & REGULATED DOMAINS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between shadow-lg">
              <div>
                <span className="font-mono text-[9px] text-indigo-400 tracking-wider flex items-center gap-1 uppercase mb-1">
                  <BookOpen size={11} />
                  Academic Foundation
                </span>
                <h4 className="text-base font-display font-medium text-white tracking-tight">
                  University Education
                </h4>
                <div className="mt-5 space-y-4">
                  <div className="border-l border-white/10 pl-4 space-y-1">
                    <div className="text-[13px] font-sans text-white font-medium">Master of Science in Computer Science</div>
                    <div className="text-xs text-white/60 font-mono">Texas A&M University–Commerce</div>
                    <div className="text-[11px] text-white/40 font-mono">Commerce, TX</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-[10px] font-mono text-white/30">ACADEMICS VERIFIED</div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 hover:border-white/20 backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between shadow-lg">
              <div>
                <span className="font-mono text-[9px] text-indigo-400 tracking-wider flex items-center gap-1 uppercase mb-1">
                  <Lock size={11} />
                  Governance Standards
                </span>
                <h4 className="text-base font-display font-medium text-white tracking-tight">
                  Regulated Environments Handled
                </h4>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-xs text-white/80 font-sans">PHI / PII Data</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-450" />
                    <span className="text-xs text-white/80 font-sans">HIPAA Compliant</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-450" />
                    <span className="text-xs text-white/80 font-sans">SOC 2 Audited</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-450" />
                    <span className="text-xs text-white/80 font-sans">RBAC Audit Controls</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-[10px] font-mono text-white/30">COMPLIANCE ASSURED</div>
            </div>

          </section>

          {/* 7. SECURE CONTACT CHANNELS & PIPELINE FOR RECRUITERS */}
          <section id="contact-section-anchor" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/15">
              <span className="font-mono text-sm text-indigo-400">05 //</span>
              <h3 className="text-xl font-display font-medium text-white tracking-tight uppercase">
                Establish Connection Stream
              </h3>
            </div>

            <ContactForm />
          </section>

        </main>

        {/* Global Footer metadata credits */}
        <footer className="border-t border-white/10 bg-white/[0.02] backdrop-blur-2xl py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-white/40 space-y-2">
            <div>
              &copy; {new Date().getFullYear()} Tanka Raj Joshi. All pipeline topologies, benchmarks, and details copy protected.
            </div>
            <div className="flex justify-center gap-3">
              <a href={contactDetails.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-455 transition-colors">LinkedIn Node</a>
              <span>&bull;</span>
              <a href={`mailto:${contactDetails.email}`} className="hover:text-indigo-455 transition-colors">Mail Sink</a>
            </div>
          </div>
        </footer>

      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* PRINT-ONLY klassic HIGH-FIDELITY BLACK-AND-WHITE RESUME VIEW */}
      {/* Only visible during browser system print/compile PDF flows */}
      {/* ---------------------------------------------------------------------- */}
      <div className="hidden print:block bg-white text-black p-8 max-w-4xl mx-auto space-y-4 font-serif leading-relaxed text-xs">
        
        {/* Print Header */}
        <div className="text-center pb-2 border-b-2 border-black space-y-1">
          <h1 className="text-3xl font-bold tracking-wide uppercase font-sans text-black">
            Tanka Raj Joshi
          </h1>
          <div className="text-xs font-semibold text-gray-800 uppercase tracking-tight">
            Senior Data Engineer | Data Architect | Cloud Data Platform Engineer
          </div>
          <div className="text-[11px] text-gray-700 flex justify-center gap-4 flex-wrap">
            <span>Dallas, TX</span>
            <span>&bull;</span>
            <span>(940) 441-3864</span>
            <span>&bull;</span>
            <span>tankajoshi788@gmail.com</span>
            <span>&bull;</span>
            <span>Linkedin: linkedin.com/in/tanka-raj-joshi</span>
          </div>
        </div>

        {/* Print Professional Summary */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold tracking-wider uppercase border-b border-black pb-0.5 font-sans">
            Professional Summary
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            {professionalSummary.map((sum, index) => (
              <li key={index} className="text-justify">{sum}</li>
            ))}
          </ul>
        </div>

        {/* Print Technical Skills */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold tracking-wider uppercase border-b border-black pb-0.5 font-sans">
            Technical Skills
          </h3>
          <div className="space-y-1.5 text-[11px]">
            <div>
              <b>Cloud Platforms:</b> AWS (S3, Glue, Redshift, Lambda, Kinesis, Athena), Azure (Data Factory, Synapse Analytics, Databricks, ADLS Gen2, Event Hubs, Purview), GCP (BigQuery, Pub/Sub, Dataflow, Cloud Storage, GKE).
            </div>
            <div>
              <b>Data Engineering & Architecture:</b> ETL/ELT pipelines, Medallion Architecture (Bronze/Silver/Gold), Lakehouse, Apache Spark, PySpark, Spark SQL, Structured Streaming, Active Kafka, dbt, Dimensional modeling, Star/Snowflake schemas.
            </div>
            <div>
              <b>Data Platforms & Orchestration:</b> Databricks, Snowflake, BigQuery, AWS Redshift, PostgreSQL, MySQL, Apache Airflow, dbt, Great Expectations, Monte Carlo, Prefect, Kubernetes, Docker, Terraform.
            </div>
            <div>
              <b>Programming & Visualization:</b> Python, SQL, Scala, Java, Bash, Power BI, Tableau, Looker.
            </div>
            <div>
              <b>Governance, AI & Security:</b> RBAC, Compliance checks (PII, HIPAA, SOC 2), data lineage (DataHub, OpenLineage), Feature Engineering, LLM / RAG Data Prep.
            </div>
          </div>
        </div>

        {/* Print Experience */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-wider uppercase border-b border-black pb-0.5 font-sans justify-between flex">
            <span>Professional Experience</span>
          </h3>

          <div className="space-y-3 text-[11px]">
            {/* Pfizer */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-bold">
                <span>PFIZER</span>
                <span>Aug 24 &ndash; Present</span>
              </div>
              <div className="flex justify-between italic font-semibold text-gray-700">
                <span>Senior Data Engineer</span>
                <span>New York, NY</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 mt-1 text-justify">
                <li>Architected enterprise ETL/ELT pipelines processing 100+ GB of clinical data daily using Spark, Databricks, Kafka, Snowflake, BigQuery.</li>
                <li>Engineered ACID-compliant medallion lakehouses tracking hundreds of millions of clinical records.</li>
                <li>Optimized Databricks cluster sizing, partition pruning, and broadcast joins, reducing runtime by 30% and saving $250K+ annually.</li>
                <li>Built automated quality assurance engines utilizing dbt tests, Great Expectations, and Monte Carlo monitors.</li>
                <li>Led legacy workflow migrations to GCP serverless ecosystems.</li>
              </ul>
            </div>

            {/* Athenahealth */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-bold">
                <span>ATHENAHEALTH</span>
                <span>Mar 23 &ndash; Jul 24</span>
              </div>
              <div className="flex justify-between italic font-semibold text-gray-700">
                <span>Data Engineer</span>
                <span>Watertown, MA</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 mt-1 text-justify">
                <li>Built healthcare pipelines with S3, Lambda, Glue, Databricks, Spark, PySpark, processing hundreds of millions of billing logs.</li>
                <li>Structured core real-time telemetry processing via Kinesis and Kafka streams.</li>
                <li>Improved critical Redshift query execution times by 60% through distribution keys alignment and query syntax refactoring.</li>
                <li>Automated 20+ production business reporting workflows using Apache Airflow and dbt schemas, ensuring strict HIPAA/SOC 2 compliance.</li>
              </ul>
            </div>

            {/* Mastercard */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-bold">
                <span>MASTERCARD</span>
                <span>Apr 21 &ndash; Feb 23</span>
              </div>
              <div className="flex justify-between italic font-semibold text-gray-700">
                <span>Data Engineer</span>
                <span>O'Fallon, MO</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 mt-1 text-justify">
                <li>Developed high-volume ETL/ELT datasets using Databricks, Spark, PySpark, and Scala supporting secure fraud prediction analytics.</li>
                <li>Prepared transactional real-time data feeding pipelines utilizing Azure Event Hubs and Kafka.</li>
                <li>Accelerated visual financial trends query response timelines by 40% using custom indexing and Spark caching configurations.</li>
              </ul>
            </div>

            {/* The Home Depot */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-bold">
                <span>THE HOME DEPOT</span>
                <span>Oct 18 &ndash; Mar 21</span>
              </div>
              <div className="flex justify-between italic font-semibold text-gray-700">
                <span>ETL Developer / Data Engineer</span>
                <span>Atlanta, GA</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 mt-1 text-justify">
                <li>Standardized supply-chain and supplier datasets utilizing Python, SQL, Spark, and HDFS file formats.</li>
                <li>Slashed inventory consolidation update timelines from 4 hours down to 45 minutes using incremental loading structures.</li>
                <li>Configured Oozie and Sqoop workflows, obtaining a 98% processed reliability rating.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Print Certs */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold tracking-wider uppercase border-b border-black pb-0.5 font-sans">
            Certifications
          </h3>
          <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
            {certifications.map((cert) => (
              <li key={cert.name}>{cert.name}</li>
            ))}
          </ul>
        </div>

        {/* Print Education */}
        <div className="space-y-1.5 font-serif">
          <h3 className="text-xs font-bold tracking-wider uppercase border-b border-black pb-0.5 font-sans">
            Education
          </h3>
          <div className="flex justify-between text-[11px] font-semibold">
            <span>Texas A&M University&ndash;Commerce</span>
            <span>Commerce, TX</span>
          </div>
          <div className="text-[11px] italic">Master of Science in Computer Science</div>
        </div>

      </div>

    </div>
  );
}
