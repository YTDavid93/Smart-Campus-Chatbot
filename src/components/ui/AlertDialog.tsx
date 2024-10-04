import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function DialogDemo({ isOpen, onClose }: Props) {
  const { title, setTitle } = useAuth();  

  const handleSave = () => {
    if (title.trim()) {
      onClose();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Conversation Title to Continue</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              type="text"
              placeholder="Enter conversation title"
              value={title}
              onChange={handleTitleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <button type="button" onClick={handleSave}>
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
