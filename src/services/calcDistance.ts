interface IDistanceData {
  from: string;
  to: string;
  currentCityCoords: number[];
  prevCityCoords: number[];
}

const calcDistance = async ({
  from,
  to,
  currentCityCoords,
  prevCityCoords,
}: IDistanceData) => {
  const [lat1, lon1] = currentCityCoords;
  const [lat2, lon2] = prevCityCoords;

  const sleep = (delay = 0) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay);
    });

  await sleep(1e3);

  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  const lat1R = toRadian(lat1);
  const lat2R = toRadian(lat2);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1R) * Math.cos(lat2R);
  const c = 2 * Math.asin(Math.sqrt(a));

  return { from, to, distance: RADIUS_OF_EARTH_IN_KM * c };
};

export default calcDistance;
