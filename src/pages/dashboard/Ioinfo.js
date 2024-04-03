import React, { useState, useEffect } from 'react';
import { Box, Grid, ListItem, Typography, TextField } from '@mui/material';

const Ioinfo = ({ selectedPatientId, patients }) => {
  const [patientInfo, setPatientInfo] = useState({
    '이뇨제 투여량': '',
    '이전 6시간 배뇨량 합계': '',
    '기준 이뇨량': ''
  });

  useEffect(() => {
    const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
    const info = selectedPatient ? {
      '이뇨제 투여량': selectedPatient.furo_amount,
      '이전 6시간 배뇨량 합계': selectedPatient.sum_before,
      '기준 이뇨량': selectedPatient.base_output
    } : {
      '이뇨제 투여량': '',
      '이전 6시간 배뇨량 합계': '',
      '기준 이뇨량': ''
    };

    setPatientInfo(info);
  }, [selectedPatientId, patients]);

    // 필드 변경 핸들러
    const handleChange = (e, key) => {
      setPatientInfo({
        ...patientInfo,
        [key]: e.target.value,
      });
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            {Object.entries(patientInfo).map(([label, value]) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={label}>
                    <ListItem>
                        <Box textAlign="center" width="100%" display="flex" justifyContent="center">
                            <Box width={200}> {/* 이 부분을 조절하여 텍스트 필드의 너비를 정할 수 있습니다. */}
                                <Typography variant="subtitle1" component="div" style={{ fontWeight: 'bold' }}>
                                    {label}
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    value={value}
                                    onChange={(e) => handleChange(e, label)}
                                    fullWidth
                                />
                            </Box>
                        </Box>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    );
};

export default Ioinfo;
