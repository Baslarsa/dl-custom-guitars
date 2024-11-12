import { useState } from "react";
import { useFormik } from "formik";
import { valueMaxDecimals } from "./utils";
import TextInput from "../typography/TextInput";
import SimpleButton from "../buttons/SimpleButton";
type FretData = {
  fretNumber: number;
  distanceFromPreviousFret: number;
  distanceToNut: number;
};
const calculateFrets = (numOfFrets: number, scaleLength: number) => {
  const fretSpacingFactor = 17.817154;
  const fretSpacings: FretData[] = [];
  let remainingScale = scaleLength;

  for (let i = 0; i < numOfFrets; i++) {
    const fretPosition = remainingScale / fretSpacingFactor;
    remainingScale -= fretPosition;
    const distanceToNut = scaleLength - remainingScale;

    fretSpacings.push({
      fretNumber: i + 1,
      distanceFromPreviousFret: valueMaxDecimals(fretPosition),
      distanceToNut: valueMaxDecimals(distanceToNut),
    });
  }

  return fretSpacings;
};

const FretCalculator = () => {
  // const [scaleLength, setScaleLength] = useState<number | undefined>(635);
  // const [numOfFrets, setNumOfFrets] = useState<number | undefined>(20);
  const [frets, setFrets] = useState<FretData[]>([]);
  // const handleCalculate = () => {
  //   if (!numOfFrets || !scaleLength) return;
  //   setFrets(calculateFrets(numOfFrets, scaleLength));
  // };
  // const handleNumOfFretsChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = Number(event.target.value);
  //   setNumOfFrets(value > 0 ? value : undefined);
  // };
  // const handleScaleLengthChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = Number(event.target.value);

  //   setScaleLength(value > 0 ? value : undefined);
  // };
  const formik = useFormik({
    initialValues: {
      scaleLength: "",
      numOfFrets: "",
    },
    onSubmit: async (values) => {
      const { scaleLength, numOfFrets } = values;
      if (!scaleLength || !numOfFrets) {
        return;
      }

      setFrets(calculateFrets(Number(numOfFrets), Number(scaleLength)));
    },
    validate: (values) => {
      const errors: { scaleLength?: string; numOfFrets?: string } = {};
      if (!values.scaleLength) {
        errors.scaleLength = "Required";
      }
      if (!values.numOfFrets) {
        errors.numOfFrets = "Required";
      }
      return errors;
    },
  });
  return (
    <div className="flex w-full flex-wrap text-white">
      <div className="md:w-1/2 w-full py-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-6 md:w-1/2 w-full">
            <TextInput
              containerClassName="w-full"
              placeHolder="Scale length"
              title="Scale length"
              type="text"
              name="scaleLength"
              id="scaleLength"
              value={formik.values.scaleLength}
              onChange={formik.handleChange}
              error={formik.errors.scaleLength}
            />
            <TextInput
              containerClassName="w-full"
              placeHolder="Number of frets"
              title="Number of frets"
              name="numOfFrets"
              id="numOfFrets"
              type="text"
              value={formik.values.numOfFrets}
              onChange={formik.handleChange}
              error={formik.errors.numOfFrets}
            />
            <SimpleButton text="Calculate" onClick={formik.handleSubmit} />
          </div>
        </form>
      </div>
      <div className="md:w-1/2 w-full">
        <table className="min-w-full divide-y divide-gray-300 bg-white">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                Fret number
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Distance to nut (mm)
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Fret to fret (mm)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {frets.map((fret) => (
              <tr key={fret.fretNumber}>
                <td className="whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900">
                  {fret.fretNumber}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {fret.distanceToNut}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {fret.distanceFromPreviousFret}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pb-8">
        <strong>How It Works</strong>
        <br /> Using the scale length (the distance from the nut to the bridge)
        and the number of frets, the calculator uses a mathematical constant –
        17.817154 – to determine the spacing of each fret.
        <br />
        This constant represents the ratio needed to divide each string interval
        into equal semitones, following a method known as the Rule of 18. Each
        fret position is calculated by dividing the remaining length of the
        string by 17.817154, giving you:
        <br />• Distance from Each Fret to the Nut: The total distance from the
        nut to each fret, ensuring accurate tuning.
        <br />• Distance Between Frets: The spacing between consecutive frets,
        essential for smooth playability.
        <br />
        Why Use This Calculator? <br />
        The Fret Calculator is ideal for those who want precise measurements
        without manual calculations. Whether you’re building a custom guitar or
        replacing frets, this tool provides the accurate data needed for a
        perfectly tuned instrument.
      </div>
    </div>
  );
};

export default FretCalculator;
