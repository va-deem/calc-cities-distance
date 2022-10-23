import { IOtherFormValues, ICityField } from '../types';

const isFormFilled = (
  formValues: IOtherFormValues,
  cityFields: ICityField[]
) => {
  const values = Object.values(formValues).filter(Boolean).length;
  const cities = cityFields.every((f) => !!f.value);

  return values && cities;
};

export default isFormFilled;
