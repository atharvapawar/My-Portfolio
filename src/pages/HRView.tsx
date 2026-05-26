import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { skills, skillColors, projects, experience, certifications, resumes, contactInfo } from "@/data/portfolio";
import { Footer } from "@/components/Footer";

/* ─────── HELPERS ─────── */

function SectionHeading({ label, accent, id }: { label: string; accent: string; id?: string }) {
  return (
    <div id={id} className="flex items-center gap-4 mb-8 scroll-mt-20">
      <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: accent }} />
      <h2 className="text-xl font-black text-white tracking-tight">{label}</h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}30, transparent)` }} />
    </div>
  );
}

function TiltCard({
  children,
  className,
  style,
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({ x: ((e.clientY - cy) / rect.height) * intensity, y: -((e.clientX - cx) / rect.width) * intensity });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative ${className ?? ""}`}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* Certificate view dialog */
function CertDialog({ cert, onClose }: { cert: typeof certifications[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-2xl p-8 max-w-md w-full border"
        style={{ borderColor: `${cert.color}25` }}
      >
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30`, color: cert.color }}
          >
            ✦
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{cert.name}</h3>
        <p className="text-sm font-mono mb-1" style={{ color: cert.color + "90" }}>{cert.issuer}</p>

        <div className="flex gap-1 mb-6 mt-2">
          {Array.from({ length: 5 }).map((_, si) => (
            <span key={si} className="text-sm" style={{ color: si < cert.stars ? cert.color : `${cert.color}25` }}>★</span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={`/${cert.downloadFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90 cursor-pointer"
            style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30`, color: cert.color }}
          >
            View PDF
          </a>
          <a
            href={`/${cert.downloadFile}`}
            download
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90 cursor-pointer text-white/80"
            style={{ background: `linear-gradient(135deg, ${cert.color}22, ${cert.color}10)`, border: `1px solid ${cert.color}30` }}
          >
            Download PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────── MAIN VIEW ─────── */

export function HRView() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.4 } },
  };

  const stats = [
    { label: "Roles Held", value: 4, suffix: "", sub: "Positions" },
    { label: "Projects", value: 5, suffix: "+", sub: "Built" },
    { label: "Skills", value: 20, suffix: "+", sub: "Technologies" },
    { label: "Certifications", value: 11, suffix: "", sub: "Earned" },
  ];

  return (
    <div className="min-h-screen bg-[#080808] grid-bg relative">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, background: "linear-gradient(to right, #00D2FF, #A855F7, #10B981)", transformOrigin: "0%" } as React.CSSProperties}
        className="fixed top-0 left-0 right-0 z-50 h-0.5"
      />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-cyan-500/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 scan-line opacity-15" />
      </div>

      <div className="relative z-10">
        {/* ══ HERO ══ */}
        <section id="about" className="relative pt-20 pb-16 px-6 overflow-hidden scroll-mt-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">
                Open to Work · Available for Opportunities
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none mb-4">
                <span className="block text-white/35 text-base sm:text-lg font-mono tracking-widest uppercase mb-3">
                  Hi, I'm
                </span>
                Atharv
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                  Pawar
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/50 text-base sm:text-lg font-light max-w-xl mt-4 mb-6 leading-relaxed"
            >
              Full Stack Developer (MERN) · STEM & Robotics Instructor · AWS Cloud Practitioner.
              Building real-world software while teaching the next generation of developers.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="glass rounded-xl px-4 py-3 border border-white/6 cursor-default"
                >
                  <div className="text-2xl font-black text-cyan-400">{stat.value}{stat.suffix}</div>
                  <div className="text-xs text-white/30 font-mono mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-5 max-w-sm space-y-3 border border-white/6 card-shimmer glow-border"
            >
              <p className="text-xs text-white/25 font-mono uppercase tracking-widest mb-3">Contact</p>
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="flex items-center gap-2.5 group/contact"
                >
                  <span className="text-sm flex-shrink-0">{c.icon}</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-xs text-white/45 font-mono truncate hover:text-white/85 transition-colors duration-200"
                    >
                      {c.label}
                    </a>
                  ) : (
                    <span className="text-xs text-white/45 font-mono truncate">{c.label}</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <main className="px-6 pb-8 max-w-6xl mx-auto">
          {/* ══ SKILLS ══ */}
          <motion.section id="skills" className="mb-20 scroll-mt-20">
            <SectionHeading label="Technical Skills" accent="#00D2FF" id="skills" />
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {Object.entries(skills).map(([category, items]) => {
                const accent = skillColors[category] ?? "#00D2FF";
                return (
                  <motion.div
                    key={category}
                    variants={item}
                    whileHover={{ y: -4, boxShadow: `0 8px 32px ${accent}15`, borderColor: `${accent}30` }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass rounded-2xl p-5 border border-white/6 card-shimmer cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                      <p className="text-xs font-mono text-white/30 uppercase tracking-widest">{category}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <motion.span
                          key={s}
                          onHoverStart={() => setHoveredTag(s)}
                          onHoverEnd={() => setHoveredTag(null)}
                          whileHover={{ y: -2, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-white/60 font-mono cursor-default select-none"
                          style={hoveredTag === s ? { background: `${accent}18`, borderColor: `${accent}35`, color: "rgba(255,255,255,0.9)" } : {}}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* ══ EXPERIENCE ══ */}
          <motion.section id="experience" className="mb-20 scroll-mt-20">
            <SectionHeading label="Professional Experience" accent="#10B981" id="experience" />
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard
                    intensity={4}
                    className="glass rounded-2xl p-6 border group"
                    style={{ borderColor: `${exp.color}15` } as React.CSSProperties}
                  >
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full origin-top"
                      style={{ background: `linear-gradient(to bottom, ${exp.color}, transparent)` }}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <motion.span whileHover={{ scale: 1.3, rotate: 10 }} transition={{ type: "spring", stiffness: 400 }} className="text-xl">
                          {exp.icon}
                        </motion.span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-white">{exp.role}</h3>
                            {exp.current && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-wider">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold" style={{ color: exp.color + "cc" }}>{exp.company}</p>
                        </div>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-xs font-mono px-3 py-1.5 rounded-full flex-shrink-0 cursor-default"
                        style={{ color: exp.color, background: `${exp.color}10`, border: `1px solid ${exp.color}25` }}
                      >
                        {exp.period}
                      </motion.span>
                    </div>
                    <ul className="space-y-2.5 mb-4">
                      {exp.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm text-white/45 leading-relaxed group/item">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0"
                            style={{ background: exp.color + "60" }}
                          />
                          <span className="group-hover/item:text-white/60 transition-colors duration-200">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.expLetterFile && (
                      <div className="flex gap-2 pt-3 border-t border-white/5">
                        <a
                          href={`/${exp.expLetterFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-4 rounded-lg text-xs font-mono transition-all duration-200 hover:opacity-90 cursor-pointer"
                          style={{ color: exp.color, background: `${exp.color}10`, border: `1px solid ${exp.color}25` }}
                        >
                          View Experience Letter
                        </a>
                        <a
                          href={`/${exp.expLetterFile}`}
                          download
                          className="py-2 px-4 rounded-lg text-xs font-mono transition-all duration-200 hover:opacity-90 cursor-pointer text-white/50 bg-white/4 border border-white/8 hover:text-white/75"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ══ PROJECTS ══ */}
          <motion.section id="projects" className="mb-20 scroll-mt-20">
            <SectionHeading label="Selected Projects" accent="#A855F7" id="projects" />
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {projects.map((p) => (
                <motion.div key={p.title} variants={item}>
                  <TiltCard
                    intensity={6}
                    className="rounded-2xl p-6 border h-full group flex flex-col"
                    style={{ background: `${p.color}06`, borderColor: `${p.color}22` } as React.CSSProperties}
                  >
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <motion.span whileHover={{ scale: 1.25, rotate: -5 }} transition={{ type: "spring", stiffness: 400 }} className="text-2xl">
                          {p.icon}
                        </motion.span>
                        <motion.span
                          whileHover={{ scale: 1.08 }}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-full flex-shrink-0 cursor-default"
                          style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}25` }}
                        >
                          {p.tag}
                        </motion.span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed mb-4 flex-1">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech.map((t) => (
                          <span key={t} className="text-xs font-mono text-white/35 bg-white/4 border border-white/6 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                      {/* Project links */}
                      <div className="flex gap-2 mt-auto">
                        {p.liveUrl ? (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg text-xs font-mono text-center transition-all duration-200 hover:opacity-90 cursor-pointer"
                            style={{ background: `${p.color}18`, border: `1px solid ${p.color}30`, color: p.color }}
                          >
                            Live Demo →
                          </a>
                        ) : (
                          <div
                            className="flex-1 py-2 rounded-lg text-xs font-mono text-center opacity-35 cursor-not-allowed"
                            style={{ background: `${p.color}08`, border: `1px solid ${p.color}15`, color: p.color }}
                            title="Link will be added"
                          >
                            Link TBD
                          </div>
                        )}
                        {p.githubUrl ? (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-lg text-xs font-mono text-center transition-all duration-200 hover:opacity-90 cursor-pointer bg-white/5 border border-white/8 text-white/50 hover:text-white/80"
                          >
                            GitHub →
                          </a>
                        ) : (
                          <div
                            className="flex-1 py-2 rounded-lg text-xs font-mono text-center opacity-35 cursor-not-allowed bg-white/4 border border-white/6 text-white/40"
                            title="GitHub link will be added"
                          >
                            GitHub TBD
                          </div>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 text-xs text-white/20 font-mono text-center"
            >
              Project links will be added soon — stay tuned
            </motion.p>
          </motion.section>

          {/* ══ CERTIFICATIONS ══ */}
          <motion.section id="certifications" className="mb-20 scroll-mt-20">
            <SectionHeading label="Certifications" accent="#F97316" id="certifications" />
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {certifications.map((cert) => (
                <motion.div
                  key={cert.name}
                  variants={item}
                  whileHover={{ y: -3, boxShadow: `0 6px 28px ${cert.color}18`, borderColor: `${cert.color}30` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-xl px-5 py-4 flex items-center gap-4 border card-shimmer group"
                  style={{ borderColor: `${cert.color}15` }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}28`, color: cert.color }}
                  >
                    ✦
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white/80 leading-snug group-hover:text-white/95 transition-colors duration-200">
                      {cert.name}
                    </p>
                    <p className="text-xs text-white/25 font-mono mt-0.5">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Star rating */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <motion.span
                          key={si}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.05, type: "spring", stiffness: 500 }}
                          className="text-[8px]"
                          style={{ color: si < cert.stars ? cert.color : `${cert.color}25` }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    {/* View/download buttons */}
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="text-[10px] font-mono px-2 py-1 rounded-lg border transition-all duration-200 hover:opacity-90 cursor-pointer"
                      style={{ color: cert.color, background: `${cert.color}10`, border: `1px solid ${cert.color}25` }}
                    >
                      View
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ══ RESUME ══ */}
          <motion.section id="resume" className="mb-20 scroll-mt-20">
            <SectionHeading label="Resume" accent="#F59E0B" id="resume" />
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {resumes.map((resume) => (
                <motion.div
                  key={resume.filename}
                  variants={item}
                  whileHover={{ y: -4, boxShadow: `0 8px 32px ${resume.color}15`, borderColor: `${resume.color}30` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-2xl p-6 border card-shimmer"
                  style={{ borderColor: `${resume.color}15` }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${resume.color}15`, border: `1px solid ${resume.color}28` }}
                    >
                      {resume.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white/90 leading-snug">{resume.title}</h3>
                      <p className="text-xs text-white/35 font-mono mt-1 leading-relaxed">{resume.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* View PDF (opens in new tab) */}
                    <a
                      href={`/${resume.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90 cursor-pointer"
                      style={{ background: `${resume.color}18`, border: `1px solid ${resume.color}30`, color: resume.color }}
                    >
                      View PDF
                    </a>
                    {/* Download */}
                    <a
                      href={`/${resume.filename}`}
                      download={resume.filename}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90 cursor-pointer text-white/80"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ══ EDUCATION ══ */}
          <motion.section className="mb-20 scroll-mt-20">
            <SectionHeading label="Education" accent="#F59E0B" />
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { degree: "Bachelor of Computer Applications (BCA)", institution: "Pune Tilak Vidyapeeth, Maharashtra", year: "2022", color: "#F59E0B", icon: "🎓" },
                { degree: "HSC (12th Standard)", institution: "S.D. Gadre High School, Maharashtra", year: "2019", color: "#F59E0B", icon: "📚" },
              ].map((edu) => (
                <motion.div
                  key={edu.degree}
                  variants={item}
                  whileHover={{ y: -4, borderColor: `${edu.color}35`, boxShadow: `0 8px 28px ${edu.color}10` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-2xl p-5 border cursor-default card-shimmer"
                  style={{ borderColor: `${edu.color}18` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{edu.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white/85 leading-snug">{edu.degree}</h3>
                      <p className="text-xs text-white/35 font-mono mt-1">{edu.institution}</p>
                      <span
                        className="inline-block mt-2 text-xs font-mono px-3 py-1 rounded-full"
                        style={{ color: edu.color, background: `${edu.color}12`, border: `1px solid ${edu.color}25` }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ══ CONTACT ══ */}
          <motion.section id="contact" className="mb-20 scroll-mt-20">
            <SectionHeading label="Get In Touch" accent="#00D2FF" id="contact" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-8 border border-white/6 glow-border"
            >
              <p className="text-white/40 text-sm mb-8 max-w-xl leading-relaxed">
                Looking for a full-stack developer or STEM educator? I'm open to software development roles,
                freelance projects, and teaching opportunities. Let's connect.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contactInfo.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/5 group/c hover:border-white/10 transition-colors duration-200"
                  >
                    <span className="text-lg flex-shrink-0">{c.icon}</span>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 font-mono truncate hover:text-cyan-400 transition-colors duration-200"
                      >
                        {c.label}
                      </a>
                    ) : (
                      <span className="text-sm text-white/50 font-mono truncate">{c.label}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        </main>

        <Footer />
      </div>

      {/* Cert dialog */}
      <AnimatePresence>
        {selectedCert && (
          <CertDialog cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
