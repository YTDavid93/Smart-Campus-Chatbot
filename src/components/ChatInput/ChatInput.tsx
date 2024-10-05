import useUserQuery from "@/hooks/useUserQuery";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DialogDemo } from "../ui/AlertDialog";
import useAuth from "@/hooks/useAuth";


const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { initialMessage, setInitialMessage, handleSubmit } =
    useUserQuery();

  const { title } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    handleResize();
  }, [initialMessage]);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInitialMessage(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!title.trim()) {
      setIsDialogOpen(true);
      event.preventDefault();
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <form>
      <DialogDemo isOpen={isDialogOpen} onClose={handleDialogClose} />
      <div className="relative">
        <textarea
          onKeyDown={handleKeyDown}
          ref={textareaRef}
          value={initialMessage}
          placeholder="Type your message here."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-hidden"
          rows={1}
          onChange={onInputChange}
        />
        <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50">
          <Send onClick={handleSubmit} className="w-5 h-5" />
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
