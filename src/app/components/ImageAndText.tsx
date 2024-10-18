import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const ImageAndText = ({
  imageSrc,
  title,
  text,
}: {
  imageSrc: string;
  title: string | JSX.Element;
  text: string | JSX.Element;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="h-[70vh]">
      <div className="w-full h-full flex flex-wrap">
        <div className="w-1/2 h-full p-4">
          <img src={imageSrc} className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 h-full pt-12 px-24">
          <motion.h6
            className="text-4xl font-medium pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            viewport={{ once: true, amount: "all" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            {title}
          </motion.h6>
          <motion.p
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default ImageAndText;
