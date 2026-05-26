import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { initGlobalErrorHandlers } from "./utils/logger";

initGlobalErrorHandlers();

// Fallback flag: set false by default. The built client will set this to true
// once the app code runs. If the bundle fails to load, a small inline
// fallback in `index.html` will show a helpful message instead of a white
// screen.
(globalThis as any).__APP_LOADED__ = false;

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);

// Mark app as loaded (this runs when the client bundle executes)
(globalThis as any).__APP_LOADED__ = true;
