import React from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-8">

        {/* Logo / Icon glow */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-green-500/20 animate-ping" />
          <div className="absolute w-14 h-14 rounded-full bg-green-500/30 animate-pulse" />
          <div className="relative w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_24px_4px_rgba(34,197,94,0.5)]">
            <svg
              className="w-5 h-5 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                       10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4
                       0h-2V8h2v8z" />
            </svg>
          </div>
        </div>

        {/* Bouncing dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.8s",
              }}
              className="block w-2.5 h-2.5 rounded-full bg-green-400 animate-bounce shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]"
            />
          ))}
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-green-400 text-sm font-semibold tracking-[0.25em] uppercase">
            {message}
          </p>
          <p className="text-white/20 text-xs tracking-widest">
            Please wait a moment
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
            style={{
              animation: "loading-bar 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   margin-left: 0; }
          50%  { width: 70%;  margin-left: 15%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
