"use client";
import { LinkField } from "@prismicio/client";
import HoverButton from "./HoverButton";

const ButtonGroup = ({
  buttons,
  dark,
}: {
  buttons: LinkField[] | undefined;
  dark?: boolean;
}) => {
  if (!buttons) return null;
  return (
    <div className="my-4 flex gap-2 items-center w-full justify-center md:justify-start">
      {buttons?.map((button) => (
        <HoverButton key={button.text} link={button} dark={dark} />
      ))}
    </div>
  );
};

export default ButtonGroup;
