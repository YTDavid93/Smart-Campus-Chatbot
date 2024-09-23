import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Header/NavBar";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();
  const handleSignOut = () => {
    localStorage.removeItem("chatbot-token");
    setAuth({});
    navigate("/login");
  };

  return (
    <div>
      <NavBar onClick={handleSignOut} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
