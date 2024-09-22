import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const LOGIN_URL = "/auth";

const useSignup = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { setAuth } = authContext;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuthLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(LOGIN_URL, data);
      const token = response.headers["x-auth-token"];

      if (token) {
        localStorage.setItem("chatbot-token", token);

        setAuth({
          email: data.email,
          token,
        });
      }

      toast.success("User Logged In successfully");
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleAuthLogin, loading, error };
};

export default useSignup;
