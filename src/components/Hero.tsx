import { motion } from "framer-motion";
import { roadmapData, currentStatus } from "@/data/roadmap";

const PHASE_COLORS = ["#00D2FF", "#A855F7", "#10B981", "#F97316", "#F59E0B"];

export function Hero() {
  return (
    <header className="relative pt-16 pb-10 px-6 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Identity badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-cyan-500/8 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">
            Phase 1 Active · Junior → Senior → Architect → Founder
          </span>
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/25 text-sm font-mono uppercase tracking-[0.3em] mb-3">
            {currentStatus.name} · Career Architecture
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05] mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              20-Year Vision
            </span>
          </h1>
        </motion.div>

        {/* Direction arc */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-8 text-sm"
        >
          {["Full Stack Dev", "Backend + Cloud", "Cloud + SRE + Security", "AI Security Engineer", "Architect + Founder"].map(
            (step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{
                    color: PHASE_COLORS[i],
                    background: `${PHASE_COLORS[i]}12`,
                    border: `1px solid ${PHASE_COLORS[i]}${i === 0 ? "50" : "25"}`,
                    boxShadow: i === 0 ? `0 0 12px ${PHASE_COLORS[i]}25` : "none",
                  }}
                >
                  {i === 0 && <span className="mr-1.5">◉</span>}
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-white/15 text-xs">→</span>
                )}
              </div>
            )
          )}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { label: "Career Phases", value: "5", sub: "full architecture" },
            { label: "Timeline", value: "20 yrs", sub: "2026 → 2045" },
            { label: "Salary Arc", value: "₹0→50L+", sub: "target progression" },
            { label: "End Goal", value: "AI Sec", sub: "Architect + Founder" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="glass rounded-xl px-4 py-3 border border-white/6 cursor-default"
            >
              <div className="text-xl font-black text-white tabular-nums">{stat.value}</div>
              <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider mt-0.5">{stat.label}</div>
              <div className="text-[10px] text-white/20 font-mono mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Identity statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="glass rounded-2xl p-5 border border-white/6 flex flex-wrap gap-5"
        >
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-1.5">Current Identity</p>
            <p className="text-sm font-semibold text-white/80">{currentStatus.identity}</p>
          </div>
          <div className="w-px bg-white/6 hidden sm:block" />
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-1.5">Bridge Advantage</p>
            <p className="text-sm font-semibold text-white/80">{currentStatus.bridgeIdentity}</p>
          </div>
          <div className="w-px bg-white/6 hidden sm:block" />
          <div className="flex-2 min-w-[260px]">
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-1.5">Long-Term Direction</p>
            <p className="text-sm font-semibold text-white/80">{currentStatus.longTermDirection}</p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
