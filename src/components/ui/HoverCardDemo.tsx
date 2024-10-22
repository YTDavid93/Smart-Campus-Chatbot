import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  name: string
}

const HoverCardDemo = ({ children, name }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-50">  
        <h4 className="text-sm font-semibold">{name}</h4>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardDemo;
