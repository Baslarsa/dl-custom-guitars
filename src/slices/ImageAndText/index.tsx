import ImageAndTextComponent from "@/app/components/ImageAndTextComponent";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageAndText`.
 */
export type ImageAndTextProps = SliceComponentProps<Content.ImageAndTextSlice>;

/**
 * Component for "ImageAndText" Slices.
 */
const ImageAndText = ({ slice }: ImageAndTextProps): JSX.Element => {
  return (
    <ImageAndTextComponent
      image={slice.primary.image}
      title={slice.primary.title}
      text={slice.primary.text}
      buttons={slice.primary.ctas}
      inverted={slice.variation === "reverse"}
    />
  );
};

export default ImageAndText;
