import { useState } from "react";
import { IoApps } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import ShowPopover from "../ui/ShowPopover";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white flex items-center justify-between p-4">
      <h1 className="text-xl font-medium p-2 rounded-lg hover:bg-slate-200 cursor-pointer">
        ChatBOT
      </h1>

      <div className="relative">
        <IoApps
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        />
        {isPopoverOpen && (
          <div className="absolute right-0 top-full transform translate-x-4">
            <ShowPopover
              isOpen={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
            >
              <button
                onClick={onClick}
                className="flex items-center gap-3  w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <MdOutlineLogout />
                <span>Logout</span>
              </button>
            </ShowPopover>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
