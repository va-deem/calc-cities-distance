import React, { useEffect } from 'react';
import { FormControl, TextField } from '@mui/material';
import { FieldValueType } from '../types';

interface PassengersInputProps {
  name: string;
  label: string;
  setFormField: (name: string, value: FieldValueType) => void;
}

const PassengersInput = ({
  name,
  label,
  setFormField,
}: PassengersInputProps) => {
  const [quantity, setQuantity] = React.useState(1);

  useEffect(() => {
    setFormField(name, quantity);
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 1 : Number(e.target.value);
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
        label={label}
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
