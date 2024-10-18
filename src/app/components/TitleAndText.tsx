// A 50/50 split between title and text component responsive as one column on mobile and two columns on desktop

import Container from "./layout/Container";
import RevealParagraph from "./typography/RevealParagraph";
import SectionTitle from "./typography/SectionTitle";

export const TitleAndText = ({
  title,
  text,
}: {
  title: string | JSX.Element;
  text: string | JSX.Element;
}) => {
  return (
    <Container>
      <div className="text-white flex py-10 flex-col md:flex-row">
        <div className="md:w-2/5 w-full">
          <SectionTitle title={title} />
        </div>
        <div className="md:w-3/5 w-full">
          <RevealParagraph text={text} />
        </div>
      </div>
    </Container>
  );
};
