import React from 'react';
import { Box, Chip } from '@mui/material';

const Selectedicd10 = ({ selectedIcd10Codes }) => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        margin: 'auto',
        minHeight: '150px',
        overflowY: 'auto', // 내용이 최소 높이를 초과하면 스크롤 생김
        backgroundColor: '#fff', // 배경색 지정
        border: '1px solid #e0e0e0', // 테두리 추가
        borderRadius: '4px', // 경계 둥글게 처리
      }}
    >
      {selectedIcd10Codes.map(code => (
        <Chip
          key={code.code}
          // label={`${code.variable} - ${code.percentage?.toFixed(12) || 'N/A'}%`}
          label={`${code.label}`}
          sx={{ margin: '5px', minWidth: '150px' }} // Chip의 최소 너비를 150px로 설정
        />
      ))}
    </Box>
  );
};

export default Selectedicd10;
