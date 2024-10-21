interface Props {
  question: string;
  response: string;
}

export const MessageBubble = ({ question, response }: Props) => {
  return (
    <div className="mb-4">
      <div className="flex justify-end mb-2">
        <div className="relative max-w-[70%] rounded-3xl px-4 py-2 bg-blue-500 text-white self-end">
          {question}
        </div>
      </div>

      <div className="flex justify-start items-center gap-3">
        <img
          src="/src/assets/Thames-Logo.webp"
          alt="logo"
          className="w-[30px] h-[30px] rounded-[15px] border border-slate-200 p-[2px] "
        />
        <div className="relative max-w-[70%] rounded-3xl px-4 py-2 bg-gray-300 text-black self-start">
          {response}
        </div>
      </div>
    </div>
  );
};
