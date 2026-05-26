import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Skill { name: string; done?: boolean }
interface Level { number: number; title: string; skills: Skill[] }
interface Phase {
  id: string; number: number; title: string; subtitle: string;
  years: string; salaryTarget: string; goal: string;
  color: string; accentColor: string; glowColor: string;
  icon: string; status: string;
  levels: Level[];
  mustBuild: { title: string; description: string }[];
  extraSystems?: { title: string; items: string[] }[];
}

function SkillTag({ name, color, index }: { name: string; color: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.025, type: "spring", stiffness: 500, damping: 30 }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-lg cursor-default select-none"
      style={{
        background: `${color}0a`,
        border: `1px solid ${color}22`,
        color: `${color}cc`,
      }}
    >
      {name}
    </motion.span>
  );
}

function LevelBlock({ level, accentColor, index }: { level: Level; accentColor: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 border"
      style={{ background: `${accentColor}05`, borderColor: `${accentColor}18` }}
    >
      {/* Level header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{
            background: `${accentColor}18`,
            border: `1.5px solid ${accentColor}40`,
            color: accentColor,
            boxShadow: `0 0 8px ${accentColor}15`,
          }}
        >
          {level.number}
        </div>
        <h4 className="text-sm font-bold text-white/85 leading-snug">{level.title}</h4>
        <div className="ml-auto text-[10px] font-mono text-white/20">{level.skills.length} skills</div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {level.skills.map((skill, si) => (
          <SkillTag key={skill.name} name={skill.name} color={accentColor} index={si} />
        ))}
      </div>
    </motion.div>
  );
}

export function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const isActive = phase.status === "active";
  const isCompleted = phase.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: isCompleted
          ? `${phase.accentColor}06`
          : `${phase.accentColor}04`,
        borderColor: isActive
          ? `${phase.accentColor}30`
          : isCompleted
          ? `${phase.accentColor}22`
          : `${phase.accentColor}14`,
        boxShadow: isActive
          ? `0 0 40px ${phase.accentColor}10, 0 0 1px ${phase.accentColor}30`
          : isCompleted
          ? `0 0 20px ${phase.accentColor}08`
          : "none",
      }}
    >
      {/* ── HEADER ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-start gap-4 cursor-pointer text-left group"
      >
        {/* Left accent bar */}
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0 mt-1"
          style={{
            background: isCompleted
              ? `linear-gradient(to bottom, ${phase.accentColor}aa, ${phase.accentColor}30)`
              : `linear-gradient(to bottom, ${phase.accentColor}, ${phase.accentColor}30)`,
          }}
        />

        {/* Phase icon */}
        <div className="relative flex-shrink-0">
          {isActive && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-xl"
              style={{ background: `${phase.accentColor}25` }}
            />
          )}
          <div
            className="relative w-11 h-11 rounded-xl flex items-center justify-center text-lg z-10"
            style={{
              background: `${phase.accentColor}${isCompleted ? "18" : isActive ? "14" : "0c"}`,
              border: `1.5px solid ${phase.accentColor}${isActive ? "50" : isCompleted ? "40" : "25"}`,
              boxShadow: isActive
                ? `0 0 16px ${phase.accentColor}30`
                : isCompleted
                ? `0 0 8px ${phase.accentColor}15`
                : "none",
            }}
          >
            {isCompleted ? "✓" : phase.icon}
          </div>
        </div>

        {/* Title info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-white/20 text-xs font-mono">Phase {phase.number}</span>

            {isActive && (
              <motion.span
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  color: phase.accentColor,
                  background: `${phase.accentColor}15`,
                  border: `1px solid ${phase.accentColor}40`,
                  boxShadow: `0 0 8px ${phase.accentColor}20`,
                }}
              >
                ● ACTIVE — YOU ARE HERE
              </motion.span>
            )}

            {isCompleted && (
              <span
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  color: phase.accentColor,
                  background: `${phase.accentColor}12`,
                  border: `1px solid ${phase.accentColor}35`,
                }}
              >
                ✓ COMPLETED
              </span>
            )}

            {!isActive && !isCompleted && (
              <span
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                style={{
                  color: phase.accentColor + "60",
                  background: `${phase.accentColor}08`,
                  border: `1px solid ${phase.accentColor}18`,
                }}
              >
                Upcoming
              </span>
            )}
          </div>

          <h2 className="text-base font-black text-white leading-tight mb-1">{phase.title}</h2>
          <p className="text-sm text-white/35 leading-relaxed line-clamp-1">{phase.subtitle}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-mono text-white/25">
            <span>{phase.years}</span>
            <span>·</span>
            <span style={{ color: phase.accentColor + "80" }}>{phase.salaryTarget}</span>
            <span>·</span>
            <span className="text-white/35">{phase.goal}</span>
          </div>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-1"
          style={{ background: `${phase.accentColor}10`, border: `1px solid ${phase.accentColor}20` }}
        >
          <span className="text-white/30 text-xs leading-none">↓</span>
        </motion.div>
      </button>

      {/* ── EXPANDED CONTENT ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-6 border-t" style={{ borderColor: `${phase.accentColor}10` }}>

              {/* ── LEVELS (Skill Tree) ── */}
              <div className="pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-px" style={{ background: phase.accentColor }} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: `${phase.accentColor}70` }}>
                    Skill Levels — Sequential Learning Path
                  </span>
                  <div className="flex-1 h-px" style={{ background: `${phase.accentColor}15` }} />
                  <span className="text-[10px] font-mono text-white/20">{phase.levels.length} levels</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {phase.levels.map((level, i) => (
                    <LevelBlock key={level.number} level={level} accentColor={phase.accentColor} index={i} />
                  ))}
                </div>
              </div>

              {/* ── MUST BUILD ── */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-px" style={{ background: phase.accentColor }} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: `${phase.accentColor}70` }}>
                    Must Build — Key Projects
                  </span>
                  <div className="flex-1 h-px" style={{ background: `${phase.accentColor}15` }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {phase.mustBuild.map((proj, i) => (
                    <motion.div
                      key={proj.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -2, borderColor: `${phase.accentColor}35` }}
                      className="px-4 py-3 rounded-xl border transition-colors duration-200"
                      style={{ background: `${phase.accentColor}06`, borderColor: `${phase.accentColor}18` }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-base flex-shrink-0 mt-0.5">🏗️</span>
                        <div>
                          <p className="text-xs font-bold leading-snug" style={{ color: phase.accentColor + "cc" }}>
                            {proj.title}
                          </p>
                          <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{proj.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── EXTRA SYSTEMS ── */}
              {phase.extraSystems?.map((system) => (
                <div key={system.title} className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-px" style={{ background: phase.accentColor }} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: `${phase.accentColor}70` }}>
                      {system.title}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${phase.accentColor}15` }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {system.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border"
                        style={{ background: `${phase.accentColor}06`, borderColor: `${phase.accentColor}15` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0" style={{ background: phase.accentColor + "80" }} />
                        <span className="text-xs text-white/55 font-mono leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
