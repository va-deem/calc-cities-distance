import { IDistance } from '../types';

const calculateTotal = (distanceEntries: IDistance[]) =>
  distanceEntries.reduce((acc: number, item) => acc + item.distance, 0);

export default calculateTotal;
