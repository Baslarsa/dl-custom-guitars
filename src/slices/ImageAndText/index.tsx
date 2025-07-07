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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white"
    >
      <ImageAndTextComponent
        image={slice.primary.image}
        title={slice.primary.title}
        text={slice.primary.text}
        buttons={slice.primary.ctas}
      />
    </section>
  );
};

export default ImageAndText;
