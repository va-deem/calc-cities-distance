import React, { useContext, useEffect, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { getCities } from '../services/getCities';
import { MainContext } from '../context/MainContext';

interface ComboProps {
  name: string;
  label: string;
  setFormField: (name: string, value: string | null) => void;
  initialValue: string | null;
}

const Combo = ({ name, label, setFormField, initialValue }: ComboProps) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const didMountRef = useRef(false);

  const { addGlobalError, removeGlobalError, errorsCheck } =
    useContext(MainContext);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (errorsCheck) {
      didMountRef.current = true;
    }
  }, [errorsCheck]);

  useEffect(() => {
    if (inputValue.length > 0) {
      setIsLoading(true);
      getCities(inputValue)
        .then((data) => {
          setOptions(data.map((el) => el[0]));
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [inputValue]);

  useEffect(() => {
    if (value === null && didMountRef.current) {
      setError(new Error('Error'));
      addGlobalError(name);
    } else if (didMountRef.current) {
      removeGlobalError(name);
      setError(null);
      setFormField(name, value);
    }

    didMountRef.current = true;
  }, [value, errorsCheck]);

  return (
    <div>
      <Autocomplete
        loading={isLoading}
        inputValue={inputValue}
        freeSolo
        selectOnFocus
        clearOnBlur
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        onInputChange={(event, v) => setInputValue(v)}
        id={name}
        value={value}
        size="small"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label={label}
            error={!!error}
            helperText={error?.message.includes('fail') && error?.message}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading && inputValue.length && !value ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Combo;
