import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Header/NavBar";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const MainLayout = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { setAuth } = authContext;
  const handleSignOut = () => {
    localStorage.removeItem("chatbot-token");
    setAuth({});
    navigate("/login");
  };

  return (
    <div>
      <div>
        <NavBar onClick={handleSignOut} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
