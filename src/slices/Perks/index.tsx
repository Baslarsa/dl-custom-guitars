import ThreeColumnIncentives from "@/app/components/ThreeColumnIncentives";
import PageTitleComponent from "@/app/components/typography/PageTitleComponent";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Perks`.
 */
export type PerksProps = SliceComponentProps<Content.PerksSlice>;

/**
 * Component for "Perks" Slices.
 */
const Perks = ({ slice }: PerksProps): JSX.Element => {
  return (
    <section
      className="py-12 bg-white text-offBlack"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PageTitleComponent title={slice.primary.title} subTitle={""} />
      <ThreeColumnIncentives perks={slice.primary.perk} />
    </section>
  );
};

export default Perks;
