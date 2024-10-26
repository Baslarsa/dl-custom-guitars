import Container from "@/app/components/layout/Container";
import SectionTitle from "@/app/components/typography/SectionTitle";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ParallaxImageGrid`.
 */
export type ParallaxImageGridProps =
  SliceComponentProps<Content.ParallaxImageGridSlice>;

/**
 * Component for "ParallaxImageGrid" Slices.
 */
const ParallaxImageGrid = ({ slice }: ParallaxImageGridProps): JSX.Element => {
  const images: string[] = slice.primary.images
    // @ts-ignore
    .map((image) => image.link.url)
    .filter(Boolean);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-12 bg-black"
    >
      <Container>
        <div className="flex justify-center">
          <SectionTitle title={slice.primary.title} />
        </div>
        <div className="flex justify-center">
          {images && <ParallaxScroll images={images} />}
        </div>
      </Container>
    </section>
  );
};

export default ParallaxImageGrid;
