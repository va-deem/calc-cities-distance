import { getUniqueCity } from '../services/getCities';
import calcDistance from '../services/calcDistance';
import getCitiesOnly from './getCititesOnly';

const getDistanceDetails = async (
  currentCityName: string,
  previousCityName: string
) => {
  const origin = await getUniqueCity(previousCityName);
  const destination = await getUniqueCity(currentCityName);

  return calcDistance(origin, destination);
};

const calculateDistances = async (parameters: [string, string][]) => {
  if (!parameters?.length || parameters.some((p) => !p[1]))
    throw Error('Wrong or no parameters are given');

  const citiesFromParams = getCitiesOnly(parameters);

  const newDistances = [];
  for (let i = 1; i < citiesFromParams.length; i += 1) {
    newDistances.push(
      getDistanceDetails(citiesFromParams[i], citiesFromParams[i - 1])
    );
  }
  return Promise.all(newDistances);
};

export default calculateDistances;
