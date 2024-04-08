import React from 'react';
import { Box, Grid, ListItem, Typography, TextField, Tooltip } from '@mui/material';

const Ioinfo = ({ ioInfo, onInfoChange }) => {
  const handleChange = (e, key) => {
    onInfoChange(key, e.target.value);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {Object.entries(ioInfo).map(([label, value]) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={label}>
          <ListItem>
            <Box textAlign="center" width="100%" display="flex" justifyContent="center">
              <Box width={200}>
                <Typography variant="subtitle1" component="div" style={{ fontWeight: 'bold' }}>
                  {label}
                </Typography>
                {label === '기준 이뇨량' ? (
                  <Typography variant="body1" style={{ marginTop: 5, textAlign: 'center' }}>
                    {value} ml
                  </Typography>
                ) : label === '배뇨량' ? (
                  <Tooltip title="이전 6시간 배뇨량 합계">
                    <TextField
                      variant="outlined"
                      value={value}
                      onChange={(e) => handleChange(e, label)}
                      fullWidth
                      inputProps={{ style: { textAlign: 'center' } }}
                      sx={{ minWidth: 100 }}
                    />
                  </Tooltip>
                ) : (
                  <TextField
                    variant="outlined"
                    value={value}
                    onChange={(e) => handleChange(e, label)}
                    fullWidth
                    inputProps={{ style: { textAlign: 'center' } }}
                    sx={{ minWidth: 100 }}
                  />
                )}
              </Box>
            </Box>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Ioinfo;
