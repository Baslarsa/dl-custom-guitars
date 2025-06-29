"use client";
import { RichTextField } from "@prismicio/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RichText from "./RichText";
const RevealParagraph = ({ text }: { text: RichTextField }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <RichText text={text} />
    </motion.div>
  );
};

export default RevealParagraph;
