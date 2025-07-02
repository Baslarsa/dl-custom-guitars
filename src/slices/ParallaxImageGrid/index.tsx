"use client";
import SectionTitle from "@/app/components/typography/SectionTitle";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
/**
 * Props for `ParallaxImageGrid`.
 */

export type ParallaxImageGridProps =
  SliceComponentProps<Content.ParallaxImageGridSlice>;

/**
 * Component for "ParallaxImageGrid" Slices.
 */

const ParallaxImageGrid = ({ slice }: ParallaxImageGridProps): JSX.Element => {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number) => setIndex(index);

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

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" bg-white"
    >
      <div className="flex justify-center pt-8 text-offBlack">
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
