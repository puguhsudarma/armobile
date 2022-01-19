export const getDistance = (coordOne: number[], coordTwo: number[]) => {
  // Compute the difference vector between the two hit locations.
  const dx = coordOne[0] - coordTwo[0];
  const dy = coordOne[1] - coordTwo[1];
  const dz = coordOne[2] - coordTwo[2];

  // // Compute the straight-line distance meters.
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  return distance * 100; // cm
};

export const formatCoordinates = (coords: number[] | null) => {
  if (!coords) {
    return '[0, 0, 0]';
  }

  const newCoords = coords.map(
    num => Math.round((num + Number.EPSILON) * 100) / 100,
  );

  return `[${newCoords.join(', ')}]`;
};
