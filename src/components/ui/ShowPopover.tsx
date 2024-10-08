import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShowPopover = ({ isOpen, onClose }: Props) => {
  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverTrigger>
      </PopoverTrigger>
      <PopoverContent className="w-40 bg-white shadow-lg p-2 rounded-md">
        <button
          className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md"
          onClick={() => console.log("Edit Clicked")}
        >
          Edit
        </button>
        <button
          className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-red-500"
          onClick={() => console.log("Delete Clicked")}
        >
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default ShowPopover;
