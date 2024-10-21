import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HoverCardDemo = ({ children }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-50">  
        <h4 className="text-sm font-semibold">New Chat</h4>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardDemo;
