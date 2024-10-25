import classNames from "classnames";
import Link from "next/link";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  href?: string;
  title: string;
  className?: string;
  ariaLabel?: string;
  dark?: boolean;
};

const HoverButton: React.FC<ButtonProps> = ({
  onClick,
  title,
  href,
  className = "",
  ariaLabel,
  dark = false,
}) => {
  const isLink = Boolean(href);

  return (
    <div
      className={classNames(
        className,
        dark
          ? "text-white bg-black border border-white"
          : "bg-white text-black",
        "px-6 py-2 mx-1 opacity-90 hover:opacity-100 transition-all rounded-[2px]"
      )}
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {isLink ? (
        <Link
          href={href || "/"}
          className="btn-content"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Avoid triggering the container onClick
        >
          {title}
        </Link>
      ) : (
        <button className="btn-content" type="button">
          {title}
        </button>
      )}
    </div>
  );
};

export default HoverButton;
