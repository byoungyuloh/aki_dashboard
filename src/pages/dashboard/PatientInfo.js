import React, { useEffect, useState } from 'react';
import { Box, Grid, ListItem, TextField, Typography, InputAdornment } from '@mui/material';

const PatientInfo = ({ selectedPatientId, patients }) => {
  const [patientInfo, setPatientInfo] = useState({
    이름: '',
    나이: '',
    성별: '',
    키: '',
    몸무게: '',
  });

  useEffect(() => {
    const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
    const info = selectedPatient ? {
      이름: selectedPatient.name,
      나이: selectedPatient.age,
      성별: selectedPatient.gender,
      키: selectedPatient.height, // 단위 제외하고 숫자만 저장
      몸무게: selectedPatient.weight, // 단위 제외하고 숫자만 저장
    } : {
      이름: '',
      나이: '',
      성별: '',
      키: '',
      몸무게: '',
    };

    setPatientInfo(info);
  }, [selectedPatientId, patients]);

  const handleChange = (e, key) => {
    setPatientInfo({
      ...patientInfo,
      [key]: e.target.value,
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {Object.entries(patientInfo).map(([key, value]) => (
        <Grid item xs={12} sm={6} md={2.4} lg={2.4} key={key}>
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
                }}
              />
            </Box>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientInfo;
