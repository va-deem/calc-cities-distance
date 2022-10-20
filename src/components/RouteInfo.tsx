import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import getPlaces from '../services/getPlaces';
import calcDistance from '../services/calcDistance';
import { PlaceType } from '../types';
import getCitiesOnly from '../utils/getCititesOnly';

interface IDistance {
  from: string;
  to: string;
  distance: number;
}

const RouteInfo = () => {
  const [searchParams] = useSearchParams();
  const [distances, setDistances] = useState<IDistance[] | null>(null);
  const params = Array.from(searchParams.entries());

  const cities = useMemo(() => getCitiesOnly(params), [params]);

  const calculateDistances = async (parameters: [string, string][]) => {
    if (!parameters || parameters.length === 0) throw Error('no params');

    const places = await getPlaces();

    const newDistances = [];
    for (let i = 1; i < cities.length; i += 1) {
      const currentCity = places.find((c) => c[0] === cities[i]);
      const prevCity = places.find((c) => c[0] === cities[i - 1]);
      const [currentCityName, ...currentCityCoords] = currentCity as PlaceType;
      const [prevCityName, ...prevCityCoords] = prevCity as PlaceType;
      const distance = calcDistance(currentCityCoords, prevCityCoords);
      newDistances.push({
        from: prevCityName,
        to: currentCityName,
        distance,
      });
    }
    return newDistances;
  };

  const calculateTotal = (distanceEntries: IDistance[]) =>
    distanceEntries.reduce((acc: number, item) => acc + item.distance, 0);

  useEffect(() => {
    calculateDistances(params).then((data) => {
      if (!distances) {
        setDistances(data);
      }
    });
  }, [params]);

  console.log('DISTANCES', distances);
  return (
    <Paper elevation={3} sx={{ m: 2, p: 4 }}>
      <Box sx={{ minWidth: 400 }}>
        <Typography variant="h5" mb={2}>
          Results
        </Typography>
        <p>Your route: {cities.join(' - ')}</p>
        <p>Date: {dayjs(searchParams.get('date')).format('DD MMMM YYYY')}</p>
        <p>Passengers: {searchParams.get('quantity')}</p>
        <Typography variant="h6" mb={2}>
          Calculations:
        </Typography>
        {distances?.map((d) => (
          <p>
            {d.from} - {d.to}: {d.distance.toFixed(2)} km
          </p>
        ))}
        <p>
          Total distance: {distances && calculateTotal(distances).toFixed(2)}
        </p>
        <Link to="/">Home</Link>
      </Box>
    </Paper>
  );
};

export default RouteInfo;
