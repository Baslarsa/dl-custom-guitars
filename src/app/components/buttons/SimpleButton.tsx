import { Button } from "@headlessui/react";

const SimpleButton = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Button onClick={onClick} className={className}>
      {text}
    </Button>
  );
};

export default SimpleButton;
