
interface Props {
    question: string;
    response: string   
}

export const MessageBubble = ({ question, response}: Props) => {
  return (
    <div className="mb-4">
      <div className="flex justify-end mb-2">
        <div className="relative max-w-[70%] rounded-3xl px-4 py-2 bg-blue-500 text-white self-end">
          {question}
        </div>
      </div>

      <div className="flex justify-start">
        <div className="relative max-w-[70%] rounded-3xl px-4 py-2 bg-gray-300 text-black self-start">
          {response}
        </div>
      </div>
    </div>
  );
}
