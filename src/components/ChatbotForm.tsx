import useUserQuery from "@/hooks/useUserQuery";
import MainPage from "./Body/MainPage";
import { MessageBubble } from "./Message/MessageBubble";
import ChatInput from "./ChatInput/ChatInput";

const ChatbotForm = () => {
  const { newMessages } = useUserQuery();

  return (
    <>
      {newMessages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <MainPage />
        </div>
      ) : (
        <div className="flex-1 mb-4">
          {newMessages.map((msg) => (
            <MessageBubble
              key={msg._id}
              question={msg.question}
              response={msg.response}
            />
          ))}
        </div>
      )}
      <ChatInput />
    </>
  );
};

export default ChatbotForm;
