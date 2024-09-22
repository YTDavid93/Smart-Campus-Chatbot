import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return <p className="text-red-500 text-sm">{children}</p>;
};

export default ErrorMessage;
