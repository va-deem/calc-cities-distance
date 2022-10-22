import data from '../data/data';

const sleep = (delay = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

const getCities = async () => {
  await sleep(1e3);

  return data;
};

export default getCities;
