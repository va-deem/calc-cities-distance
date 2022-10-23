import dayjs from 'dayjs';
import { FieldValueType, IOtherFormValues, ICityField } from '../types';

const processFormData = (
  formValues: IOtherFormValues,
  cityFields: ICityField[]
) => {
  const newFormValues = Object.entries(formValues).map(
    (el: [string, FieldValueType]): [string, string] => {
      const [name, value] = el;

      if (name === 'date') {
        const date = dayjs.isDayjs(value) ? value.format('YYYY-MM-DD') : '';
        return [name, date];
      }
      return [name, String(value)];
    }
  );

  const newCityFields = cityFields.map((f, idx): [string, string] => {
    const name = `city_${idx}`;
    const value = f.value || '';
    return [name, value];
  });

  return newFormValues.concat(newCityFields);
};

export default processFormData;
