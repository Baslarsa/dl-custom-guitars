"use client";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { GroupField } from "@prismicio/client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import {
  MenuDocumentDataMenuLinkItem,
  Simplify,
} from "../../../prismicio-types";
import useIsMobile from "../lib/hooks/useIsMobile";
import HoverButton from "./buttons/HoverButton";
import Container from "./layout/Container";
import Instagram from "./layout/Instagram";
import SiteLogo from "./svg_components/SiteLogo";

type MenuItem = {
  name: string;
  href: string;
  subMenu?: {
    name: string;
    href: string;
    src?: string;
  }[];
};

const menuItems: MenuItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Guitars",
    href: "/guitars",
    subMenu: [
      {
        name: "DL-00",
        href: "/guitars/dl-00",
      },
      {
        name: "DL-OM",
        href: "/guitars/dl-om",
      },
    ],
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "contact",
    href: "/contact",
  },
];
const Header = ({
  menuItems,
}: {
  menuItems: GroupField<Simplify<MenuDocumentDataMenuLinkItem>>;
}) => {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    latest > 200 ? setScrolled(true) : setScrolled(false);
  });
  return (
    <div
      className={classNames(
        "text-black transition-all duration-300 flex fixed top-0 w-full z-40",
        scrolled && "bg-white"
      )}
    >
      <Container>
        <div
          className={classNames(
            isMobile ? "px-4 bg-transparent" : "px-8 ",
            "p-2 flex justify-between items-center  rounded-full"
          )}
        >
          <SiteLogo fill={scrolled ? "black" : "white"} className={"w-12"} />
          {!isMobile && <Nav scrolled={scrolled} menuItems={menuItems} />}
          <div className={""}>
            {isMobile ? (
              <HamburgerMenuIcon
                className={classNames(
                  scrolled ? "text-black" : "text-white",
                  "h-12 w-12"
                )}
              />
            ) : (
              <div className="flex gap-4 items-center">
                <Instagram
                  className={classNames(
                    scrolled ? "fill-black" : "fill-white",
                    "h-6 w-6"
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const Nav = ({
  scrolled,
  menuItems,
}: {
  scrolled: boolean;
  menuItems: GroupField<Simplify<MenuDocumentDataMenuLinkItem>>;
}) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
      <Menu setActive={setActive}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            item={item.title as string}
            href={item.link.text}
            active={active}
            setActive={setActive}
            textColor={scrolled ? "text-black" : "text-white"}
          />
        ))}
      </Menu>
    </>
  );
};

export default Header;
