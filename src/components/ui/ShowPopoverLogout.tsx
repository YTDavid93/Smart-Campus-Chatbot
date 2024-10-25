import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ShowPopoverLogout = ({ isOpen, onClose, children }: Props) => {
  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger></PopoverTrigger>

      <PopoverContent className="w-40 bg-white shadow-lg p-2 rounded-md">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default ShowPopoverLogout;
