import React from "react";

type ButtonProps = {
  children: React.ReactNode; // text or icon inside button
  color?: "primary" | "white" | "secondary"; // different color themes
  size?: "sm" | "md" | "lg"; // button size
  onClick?: () => void; // click handler
  className?: string; // extra classes if needed
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  size = "md",
  onClick,
  className = "",
}) => {
  // Tailwind classes based on size
  const sizeClasses = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  // Tailwind classes based on color
  const colorClasses = {
    primary: "bg-(--color-primary) text-white shadow-lg shadow-primary/30 hover:bg-(--color-primary)/90",
    white: "bg-white/10 border border-white/20 text-white backdrop-blur-sm hover:bg-white/20",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center cursor-pointer justify-center overflow-hidden rounded-full font-bold tracking-wide transition-all duration-300 transform hover:scale-105
        ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
