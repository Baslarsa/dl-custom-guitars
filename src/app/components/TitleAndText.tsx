"use client";
import { KeyTextField, RichTextField } from "@prismicio/client";
import ButtonGroup from "./buttons/ButtonGroup";
import Container from "./layout/Container";
import RevealParagraph from "./typography/RevealParagraph";
import SectionCategory from "./typography/SectionCategory";
import SectionTitle from "./typography/SectionTitle";

export const TitleAndTextComponent = ({
  title,
  text,
  category,
  ctas,
}: {
  title: KeyTextField;
  category: KeyTextField;
  text: RichTextField;
  ctas: any;
}) => {
  return (
    <Container>
      <div className=" flex py-10 flex-col md:flex-row">
        <div className="md:w-1/2 w-full md:pr-8 text-center md:text-left">
          <SectionCategory text={category} />
          <SectionTitle title={title as string} />
        </div>
        <div className="md:w-1/2 w-full md:px-8 px-4 text-center md:text-left">
          <RevealParagraph text={text} />
          {ctas && (
            <ButtonGroup
              buttons={ctas.map((button: any) => button.link)}
              dark
            />
          )}
        </div>
      </div>
    </Container>
  );
};
