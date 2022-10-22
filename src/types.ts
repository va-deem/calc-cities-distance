import { Dayjs } from 'dayjs';

export type PlaceType = [string, number, number];

export type FieldValueType = PlaceType | Dayjs | number | null;

export interface ICityField {
  name: string;
  label: string;
  value: PlaceType | null;
}

export interface FormValues {
  [key: string]: FieldValueType;
}

export interface IContext {
  addGlobalError: (name: string) => void;
  removeGlobalError: (name: string) => void;
  errorsCheck: boolean;
}
