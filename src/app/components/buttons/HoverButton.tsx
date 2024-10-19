import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const HoverButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <HoverBorderGradient
      onClick={onClick}
      duration={0.3}
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
      {title}
    </HoverBorderGradient>
  );
};

export default HoverButton;
