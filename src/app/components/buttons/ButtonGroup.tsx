"use client";
import { Content, GroupField, LinkField } from "@prismicio/client";
import { Simplify } from "../../../../prismicio-types";
import Link from "next/link";
import HoverButton from "./HoverButton";

type ButtonLinkItem =
  | Content.HeroSliceDefaultPrimaryHeroCtaItem
  | Content.ImageAndTextSliceDefaultPrimaryCtasItem
  | Content.TitleAndTextSliceDefaultPrimaryCtaItem;
export type SimplifiedLinkItems = Simplify<
  ButtonLinkItem & { link: LinkField & { url?: string; text?: string } }
>;
export type ButtonGroupArray = GroupField<SimplifiedLinkItems>;

type ButtonItem = {
  title: string;
  href: string;
};
export const buttonGroupArrayToButtonItems = (
  items: ButtonGroupArray
): ButtonItem[] | [] => {
  if (!items) return [];
  return items.map((item) => ({
    title: item.title as string,
    href: item.link.text || item.link.url || "",
  }));
};

const ButtonGroup = ({
  buttons,
  dark,
}: {
  buttons: ButtonItem[] | undefined;
  dark?: boolean;
}) => {
  if (!buttons) return null;
  return (
    <div className="my-4 flex gap-2 items-center">
      {buttons?.map((button) => (
        <HoverButton
          key={button.title + button.href}
          title={button.title}
          href={button.href}
          dark={dark}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
