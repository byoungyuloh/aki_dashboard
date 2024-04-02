import React from 'react';
import { Box, Grid, ListItem, ListItemText } from '@mui/material';

const PatientInfo = ({ selectedPatientId, patients }) => {
    const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
    const defaultInfo = {
        이름: '선택되지 않음',
        나이: '선택되지 않음',
        성별: '선택되지 않음',
        키: '선택되지 않음',
        몸무게: '선택되지 않음',
    };
    const filteredInfo = selectedPatient ? {
        이름: selectedPatient.name,
        나이: selectedPatient.age,
        성별: selectedPatient.gender,
        키: selectedPatient.height,
        몸무게: selectedPatient.weight,
      } : defaultInfo;

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
        {Object.entries(filteredInfo).map(([label, value]) => (
            <Grid item xs={12} sm={6} md={2.4} lg={2.4} key={label}>
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

export default PatientInfo;
