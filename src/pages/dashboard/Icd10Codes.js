import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid, Paper, CircularProgress } from '@mui/material';
import Papa from 'papaparse';
import csvFile from '../../../src/map/icd_diagname_map.csv';

const Icd10Codes = ({ icd10Codes, onSelectedIcd10Change }) => {
  const [selectedICD10, setSelectedICD10] = useState([]);
  const [showMoreIcd10, setShowMoreIcd10] = useState(false);
  const [csvData, setCsvData] = useState({});
  const [loading, setLoading] = useState(false);
  const [visibleIcd10Codes, setVisibleIcd10Codes] = useState([]);


  useEffect(() => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function (results) {
        const mapping = results.data.reduce((acc, row) => {
          const code = row.icd_code ? row.icd_code.trim() : '';
          const name = row.long_title ? row.long_title.trim() : '';
          acc[code] = name;
          return acc;
        }, {});
        setCsvData(mapping);
      },
    });
  }, []);

  useEffect(() => {
    const generatedOptions = icd10Codes.map((code, index) => {
      const actualCode = code.variable.replace("diag_", ""); // "diag_" 접두사 제거
      const label = `${csvData[actualCode] || "알 수 없는 진단명"} : diag_${actualCode}`; // '진단명 : 코드' 형태로 label 설정
      const group = index < 10 ? '급성신부전증 주요 진단코드(ICD-10)' : '그 외'; // 그룹 설정
      return { label, code: actualCode, group };
    });
  
    const updatedVisibleOptions = showMoreIcd10 
      ? generatedOptions 
      : generatedOptions.slice(0, 10).concat({ label: '더보기...', code: 'showMore', group: '' });
  
    setVisibleIcd10Codes(updatedVisibleOptions); // 업데이트된 옵션을 visibleIcd10Codes 상태에 저장
  }, [csvData, icd10Codes, showMoreIcd10]);
  
  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          height: '285px',
          minHeight: '270px',
          overflow: 'auto',
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
              options={visibleIcd10Codes}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              getOptionLabel={(option) => option.label}
              value={selectedICD10}
              onChange={(event, newValue) => {
                const isShowMore = newValue.some(option => option.code === 'showMore');
                if (isShowMore) {
                  setShowMoreIcd10(true);
                  // '더보기' 옵션을 제외한 나머지 옵션으로 selectedICD10 상태 업데이트
                  setSelectedICD10(newValue.filter(option => option.code !== 'showMore'));
                } else {
                  setSelectedICD10(newValue);
                }
                onSelectedIcd10Change(newValue.filter(option => option.code !== 'showMore'));
              }}
              groupBy={(option) => option.group || '그 외'}
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
                    ),
                  }}
                  InputLabelProps={{ ...params.InputLabelProps, style: { fontSize: '1.15rem' }, shrink: true }}
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
