import { TbMessageChatbot } from "react-icons/tb";

const MainPage = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="mb-2">
        <TbMessageChatbot className="w-14 h-auto" />
      </div>
      <div className="flex items-center text-4xl font-bold tracking-wide">
        Chatbot
      </div>
    </section>
  );
};


export default MainPage;