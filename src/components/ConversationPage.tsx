import useGetQuery from "@/hooks/useGetQuery";
import MainPage from "./Body/MainPage";
import { MessageBubble } from "./Message/MessageBubble";
import ErrorMessage from "@/utils/ErrorMessage";
import { CircleLoader } from "@/utils/CircleLoader";
import ChatInputForm from "./ChatInput/ChatInputForm";
import { useParams } from "react-router-dom";

const ConversationPage = () => {
  const { conversations, loading, error } = useGetQuery();
  const { conversationId } = useParams();

  return (
    <>
      {loading ? (
        <CircleLoader />
      ) : (
        <div className="flex flex-col justify-between h-screen overflow-y-auto">
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!conversations || conversations.messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <MainPage />
            </div>
          ) : (
            <div className="flex-1 mb-4">
              {conversations.messages.map((msg) => (
                <MessageBubble
                  key={msg._id}
                  question={msg.question}
                  response={msg.response}
                />
              ))}
            </div>
          )}
          {conversationId && <ChatInputForm conversationId={conversationId} />}
        </div>
      )}
    </>
  );
};

export default ConversationPage;
