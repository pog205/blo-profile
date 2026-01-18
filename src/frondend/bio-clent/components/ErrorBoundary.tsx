import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: string = "Error";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status.toString();
    errorMessage =
      error.statusText || error.data?.message || "An error occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error occurred";
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="relative">
          {/* Animated Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10">
            {/* Error Status */}
            <h1 className="text-[120px] md:text-[180px] font-bold leading-none neon-text mb-4">
              {errorStatus}
            </h1>

            {/* Error Message */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h2>

            <p className="text-muted text-lg mb-8 max-w-md mx-auto">
              {errorMessage}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="px-8 py-4 bg-primary text-background text-base font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-white shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                Go to Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-white/5 border border-white/10 text-white text-base font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Reload Page
              </button>
            </div>

            {/* Dev Info (only in development) */}
            {import.meta.env.DEV && error instanceof Error && (
              <details className="mt-12 text-left">
                <summary className="text-muted hover:text-primary cursor-pointer font-semibold mb-4">
                  Stack Trace (Dev Only)
                </summary>
                <pre className="bg-card p-6 rounded-xl text-xs text-muted overflow-auto max-h-96 border border-white/5">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
