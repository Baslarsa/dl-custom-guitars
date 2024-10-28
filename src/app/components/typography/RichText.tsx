"use client";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

const RichText = ({
  text,
  className,
}: {
  text: RichTextField;
  className?: string;
}) => {
  const components = {
    heading1: ({ children }: { children: React.ReactNode }) => (
      <h1 className={classNames("text-5xl font-bold pb-6", className)}>
        {children}
      </h1>
    ),
    paragraph: ({ children }: { children: React.ReactNode }) => (
      <p className="text-white">{children}</p>
    ),
    embed: ({ node }: { node: any }) => (
      <div
        data-oembed={`${node.oembed.embed_url}`}
        data-oembed-type={`${node.oembed.type}`}
        data-oembed-provider={`${node.oembed.provider_name}`}
      >
        {
          <iframe
            width={isMobile ? "100%" : "560"}
            height={isMobile ? "100%" : "315"}
            src="https://www.youtube.com/embed/sG0MigLe7-o?feature=oembed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="DL Custom Guitars - DL-45 Indian rosewood &amp; European Spruce"
          ></iframe>
        }
      </div>
    ),
  };
  return <PrismicRichText field={text} components={components} />;
};

export default RichText;
