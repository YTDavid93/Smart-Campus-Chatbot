import axiosInstance from "@/api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "./useAuth";
import { Conversation, Messages } from "./useUserQuery";

const useGetQuery = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Response | null>(null);
  const {
    conversations,
    setConversations,
    conversationTitle,
    setConversationTitle,
  } = useAuth();

  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch conversation titles
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<Conversation[]>("/conversations")
      .then((res) => {
        console.log(res.data);
        setConversationTitle(res.data);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Fetch a specific conversation
  const fetchUserConversation = async (conversationId: string) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get<Conversation>(
        `/conversations/${conversationId}`
      );
      setConversations(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const chatInput = async (conversationId: string) => {
    try {
      const postResponse = await axiosInstance.post<Conversation>(
        `/conversations/${conversationId}`,
        {
          question,
        }
      );

      const message: Messages =
        postResponse.data.messages[postResponse.data.messages.length - 1];

      if (conversations) {
        setConversations({
          ...conversations,
          messages: [...conversations.messages, message],
        });
      }

      setQuestion("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchUserConversation(conversationId);
    }
  }, [conversationId]);

  return {
    conversation,
    loading,
    error,
    conversationTitle,
    chatInput,
    fetchUserConversation,
    setConversation,
    question,
    setQuestion,
    conversations,
  };
};

export default useGetQuery;
