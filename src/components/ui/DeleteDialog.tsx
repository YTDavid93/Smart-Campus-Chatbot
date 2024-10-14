import { MdDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

interface Props {
  onDelete: () => void;
  onCancel: () => void;
  conversationTitle: string | null;
}

const DeleteDialog = ({ onDelete, onCancel, conversationTitle }: Props) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <button className="flex items-center gap-3 w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md cursor-pointer">
          <MdDelete className="text-red-500" />
          <span className="text-red-500">Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete{" "}
            <span className="font-bold text-black">
              {conversationTitle}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
