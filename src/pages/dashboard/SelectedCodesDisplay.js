import React from 'react';
import { Paper, Typography, Grid, List, ListItem, ListItemText, Chip } from '@mui/material';

const SelectedCodesDisplay = ({ selectedIcd9Codes, selectedIcd10Codes }) => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      {/* ICD9 코드 목록 */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography variant="h6" textAlign={'center'} fontWeight="bold" color='#3F4D67'>
          예측에 사용할 ICD9 진단코드 목록
        </Typography>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minHeight: '100px'
          }}
        >
          {selectedIcd9Codes.map(code => (
            <Chip
              key={code.variable}
              label={`${code.variable} - ${code.percentage?.toFixed(2)}%`}
              sx={{ margin: '5px' }}
            />
          ))}
        </Paper>
      </Grid>
      {/* ICD10 코드 목록 */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography variant="h6" textAlign={'center'} fontWeight="bold" color='#3F4D67'>
          예측에 사용할 ICD10 진단코드 목록
        </Typography>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minHeight: '100px'
          }}
        >
          {selectedIcd10Codes.map(code => (
            <Chip
              key={code.variable}
              label={`${code.variable} - ${code.percentage?.toFixed(2)}%`}
              sx={{ margin: '5px' }}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SelectedCodesDisplay;
