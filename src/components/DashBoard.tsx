import { useNavigate } from "react-router-dom";
import useHandleQuery from "../hooks/useHandleQuery";
import MainPage from "./Body/MainPage";
import ChatInput from "./ChatInput/ChatInput";
import NavBar from "./Header/NavBar";
import useAuth from "../hooks/useAuth";
import { CircleLoader } from "../utils/CircleLoader";
import ErrorMessage from "../utils/ErrorMessage";
import { MessageBubble } from "./Message/MessageBubble";


const DashboardPage = () => {
  const { sendMessage, messages, loading, error } = useHandleQuery();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("chatbot-token");
    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <NavBar onClick={handleSignOut} />
      {loading ? (
        <CircleLoader />
      ) : (
        <div className="flex flex-col justify-between h-screen overflow-y-auto p-6">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <MainPage />
            </div>
          ) : (
            <div className="flex-1 mb-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg._id}
                  question={msg.question}
                  response={msg.response}
                />
              ))}
            </div>
          )}
          <ChatInput onClick={sendMessage} />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
