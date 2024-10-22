// A 50/50 split between title and text component responsive as one column on mobile and two columns on desktop

import { KeyTextField, RichTextField } from "@prismicio/client";
import Link from "next/link";
import HoverButton from "./buttons/HoverButton";
import Container from "./layout/Container";
import RevealParagraph from "./typography/RevealParagraph";
import SectionTitle from "./typography/SectionTitle";
import SectionCategory from "./typography/SectionCategory";
import ButtonGroup, {
  buttonGroupArrayToButtonItems,
} from "./buttons/ButtonGroup";

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
  const buttons = buttonGroupArrayToButtonItems(ctas);
  return (
    <Container>
      <div className="text-white flex py-10 flex-col md:flex-row">
        <div className="md:w-1/2 w-full pr-8">
          <SectionCategory text={category} />
          <SectionTitle title={title as string} />
        </div>
        <div className="md:w-1/2 w-full md:px-8 px-4">
          <RevealParagraph text={text} />
          {ctas && <ButtonGroup buttons={buttons} />}
        </div>
      </div>
    </Container>
  );
};
