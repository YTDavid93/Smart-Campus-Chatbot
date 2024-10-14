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
  const {
    conversationTitle,
    loading,
    error,
    fetchUserConversation,
    deleteConversation,
  } = useGetQuery();
  const navigate = useNavigate();
  const { setConversations, conversations } = useAuth();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [hoveredConversationId, setHoveredConversationId] = useState<
    string | null
  >(null);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [selectedConversationTitle, setSelectedConversationTitle] = useState<
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

  const handleThreeDotsClickActive = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newPosition = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };

    setPopoverPosition(newPosition);
    setSelectedConversationTitle(title);
    setSelectedConversationId(conversations?._id ?? null);
    setIsPopoverOpen((prev) => !prev);
  };

  const handleThreeDotsClickFiltered = (
    e: React.MouseEvent,
    conversationId: string,
    title: string
  ) => {
    e.stopPropagation();

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const newPosition = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };

    setPopoverPosition(newPosition);
    setSelectedConversationTitle(title);
    setSelectedConversationId(conversationId);
    setIsPopoverOpen((prev) => !prev);
  };

  const handleDeleteConversation = () => {
    if (selectedConversationId) {
      deleteConversation(selectedConversationId);
      setIsPopoverOpen(false);
      localStorage.removeItem("currentConversationId");
      localStorage.removeItem("currentConversationTitle");
      navigate("/conversations");
    }
  };

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
            <BsThreeDots
              onClick={(e) =>
                handleThreeDotsClickActive(e, conversations.title)
              }
            />
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
                <BsThreeDots
                  onClick={(e) =>
                    handleThreeDotsClickFiltered(e, conv._id, conv.title)
                  }
                />
              )}
            </div>
          ))}

        {isPopoverOpen && (
          <div
            className="absolute"
            style={{
              top: popoverPosition.top - 63,
              left: popoverPosition.left + 15,
            }}
          >
            <ShowPopover
              isOpen={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
              onDelete={handleDeleteConversation}
              conversationTitle={selectedConversationTitle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
