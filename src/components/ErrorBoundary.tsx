import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallbackName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-white p-10 flex flex-col items-center justify-center font-sans">
          <div className="max-w-4xl w-full bg-stone-900 border border-red-500/30 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-red-500 mb-4 flex items-center gap-2">
              ⚠️ Runtime Error in {this.props.fallbackName || "Component"}
            </h2>
            <p className="text-stone-300 mb-6 font-mono text-sm bg-black/50 p-4 rounded border border-white/5">
              {this.state.error && this.state.error.toString()}
            </p>
            {this.state.errorInfo && (
              <details className="mt-4" open>
                <summary className="cursor-pointer text-stone-500 hover:text-stone-300 text-xs uppercase tracking-wider font-semibold">
                  Components Stack Trace
                </summary>
                <pre className="mt-4 text-xs font-mono text-stone-400 bg-black/40 p-4 rounded overflow-auto max-h-60 leading-relaxed border border-white/5 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-[4px] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
