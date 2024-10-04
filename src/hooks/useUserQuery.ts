import axiosInstance from "@/api/axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export interface Messages {
  _id: string;
  question: string;
  response: string;
}

export interface Conversation {
  title: string;
  messages: Messages[];
  _id: string;
}

const CONVERSATION_ROUTE = "/conversations";

const useUserQuery = () => {
  const { title, setTitle } = useAuth();
  const [initialMessage, setInitialMessage] = useState("");
  const [error, setError] = useState("");
  const [newMessages, setNewMessages] = useState<Messages[]>([]);
  const { conversations, setConversations } = useAuth();

  useEffect(() => {
    const storedConversationId = localStorage.getItem("currentConversationId");

    if (storedConversationId && !conversations?._id) {
      axiosInstance
        .get<Conversation>(`${CONVERSATION_ROUTE}/${storedConversationId}`)
        .then((res) => {
          setConversations(res.data);
          setNewMessages(res.data.messages);
        })
        .catch((err) => {
          if (err instanceof Error) setError(err.message);
        });
    } else if (conversations?._id) {
      axiosInstance
        .get<Conversation>(`${CONVERSATION_ROUTE}/${conversations._id}`)
        .then((res) => {
          setNewMessages(res.data.messages);
        })
        .catch((err) => {
          if (err instanceof Error) setError(err.message);
        });
    }
  }, [conversations, setConversations, setTitle]);


  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post<Conversation>(
        CONVERSATION_ROUTE,
        {
          title,
          initialMessage: { question: initialMessage },
        }
      );

      const message: Messages =
        response.data.messages[response.data.messages.length - 1];

      setNewMessages((prevMessages) => [...prevMessages, message]);
      setConversations(response.data);

      localStorage.setItem("currentConversationId", response.data._id);
      localStorage.setItem("currentConversationTitle", response.data.title);

      setInitialMessage("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return {
    handleSubmit,
    newMessages,
    error,
    initialMessage,
    setInitialMessage,
    title,
    setTitle,
    conversations,
  };
};

export default useUserQuery;
