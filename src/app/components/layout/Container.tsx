"use client";
import { isMobile } from "react-device-detect";
import classNames from "classnames";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(isMobile ? "px-2" : "px-4", "w-full", className)}
    >
      <div className="w-full max-w-7xl mx-auto p-2 h-full">{children}</div>
    </div>
  );
};

export default Container;
