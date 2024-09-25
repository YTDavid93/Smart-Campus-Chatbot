import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { jwtDecode } from "jwt-decode";

interface Response {
  interactionId: string;
  answer: string;
}

interface Message {
  _id: string;
  question: string;
  response: string;
}

const USERR_QUERY = "/questions";

const useHandleQuery = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Message[]>(USERR_QUERY);
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchMessages(); 
  }, []);
  
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
        _id: response.data.interactionId,
        response: response.data.answer,
        question: message,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  

  return { sendMessage, messages, error, loading, setMessages, fetchMessages };
};

export default useHandleQuery;

  // setLoading(true);
  // axiosInstance
  //   .get<Message[]>(USERR_QUERY)
  //   .then((res) => {
  //     setMessages(res.data);
  //     setLoading(false);
  //   })
  //   .catch((err) => {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     }
  //   });