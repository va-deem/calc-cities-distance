import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react';
import { Box, Button, Grid, IconButton, Paper } from '@mui/material';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';
import dayjs from 'dayjs';
import Combo from './Combo';
import { FieldValueType, IOtherFormValues, ICityField } from '../types';
import TripDatePicker from './TripDatePicker';
import PassengersInput from './PassengersInput';
import processFormData from '../utils/processFormData';
import { MainContext } from '../context/MainContext';
import splitParams from '../utils/splitParams';
import isFormFilled from '../utils/isFormFilled';

const Main = () => {
  const [formValues, setFormValues] = useState<IOtherFormValues>({
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
  const [searchParams] = useSearchParams();
  const params = Array.from(searchParams.entries());

  const addValueToArray = (value: string | null, arr: ICityField[]) => {
    const targetIdx = arr.length - 1;
    const newItem = {
      name: `city${targetIdx}${Date.now()}`,
      label: 'Intermediate city',
      value: value || null,
    };
    return [...arr.slice(0, targetIdx), newItem, arr[targetIdx]];
  };

  useEffect(() => {
    const allFields = splitParams(params);

    // Set other date and quantity values initially
    const res: IOtherFormValues = { date: null, quantity: null };
    res.date = allFields.otherFields.date
      ? dayjs(allFields.otherFields.date)
      : null;
    res.quantity = Number(allFields.otherFields.quantity);
    allFields.otherFields.quantity && setFormValues(res);

    // Set cities values initially
    const origin = allFields.cities.shift();
    const destination = allFields.cities.pop();

    if (origin && destination) {
      let newFields: ICityField[] = fields.map((f) => {
        if (f.name === 'origin' && origin[1] !== undefined) {
          return { ...f, value: origin[1] };
        }
        if (f.name === 'destination' && destination[1] !== undefined) {
          return { ...f, value: destination[1] };
        }
        return f;
      });

      const intermediateCities = allFields.cities;

      if (intermediateCities?.length) {
        intermediateCities.forEach((city) => {
          newFields = addValueToArray(city[1], newFields);
        });
      }
      didMountRef.current = true;
      setFields(newFields);
    }
  }, []);

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

    if (globalErrors.length || !isFormFilled(formValues, fields)) return;

    if (didMountRef.current || isFormFilled(formValues, fields)) {
      const processed = processFormData(formValues, fields);

      navigate({
        pathname: '/info',
        search: `?${createSearchParams(processed)}`,
      });
    }
  };

  const handleOtherData = (name: string, value: FieldValueType) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCitiesData = (name: string, value: string | null) => {
    const newFields = fields.map((f) => {
      if (f.name === name) {
        return { ...f, value };
      }
      return f;
    });
    setFields(newFields);
  };

  const handleRemoveField = (name: string) => {
    const newFields = fields.filter((f) => f.name !== name);
    setFields(newFields);
    contextValue.removeGlobalError(name);
  };

  const handleAddField = (
    value: string | null,
    fieldsArr: ICityField[] = fields
  ) => {
    const newArr = addValueToArray(value, fieldsArr);
    setFields(newArr);
  };

  const renderPlaceInput = (
    name: string,
    label: string,
    initialValue: string | null,
    idx: number
  ) => (
    <Fragment key={name}>
      <Grid item xs={12} key={name} mx={0} sx={{ position: 'relative' }}>
        <Combo
          name={name}
          label={label}
          setFormField={handleCitiesData}
          initialValue={initialValue}
        />
        {idx !== 0 && idx !== fields.length - 1 && (
          <IconButton
            aria-label="delete"
            onClick={() => handleRemoveField(name)}
            id="delete-btn"
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
      <Paper
        elevation={3}
        sx={{
          m: 2,
          px: 8,
          py: 4,
          minWidth: 375,
          maxWidth: 400,
          minHeight: 550,
        }}
      >
        <Box mb={4} px={{ xs: 1, sm: 2, md: 3 }}>
          <h1>Calculate the distance</h1>
        </Box>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {fields.map((f, idx: number) =>
              renderPlaceInput(f.name, f.label, f.value, idx)
            )}
            <Grid item xs={8}>
              <TripDatePicker
                name="date"
                label="Date of the trip"
                setFormField={handleOtherData}
                initialValue={formValues?.date}
              />
            </Grid>
            <Grid item xs={6}>
              <PassengersInput
                name="quantity"
                label="Passengers"
                setFormField={handleOtherData}
                initialValue={formValues?.quantity}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="text"
                color="primary"
                type="button"
                onClick={() => handleAddField(null)}
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
