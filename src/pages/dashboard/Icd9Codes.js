// ICD9Component.js
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid, Paper, CircularProgress } from '@mui/material';

const Icd9Codes = ({ icd9Codes, onSelectedIcd9Change }) => {
  const [allIcdCodes, setAllIcdCodes] = useState([]); // 모든 ICD 코드 목록을 저장할 상태
  const [selectedICD9, setSelectedICD9] = useState([]);
  const [showMoreIcd9, setShowMoreIcd9] = useState(false);
  const [visibleIcd9Codes, setVisibleIcd9Codes] = useState([]); 
  const [allIcd9Codes, setAllIcd9Codes] = useState([]); 
  const [loading, setLoading] = useState(false);

  const groupedIcd9Codes = icd9Codes.map((code, index) => ({
    ...code,
    group: index < 10 ? '급성신부전증 주요 진단코드(ICD-9)' : '그 외'
  }));
  useEffect(() => {
    setVisibleIcd9Codes(groupedIcd9Codes.slice(0, 10));
    setAllIcd9Codes(groupedIcd9Codes);
  }, [icd9Codes]); 
  useEffect(() => {
    onSelectedIcd9Change(selectedICD9);
  }, [selectedICD9, onSelectedIcd9Change]);
  
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
              {icd9Codes.length === 0 ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                multiple
                id="icd-9-autocomplete"
                options={
                  showMoreIcd9
                    ? [...allIcd9Codes, { variable: 'showMore', description: '더보기...' }]
                    : [...visibleIcd9Codes, { variable: 'showMore', description: '더보기...' }]
                }
                isOptionEqualToValue={(option, value) => option.variable === value.variable}
                getOptionLabel={(option) => option.variable === 'showMore' ? option.description : `${option.variable} - ${option.percentage?.toFixed(12) || 'N/A'}`}
                // getOptionLabel={(option) => option.variable === 'showMore' ? option.description : `${option.variable} - ${typeof option.percentage === 'number' ? option.percentage.toFixed(12) : 'N/A'}`}
                // getOptionLabel={(option) => option.variable === 'showMore' ? option.description : `${option.variable} - ${option.percentage ? option.percentage.toFixed(12) : 'N/A'}`}

                value={selectedICD9}
                onChange={(event, newValue) => {
                  const isShowMore = newValue.some(option => option.variable === 'showMore');
                  if (isShowMore) {
                    setShowMoreIcd9(true); // '더보기' 상태를 true로 설정
                    setSelectedICD9(newValue.filter(option => option.variable !== 'showMore')); // '더보기' 옵션 제거
                  } else {
                    setSelectedICD9(newValue);
                  }
                  onSelectedIcd9Change(newValue);
                }}
                groupBy={(option) => {
                  if (option.variable === 'showMore') return ''; // '더보기...' 옵션에 대해선 그룹 미지정
                  return option.group || '급성신부전증 주요 진단코드'; // 나머지 옵션에 대해선 그룹 지정
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="ICD-9 코드 선택" 
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

export default Icd9Codes;
