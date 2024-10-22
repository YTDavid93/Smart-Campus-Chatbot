import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import axiosInstance from "../api/axios";

const LOGIN_URL = "/auth";

const useSignup = () => {
  const { setAuth, setConversations } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleAuthLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post(LOGIN_URL, data);
      const token = response.headers["x-auth-token"];

      if (token) {
        localStorage.setItem("chatbot-token", token);

        setAuth({
          email: data.email,
          token,
        });
      }

      toast.success("User Logged In successfully");
      navigate("/conversations");
      localStorage.removeItem("currentConversationId");
      localStorage.removeItem("currentConversationTitle");
      setConversations(null);
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
