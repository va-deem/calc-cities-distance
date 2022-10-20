import { Dayjs } from 'dayjs';

export type PlaceType = [string, number, number];

export type FieldValueType = PlaceType | Dayjs | number | null;
