"use client";
import { FlipWords } from "@/components/ui/flip-words";
import classNames from "classnames";
import useIsMobile from "../lib/hooks/useIsMobile";
import Container from "./layout/Container";

const HomePageHero = ({
  text,
  flipText,
}: {
  text: string;
  flipText: string[];
}) => {
  return (
    <div
      style={{ backgroundPosition: "50% 35%" }}
      className={`w-full h-[90vh] bg-mainPageHero bg-cover relative`}
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

const HeroText = ({ text, flipText }: { text: string; flipText: string[] }) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames(
        isMobile ? "items-center" : "items-start",
        "relative z-1 flex flex-col gap-2"
      )}
    >
      <h1 className="text-white text-5xl font-semibold">
        <FlipWords className="text-white -ml-1 -mt-4" words={flipText} />
      </h1>
      <h1 className="text-white text-5xl font-semibold">{text}</h1>
      <h1 className="text-white text-5xl font-semibold text-center">
        Handmade in Sweden.
      </h1>
    </div>
  );
};

export default HomePageHero;
