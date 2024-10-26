import Container from "@/app/components/layout/Container";
import PageTitleComponent from "@/app/components/typography/PageTitleComponent";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PageTitle`.
 */
export type PageTitleProps = SliceComponentProps<Content.PageTitleSlice>;

/**
 * Component for "PageTitle" Slices.
 */
const PageTitle = ({ slice }: PageTitleProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <PageTitleComponent
          title={slice.primary.title}
          subTitle={slice.primary.sub_title}
        />
      </Container>
    </section>
  );
};

export default PageTitle;
