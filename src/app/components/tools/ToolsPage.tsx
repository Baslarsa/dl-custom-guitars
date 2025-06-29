"use client";
import { useState } from "react";
import InchConverter from "./InchConverter";
import FretCalculator from "./FretCalculator";
import DensityCalculator from "./DensityCalculator";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

type Tool = {
  id: number;
  title: string;
  description: string;
  component: JSX.Element;
};

const TOOLS = [
  {
    id: 1,
    title: "Inch Converter",
    description: "Convert inches to millimeters",
    component: <InchConverter />,
  },
  {
    id: 2,
    title: "Guitar Fret Calculator",
    description: "Calculates the fret spacing for guitars",
    component: <FretCalculator />,
  },
  {
    id: 3,
    title: "Density Calculator",
    description: "Calculates the density of a material",
    component: <DensityCalculator />,
  },
];
export default function ToolBox() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <div className="md:px-16 px-8 pb-24">
      <div className="h-10">
        {selectedTool && (
          <div
            className="flex items-center gap-2 w-full cursor-pointer"
            onClick={() => setSelectedTool(null)}
          >
            <div className="h-6 w-6">
              <ArrowLeftIcon height="24" />
            </div>
            <p className="">Tools</p>
          </div>
        )}
        <h1 className="font-bold text-2xl my-4">{selectedTool?.title}</h1>
      </div>
      <div className="py-4">
        <p className="my-6">
          {selectedTool
            ? selectedTool.description
            : "Feel free to use the tools below, they might not be perfect but they help me do my job."}
        </p>
      </div>

      {selectedTool ? (
        selectedTool.component
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.title} tool={tool} onClick={setSelectedTool} />
          ))}
        </div>
      )}
    </div>
  );
}

const ToolCard = ({
  tool,
  onClick,
}: {
  tool: Tool;
  onClick: (tool: Tool) => void;
}) => {
  const handleClick = () => {
    onClick(tool);
  };
  return (
    <div
      className="border p-4 shadow-lg min-h-10 h-full cursor-pointer transform hover:-translate-y-1 transition-transform"
      onClick={handleClick}
    >
      <p className="font-bold">{tool.title}</p>
      <p>{tool.description}</p>
    </div>
  );
};
