import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

const SideBar = ({ onClick }: Props) => {

  return (
    <div className="h-screen w-[260px] bg-[#f4f4f4] p-4">
      <div className="flex justify-end cursor-pointer">
        <Plus onClick={onClick} />
      </div>
    </div>
  );
};

export default SideBar;
