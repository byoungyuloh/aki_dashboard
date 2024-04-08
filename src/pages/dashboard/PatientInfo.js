import React, { useEffect, useState } from 'react';
import { Box, Grid, ListItem, TextField, Typography, InputAdornment } from '@mui/material';

const PatientInfo = ({ patientInfo, onInfoChange }) => {
  const handleChange = (e, key) => {
    onInfoChange(key, e.target.value);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {Object.entries(patientInfo).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={key}>
          <ListItem>
            <Box textAlign="center" width="100%">
              <Typography variant="subtitle1" component="div" style={{ fontWeight: 'bold' }}>
                {key}
              </Typography>
              <TextField
                variant="outlined"
                value={value}
                onChange={(e) => handleChange(e, key)}
                fullWidth
                InputProps={{
                  endAdornment: key === '키' || key === '몸무게' ? (
                    <InputAdornment position="end" style={{ color: 'grey' }}>
                      {key === '키' ? 'Cm' : 'Kg'}
                    </InputAdornment>
                  ) : null,
                  inputProps: { 
                    style: { textAlign: 'center' },
                  },
                }}
                sx={{ minWidth: 100, maxWidth: 200 }}
              />
            </Box>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientInfo;
