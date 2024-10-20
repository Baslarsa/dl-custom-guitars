"use client";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import useIsMobile from "../lib/hooks/useIsMobile";
import Container from "./layout/Container";

const HomePageHero = ({
  text,
  flipText,
}: {
  text: RichTextField;
  flipText: string[];
}) => {
  return (
    <div
      style={{ backgroundPosition: "50% 35%" }}
      className={`w-full h-[80vh] bg-mainPageHero bg-cover relative`}
    >
      <div className="-z-5 w-full h-full absolute bg-black/60"></div>
      <Container className="h-full">
        <div className="w-full h-full pt-20 flex justify-center items-center">
          <div className="">
            <div>
              <HeroText text={text} flipText={flipText} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const HeroText = ({
  text,
  flipText,
}: {
  text: RichTextField;
  flipText: string[];
}) => {
  console.log(text);
  const isMobile = useIsMobile();
  const components = {
    heading1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-white text-5xl font-semibold">{children}</h1>
    ),
  };
  return (
    <div
      className={classNames(
        isMobile ? "items-center" : "items-start",
        "relative z-1 flex flex-col gap-2"
      )}
    >
      <PrismicRichText field={text} components={components} />
    </div>
  );
};

export default HomePageHero;
