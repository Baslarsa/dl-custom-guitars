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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" bg-white text-offBlack"
    >
      <TitleAndTextComponent
        title={slice.primary.title}
        category={slice.primary.category}
        text={slice.primary.section_text}
        ctas={slice.primary.cta}
      />
    </section>
  );
};

export default TitleAndText;
