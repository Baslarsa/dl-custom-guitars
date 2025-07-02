import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  link?: LinkField;
  className?: string;
  ariaLabel?: string;
  dark?: boolean;
};

const HoverButton: React.FC<ButtonProps> = ({
  onClick,
  link,
  className = "",
  ariaLabel,
  dark = false,
}) => {
  const isLink = Boolean(link);

  return (
    <div
      className={classNames(
        className,
        dark
          ? "text-white bg-offBlack border border-white"
          : "bg-white text-offBlack",
        "px-6 py-2 mx-1 opacity-90 hover:opacity-100 transition-all rounded-[2px]"
      )}
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {isLink && (
        <PrismicNextLink
          field={link}
          className="btn-content"
          rel="noopener noreferrer"
        />
      )}
    </div>
  );
};

export default HoverButton;
