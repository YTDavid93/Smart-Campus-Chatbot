import useGetQuery from "@/hooks/useGetQuery";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  conversationId: string;
}

const ChatInputForm = ({ conversationId }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { chatInput, question, setQuestion } = useGetQuery();

  useEffect(() => {
    const handleResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    handleResize();
  }, [question]);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <form>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={question}
          placeholder="Type your message here."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none overflow-hidden"
          rows={1}
          onChange={onInputChange}
        />
        <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50">
          <Send
            onClick={() => {
              chatInput(conversationId);
            }}
            className="w-5 h-5"
          />
        </div>
      </div>
    </form>
  );
};

export default ChatInputForm;
