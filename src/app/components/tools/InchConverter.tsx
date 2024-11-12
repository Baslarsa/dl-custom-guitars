import { useState } from "react";
import { valueMaxDecimals } from "./utils";
import DefaultSwitch from "../buttons/Switch";
import TextInput from "../typography/TextInput";

const InchConverter = () => {
  const inchInMm = 25.4;
  const [mode, setMode] = useState<"decimal" | "fractional">("decimal");
  const [inches, setInches] = useState<number | undefined>(0);
  const [millimeters, setMillimeters] = useState<number | undefined>(0);
  const [totalFractions, setTotalFractions] = useState<number | undefined>(0);
  const [fractions, setFractions] = useState<number | undefined>(0);
  // Convert inches to millimiters both in decimal and fractional
  const inchesInMm = inches || 0 * inchInMm;

  const handleInchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const mm = value * inchInMm;

    // maximum three decimals
    const roundedMm = valueMaxDecimals(mm);

    const roundedInches = valueMaxDecimals(roundedMm / inchInMm);

    setInches(roundedInches || undefined);
    setMillimeters(roundedMm || undefined);
  };
  const handleMillimeterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    const newInches = Number(value) / inchInMm;
    // maximum three decimals
    const roundedInches = valueMaxDecimals(newInches);

    setMillimeters(value || undefined);
    setInches(roundedInches || undefined);
    setFractions(0);
    setTotalFractions(0);
  };
  const handleTotalFractionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTotalFraction = Number(event.target.value);
    const fractionalInchParts = inchInMm / newTotalFraction;
    const multiplier = fractions;
    const fractialValue = fractionalInchParts * (multiplier || 0);
    const mm = inchesInMm + fractialValue;

    setTotalFractions(Number(event.target.value) || undefined);
    setMillimeters(valueMaxDecimals(mm) || undefined);
  };
  const handleFractionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFractions = Number(event.target.value);
    const fractionalInchParts = inchInMm / (totalFractions || 0);
    const multiplier = newFractions;
    const fractialValue = fractionalInchParts * multiplier;
    const mm = inchesInMm + fractialValue;

    setFractions(Number(newFractions) || undefined);
    setMillimeters(valueMaxDecimals(mm) || undefined);
  };

  const handleModeSwitch = (checked: boolean) => {
    if (checked) {
      setMode("fractional");
    } else {
      setMode("decimal");
    }
  };

  return (
    <div>
      <div className="mt-4 mb-12 flex items-center gap-2 text-white">
        <p>Decimal</p>
        <DefaultSwitch
          enabled={mode === "fractional"}
          onChange={handleModeSwitch}
        />
        <p>Fractional</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="mt-4 font-bold">Inches</p>

        <div className="flex gap-4 items-center">
          <TextInput
            containerClassName="max-w-20"
            type="text"
            title="Inches"
            id="inches"
            name="inches"
            value={inches}
            onChange={handleInchChange}
            placeHolder="Inches"
          />
          {mode === "fractional" && (
            <div className="flex gap-4 items-center">
              <TextInput
                containerClassName="max-w-20"
                type="text"
                title="Fraction"
                id="fraction"
                name="fraction"
                value={fractions}
                onChange={handleFractionChange}
                placeHolder="Fraction"
              />
              /
              <TextInput
                containerClassName="max-w-20"
                type="text"
                id="totalFraction"
                name="totalFraction"
                title="Parts"
                value={totalFractions}
                onChange={handleTotalFractionChange}
                placeHolder="Parts"
              />
            </div>
          )}
        </div>
        <p className="mt-4 font-bold">Millimeters</p>
        <TextInput
          containerClassName="max-w-20"
          type="text"
          title="Mm"
          id="mm"
          name="mm"
          value={millimeters}
          onChange={handleMillimeterChange}
          placeHolder="mm"
        />
      </div>
    </div>
  );
};

export default InchConverter;
