import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';
import Combo from './Combo';
import { FieldValueType, ICityField, PlaceType } from '../types';
import TripDatePicker from './TripDatePicker';
import PassengersInput from './PassengersInput';
import processFormData from '../utils/processFormData';
import { MainContext } from '../context/MainContext';

const Main = () => {
  const [formValues, setFormValues] = useState({
    date: null,
    quantity: null,
  });
  const [fields, setFields] = useState<ICityField[]>([
    { name: 'origin', label: 'City of origin', value: null },
    { name: 'destination', label: 'City of destination', value: null },
  ]);
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const [errorsCheck, setErrorsCheck] = useState(false);
  const navigate = useNavigate();
  const didMountRef = useRef(false);

  const contextValue = useMemo(
    () => ({
      addGlobalError: (name: string) => {
        setGlobalErrors((prev) =>
          prev.includes(name) ? prev : prev.concat(name)
        );
      },
      removeGlobalError: (name: string) => {
        const newErrors = globalErrors.filter(
          (errorName) => errorName !== name
        );
        setGlobalErrors(newErrors);
      },
      errorsCheck,
    }),
    [globalErrors, errorsCheck]
  );

  useEffect(() => {
    setErrorsCheck(false);
  }, [globalErrors.length]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setErrorsCheck(true);

    if (globalErrors && globalErrors.length === 0 && didMountRef.current) {
      const processed = processFormData(formValues, fields);

      navigate({
        pathname: '/info',
        search: `?${createSearchParams(processed)}`,
      });
    }
    didMountRef.current = true;
  };

  const handleFormData = (name: string, value: FieldValueType) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCitiesData = (name: string, value: PlaceType | null) => {
    const newFields = fields.map((f) => {
      if (f.name === name) {
        return { ...f, value };
      }
      return f;
    });
    setFields(newFields);
  };

  const handleAddField = () => {
    const targetIdx = fields.length - 1;
    const newItem = {
      name: `city${Date.now()}`,
      label: 'Intermediate city',
      value: null,
    };

    setFields([...fields.slice(0, targetIdx), newItem, fields[targetIdx]]);
  };

  const handleRemoveField = (name: string) => {
    const newFields = fields.filter((f) => f.name !== name);
    setFields(newFields);
    contextValue.removeGlobalError(name);
  };

  const renderPlaceInput = (name: string, label: string, idx: number) => (
    <Fragment key={name}>
      <Grid item xs={12} key={name} mx={0} sx={{ position: 'relative' }}>
        <Combo name={name} label={label} setFormField={handleCitiesData} />
        {idx !== 0 && idx !== fields.length - 1 && (
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveField(name)}
            sx={{ position: 'absolute', left: -24, top: 24 }}
          >
            <HighlightOff />
          </IconButton>
        )}
      </Grid>
    </Fragment>
  );

  return (
    <MainContext.Provider value={contextValue}>
      <Paper elevation={3} sx={{ m: 2, p: 8, width: 400 }}>
        <Typography variant="h5" mb={2}>
          Calculate the distance
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {fields.map((f, idx: number) =>
              renderPlaceInput(f.name, f.label, idx)
            )}
            <Grid item xs={12}>
              <TripDatePicker
                name="date"
                label="Date of the trip"
                setFormField={handleFormData}
              />
            </Grid>
            <Grid item xs={4}>
              <PassengersInput
                name="quantity"
                label="Passengers"
                setFormField={handleFormData}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="text"
                color="primary"
                type="button"
                onClick={handleAddField}
              >
                Add intermediate cities
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!!globalErrors.length}
              >
                Go!
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </MainContext.Provider>
  );
};

export default Main;
