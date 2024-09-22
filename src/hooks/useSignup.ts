import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const SIGNUP_URL = "/users";

const useSignup = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { setAuth } = authContext;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuthSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(SIGNUP_URL, data);
      const token = response.headers["x-auth-token"];

      setAuth({
        name: data.name,
        email: data.email,
        token,
      });
      
      toast.success("Account created Successfully");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleAuthSignup, loading, error };
};

export default useSignup;
