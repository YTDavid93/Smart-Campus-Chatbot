import axiosInstance from "@/api/axios";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "./useAuth";
import { Conversation, Messages } from "./useUserQuery";

const useGetQuery = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const {
    conversations,
    setConversations,
    conversationTitle,
    setConversationTitle,
  } = useAuth();

  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // fetch conversations title
  const fetchConversationTitles = async () => {
    try {
      const res = await axiosInstance.get<Conversation[]>("/conversations");
      setConversationTitle(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchConversationTitles();
  }, [conversations]);

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
        { question }
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

  const deleteConversation = async (conversationId: string) => {
    try {
      setError(null);

      setConversationTitle(
        conversationTitle.filter((conv) => conv._id !== conversationId)
      );

      await axiosInstance.delete(`/conversations/${conversationId}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

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
    deleteConversation,
  };
};

export default useGetQuery;

