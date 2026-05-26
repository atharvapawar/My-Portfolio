import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const envPasswordRaw = import.meta.env.VITE_PRIVATE_PASSWORD;
// Enforce using only the environment-provided password. Trim to avoid whitespace mismatches.
const envPassword = envPasswordRaw ? envPasswordRaw.trim() : undefined;
const ALLOWED_PASSWORDS: string[] = envPassword ? [envPassword] : [];
const PASSWORD_CONFIGURED = ALLOWED_PASSWORDS.length > 0;

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    if (!PASSWORD_CONFIGURED) {
      // Password not configured — deny access and show message
      setError(true);
      setTimeout(() => setError(false), 800);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const attempt = input.trim();
      if (ALLOWED_PASSWORDS.includes(attempt)) {
        setUnlocked(true);
      } else {
        setError(true);
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setError(false);
          setInput("");
          inputRef.current?.focus();
        }, 700);
      }
    }, 600);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#080808] grid-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed inset-0 scan-line pointer-events-none opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 mb-6"
          >
            <span className="text-2xl font-black text-white/90 font-mono tracking-tighter">
              AP
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-white mb-2"
          >
            Career Command Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-sm text-white/30 font-mono tracking-widest uppercase"
          >
            Private · Authorized Access Only
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          animate={shaking ? { x: [-12, 12, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              aria-label="Access code"
              aria-invalid={error}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter access code"
              className={`w-full bg-transparent border rounded-xl px-5 py-4 text-white placeholder-white/20 font-mono text-sm tracking-widest focus:outline-none transition-all duration-300 ${
                error
                  ? "border-red-500/60 bg-red-500/5 focus:border-red-500"
                  : "border-white/8 focus:border-cyan-500/50"
              }`}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              disabled={!PASSWORD_CONFIGURED}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-0 text-red-400 text-xs font-mono"
                >
                  ACCESS DENIED
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {!PASSWORD_CONFIGURED && (
            <div className="text-center mt-2">
              <p className="text-xs text-yellow-300">
                Private password not configured — access disabled.
              </p>
              <p className="text-[10px] text-white/40 mt-1">
                Set `VITE_PRIVATE_PASSWORD` in your `.env` and restart the dev
                server to apply.
              </p>
            </div>
          )}

          {/* development-only indicators removed in final purge */}

          <button
            type="submit"
            disabled={loading || !input}
            className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 rounded-xl text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Unlocking...</span>
              </>
            ) : (
              "AUTHENTICATE →"
            )}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-white/15 text-xs font-mono"
        >
          Atharv Pawar · 2026–2045
        </motion.p>
      </motion.div>
    </div>
  );
}
