import "./globals.css";
import Header from "./components/Header";
import { Poppins } from "next/font/google";
import classNames from "classnames";
import { PrismicPreview } from "@prismicio/next";
import config from "../../slicemachine.config.json";
import { createClient } from "@/prismicio";
import Footer from "./components/layout/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const request = await client.getByType("menu");
  const footerRequest = await client.getSingle("footer");
  const menuItems = request.results[0].data.menu_link;
  const footerLinks = footerRequest.data;
  const socialLinks = footerLinks.social;
  return (
    <html lang="en" className="dark">
      <head>
        <script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=dlgutars"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={classNames(poppins.variable, "bg-black")}>
        <div className="font-poppins font-thin">
          <Header menuItems={menuItems} socialLinks={socialLinks} />
          <div className=" md:h-20 h-14"></div>
          {children}
          <PrismicPreview repositoryName={config.repositoryName} />
          <Footer footerData={footerLinks} />
        </div>
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}
    </html>
  );
}
