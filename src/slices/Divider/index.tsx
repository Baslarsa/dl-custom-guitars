import DividerComponent from "@/app/components/Divider";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Divider`.
 */
export type DividerProps = SliceComponentProps<Content.DividerSlice>;

/**
 * Component for "Divider" Slices.
 */
const Divider = ({ slice }: DividerProps): JSX.Element => {
  return <DividerComponent />;
};

export default Divider;