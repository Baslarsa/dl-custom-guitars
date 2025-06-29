"use client";
import { FlipWords } from "@/components/ui/flip-words";
import {
  Content,
  GroupField,
  ImageField,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import classNames from "classnames";
import { Simplify } from "../../../prismicio-types";

import Container from "./layout/Container";
import RichText from "./typography/RichText";
import ButtonGroup from "./buttons/ButtonGroup";

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
  const buttons = ctas.map((cta) => cta.link);
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
            auto: ["compress", "format"],
            fm: "jpg",
            q: 50,
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
                <div className="relative">
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
  return (
    <div
      className={classNames("relative z-1 flex flex-col gap-2 items-center")}
    >
      <FlipWords
        words={flipText || [""]}
        className="text-white text-5xl font-semibold text-center"
      />
      <RichText text={text} className="text-center" />
      <p className="text-center">{description}</p>
    </div>
  );
};

export default HomePageHero;
