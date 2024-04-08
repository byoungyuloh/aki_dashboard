import React, { useEffect, useState } from 'react';
import { Box, Grid, ListItem, TextField } from '@mui/material';

const Examresult = ({ examResult, onInfoChange }) => {
  const handleChange = (e, key) => {
    onInfoChange(key, e.target.value);
  };

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {Object.entries(examResult).map(([label, value]) => (
        <Grid item xs={12} sm={6} md={5} lg={4} xl={3} key={label} mt={1}>
          <ListItem>
            <Box textAlign="center" width="100%">
              <div style={{ display: 'inline-block', width: 'auto', height: 'auto' }}>
                <TextField
                  label={label}
                  variant="outlined"
                  value={value}
                  onChange={(event) => handleChange(event, label)}
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  // fullWidth
                  inputProps={{ style: { textAlign: 'center' } }}
                  sx={{ minWidth: 100 }}
                />
              </div>
            </Box>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Examresult;
