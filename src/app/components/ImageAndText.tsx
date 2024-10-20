import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const ImageAndText = ({
  imageSrc,
  title,
  text,
  imageClass = "object-cover",
  inverted = false,
}: {
  imageSrc: string;
  imageClass?: string;
  title: string | JSX.Element;
  text: string | JSX.Element;
  inverted?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="">
      <div
        className={classNames(
          "w-full h-full flex md:flex-row flex-col-reverse",
          {
            "flex-row-reverse": inverted,
          }
        )}
      >
        <div className="md:w-1/2 w-full h-full p-4">
          <img
            src={imageSrc}
            className={classNames(imageClass, "w-full h-full")}
          />
        </div>
        <div className="md:w-1/2 w-full h-full pt-12 md:px-24 px-4">
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
          <motion.div
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageAndText;
