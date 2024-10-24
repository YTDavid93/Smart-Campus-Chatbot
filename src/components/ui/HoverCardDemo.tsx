import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  name: string;
  className?: string
}

const HoverCardDemo = ({ children, name, className }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button>{children}</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <h4 className=" text-xs font-semibold">{name}</h4>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardDemo;
