import classNames from "classnames";

const SimpleButton = ({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={classNames(
        className,
        "bg-white text-black px-6 py-2 mx-1 opacity-90 hover:opacity-100 transition-all rounded-[2px]"
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SimpleButton;
