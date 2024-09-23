import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  onClick: (message: string) => void;
}

const ChatInput = ({ onClick }: Props) => {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    handleResize();
  }, [message]);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }
    onClick(message);
    setMessage("");
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={message}
        placeholder="Type your message here."
        className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-hidden"
        rows={1}
        onChange={onInputChange}
      />
      <Send
        className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50"
        onClick={handleSendClick}
      />
    </div>
  );
};

export default ChatInput;
