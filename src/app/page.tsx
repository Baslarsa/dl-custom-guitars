"use client";
import { motion, useInView } from "framer-motion";
import HomePageHero from "./components/HomePageHero";
import { useRef } from "react";
import ImageAndText from "./components/ImageAndText";
import { TitleAndText } from "./components/TitleAndText";
import HowTo from "./components/HowTo";
import SectionTitle from "./components/typography/SectionTitle";
import Divider from "./components/Divider";

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <main>
      <HomePageHero />
      <TitleAndText
        title={
          <>
            Uniqueness.
            <br /> Visually and Sonically
          </>
        }
        text={
          <>
            Nothing beats the feeling of playing the right guitar. A guitar that
            looks, feels and sounds like you've always imagined. <br />
            <br />
            By getting yourself a custom guitar, handbuild for your needs, you
            get all that. I strive to provide the best guitar for you, by
            selecting the finest pieces of materials in combination with years
            of experience building guitars.
          </>
        }
      />
      <Divider />
      <div className="w-full flex justify-center">
        <SectionTitle title="The Process" />
      </div>
      <HowTo />
    </main>
  );
}
