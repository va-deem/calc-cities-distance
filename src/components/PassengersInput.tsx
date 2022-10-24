import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import { FieldValueType } from '../types';
import { MainContext } from '../context/MainContext';

interface PassengersInputProps {
  name: string;
  label: string;
  setFormField: (name: string, value: FieldValueType) => void;
  initialValue: string | null;
}

const PassengersInput = ({
  name,
  label,
  setFormField,
  initialValue,
}: PassengersInputProps) => {
  const [quantity, setQuantity] = React.useState<null | string>('');
  const [error, setError] = useState(false);
  const didMountRef = useRef(false);

  const { addGlobalError, removeGlobalError, errorsCheck } =
    useContext(MainContext);

  useEffect(() => {
    if (initialValue) {
      setQuantity(String(initialValue));
    }
  }, [initialValue]);

  useEffect(() => {
    setFormField(name, Number(quantity));
  }, [quantity]);

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
    console.log('quantity', quantity);
    if ((!quantity || Number(quantity) <= 0) && didMountRef.current) {
      setError(true);
    } else {
      setError(false);
      setFormField(name, Number(quantity));
    }

    didMountRef.current = true;
  }, [quantity, errorsCheck]);

  return (
    <FormControl fullWidth>
      <TextField
        name={name}
        label={label}
        error={error}
        type="string"
        size="small"
        required
        onError={(reason) => {
          setError(!!reason);
        }}
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
    </FormControl>
  );
};

export default PassengersInput;
