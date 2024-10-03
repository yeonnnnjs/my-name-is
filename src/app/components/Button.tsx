interface Props {
  onClick: () => void;
  disableCondition?: boolean;
  children: JSX.Element;
  mode: "input" | "normal" | "rainbow" | "enableTab" | "disableTab" | "filter"
}

const Button = ({ onClick, disableCondition, children, mode }: Props) => {

  const style = () => {
    switch (mode) {
      case "input":
        return "px-6 py-2 bg-gray-700 text-white rounded-r-md hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";
      case "normal":
        return "w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";
      case "rainbow":
        return "w-[300px] h-[60px] px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gradient-to-r from-red-400 to-blue-400 flex justify-center items-center";
      case "enableTab":
        return "w-full px-4 py-2 rounded bg-gray-700 text-white";
      case "disableTab":
        return "w-full px-4 py-2 rounded bg-gray-300 text-white";
      case "filter":
        return "aspect-square px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 disabled:opacity-20 disabled:hover:bg-gray-700";

    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disableCondition}
      className={style()}
    >
      {children}
    </button>
  );
}

export default Button;
