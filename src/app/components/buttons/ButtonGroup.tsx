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

const ButtonGroup = ({ buttons }: { buttons: ButtonItem[] | undefined }) => {
  if (!buttons) return null;
  return (
    <div className="my-4 flex gap-2 items-center">
      {buttons?.map((button) => (
        <Link key={button.title} href={button.href || "/"}>
          <HoverButton key={button.title + button.href} title={button.title} />
        </Link>
      ))}
    </div>
  );
};

export default ButtonGroup;
