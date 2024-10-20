"use client";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
  onClick,
  textColor = "text-white",
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  textColor?: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.a
        onClick={onClick}
        href={href}
        transition={{ duration: 0.3 }}
        className={classNames(
          textColor,
          "cursor-pointer hover:opacity-100 opacity-80 transition-all duration-300"
        )}
      >
        {item}
      </motion.a>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-md  overflow-hidden shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative border rounded-full border-transparent shadow-input flex justify-center space-x-4 px-6 py-3"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      {...rest}
      className="text-black/50 dark:text-neutral-200 hover:text-black min-w-56 transition-all duration-300"
    >
      {children}
    </Link>
  );
};
