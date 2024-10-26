import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import RevealParagraph from "./RevealParagraph";
import Link from "next/link";

const RichText = ({ text }: { text: RichTextField }) => {
  console.log(text);
  const components = {
    heading1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-white text-5xl font-semibold">{children}</h1>
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
            width="500"
            height="313"
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
