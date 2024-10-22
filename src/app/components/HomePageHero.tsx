"use client";
import {
  Content,
  GroupField,
  ImageField,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import useIsMobile from "../lib/hooks/useIsMobile";
import Container from "./layout/Container";
import { FlipWords } from "@/components/ui/flip-words";
import { Simplify } from "../../../prismicio-types";
import HoverButton from "./buttons/HoverButton";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonGroup, {
  buttonGroupArrayToButtonItems,
} from "./buttons/ButtonGroup";

const HomePageHero = ({
  text,
  description,
  image,
  flipText,
  ctas,
}: {
  text: RichTextField;
  description: KeyTextField;
  flipText: string[];
  image: ImageField;
  ctas: GroupField<Simplify<Content.HeroSliceDefaultPrimaryHeroCtaItem>>;
}) => {
  const buttons = buttonGroupArrayToButtonItems(ctas);
  return (
    <div
      style={{ backgroundPosition: "50% 35%" }}
      className={`w-full h-[80vh] bg-cover relative`}
    >
      <div className="absolute inset-0">
        <PrismicImage
          field={image}
          className="w-full h-full object-cover bg-no-repeat"
          imgixParams={{
            fit: "fill",
            fm: "jpg",
            q: 90,
            auto: ["format", "compress"],
          }}
        />
      </div>
      <div className="-z-5 w-full h-full absolute bg-amber-900/30"></div>
      <Container className="h-full">
        <div className="w-full h-full pt-20 flex justify-center items-center">
          <div className="">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <HeroText
                  text={text}
                  flipText={flipText}
                  description={description}
                />
              </div>
              {ctas && (
                <div>
                  <ButtonGroup buttons={buttons} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const HeroText = ({
  text,
  description,
  flipText,
}: {
  text: RichTextField;
  description: KeyTextField;
  flipText: string[];
}) => {
  const isMobile = useIsMobile();
  const components = {
    heading1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-white text-5xl font-semibold">{children}</h1>
    ),
  };
  return (
    <div
      className={classNames("relative z-1 flex flex-col gap-2 items-center")}
    >
      <FlipWords
        words={flipText || [""]}
        className="text-white text-5xl font-semibold"
      />
      <PrismicRichText field={text} components={components} />
      <p>{description}</p>
    </div>
  );
};

export default HomePageHero;
