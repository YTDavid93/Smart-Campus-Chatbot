import HoverCardDemo from "@/components/ui/HoverCardDemo";
import React from "react";

interface IconHoverCardProps {
  name: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const IconHoverCard: React.FC<IconHoverCardProps> = ({
  name,
  onClick,
  icon,
}) => {
  return (
    <div className="inline-flex">
      <HoverCardDemo
        name={name}
        className="p-2 rounded-lg hover:bg-slate-300 transition duration-200 ease-in-out"
      >
        <div onClick={onClick}>{icon}</div>
      </HoverCardDemo>
    </div>
  );
};

export default IconHoverCard;
