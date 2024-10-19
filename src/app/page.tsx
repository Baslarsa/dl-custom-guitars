"use client";
import { motion, useInView } from "framer-motion";
import HomePageHero from "./components/HomePageHero";
import { useRef } from "react";
import ImageAndText from "./components/ImageAndText";
import { TitleAndText } from "./components/TitleAndText";
import HowTo from "./components/HowTo";
import SectionTitle from "./components/typography/SectionTitle";
import Divider from "./components/Divider";
import { RecentBuildsCards } from "./components/RecentBuildsCard";
import { content } from "./content";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <main className="relative">
      <HomePageHero text={content.hero.text} flipText={content.hero.flipText} />
      <TitleAndText
        title={content.introSection.title}
        text={content.introSection.text}
      />
      <Divider />
      <RecentBuildsCards />
      <Divider />
      <ImageAndText
        imageSrc="/00-body.jpg"
        title={content.recentBuildsSection.title}
        text={content.recentBuildsSection.dl00}
        imageClass="object-contain"
      />
      <Divider />
      <div className="w-full flex justify-center">
        <SectionTitle title={content.howToSection.title} />
      </div>
      <HowTo />
    </main>
  );
}
