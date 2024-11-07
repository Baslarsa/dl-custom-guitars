"use client";
import { MenuItem } from "@/components/ui/navbar-menu";
import { GroupField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import classNames from "classnames";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FooterDocumentDataSocialItem,
  MenuDocumentDataMenuLinkItem,
  Simplify,
} from "../../../prismicio-types";
import Container from "./layout/Container";
import SiteLogo from "./svg_components/SiteLogo";
import useIsMobile from "@/hooks/useIsMobile";

const MenuIcon = ({
  onClick,
  className,
  scrolled,
  open,
}: {
  onClick: () => void;
  className?: string;
  scrolled?: boolean;
  open?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "cursor-pointer h-12 w-12 flex flex-col justify-center gap-2",
        className
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "h-1 w-full rounded-full transition-all",
          scrolled ? "bg-black" : "bg-white",
          open ? "rotate-45 transform translate-y-[6px]" : ""
        )}
      ></div>
      <div
        className={classNames(
          "h-1 w-full rounded-full transition-all",
          scrolled ? "bg-black" : "bg-white",
          open ? "-rotate-45 transform -translate-y-[6px]" : ""
        )}
      ></div>
    </div>
  );
};

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
  socialLinks,
}: {
  menuItems: GroupField<Simplify<MenuDocumentDataMenuLinkItem>>;
  socialLinks: GroupField<Simplify<FooterDocumentDataSocialItem>>;
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
        "text-black transition-all duration-300 flex justify-center fixed top-0 w-full z-40 flex-col",
        scrolled ? "bg-white" : "bg-black"
      )}
    >
      <Container>
        <div
          className={classNames(
            isMobile ? "px-4" : "px-8",
            "p-2 flex justify-between items-center rounded-full md:h-20 h-14"
          )}
        >
          <SiteLogo fill={scrolled ? "black" : "white"} className={"w-12"} />
          {!isMobile && <Nav scrolled={scrolled} menuItems={menuItems} />}
          <div className={""}>
            {isMobile ? (
              <MenuIcon
                onClick={handleMobileNavToggle}
                scrolled={scrolled}
                open={mobileNavOpen}
              />
            ) : (
              <div className="flex gap-4 items-center">
                {socialLinks.map((item: FooterDocumentDataSocialItem) => (
                  <PrismicNextLink field={item.link} key={item.link.text}>
                    <PrismicNextImage
                      field={item.icon}
                      height={24}
                      className={classNames(
                        "h-6 w-6 transition-all",
                        scrolled ? "invert-0" : "invert"
                      )}
                    />
                  </PrismicNextLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      <MobileNav
        open={mobileNavOpen}
        menuItems={menuItems}
        onClick={handleMobileNavToggle}
      />
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
  return (
    <div className="flex gap-6">
      {menuItems.map((item) => (
        <PrismicNextLink
          field={item.link}
          key={item.title}
          className={classNames(
            scrolled ? "text-black" : "text-white",
            "hover:opacity-100 opacity-85 transition-all"
          )}
        />
      ))}
    </div>
  );
};

const MobileNav = ({
  open,
  menuItems,
  onClick,
}: {
  open: boolean;
  menuItems: GroupField<Simplify<MenuDocumentDataMenuLinkItem>>;
  onClick: () => void;
}) => {
  const [active, setActive] = useState<string | null>(null);
  const handleClick = () => {
    setActive(null);
    onClick();
  };
  return (
    <div
      className={classNames(
        !open ? "h-0 p-0" : "md:h-[calc(100vh-5rem)] h-[calc(100vh-3.5rem)]",
        "bg-black/90 text-white transition-all duration-300 overflow-hidden w-screen flex flex-col items-center justify-center gap-6"
      )}
    >
      {open &&
        menuItems.map((item) => (
          <PrismicNextLink
            key={item.title}
            field={item.link}
            // @ts-ignore
            onClick={handleClick}
            className="text-2xl"
          />
        ))}
    </div>
  );
};

export default Header;
