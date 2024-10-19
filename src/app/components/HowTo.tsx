"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const HowTo = () => {
  return (
    <div className="mb-24">
      <StickyScroll content={content} />
    </div>
  );
};

const content = [
  {
    title: "1. I'll learn about your needs",
    description:
      "We'll schedule a meeting to go over your requirements and your needs. What will you be using the guitar for? Where will it be stored? How will it be played? And how do your dream guitar look? There are many questions you'll need to answer for me to be able to build the best possible guitar for you. \nLet's get started.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/notes.jpg"
          alt="how to 1"
          className="object-cover"
          height={500}
          width={500}
        />
      </div>
    ),
  },
  {
    title: "2. I'll come up with a plan",
    description:
      "Based on your wishes and dreams, I'll start plan your guitar. What materials will we use? How should it look? I'll give you a quote and as soon as we agree on a plan, it'll be ready to build.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/guitar-drawing.png"
          alt="how to 1"
          className="object-cover"
          height={500}
          width={500}
        />
      </div>
    ),
  },
  {
    title: "3. The building starts",
    description:
      "The delicate process of building an acoustic guitar begins. Depending on what the client wants, I'll spend about 100-200 hours building the guitar. The more complex the guitar is, the more hours it will take to finish. As the build progresses, I'll provide you with updates on the progress, and will also document steps from the process which will be delivered with the guitar upon delivery. A nice to have and let's you know everything there is to know about your guitar.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/bracing.jpg"
          alt="how to 1"
          className="object-cover"
          height={500}
          width={500}
        />
      </div>
    ),
  },
  {
    title: "4. Your guitar is done",
    description:
      "The guitar is done and ready for delivery. I'll either ship it or deliver it in person to you if the conditions are appropriate.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/hero-2.jpg"
          alt="how to 1"
          className="object-contain"
          height={500}
          width={500}
        />
      </div>
    ),
  },
  {
    title: "",
    description: "",
    content: <></>,
  },
];

export default HowTo;
