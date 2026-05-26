import { motion } from "framer-motion";
import { roadmapData } from "@/data/roadmap";

export function Timeline() {
  return (
    <section className="px-6 mb-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/15 text-[10px] font-mono uppercase tracking-[0.3em]">
              Career Journey · 5 Phases · 2026 → 2045
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Phase journey — desktop: horizontal, mobile: vertical */}
          <div className="hidden md:block">
            <DesktopJourney />
          </div>
          <div className="md:hidden">
            <MobileJourney />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DesktopJourney() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-9 left-[5%] right-[5%] h-px">
        <div className="w-full h-full journey-gradient" />
        {/* Animated travelling dot — only shown while at least one phase is active */}
        {roadmapData.some((p) => p.status === "active") && (
          <motion.div
            className="absolute top-0 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60"
            animate={{ left: ["5%", "95%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse",
            }}
            style={{ boxShadow: "0 0 8px rgba(0,210,255,0.8)" }}
          />
        )}
      </div>

      {/* Phase nodes */}
      <div className="flex items-start justify-between gap-2">
        {roadmapData.map((phase, i) => (
          <PhaseNode key={phase.id} phase={phase} index={i} />
        ))}
      </div>
    </div>
  );
}

function MobileJourney() {
  return (
    <div className="relative pl-8">
      {/* Vertical connecting line */}
      <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/40 via-violet-500/30 to-amber-500/20" />

      <div className="space-y-6">
        {roadmapData.map((phase, i) => {
          const isCompleted = phase.status === "completed";
          const isActive = phase.status === "active";
          return (
            <div key={phase.id} className="relative flex items-start gap-4">
              {/* Node dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                className="absolute -left-[25px] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  background: isCompleted
                    ? `${phase.accentColor}25`
                    : `${phase.accentColor}18`,
                  border: `2px solid ${phase.accentColor}${
                    isActive ? "90" : isCompleted ? "60" : "40"
                  }`,
                  boxShadow: isActive
                    ? `0 0 16px ${phase.accentColor}50`
                    : "none",
                }}
              >
                <span className="text-xs">
                  {isCompleted ? "✓" : phase.icon}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.1 }}
                className="glass rounded-xl p-4 flex-1 border"
                style={{
                  borderColor: `${phase.accentColor}${
                    isActive ? "30" : isCompleted ? "20" : "12"
                  }`,
                }}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-xs font-bold text-white/80">
                      Ph {phase.number}: {phase.title}
                    </p>
                    <p className="text-[10px] font-mono text-white/30 mt-0.5">
                      {phase.years}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: phase.accentColor + "90" }}
                    >
                      {phase.salaryTarget}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                        ACTIVE
                      </span>
                    )}
                    {isCompleted && (
                      <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: `${phase.accentColor}15`,
                          border: `1px solid ${phase.accentColor}30`,
                          color: phase.accentColor,
                        }}
                      >
                        ✓ DONE
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhaseNode({
  phase,
  index,
}: {
  phase: (typeof roadmapData)[0];
  index: number;
}) {
  const isActive = phase.status === "active";
  const isCompleted = phase.status === "completed";
  const widths = [
    "flex-[1.2]",
    "flex-[1]",
    "flex-[1.3]",
    "flex-[1.3]",
    "flex-[1.4]",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`${widths[index]} flex flex-col items-center text-center gap-2`}
    >
      {/* Icon node */}
      <motion.div
        whileHover={{ scale: 1.12, y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative flex-shrink-0"
      >
        {isActive && (
          <>
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ background: `${phase.accentColor}30` }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full"
              style={{ background: `${phase.accentColor}20` }}
            />
          </>
        )}
        <div
          className="relative w-[52px] h-[52px] rounded-full flex items-center justify-center text-xl z-10"
          style={{
            background: isCompleted
              ? `${phase.accentColor}20`
              : `${phase.accentColor}${isActive ? "20" : "0c"}`,
            border: `2px solid ${phase.accentColor}${
              isActive ? "70" : isCompleted ? "55" : "30"
            }`,
            boxShadow: isActive
              ? `0 0 24px ${phase.accentColor}40, 0 0 8px ${phase.accentColor}25`
              : isCompleted
              ? `0 0 10px ${phase.accentColor}20`
              : "none",
          }}
        >
          {isCompleted ? "✓" : phase.icon}
        </div>

        {/* Active pulsing dot */}
        {isActive && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#080808] z-20"
          />
        )}
        {/* Completed checkmark dot */}
        {isCompleted && (
          <div
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#080808] z-20 flex items-center justify-center text-[7px]"
            style={{ background: phase.accentColor }}
          >
            ✓
          </div>
        )}
      </motion.div>

      {/* Phase info */}
      <div className="space-y-0.5 px-1">
        <p
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{
            color: isActive
              ? "#00D2FF"
              : isCompleted
              ? phase.accentColor + "aa"
              : "rgba(255,255,255,0.2)",
          }}
        >
          {isActive
            ? "● ACTIVE"
            : isCompleted
            ? "✓ DONE"
            : `PHASE ${phase.number}`}
        </p>
        <p className="text-xs font-bold text-white/70 leading-tight">
          {phase.title}
        </p>
        <p className="text-[10px] font-mono text-white/20">{phase.years}</p>
        <p
          className="text-[10px] font-mono font-semibold mt-1"
          style={{
            color:
              phase.accentColor + (isActive ? "cc" : isCompleted ? "99" : "60"),
          }}
        >
          {phase.salaryTarget}
        </p>
      </div>
    </motion.div>
  );
}
