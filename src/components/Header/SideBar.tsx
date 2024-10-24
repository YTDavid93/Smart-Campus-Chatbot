import useGetQuery from "@/hooks/useGetQuery";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/utils/Loading";
import ErrorMessage from "@/utils/ErrorMessage";
import useAuth from "@/hooks/useAuth";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import ShowPopover from "../ui/ShowPopover";
import useUserQuery, { Conversation } from "@/hooks/useUserQuery";
import HoverCardDemo from "../ui/HoverCardDemo";
import { toast } from "react-toastify";
import { GoSidebarExpand } from "react-icons/go";
import { motion } from "framer-motion";
import IconHoverCard from "@/utils/IconHoverCard";

const SideBar = () => {
  const { loading, error, fetchUserConversation, deleteConversation } =
    useGetQuery();
  const navigate = useNavigate();
  const { setNewMessages } = useUserQuery();

  const { setConversations, conversationTitle, setTitle } = useAuth();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [hoveredConversationId, setHoveredConversationId] = useState<
    string | null
  >(null);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [selectedConversationTitle, setSelectedConversationTitle] = useState<
    string | null
  >(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);

  const handleTitleClick = (
    conversationId: string,
    conversationTitle: string
  ) => {
    setActiveConversationId(conversationId);
    setTitle(conversationTitle);
    navigate(`/conversations/${conversationId}`);
    localStorage.setItem("currentConversationId", conversationId);
    localStorage.setItem("currentConversationTitle", conversationTitle);
    fetchUserConversation(conversationId);
  };

  const startNewConversation = () => {
    setNewMessages([]);
    setConversations(null);
    setTitle("");
    setActiveConversationId(null);
    localStorage.removeItem("currentConversationId");
    localStorage.removeItem("currentConversationTitle");
    navigate("/conversations");
  };

  const handleThreeDotsClick = (
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
    setActiveConversationId(conversationId);
    setIsPopoverOpen((prev) => !prev);
  };

  const handleDeleteConversation = () => {
    if (activeConversationId) {
      deleteConversation(activeConversationId);
      setIsPopoverOpen(false);
      setActiveConversationId(null);
      setTitle("");
      localStorage.removeItem("currentConversationId");
      localStorage.removeItem("currentConversationTitle");
      navigate("/conversations");
      toast.success(
        `Conversation ${activeConversationId} deleted Successfully`
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {showControls && (
          <div className="flex flex-col gap-14 p-4">
            <IconHoverCard
              name={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setShowControls(true);
              }}
              icon={<GoSidebarExpand className="w-6 h-6" />}
            />

            <IconHoverCard
              name="New Chat"
              onClick={startNewConversation}
              icon={<Plus className="w-6 h-6" />}
            />
          </div>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isSidebarOpen ? 260 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-screen bg-[#f4f4f4] p-4 overflow-y-auto"
        >
          {isSidebarOpen && (
            <>
              {loading && <Loader />}
              {error && <ErrorMessage>{error}</ErrorMessage>}

              <div className="flex flex-col gap-3 mt-2 relative">
                {conversationTitle &&
                  conversationTitle.length > 0 &&
                  conversationTitle
                    .sort((a: Conversation, b: Conversation) => {
                      // Sorting by 'createdAt' field in descending order (latest first)
                      return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                      );
                    })
                    .map((conv) => (
                      <div
                        key={conv._id}
                        className={`cursor-pointer p-2 rounded-md flex justify-between items-center ${
                          conv._id === activeConversationId
                            ? "bg-slate-300"
                            : "hover:bg-slate-300"
                        }`}
                        onClick={() => handleTitleClick(conv._id, conv.title)}
                        onMouseEnter={() => setHoveredConversationId(conv._id)}
                        onMouseLeave={() => setHoveredConversationId(null)}
                      >
                        <span>{conv.title}</span>
                        <HoverCardDemo name="Options">
                          <BsThreeDots
                            className={`${
                              conv._id === activeConversationId ||
                              hoveredConversationId === conv._id
                                ? "visible"
                                : "invisible"
                            }`}
                            onClick={(e) =>
                              handleThreeDotsClick(e, conv._id, conv.title)
                            }
                          />
                        </HoverCardDemo>
                      </div>
                    ))}

                {isPopoverOpen && (
                  <div
                    className="absolute"
                    style={{
                      top: popoverPosition.top - 200,
                      left: popoverPosition.left + 100,
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
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default SideBar;
