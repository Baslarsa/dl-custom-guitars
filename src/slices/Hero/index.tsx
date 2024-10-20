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
  return <HomePageHero text={slice.primary.hero_text} flipText={[]} />;
};

export default Hero;
