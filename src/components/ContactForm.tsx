import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Loader2, 
  Server, 
  Terminal, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { contactDetails } from "../data";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "pipelining" | "success">("idle");
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);

  const steps = [
    "Spinning up connection worker...",
    "Validating message schema against JSON Schema...",
    "Deduplicating contact payload...",
    "Encrypting PHI / PII identifiers...",
    "Publishing payload to contact-events-topic Kafka stream...",
    "Consuming stream & writing to raw storage partition (S3)...",
    "Running dbt data quality assertion tests (Freshness + Completeness)...",
    "Loading record into Snowflake Gold DW analytics database...",
    "Data pipeline operational: Payload Committed under Record Ref: #" + Math.floor(Math.random() * 89999 + 100000)
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executePipelineSimulation = () => {
    setFormStatus("pipelining");
    setPipelineLogs([steps[0]]);
    setCurrentLogIdx(0);
  };

  useEffect(() => {
    if (formStatus !== "pipelining") return;

    if (currentLogIdx < steps.length - 1) {
      const timer = setTimeout(() => {
        const nextIdx = currentLogIdx + 1;
        setPipelineLogs((prev) => [...prev, steps[nextIdx]]);
        setCurrentLogIdx(nextIdx);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // Completed last step, exit to success
      const timer = setTimeout(() => {
        setFormStatus("success");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formStatus, currentLogIdx]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormStatus("sending");
    
    // Simulate initial delay then trigger pipeline logs
    setTimeout(() => {
      executePipelineSimulation();
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setFormStatus("idle");
    setPipelineLogs([]);
    setCurrentLogIdx(0);
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-xl shadow-[#02050c]/80" id="contact-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        
        {/* Contact Info Sidebar Section */}
        <div className="lg:col-span-2 bg-white/[0.01] border-b lg:border-b-0 lg:border-r border-white/10 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-indigo-400 font-mono text-[10px] tracking-widest uppercase">
                Direct Channels
              </span>
              <h4 className="text-2xl font-display font-medium text-white mt-1">
                Let's Build Data Infrastructure
              </h4>
              <p className="text-white/60 text-xs mt-2 leading-relaxed">
                I am open to discussions regarding big data engineering contracts, lakehouse architectures, pipeline migrations, database performance tunings, and consulting roles.
              </p>
            </div>

            {/* Coordinates list */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5 group">
                <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:text-indigo-300 group-hover:border-white/20 transition-colors">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="text-[10px] font-mono text-white/30 uppercase">Primary Location</div>
                  <div className="text-sm text-slate-200 mt-0.5">{contactDetails.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:text-indigo-300 group-hover:border-white/20 transition-colors">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="text-[10px] font-mono text-white/30 uppercase">Secure Email</div>
                  <a 
                    href={`mailto:${contactDetails.email}`}
                    className="text-sm text-slate-200 hover:text-indigo-300 transition-colors mt-0.5 block font-mono font-medium"
                  >
                    {contactDetails.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:text-indigo-300 group-hover:border-white/20 transition-colors">
                  <Phone size={16} />
                </span>
                <div>
                  <div className="text-[10px] font-mono text-white/30 uppercase">Toll Voice Connection</div>
                  <a 
                    href={`tel:${contactDetails.phone.replace(/[^0-9]/g, '')}`}
                    className="text-sm text-slate-200 hover:text-indigo-300 transition-colors mt-0.5 block font-mono font-medium"
                  >
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <h5 className="font-mono text-[10px] text-white/30 uppercase mb-3">Enterprise Systems Vouched For</h5>
            <div className="flex flex-wrap gap-2">
              <a 
                href={contactDetails.linkedin}
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:text-indigo-300 transition-all font-mono text-xs text-white/70 cursor-pointer"
              >
                <Linkedin size={14} className="text-indigo-400 text-justify" />
                <span>Verify on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Input Form & Telemetry logs container */}
        <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-center min-h-[460px]">
          <AnimatePresence mode="wait">
            
            {/* IDLE state: Output the clean visual inputs form fields */}
            {formStatus === "idle" && (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-white/40 uppercase">Your Name <span className="text-indigo-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe / Tech Recruiter"
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none p-3 rounded-xl text-xs text-white transition-all font-sans placeholder-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-white/40 uppercase">Corporate Email <span className="text-indigo-400">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none p-3 rounded-xl text-xs text-white transition-all font-mono placeholder-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-white/40 uppercase">Subject / Architectural Domain</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Databricks Migration Contract / Permanent Senior Engineer Hire"
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none p-3 rounded-xl text-xs text-white transition-all font-sans placeholder-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-white/40 uppercase">Brief Technical Requirement <span className="text-indigo-400">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your current data pipelines scale, tech stack requirement, or general feedback..."
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 focus:outline-none p-3 rounded-xl text-xs text-white transition-all font-sans resize-none placeholder-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-650 text-white font-semibold text-xs font-mono uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-950/20"
                >
                  <Send size={14} />
                  <span>Stream Payload to Tanka</span>
                </button>
              </motion.form>
            )}

            {/* SENDING initial state */}
            {formStatus === "sending" && (
              <motion.div
                key="sending-loader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10 space-y-4"
              >
                <Loader2 className="animate-spin text-indigo-400 mx-auto" size={40} />
                <h5 className="font-display font-medium text-white text-lg">
                  Establishing Stream Connection...
                </h5>
                <p className="text-white/60 text-xs max-w-sm mx-auto font-mono">
                  Synthesizing and bundling metadata fields into a secure payload chunk...
                </p>
              </motion.div>
            )}

            {/* PIPELINING logs state */}
            {formStatus === "pipelining" && (
              <motion.div
                key="pipeline-logs-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/[0.02] p-5 rounded-2xl border border-white/10 font-mono text-[11px] leading-relaxed flex flex-col justify-between h-[380px] select-none shadow-inner"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3.5 text-white/30">
                  <div className="flex items-center gap-1.5">
                    <Terminal size={14} className="text-indigo-400" />
                    <span className="font-semibold text-white/60">TELEMETRY INGESTION ENGINE</span>
                  </div>
                  <span>v1.2.4-stream</span>
                </div>

                {/* Log Stream Output scrolls items dynamically */}
                <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800 pr-1 text-left">
                  {pipelineLogs.map((log, idx) => {
                    const isLast = idx === pipelineLogs.length - 1;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -3 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${isLast ? "text-indigo-300 font-medium" : "text-white/50"}`}
                      >
                        <span className="text-white/20 mr-2">[{new Date().toLocaleTimeString()}]</span>
                        <span className="text-indigo-400 font-bold mr-1.5">INFO</span>
                        <span>{log}</span>
                        {isLast && idx < steps.length - 1 && (
                          <span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-1.5 animate-pulse shrink-0" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress bar info */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="text-white/30 text-[10px]">
                    STAGE TRANSFORMATION: {Math.round((pipelineLogs.length / steps.length) * 100)}%
                  </div>
                  <div className="w-28 bg-white/10 rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-400 to-purple-400 h-1 rounded-full transition-all duration-300" 
                      style={{ width: `${(pipelineLogs.length / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SUCCESS confirmation state */}
            {formStatus === "success" && (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 space-y-6"
              >
                <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle size={36} />
                </div>
                
                <div>
                  <h4 className="font-display font-medium text-white text-xl">
                    Streaming Commit Confirmed!
                  </h4>
                  <p className="text-white/70 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                    Hello <span className="text-indigo-400 font-medium">{formData.name}</span>, your message was successfully written to Tanka's corporate contact storage layer. He will review details and trigger a callback shortly.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 max-w-xs mx-auto font-mono text-[10px] space-y-1.5 text-left">
                  <div className="text-white/30 text-center uppercase tracking-wider font-semibold border-b border-white/10 pb-1.5 mb-2">Metadata Chunk Saved</div>
                  <div className="flex justify-between text-white/60"><span className="text-white/40">SINK DEST:</span> <span className="text-white/80 font-medium">Snowflake Gold DW</span></div>
                  <div className="flex justify-between text-white/60"><span className="text-white/40">SCHEMA COMT:</span> <span className="text-white/80 font-medium">Validated conformant</span></div>
                  <div className="flex justify-between text-white/60"><span className="text-white/40">PII SHIELD:</span> <span className="text-emerald-400 font-bold flex items-center gap-0.5">● ACTIVE</span></div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 font-mono text-[11px] text-white/60 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  Publish Another Message Chunk
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
