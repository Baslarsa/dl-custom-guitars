"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { content } from "../content";

export function RecentBuildsCards() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Recently built.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const CardContent = ({ content }: { content: React.ReactNode }) => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return <>{content}</>;
      })}
    </>
  );
};

const data = [
  {
    category: "Guitars",
    title: "DL-00",
    src: "/guitars/portrait/dl-00.jpg",
    content: <CardContent content={content.recentBuildsSection.dl00} />,
  },
  {
    category: "Guitars",
    title: "DL-45",
    src: "/guitars/portrait/dl-45.jpg",
    content: <CardContent content={content.recentBuildsSection.dl45} />,
  },
  {
    category: "Guitars",
    title: "DL-OM",
    src: "/guitars/portrait/dl-om.jpg",
    content: <CardContent content={content.recentBuildsSection.dlOm} />,
  },
];
