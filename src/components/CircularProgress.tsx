import React from "react";

const CircularProgress = ({ progress }: { progress: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 1) * circumference;

  const getColor = () => {
    if (progress > 0.5) {
      return "#10B981";
    } else if (progress > 0.3 && progress <= 0.5) {
      return "#F59E0B";
    } else if (progress <= 0.3) {
      return "#EF4444";
    } else {
      return "#3B82F6"; // Blue as a default
    }
  };

  return (
    <div className="flex justify-center items-center">
      <svg
        width="50"
        height="50"
        viewBox="0 0 120 120"
        className="transform -rotate-90"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="gray"
          strokeWidth="10"
          className="text-gray-300"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke={getColor()}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-blue-500 transition-all duration-500 ease-in-out" // Add transition for animation
        />
        <text
          x="50%"
          y="50%"
          transform="rotate(90, 60, 60)"
          className="text-lg font-semibold text-blue-500"
          dy=".3em"
          textAnchor="middle"
        >
          {`${progress * 100}%`}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
