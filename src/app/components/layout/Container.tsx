"use client";
import useIsMobile from "@/hooks/useIsMobile";
import classNames from "classnames";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames(isMobile ? "px-2" : "px-4", "w-full", className)}
    >
      <div className="w-full max-w-7xl mx-auto p-2 h-full">{children}</div>
    </div>
  );
};

export default Container;
