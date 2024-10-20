// A 50/50 split between title and text component responsive as one column on mobile and two columns on desktop

import { KeyTextField, RichTextField } from "@prismicio/client";
import Link from "next/link";
import HoverButton from "./buttons/HoverButton";
import Container from "./layout/Container";
import RevealParagraph from "./typography/RevealParagraph";
import SectionTitle from "./typography/SectionTitle";

export const TitleAndTextComponent = ({
  title,
  text,
  ctas,
}: {
  title: KeyTextField;
  text: RichTextField;
  ctas: any;
}) => {
  return (
    <Container>
      <div className="text-white flex py-10 flex-col md:flex-row md:gap-12 gap-4">
        <div className="md:w-2/5 w-full">
          <SectionTitle title={title as string} />
        </div>
        <div className="md:w-3/5 w-full">
          <RevealParagraph text={text} />
          <div className="py-4 flex gap-2 items-center">
            {ctas.map((cta: any, index: number) => (
              <Link key={index} href={cta.link.url}>
                <HoverButton title={cta.button_title} key={index} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
