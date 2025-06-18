"use client";
import { Content, ImageField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { Gallery, Image } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ProductSliceDefaultPrimaryImageItem } from "../../../prismicio-types";
import SectionTitle from "@/app/components/typography/SectionTitle";
/**
 * Props for `ParallaxImageGrid`.
 */

interface CustomImage extends Image {
  original: string;
}
export type ParallaxImageGridProps =
  SliceComponentProps<Content.ParallaxImageGridSlice>;

/**
 * Component for "ParallaxImageGrid" Slices.
 */

const ParallaxImageGrid = ({ slice }: ParallaxImageGridProps): JSX.Element => {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number, item: any) => setIndex(index);
  console.log(slice.primary.images);

  const images = slice.primary.images.map((item: any) => ({
    src: item.link.url || "",
    original: item.link.url || "",
    height: item.link.height || 0,
    width: item.link.width || 0,
  }));

  const slides = images.map(({ original, width, height }) => ({
    src: original,
    width,
    height,
  }));

  console.log({ images, slides });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-12 bg-black mx-4"
    >
      <div className="flex justify-center">
        <SectionTitle title={slice.primary.title} />
      </div>
      <div>
        <Gallery
          images={images}
          onClick={handleClick}
          enableImageSelection={false}
          rowHeight={400}
          margin={5}
          thumbnailStyle={{
            overflow: "hidden",
            height: "100%",
            borderRadius: 10,
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
        <Lightbox
          slides={slides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
        />
      </div>
    </section>
  );
};

export default ParallaxImageGrid;
