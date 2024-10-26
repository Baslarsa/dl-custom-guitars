import { KeyTextField } from "@prismicio/client";

const PageTitleComponent = ({
  title,
  subTitle,
}: {
  title: string | JSX.Element | KeyTextField;
  subTitle: string | JSX.Element | KeyTextField;
}) => {
  return (
    <div className="text-4xl font-medium pb-6 flex justify-center items-center flex-col">
      <h1>{title}</h1>
      <h2 className="text-xl text-white/50">{subTitle}</h2>
    </div>
  );
};

export default PageTitleComponent;
