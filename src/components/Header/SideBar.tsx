import useGetQuery from "@/hooks/useGetQuery";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/utils/Loading";
import ErrorMessage from "@/utils/ErrorMessage";
import useAuth from "@/hooks/useAuth";

const SideBar = () => {
  const {
    conversationTitle,
    loading,
    error,
    fetchUserConversation,
  } = useGetQuery();

  const navigate = useNavigate();

  const { setConversations, conversations } = useAuth();

  const handleTitleClick = (
    conversationId: string,
    conversationTitle: string
  ) => {
    fetchUserConversation(conversationId);
    navigate(`/conversations/${conversationId}`);

    localStorage.setItem("currentConversationId", conversationId);
    localStorage.setItem("currentConversationTitle", conversationTitle);
  };

  const startNewConversation = () => {
    localStorage.removeItem("currentConversationId");
    localStorage.removeItem("currentConversationTitle");
    setConversations(null);
    navigate("/conversations");
  };

  const filteredTitle = conversationTitle.filter(
    (el) => el._id !== conversations?._id
  );

  return (
    <div className="h-screen w-[260px] bg-[#f4f4f4] p-4">
      <div className="flex justify-end cursor-pointer">
        <Plus onClick={startNewConversation} />
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {conversations && (
        <div
          key={conversations._id}
          className="cursor-pointer font-bold"
          onClick={() =>
            handleTitleClick(conversations._id, conversations.title)
          }
        >
          {conversations.title}
        </div>
      )}
      
      {filteredTitle &&
        filteredTitle.map((conv) => (
          <div
            key={conv._id}
            className="cursor-pointer"
            onClick={() => handleTitleClick(conv._id, conv.title)}
          >
            {conv.title}
          </div>
        ))}
    </div>
  );
};

export default SideBar;
