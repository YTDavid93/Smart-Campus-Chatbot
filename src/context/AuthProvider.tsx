import { Conversation } from "@/hooks/useUserQuery";
import { createContext, ReactNode, useState, useEffect } from "react";

interface Props {
  children: ReactNode;
}

interface Auth {
  name?: string;
  email?: string;
  token?: string;
}

interface AuthContextType {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  conversations: Conversation | null;
  setConversations: (conversations: Conversation | null) => void;
  title: string;
  setTitle: (title: string) => void;
  conversationTitle: Conversation[];
  setConversationTitle: (conversations: Conversation[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthContextType["auth"]>({});
  const [conversations, setConversations] = useState<Conversation | null>(null);
  const [conversationTitle, setConversationTitle] = useState<Conversation[]>(
    []
  );
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("chatbot-token");

    if (token) {
      setAuth({ token });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <span className="loading loading-dots loading-lg flex item-center mx-auto">
        Loading...
      </span>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        conversations,
        setConversations,
        title,
        setTitle,
        conversationTitle,
        setConversationTitle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
