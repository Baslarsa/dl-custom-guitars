"use client";
import { FlipWords } from "@/components/ui/flip-words";
import Container from "./layout/Container";
import { LampContainer } from "@/components/ui/lamp";
import useIsMobile from "../lib/hooks/useIsMobile";
import classNames from "classnames";
import { Spotlight } from "@/components/ui/spotlight";
import { SparklesCore } from "@/components/ui/sparkles";

const HomePageHero = () => {
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
              <HeroText />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const HeroText = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames(
        isMobile ? "items-center" : "items-start",
        "relative z-1 flex flex-col gap-2"
      )}
    >
      <h1 className="text-white text-5xl font-semibold">
        <FlipWords
          className="text-white -ml-1 -mt-4"
          words={["Premium.", "High-end."]}
        />
      </h1>
      <h1 className="text-white text-5xl font-semibold">Custom guitars.</h1>
      <h1 className="text-white text-5xl font-semibold text-center">
        Handmade in Sweden.
      </h1>
    </div>
  );
};

export default HomePageHero;
