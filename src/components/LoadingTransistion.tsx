import { useEffect, useState } from 'react';

interface LoadingTransitionProps {
  onComplete: () => void;
}

export default function LoadingTransition({ onComplete }: LoadingTransitionProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18342B] via-[#1a4d3a] to-[#18342B] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#4BA82E"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(75, 168, 46, 0.5))'
                }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Skoda"
                  className="h-16 w-auto animate-pulse"
                  style={{
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-4xl font-bold text-white">
            {Math.round(progress)}%
          </div>

          <div className="w-64 mx-auto bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-[#4BA82E] to-[#6ed946] transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(75, 168, 46, 0.5)'
              }}
            />
          </div>

          <div className="text-white/80 text-lg font-medium animate-pulse">
            {progress < 30 && 'Initializing AI Skill Coach...'}
            {progress >= 30 && progress < 60 && 'Loading your profile...'}
            {progress >= 60 && progress < 90 && 'Preparing dashboard...'}
            {progress >= 90 && 'Almost ready...'}
          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


