import React, { Fragment, useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';
import Combo from './Combo';
import { FieldValueType, ICityField, PlaceType } from '../types';
import TripDatePicker from './TripDatePicker';
import PassengersInput from './PassengersInput';
import processFormData from '../utils/processFormData';

const Main = () => {
  const [formValues, setFormValues] = useState({
    date: null,
    quantity: null,
  });
  const [isSubmitActive, setSubmitActive] = useState(false);
  const [fields, setFields] = useState<ICityField[]>([
    { name: 'origin', label: 'City of origin', value: null },
    { name: 'destination', label: 'City of destination', value: null },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const hasNulls =
      Object.values(formValues).some((el) => el === null) ||
      fields.some((f) => f.value === null);
    setSubmitActive(!hasNulls);
  }, [formValues, fields]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const processed = processFormData(formValues, fields);

    navigate({
      pathname: '/info',
      search: `?${createSearchParams(processed)}`,
    });
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
    <Paper elevation={3} sx={{ m: 2, p: 8, width: 400 }}>
      <Typography variant="h5" mb={2}>
        Calculate the distance
      </Typography>
      <form onSubmit={handleSubmit}>
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
              disabled={!isSubmitActive}
            >
              Go!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Main;
