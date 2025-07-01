"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { RichTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";

const RichText = ({
  text,
  className,
}: {
  text: RichTextField;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  const components = {
    heading1: ({ children }: { children: React.ReactNode }) => (
      <h1 className={classNames("text-5xl font-bold pb-6", className)}>
        {children}
      </h1>
    ),
    heading5: ({ children }: { children: React.ReactNode }) => (
      <h5 className={classNames("text-2xl font-thin pb-6", className)}>
        {children}
      </h5>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold opacity-100">{children}</strong>
    ),
    paragraph: ({ children }: { children: React.ReactNode }) => (
      <p className="text-white opacity-90">{children}</p>
    ),
    image: ({ node }: { node: any }) => (
      <PrismicNextImage
        field={node}
        className="rounded-[10px] my-2 self-start"
      />
    ),
    embed: ({ node }: { node: any }) => (
      <div
        data-oembed={`${node.oembed.embed_url}`}
        data-oembed-type={`${node.oembed.type}`}
        data-oembed-provider={`${node.oembed.provider_name}`}
      >
        {
          <iframe
            width={isMobile ? "100%" : "100%"}
            height={isMobile ? "100%" : "315"}
            className="max-h-[310px] max-w-[600px]"
            src={node.oembed.embed_url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Embedded youtube"
          />
        }
      </div>
    ),
  };
  return <PrismicRichText field={text} components={components} />;
};

export default RichText;
