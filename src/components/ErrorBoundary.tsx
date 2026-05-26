import * as React from "react";
import { logError } from "@/utils/logger";

type Props = { children: React.ReactNode; fallback?: React.ReactNode };
type State = { hasError: boolean; error?: Error | null };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError(error, info);
  }

  reset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      if (fallback) return fallback;

      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-[#0b0b0b] border border-white/6 rounded-xl p-8 text-center max-w-md w-full">
            <h2 className="text-lg font-bold">Something went wrong</h2>
            <p className="text-sm text-white/60 mt-2">
              An unexpected error occurred. You can retry or reload.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={this.reset}
                className="px-4 py-2 bg-cyan-600 rounded text-white"
              >
                Retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border rounded text-white"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
