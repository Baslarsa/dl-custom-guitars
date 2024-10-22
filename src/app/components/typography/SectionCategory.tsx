import { KeyTextField } from "@prismicio/client";

const SectionCategory = ({ text }: { text: KeyTextField }) => {
  return <p className="uppercase font-semibold text-white/50">{text}</p>;
};

export default SectionCategory;
