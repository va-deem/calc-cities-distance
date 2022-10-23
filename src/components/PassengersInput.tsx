import React, { useContext, useEffect, useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import { FieldValueType } from '../types';
import { MainContext } from '../context/MainContext';

interface PassengersInputProps {
  name: string;
  label: string;
  setFormField: (name: string, value: FieldValueType) => void;
  initialValue: number | null;
}

const PassengersInput = ({
  name,
  label,
  setFormField,
  initialValue,
}: PassengersInputProps) => {
  const [quantity, setQuantity] = React.useState(1);
  const [error, setError] = useState(false);

  const { addGlobalError, removeGlobalError } = useContext(MainContext);

  useEffect(() => {
    if (initialValue) {
      setQuantity(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    setFormField(name, quantity);
  }, [quantity]);

  useEffect(() => {
    if (error) {
      addGlobalError(name);
    } else {
      removeGlobalError(name);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const value = e.target.value === '' ? 1 : Number(e.target.value);
    if (value === 0) {
      setError(true);
    }
    setQuantity(value);
  };

  const keepNumbers = (e: React.KeyboardEvent) => {
    const hasSymbol = ['e', 'E', '+', '-', '.', ',', ' ', 'Spacebar'].includes(
      e.key
    );
    return hasSymbol && e.preventDefault();
  };

  return (
    <FormControl fullWidth>
      <TextField
        name={name}
        label={label}
        error={error}
        type="number"
        size="small"
        value={quantity}
        onChange={handleChange}
        onKeyDown={keepNumbers}
        inputProps={{ min: 1 }}
      />
    </FormControl>
  );
};

export default PassengersInput;
