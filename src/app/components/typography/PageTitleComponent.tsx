import { KeyTextField, RichTextField } from "@prismicio/client";
import RevealParagraph from "./RevealParagraph";

const PageTitleComponent = ({
  title,
  subTitle,
  richText,
}: {
  title: string | JSX.Element | KeyTextField;
  subTitle?: string | JSX.Element | KeyTextField;
  richText?: RichTextField;
}) => {
  return (
    <div className="font-medium pb-6 flex justify-center items-center flex-col text-center leading-loose">
      <h1 className="text-4xl">{title}</h1>
      {subTitle && <h2 className="text-white/50">{subTitle}</h2>}
      {richText && <RevealParagraph text={richText} />}
    </div>
  );
};

export default PageTitleComponent;
