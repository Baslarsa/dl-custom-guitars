"use client";
import {
  Content,
  GroupField,
  ImageFieldImage,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Simplify } from "../../../prismicio-types";
import ButtonGroup from "./buttons/ButtonGroup";
import Container from "./layout/Container";
import RichText from "./typography/RichText";
const ImageAndTextComponent = ({
  image,
  title,
  text,
  inverted = false,
  buttons,
}: {
  image: ImageFieldImage;
  title: KeyTextField;
  text: RichTextField;
  inverted?: boolean;
  buttons?: GroupField<
    Simplify<Content.ImageAndTextSliceDefaultPrimaryCtasItem>
  >;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Container>
      <div
        className={classNames(
          "w-full h-full flex md:flex-row flex-col-reverse text-offBlack",
          inverted && "md:flex-row-reverse"
        )}
      >
        <div className="md:w-1/2 w-full h-full p-4 relative">
          <PrismicNextImage field={image} />
        </div>
        <div className="md:w-1/2 w-full h-full pt-12 md:px-8 px-4 text-offBlack">
          <motion.h6
            className="text-4xl font-medium pb-6 text-offBlack"
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
            {inverted && "INVERTED"}
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
            <div>
              <RichText text={text} />
              {buttons && (
                <ButtonGroup
                  buttons={buttons.map((button) => button.link)}
                  dark
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default ImageAndTextComponent;
