import { ContactFormComponent } from "@/app/components/ContactFormComponent";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-12 bg-black"
    >
      <ContactFormComponent
        title={slice.primary.title}
        description={slice.primary.description}
      />
    </section>
  );
};

export default ContactForm;
