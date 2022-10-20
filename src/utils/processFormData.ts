import dayjs from 'dayjs';
import { FieldValueType } from '../types';

interface FormValues {
  [key: string]: FieldValueType;
}

const processFormData = (data: FormValues) => {
  const predicate = (el: [string, FieldValueType]): [string, string] => {
    const [name, value] = el;

    if (name === 'origin' || name === 'destination') {
      const cityName = Array.isArray(value) ? value[0] : '';
      return [name, cityName];
    }

    if (name === 'date') {
      const date = dayjs.isDayjs(value) ? value.format('YYYY-MM-DD') : '';
      return [name, date];
    }
    return [name, String(value)];
  };

  return Object.entries(data).map(predicate);
};

export default processFormData;
