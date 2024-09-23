import { useNavigate } from "react-router-dom";
import useHandleQuery from "../hooks/useHandleQuery";
import MainPage from "./Body/MainPage"; // Assuming MainPage contains the logo or welcome screen
import ChatInput from "./ChatInput/ChatInput";
import NavBar from "./Header/NavBar";
import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const { sendMessage, messages } = useHandleQuery();
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

      <div className="flex flex-col justify-between h-screen p-6">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <MainPage />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4">
            <div>
              {messages.map((msg, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-end mb-2">
                    <div className="relative max-w-[70%] rounded-3xl px-4 py-2 bg-blue-500 text-white self-end">
                      {msg.question}
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="relative max-w-[70%] rounded-3xl px-4 py-2 bg-gray-300 text-black self-start">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <ChatInput onClick={sendMessage} />
      </div>
    </>
  );
};

export default DashboardPage;
