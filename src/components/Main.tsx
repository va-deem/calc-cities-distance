import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Combo from './Combo';
import { FieldValueType } from '../types';
import TripDatePicker from './TripDatePicker';
import PassengersInput from './PassengersInput';
import processFormData from '../utils/processFormData';

const defaultValues = {
  origin: null,
  destination: null,
  date: null,
  quantity: null,
};

const Main = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [isSubmitActive, setSubmitActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasNulls = Object.values(formValues).some((el) => el === null);
    setSubmitActive(!hasNulls);
  }, [formValues]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const processed = processFormData(formValues);

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

  return (
    <Paper elevation={3} sx={{ m: 2, p: 4 }}>
      <Typography variant="h5" mb={2}>
        Calculate the distance
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Combo
              name="origin"
              label="City of origin"
              setFormField={handleFormData}
            />
          </Grid>
          <Grid item xs={12}>
            <Combo
              name="destination"
              label="City of destination"
              setFormField={handleFormData}
            />
          </Grid>
          <Grid item xs={12}>
            <TripDatePicker
              name="date"
              label="Date of the trip"
              setFormField={handleFormData}
            />
          </Grid>
          <Grid item xs={3}>
            <PassengersInput
              name="quantity"
              label="Passengers"
              setFormField={handleFormData}
            />
          </Grid>
          <Grid item xs={12} my={4}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isSubmitActive}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Main;
