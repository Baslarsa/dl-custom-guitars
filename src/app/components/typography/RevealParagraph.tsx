import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const RevealParagraph = ({ text }: { text: string | JSX.Element }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.p
      ref={ref}
      className="leading-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.p>
  );
};

export default RevealParagraph;
