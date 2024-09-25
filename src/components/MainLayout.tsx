import { Outlet } from "react-router-dom";
import SideBar from "./Header/SideBar";
import useHandleQuery from "@/hooks/useHandleQuery";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const { messages, setMessages, fetchMessages } = useHandleQuery();

  const [newconversation, setNewConversation] = useState(false);

  useEffect(() => {
    if (!newconversation) {
      fetchMessages();
    }
  }, [newconversation]);


  const handleClick = () => {
    setMessages([]);
    console.log(messages);
    setNewConversation(true)
  };

  return (
    <div className="flex">
      <SideBar onClick={handleClick} />
      <main className="flex flex-1 flex-col h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
