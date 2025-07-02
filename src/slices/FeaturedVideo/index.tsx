"use client";
import RichText from "@/app/components/typography/RichText";
import SectionTitle from "@/app/components/typography/SectionTitle";
import useIsMobile from "@/hooks/useIsMobile";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeaturedVideo`.
 */
export type FeaturedVideoProps =
  SliceComponentProps<Content.FeaturedVideoSlice>;

/**
 * Component for "FeaturedVideo" Slices.
 */
const FeaturedVideo = ({ slice }: FeaturedVideoProps): JSX.Element => {
  const isMobile = useIsMobile();
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 bg-offBlack"
    >
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center text-center">
          <SectionTitle title={slice.primary.title} />

          <RichText text={slice.primary.description} />
        </div>
        <div
          className="h-full w-full flex items-center justify-center pt-12"
          data-oembed={`${slice.primary.video_url}`}
          data-oembed-type={`video`}
          data-oembed-provider={"YouTube"}
        >
          {
            <iframe
              width={isMobile ? "100%" : "700px"}
              height={isMobile ? "300px" : "410px"}
              className="max-h-[410px] max-w-[700px]"
              src={slice.primary.video_url || ""}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Embedded youtube"
            />
          }
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
