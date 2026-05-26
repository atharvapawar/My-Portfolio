import {
  Switch,
  Route,
  Router as WouterRouter,
  Link,
  useLocation,
} from "wouter";
import { HRView } from "@/pages/HRView";
import { PrivateView } from "@/pages/PrivateView";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

function NavBar() {
  const [location] = useLocation();
  const isPrivate = location === "/private";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    // Use passive listener for better scrolling performance
    window.addEventListener("scroll", onScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", onScroll, {
        passive: true,
      } as EventListenerOptions);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-[#080808]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/private">
            <motion.div
              onHoverStart={() => setLogoHovered(true)}
              onHoverEnd={() => setLogoHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer select-none"
            >
              <motion.div
                animate={
                  logoHovered
                    ? {
                        boxShadow:
                          "0 0 20px rgba(0,210,255,0.35), 0 0 40px rgba(0,210,255,0.15)",
                      }
                    : { boxShadow: "none" }
                }
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center"
              >
                <span className="text-xs font-black text-white/80 font-mono tracking-tighter">
                  AP
                </span>
              </motion.div>
              <AnimatePresence>
                {logoHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.3 }}
                    exit={{ opacity: 0, scale: 1.6 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    className="absolute inset-0 rounded-lg border border-cyan-500/30 pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
          <span className="text-xs text-white/35 font-mono hidden sm:block">
            {isPrivate ? "Career Command Center" : "Atharv Pawar"}
          </span>
        </div>

        {/* Desktop nav links (only on public page) */}
        {!isPrivate && (
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-xs font-mono text-white/35 hover:text-white/75 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-white/4 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isPrivate ? (
            <Link href="/">
              <motion.span
                whileHover={{ x: -2 }}
                className="text-xs font-mono text-white/25 hover:text-white/50 transition-colors duration-200 cursor-pointer flex items-center gap-1"
              >
                ← Portfolio
              </motion.span>
            </Link>
          ) : (
            <>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-5 h-px bg-white/50 transition-transform duration-200 ${
                    mobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-5 h-px bg-white/50 transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-px bg-white/50 transition-transform duration-200 ${
                    mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
              {/* Availability badge */}
              <div className="hidden sm:flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/20 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-emerald-400/70">
                  Open to work
                </span>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && !isPrivate && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[49px] left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-mono text-white/50 hover:text-white/80 transition-colors duration-200 py-2 text-left border-b border-white/4 last:border-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <>
      <NavBar />
      <div className="h-[49px]" />
      {/* Type: framer-motion 'mode' prop is used at runtime; ignore TS mismatch here */}
      {/* @ts-ignore */}
      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/">
            <PageWrapper>
              <HRView />
            </PageWrapper>
          </Route>
          <Route path="/private">
            <PageWrapper>
              <PrivateView />
            </PageWrapper>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
