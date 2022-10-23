import cities from '../data/data';
import sleep from '../utils/sleep';

export const getCities = async (query: string) => {
  await sleep(1e3);

  if (/fail/i.test(query))
    throw new Error("It's a 'fail' error, please enter a valid city");

  return cities.filter((city) =>
    city[0].toLowerCase().includes(query.toLowerCase())
  );
};

export const getUniqueCity = async (name: string) => {
  await sleep(1e3);

  if (/dijon/i.test(name)) throw Error("'Dijon' is not allowed here");

  return cities.find((city) =>
    city[0].toLowerCase().includes(name.toLowerCase())
  );
};
