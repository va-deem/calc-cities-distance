import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import getPlaces from '../services/getPlaces';
import calcDistance from '../services/calcDistance';

const RouteInfo = () => {
  const [searchParams] = useSearchParams();
  const [distance, setDistance] = useState<string | null>(null);
  const params = Array.from(searchParams.entries());

  useEffect(() => {
    if (params && params.length) {
      const givenValues = params.map((p) => p[1]);
      getPlaces().then((data) => {
        const given = data.filter((el) => givenValues.includes(el[0]));
        const [, ...firstCoords] = given[0];
        const [, ...secondCoords] = given[1];
        const res = calcDistance(firstCoords, secondCoords);
        setDistance(res.toFixed(2));
      });
    }
  }, [params]);

  return (
    <Paper elevation={3} sx={{ m: 2, p: 4 }}>
      <Box sx={{ minWidth: 400 }}>
        <Typography variant="h5" mb={2}>
          Results
        </Typography>
        {params.map((param) => (
          <p key={param[0]}>
            {param[0]}: {param[1]}
          </p>
        ))}
        <p>Total distance: {distance}</p>
        <Link to="/">Home</Link>
      </Box>
    </Paper>
  );
};

export default RouteInfo;
