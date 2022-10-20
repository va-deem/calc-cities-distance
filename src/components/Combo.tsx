import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { PlaceType } from '../types';
import getPlaces from '../services/getPlaces';

interface ComboProps {
  name: string;
  label: string;
  setFormField: (name: string, value: PlaceType | null) => void;
}

const Combo = ({ name, label, setFormField }: ComboProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<PlaceType[]>([]);
  const [value, setValue] = useState<PlaceType | null>(null);
  const loading = open && options.length === 0;

  useEffect(() => {
    const fetchData = async () => setOptions(await getPlaces());

    if (open) {
      fetchData();
    } else {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    setFormField(name, value);
  }, [value]);

  return (
    <Autocomplete
      id={name}
      options={options}
      sx={{ width: 300 }}
      size="small"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setValue(newValue);
      }}
      isOptionEqualToValue={(option, v) => {
        return option[0] === v[0];
      }}
      getOptionLabel={(option) => option?.[0] || ''}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default Combo;
