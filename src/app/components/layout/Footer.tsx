import { FooterDocumentData } from "../../../../prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";

const Footer = ({ footerData }: { footerData: FooterDocumentData }) => {
  return (
    <footer className="bg-white min-h-[200px]">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {footerData.links.map((item) => (
            <PrismicNextLink
              field={item.link}
              key={item.link.text}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.link.text} {/* Display the text of each link */}
            </PrismicNextLink>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {footerData.social.map((item) => (
            <PrismicNextLink key={item.link.text} field={item.link}>
              <span className="sr-only">{item.link.text}</span>
              <PrismicNextImage
                field={item.icon}
                height={24}
                width={24} // Explicitly set width and height
                className={classNames("h-6 w-6 transition-all")}
              />
            </PrismicNextLink>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-600">
          &copy; 2024 DL Custom Guitars, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
