import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  disableCondition?: boolean;
  children: ReactNode;
  mode:
    | "input"
    | "normal"
    | "rainbow"
    | "enableTab"
    | "disableTab"
    | "square"
    | "normalPadding";
}

const Button = ({ onClick, disableCondition, children, mode }: Props) => {
  const style = () => {
    switch (mode) {
      case "input":
        return "whitespace-nowrap px-6 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";
      case "normal":
        return "w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";
      case "rainbow":
        return "w-[300px] h-[60px] px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gradient-to-r from-red-400 to-blue-400 flex justify-center items-center";
      case "enableTab":
        return "w-full px-4 py-2 rounded bg-gray-700 text-white";
      case "disableTab":
        return "w-full px-4 py-2 rounded bg-gray-300 text-white";
      case "square":
        return "aspect-square px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";
      case "normalPadding":
        return "whitespace-nowrap px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";
    }
  };

  return (
    <button onClick={onClick} disabled={disableCondition} className={style()}>
      {children}
    </button>
  );
};

export default Button;
