import { FooterDocumentData } from "../../../../prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";
import Head from "next/head";

const Footer = ({ footerData }: { footerData: FooterDocumentData }) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DL Custom Guitars",
    description: "Custom-made acoustic guitars handcrafted in Vasa, Finland.",
    url: "https://dlcustomguitars.com",
    openingHours: "Mo-Fr 09:00-17:00",
    image:
      "https://www.dlcustomguitars.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fdlgutars%2FZxeTZYF3NbkBX1Y5_head-dl.jpg%3Fauto%3Dformat%2Ccompress%3Fauto%3Dcompress%2Cformat&w=828&q=75",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "63.06",
      longitude: "21.30",
    },
  };
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </Head>
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
                {item.link.text}
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
                  width={24}
                  className={classNames("h-6 w-6 transition-all")}
                />
              </PrismicNextLink>
            ))}
          </div>
          <p className="mt-10 text-center text-sm/6 text-gray-600">
            &copy; 2024 DL Custom Guitars. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
