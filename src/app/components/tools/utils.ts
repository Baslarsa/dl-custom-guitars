export function calculateDensity(
  massInGrams: string,
  lengthInMm: string,
  widthInMm: string,
  heightInMm: string
): number {
  // Convert mass from grams to kilograms
  const massInKg = Number(massInGrams) / 1000;

  // Convert dimensions from millimeters to meters
  const lengthInMeters = Number(lengthInMm) / 1000;
  const widthInMeters = Number(widthInMm) / 1000;
  const heightInMeters = Number(heightInMm) / 1000;

  // Calculate volume in cubic meters (m³)
  const volumeInCubicMeters = lengthInMeters * widthInMeters * heightInMeters;

  // Calculate density (kg/m³)
  const density = massInKg / volumeInCubicMeters;

  return density;
}

export const valueMaxDecimals = (value: number, decimals: number = 3) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};
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
