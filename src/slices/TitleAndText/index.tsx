import { TitleAndTextComponent } from "@/app/components/TitleAndText";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TitleAndText`.
 */
export type TitleAndTextProps = SliceComponentProps<Content.TitleAndTextSlice>;

/**
 * Component for "TitleAndText" Slices.
 */
const TitleAndText = ({ slice }: TitleAndTextProps): JSX.Element => {
  return (
    <TitleAndTextComponent
      title={slice.primary.title}
      category={slice.primary.category}
      text={slice.primary.section_text}
      ctas={slice.primary.cta}
    />
  );
};

export default TitleAndText;
