"use client";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { GroupField } from "@prismicio/client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MenuDocumentDataMenuLinkItem,
  Simplify,
} from "../../../prismicio-types";
import useIsMobile from "../lib/hooks/useIsMobile";
import HoverButton from "./buttons/HoverButton";
import Container from "./layout/Container";
import Instagram from "./layout/Instagram";
import SiteLogo from "./svg_components/SiteLogo";
import Link from "next/link";

type MenuItem = {
  name: string;
  href: string;
  subMenu?: {
    name: string;
    href: string;
    src?: string;
  }[];
};

const Header = ({
  menuItems,
}: {
  menuItems: GroupField<Simplify<MenuDocumentDataMenuLinkItem>>;
}) => {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    latest > 50 ? setScrolled(true) : setScrolled(false);
  });
  const handleMobileNavToggle = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileNavOpen]);
  return (
    <div
      className={classNames(
        "text-black transition-all duration-300 flex fixed top-0 w-full z-40 flex-col",
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
                onClick={handleMobileNavToggle}
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
      {mobileNavOpen && (
        <MobileNav menuItems={menuItems} onClick={handleMobileNavToggle} />
      )}
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
            // @ts-ignore
            href={item.link.text || item.link.url || ""}
            active={active}
            setActive={setActive}
            textColor={scrolled ? "text-black" : "text-white"}
          />
        ))}
      </Menu>
    </>
  );
};

const MobileNav = ({
  menuItems,
  onClick,
}: {
  menuItems: GroupField<Simplify<MenuDocumentDataMenuLinkItem>>;
  onClick: () => void;
}) => {
  const [active, setActive] = useState<string | null>(null);
  const handleClick = () => {
    setActive(null);
    onClick();
  };
  return (
    <div className="bg-black/90 text-white p-12 h-[95vh] flex flex-col items-center justify-center gap-6">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          // @ts-ignore
          href={item.link.text || item.link.url || ""}
          onClick={handleClick}
          className="text-2xl"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Header;
