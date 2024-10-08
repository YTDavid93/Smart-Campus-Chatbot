import useGetQuery from "@/hooks/useGetQuery";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/utils/Loading";
import ErrorMessage from "@/utils/ErrorMessage";
import useAuth from "@/hooks/useAuth";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import ShowPopover from "../ui/ShowPopover";

const SideBar = () => {
  const { conversationTitle, loading, error, fetchUserConversation } =
    useGetQuery();
  const navigate = useNavigate();
  const { setConversations, conversations } = useAuth();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [hoveredConversationId, setHoveredConversationId] = useState<
    string | null
  >(null);

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

      <div className="flex flex-col gap-4 mt-5 relative">
        {conversations && (
          <div
            key={conversations._id}
            className="cursor-pointer bg-slate-300 rounded-md p-2 flex items-center justify-between"
            onClick={() =>
              handleTitleClick(conversations._id, conversations.title)
            }
          >
            <span>{conversations.title}</span>
            <BsThreeDots onClick={() => setIsPopoverOpen(true)} />
          </div>
        )}

        {filteredTitle &&
          filteredTitle.map((conv) => (
            <div
              key={conv._id}
              className="cursor-pointer hover:bg-slate-300 transition-transform duration-200 ease-in-out transform hover:scale-105 p-2 rounded-md flex justify-between items-center"
              onMouseEnter={() => setHoveredConversationId(conv._id)}
              onMouseLeave={() => setHoveredConversationId(null)}
              onClick={() => handleTitleClick(conv._id, conv.title)}
            >
              <span>{conv.title}</span>

              {hoveredConversationId === conv._id && (
                <BsThreeDots onClick={() => setIsPopoverOpen(true)} />
              )}
            </div>
          ))}

        <div className="absolute right-[10px] top-[10px]">
          <ShowPopover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
