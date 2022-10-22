import React, { useContext, useEffect, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import getCities from '../services/getCities';
import { PlaceType } from '../types';
import { MainContext } from '../context/MainContext';

interface ComboProps {
  name: string;
  label: string;
  setFormField: (name: string, value: PlaceType | null) => void;
}

const Combo2 = ({ name, label, setFormField }: ComboProps) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<PlaceType | null>(null);
  const [options, setOptions] = useState<PlaceType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const didMountRef = useRef(false);

  const { addGlobalError, removeGlobalError, errorsCheck } =
    useContext(MainContext);

  useEffect(() => {
    if (errorsCheck) {
      didMountRef.current = true;
    }
  }, [errorsCheck]);

  useEffect(() => {
    setOptions([]);
    if (inputValue.length > 0) {
      setIsLoading(true);
      const fetchData = async () => setOptions(await getCities());
      fetchData().then(() => setIsLoading(false));
    }
  }, [inputValue]);

  useEffect(() => {
    if (value === null && didMountRef.current) {
      setError(true);
      addGlobalError(name);
    } else {
      didMountRef.current && removeGlobalError(name);
      setError(false);
      setFormField(name, value);
    }

    didMountRef.current = true;
  }, [value, errorsCheck]);

  return (
    <div>
      <Autocomplete
        loading={isLoading}
        inputValue={inputValue}
        selectOnFocus
        clearOnBlur
        onChange={(event: any, newValue: PlaceType | null) => {
          setValue(newValue);
        }}
        onInputChange={(event, v) => setInputValue(v)}
        id={name}
        value={value}
        size="small"
        options={options}
        getOptionLabel={(option) => option?.[0] || ''}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label={label}
            error={error}
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

export default Combo2;
