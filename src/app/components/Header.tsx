"use client";
import classNames from "classnames";
import SiteLogo from "./svg_components/SiteLogo";
import Container from "./layout/Container";
import Instagram from "./layout/Instagram";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import useIsMobile from "../lib/hooks/useIsMobile";
import HoverButton from "./buttons/HoverButton";

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
const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className={classNames("text-black flex fixed top-0 w-full z-40")}>
      <Container>
        <div
          className={classNames(
            isMobile ? "px-4 bg-transparent" : "px-8 ",
            "p-2 flex justify-between items-center  rounded-full"
          )}
        >
          <SiteLogo fill={"white"} className={"w-12"} />
          {!isMobile && <Nav />}
          <div className={""}>
            {isMobile ? (
              <HamburgerMenuIcon
                className={classNames("text-white", "h-12 w-12")}
              />
            ) : (
              <div className="flex gap-4 items-center">
                <HoverButton title={"Contact"} />
                <Instagram className="h-6 w-6 fill-white" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const Nav = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
      <Menu setActive={setActive}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item.name}
            active={active}
            setActive={setActive}
          >
            {item.subMenu && (
              <div className="flex flex-col gap-2">
                {item.subMenu.map((subItem) => (
                  <HoveredLink href={subItem.href}>{subItem.name}</HoveredLink>
                ))}
              </div>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Header;
