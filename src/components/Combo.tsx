import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import places from '../data/data';
import { PlaceType } from '../types';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...places]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
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
