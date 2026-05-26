/* Centralized lightweight logger with graceful handlers */
export function logInfo(...args: unknown[]) {
  // keep lightweight and safe — not throwing
  try {
    console.info(...args);
  } catch {}
}

export function logWarn(...args: unknown[]) {
  try {
    console.warn(...args);
  } catch {}
}

export function logError(err: unknown, info?: unknown) {
  try {
    // Basic console sink; placeholder for remote error sinks (Sentry, etc.)
    console.error(err, info);
  } catch {}
}

export function initGlobalErrorHandlers() {
  if (typeof window === "undefined") return;
  try {
    window.addEventListener("error", (ev) => {
      try {
        logError(ev.error || ev.message || "Unknown error", ev);
      } catch {}
    });
    window.addEventListener("unhandledrejection", (ev) => {
      try {
        logError((ev && (ev as any).reason) || "Unhandled rejection", ev);
      } catch {}
    });
  } catch {}
}
