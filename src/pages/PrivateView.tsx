import { PasswordGate } from "@/components/PasswordGate";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { PhaseCard } from "@/components/PhaseCard";
import { Footer } from "@/components/Footer";
import { roadmapData } from "@/data/roadmap";

function RoadmapContent() {
  return (
    <div className="min-h-screen bg-[#080808] grid-bg relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 scan-line opacity-20" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Timeline />

        <main className="px-6 pb-8 max-w-6xl mx-auto space-y-5">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-white/20 text-xs font-mono uppercase tracking-widest">
              Career Phases — Full Roadmap
            </span>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          {roadmapData.map((phase, index) => (
            <PhaseCard key={phase.id} phase={phase} index={index} />
          ))}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export function PrivateView() {
  return (
    <PasswordGate>
      <RoadmapContent />
    </PasswordGate>
  );
}
