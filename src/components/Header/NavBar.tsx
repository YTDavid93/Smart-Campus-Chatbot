
interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {

  return (
    <nav className="bg-[#2970ff] flex justify-between p-6">
      <h1 className="text-xl font-medium text-white">Chatbot.</h1>

      <div className="flex items-center gap-4 text-white">
        <button onClick={onClick}>logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
