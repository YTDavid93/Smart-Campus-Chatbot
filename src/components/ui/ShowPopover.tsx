import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import DeleteDialog from "./DeleteDialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  conversationTitle: string | null;
}

const ShowPopover = ({ isOpen, onClose, onDelete, conversationTitle }: Props) => {

  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger>
      </PopoverTrigger>

      <PopoverContent className="w-40 bg-white shadow-lg p-2 rounded-md">
        <DeleteDialog
          conversationTitle={conversationTitle}
          onDelete={onDelete} 
          onCancel={onClose}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ShowPopover;
