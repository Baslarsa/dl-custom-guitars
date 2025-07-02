import { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import RichText from "./typography/RichText";

const ThreeColumnIncentives = ({
  perks,
}: {
  perks: {
    icon: ImageField;
    title: KeyTextField;
    description: RichTextField;
  }[];
}) => {
  return (
    <div className="bg-offBlack text-offWhite">
      <h2 className="sr-only">Our perks</h2>
      <div className="mx-auto max-w-7xl divide-y divide-white/20 lg:flex lg:justify-center lg:divide-x lg:divide-y-0 lg:py-8">
        {perks.map((perk, perkIdx) => (
          <div key={perkIdx} className="py-8 lg:w-1/3 lg:flex-none lg:py-0">
            <div className="mx-auto max-w-sm flex items-center px-4 lg:max-w-none lg:px-8 flex-col">
              <div className="flex items-center justify-center lg:h-24 lg:w-24 h-20 w-20 mb-8">
                <img
                  src={perk.icon.url || ""}
                  alt={perk.title as string}
                  className="h-full w-full"
                />
              </div>
              <div className="ml-4 text-center md:text-left">
                <h3 className="font-medium text-white pb-2">{perk.title}</h3>
                <RichText text={perk.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeColumnIncentives;
