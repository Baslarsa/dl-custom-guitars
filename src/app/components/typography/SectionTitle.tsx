"use client";
import { KeyTextField } from "@prismicio/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const SectionTitle = ({
  title,
}: {
  title: string | JSX.Element | KeyTextField;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.h6
      ref={ref}
      className="text-4xl font-medium pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      viewport={{ once: true, amount: "all" }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {title}
    </motion.h6>
  );
};

export default SectionTitle;
