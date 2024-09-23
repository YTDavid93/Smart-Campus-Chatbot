import { useState } from "react";
import axiosInstance from "../api/axios";
import { jwtDecode } from "jwt-decode";

interface Response {
  interactionId: string,
  answer: string;
}

interface Message {
  id: string;
  text: string;
  question: string
}

const USERR_QUERY = "/questions";

const useHandleQuery = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("chatbot-token");

    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded._id;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const sendMessage = async (message: string) => {
    const userId = getUserIdFromToken();
    
    if (!userId) return;

    try {
      const response = await axiosInstance.post<Response>(USERR_QUERY, {
        userId,
        question: message,
      });

      const newMessage: Message = {
        id: response.data.interactionId,
        text: response.data.answer,
        question: message
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return { sendMessage, messages, error };
};

export default useHandleQuery;
