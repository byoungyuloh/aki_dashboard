import React from 'react';
import { Box, Grid, ListItem, ListItemText } from '@mui/material';

const Ioinfo = ({ selectedPatientId, patients }) => {
    const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
    const defaultInfo = {
        '이뇨제 투여량': '선택되지 않음',
        '이전 6시간 배뇨량 합계': '선택되지 않음',
        '기준 이뇨량': '선택되지 않음'
    };
    const filteredInfo = selectedPatient ? {
        '이뇨제 투여량': selectedPatient.furo_amount,
        '이전 6시간 배뇨량 합계': selectedPatient.sum_before,
        '기준 이뇨량': selectedPatient.base_output
    } : defaultInfo;

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {Object.entries(filteredInfo).map(([label, value]) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={label}>
          <ListItem>
            <Box textAlign="center" width="100%">
              <ListItemText
                primary={label}
                secondary={value}
                primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
                secondaryTypographyProps={{ variant: 'body1' }}
              />
            </Box>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Ioinfo;
