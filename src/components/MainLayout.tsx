import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./Header/SideBar";
import NavBar from "./Header/NavBar";
import useAuth from "@/hooks/useAuth";

const MainLayout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("chatbot-token");
    localStorage.removeItem("currentConversationId");
    localStorage.removeItem("currentConversationTitle");
    setAuth({});
    navigate("/login");
  };
  
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col h-screen">
        <NavBar onClick={handleSignOut} />
        <main className="flex flex-col justify-between h-screen overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
