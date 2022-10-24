import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import getCitiesOnly from '../utils/getCititesOnly';
import calculateDistances from '../utils/calculateDistances';
import calculateTotal from '../utils/calculateTotal';
import { IDistance } from '../types';

const RouteInfo = () => {
  const [searchParams] = useSearchParams();
  const [distances, setDistances] = useState<IDistance[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = Array.from(searchParams.entries());

  useEffect(() => {
    setIsLoading(true);
    calculateDistances(params)
      .then((data) => {
        setDistances(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const citiesFromParams = useMemo(() => getCitiesOnly(params), [params]);

  return (
    <Paper elevation={3} sx={{ m: 2, px: 8, py: 4, width: 400 }}>
      <Box
        sx={{ minHeight: 550 }}
        minWidth="400"
        display="flex"
        flexDirection="column"
        justifyItems="space-between"
      >
        <Box>
          <Box mb={4}>
            <h1>Results</h1>
          </Box>
          <p>{`Your route: ${citiesFromParams.join(' - ')}`}</p>
          <p>{`Date: ${dayjs(searchParams.get('date')).format(
            'DD MMMM YYYY'
          )}`}</p>
          <p>{`Passengers: ${searchParams.get('quantity')}`}</p>
          <Typography variant="h6" mb={2}>
            Calculations:
          </Typography>
          {distances?.map((d, idx) => (
            <p key={idx}>{`${d.from} - ${d.to}: ${d.distance} km`}</p>
          ))}
          <div>
            {error && (
              <Box sx={{ color: 'red ' }}>{`Error! ${error.message}`}</Box>
            )}
            {isLoading && (
              <Box>
                <CircularProgress size={16} />
              </Box>
            )}
            {distances && (
              <Typography
                sx={{ fontWeight: 'bold' }}
              >{`Total distance: ${calculateTotal(distances)} km`}</Typography>
            )}
          </div>
        </Box>
        <Box mt="auto">
          <p>
            <Link
              to={`/?${new URLSearchParams(searchParams)}`}
              className="visited-link"
            >
              Back to the last search
            </Link>
          </p>
          <p>
            <Link to="/" className="visited-link">
              Back to start
            </Link>
          </p>
        </Box>
      </Box>
    </Paper>
  );
};

export default RouteInfo;
