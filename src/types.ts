import { Dayjs } from 'dayjs';

export type PlaceType = [string, number, number];

export type FieldValueType = Dayjs | number | null;

export interface ICityField {
  name: string;
  label: string;
  value: string | null;
}

export interface IOtherFormValues {
  date: Dayjs | null;
  quantity: string | null;
}

export interface IContext {
  addGlobalError: (name: string) => void;
  removeGlobalError: (name: string) => void;
  errorsCheck: boolean;
}

export interface IDistance {
  from: string;
  to: string;
  distance: number;
}
