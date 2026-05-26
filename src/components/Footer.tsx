import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-24 px-6 pb-12 text-center"
    >
      <div className="max-w-6xl mx-auto border-t border-white/5 pt-8">
        <p className="text-white/15 text-xs font-mono">
          Atharv Pawar · Portfolio
        </p>
        <p className="text-white/10 text-xs font-mono mt-1">
          "The future belongs to those who prepare for it today."
        </p>
      </div>
    </motion.footer>
  );
}
