import HomePageHero from "@/app/components/HomePageHero";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <HomePageHero
        text={slice.primary.hero_text}
        description={slice.primary.hero_description}
        flipText={slice.primary.flip_words?.split(",") || []}
        ctas={slice.primary.hero_cta}
        image={slice.primary.hero_image}
      />
    </section>
  );
};

export default Hero;
