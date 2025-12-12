import React from "react";
import { LucideIcon } from "lucide-react"; // type for icons

type CardProps = {
  title: string;
  description: string;
  icon: LucideIcon; // pass the icon component from Lucide
  color?: string; // optional color for glow effect
};

const Card: React.FC<CardProps> = ({ title, description, icon: Icon, color = "purple" }) => {
  const bgColor = color === "purple" ? "bg-purple-600/30" : "bg-blue-500/30";
  const shadowColor = color === "purple" ? "hover:shadow-glow-purple" : "hover:shadow-glow-blue";

  return (
    <div
      className={`group relative flex flex-col gap-4 p-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${shadowColor}`}
    >
      <div
        className={`absolute -top-1/2 -right-1/2 w-full h-full ${bgColor} rounded-full filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
      ></div>
      <div className="relative z-10 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/30 group-hover:text-white transition-colors duration-300">
        <Icon size={28} />
      </div>
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <p className="text-gray-400 text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default Card;
