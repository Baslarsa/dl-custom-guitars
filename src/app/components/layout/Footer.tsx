import Link from "next/link";
import { FooterDocumentData } from "../../../../prismicio-types";
import Container from "./Container";

const navigation = {
  main: [
    { name: "Home", href: "#" },
    { name: "Blog", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: (props: React.ComponentProps<"svg">) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}></svg>
      ),
    },
  ],
};

const Footer = ({ footerData }: { footerData: FooterDocumentData }) => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {footerData.links.map((item) => (
            <Link
              key={item.title}
              // @ts-ignore
              href={item.link.text || item.link.url || ""}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {footerData.social.map((item) => (
            <a
              key={item.title}
              href={item.link.text}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">{item.title}</span>
              <div className="h-6 w-6">
                <img src={item.icon.url || ""} alt={item.title as string} />
              </div>
            </a>
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
