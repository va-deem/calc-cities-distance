import React, { useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FieldValueType } from '../types';

interface DatePickerProps {
  name: string;
  label: string;
  setFormField: (name: string, value: FieldValueType) => void;
}

const TripDatePicker = ({ name, label, setFormField }: DatePickerProps) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(
    dayjs().add(1, 'day')
  );

  useEffect(() => {
    setFormField(name, dateValue);
  }, [dateValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        inputFormat="DD.MM.YYYY"
        value={dateValue}
        minDate={dayjs().add(1, 'day')}
        onChange={(newValue: Dayjs | null) => setDateValue(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default TripDatePicker;
