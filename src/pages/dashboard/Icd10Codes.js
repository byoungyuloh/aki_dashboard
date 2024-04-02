// ICD9Component.js
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Paper, CircularProgress } from '@mui/material';

const Icd10Codes = ({ icd10Codes, onSelectedIcd10Change }) => {
  
  const [selectedICD10, setSelectedICD10] = useState([]);
  const [showMoreIcd10, setShowMoreIcd10] = useState(false);
  const [visibleIcd10Codes, setVisibleIcd10Codes] = useState([]); 
  const [allIcd10Codes, setAllIcd10Codes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const groupedIcd10Codes = icd10Codes.map((code, index) => ({
    ...code,
    group: index < 10 ? '급성신부전증 주요 진단코드(ICD-10)' : '그 외'
  }));
  useEffect(() => {
    setVisibleIcd10Codes(groupedIcd10Codes.slice(0, 10));
    setAllIcd10Codes(groupedIcd10Codes);
  }, [icd10Codes]); // Depend on icd10Codes to re-run this effect
  useEffect(() => {
    // 선택된 코드가 변경될 때 Main 컴포넌트의 상태 업데이트 함수 호출
    onSelectedIcd10Change(selectedICD10);
  }, [selectedICD10, onSelectedIcd10Change]);
  
  return (
          <Grid>
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                height: '285px', // 스크롤이 생기길 원하는 최대 높이로 설정합니다.
                minHeight: '270px',
                overflow: 'auto', // 컨텐츠가 넘칠 경우 스크롤을 표시합니다.
                padding: '20px',
                flexWrap: 'wrap',
                flexFlow: 'wrap',
                justifyContent: 'center',
              }}
            >
              {icd10Codes.length === 0 ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                multiple
                id="icd-10-autocomplete"
                options={
                  showMoreIcd10
                    ? [...allIcd10Codes, { variable: 'showMore', description: '더보기...' }]
                    : [...visibleIcd10Codes, { variable: 'showMore', description: '더보기...' }]
                }
                isOptionEqualToValue={(option, value) => option.variable === value.variable}
                // getOptionLabel={(option) => option.variable === 'showMore' ? option.description : `${option.variable} - ${option.percentage?.toFixed(12) || 'N/A'}`}
                getOptionLabel={(option) => option.variable === 'showMore' ? option.description : `${option.variable} - ${typeof option.percentage === 'number' ? option.percentage.toFixed(12) : 'N/A'}`}
                value={selectedICD10}
                onChange={(event, newValue) => {
                  const isShowMore = newValue.some(option => option.variable === 'showMore');
                  if (isShowMore) {
                    setShowMoreIcd10(true); // '더보기' 상태를 true로 설정
                    setSelectedICD10(newValue.filter(option => option.variable !== 'showMore')); // '더보기' 옵션 제거
                  } else {
                    setSelectedICD10(newValue);
                  }
                  onSelectedIcd10Change(newValue);
                }}
                groupBy={(option) => {
                  if (option.variable === 'showMore') return ''; // '더보기...' 옵션에 대해선 그룹 미지정
                  return option.group || '급성신부전증 주요 진단코드'; // 나머지 옵션에 대해선 그룹 지정
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="ICD-10 코드 선택" 
                    InputProps={{ 
                      ...params.InputProps, 
                      endAdornment: (
                        <>
                          {loading && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ) 
                    }}
                    InputLabelProps={{ ...params.InputLabelProps, style: { fontSize: '1.15rem' },shrink: true }}
                  />
                )}
                sx={{ width: '100%', '& .MuiAutocomplete-tag': { minHeight: '24px', maxHeight: '24px' } }}
                blurOnSelect="touch"
              />
              )}
            
            </Paper>
          </Grid>

  );
};

export default Icd10Codes;
