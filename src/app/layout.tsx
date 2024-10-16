import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Poppins } from "next/font/google";
import classNames from "classnames";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={classNames(poppins.variable, "bg-black")}>
        <div className="font-poppins font-thin">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
