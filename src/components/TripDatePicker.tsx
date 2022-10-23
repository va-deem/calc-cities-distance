import React, { useContext, useEffect, useRef, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FieldValueType } from '../types';
import { MainContext } from '../context/MainContext';

interface DatePickerProps {
  name: string;
  label: string;
  setFormField: (name: string, value: FieldValueType) => void;
  initialValue: Dayjs | null;
}

const TripDatePicker = ({
  name,
  label,
  setFormField,
  initialValue,
}: DatePickerProps) => {
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);
  const [error, setError] = useState(false);
  const didMountRef = useRef(false);

  const { addGlobalError, removeGlobalError, errorsCheck } =
    useContext(MainContext);

  useEffect(() => {
    if (initialValue) {
      setDateValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (errorsCheck) {
      didMountRef.current = true;
    }
  }, [errorsCheck]);

  useEffect(() => {
    if (error) {
      addGlobalError(name);
    } else if (didMountRef.current) {
      removeGlobalError(name);
    }
  }, [error]);

  useEffect(() => {
    const isInvalid =
      dateValue === null ||
      !dateValue?.isValid() ||
      !dateValue?.isAfter(dayjs());

    if (isInvalid && didMountRef.current) {
      setError(true);
    } else {
      setError(false);
      setFormField(name, dateValue);
    }

    didMountRef.current = true;
  }, [dateValue, errorsCheck]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        inputFormat="DD.MM.YYYY"
        value={dateValue}
        minDate={dayjs().add(1, 'day')}
        onError={(reason) => {
          setError(!!reason);
        }}
        onChange={(newValue: Dayjs | null) => setDateValue(newValue)}
        renderInput={(params) => (
          <TextField {...params} size="small" required error={error} />
        )}
      />
    </LocalizationProvider>
  );
};

export default TripDatePicker;
