import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT ? Number(process.env.PORT) : 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig(async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const isReplit = !!process.env.REPL_ID;

  const plugins: any[] = [react()];

  if (isReplit) {
    try {
      // Dynamically load Replit-only plugins when available.
      // @ts-ignore
      const runtimeModal = (
        await import("@replit/vite-plugin-runtime-error-modal")
      ).default();
      plugins.push(runtimeModal);

      if (process.env.NODE_ENV !== "production") {
        // @ts-ignore
        const cartographer = (
          await import("@replit/vite-plugin-cartographer")
        ).cartographer({
          root: path.resolve(__dirname, ".."),
        });
        plugins.push(cartographer);
        // @ts-ignore
        const devBanner = (
          await import("@replit/vite-plugin-dev-banner")
        ).devBanner();
        plugins.push(devBanner);
      }
    } catch (e) {
      // If the optional plugins are not installed, skip them silently
      // (they are only relevant when running on Replit).
      // eslint-disable-next-line no-console
      console.warn("Optional Replit Vite plugins not loaded:", e?.message || e);
    }
  }

  return {
    base: basePath,
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(__dirname),
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
