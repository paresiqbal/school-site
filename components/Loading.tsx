import React from "react";

interface ILoading {
  size?: "small" | "medium" | "large";
  color?: string;
}

const Loading: React.FC<ILoading> = ({
  size = "medium",
  color = "text-primary",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center" role="status">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${sizeClasses[size]} ${color}`}
        aria-label="Loading"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
