import { Button } from "@headlessui/react";
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
  return <Button onClick={onClick}>{text}</Button>;
};

export default SimpleButton;
