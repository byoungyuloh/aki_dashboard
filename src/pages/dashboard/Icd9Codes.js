// ICD9Component.js
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid, Paper, CircularProgress } from '@mui/material';
import Papa from 'papaparse';
import csvFile from '../../../src/map/icd_diagname_map.csv';

const Icd9Codes = ({ icd9Codes, onSelectedIcd9Change }) => {
  const [allIcdCodes, setAllIcdCodes] = useState([]); // 모든 ICD 코드 목록을 저장할 상태
  const [selectedICD9, setSelectedICD9] = useState([]);
  const [showMoreIcd9, setShowMoreIcd9] = useState(false);
  const [visibleIcd9Codes, setVisibleIcd9Codes] = useState([]); 
  const [allIcd9Codes, setAllIcd9Codes] = useState([]); 
  const [loading, setLoading] = useState(false);

  const [csvData, setCsvData] = useState([]);


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
        setCsvData(mapping);  // 파싱된 데이터를 상태에 저장
      },
    });
  }, []);

  useEffect(() => {
    const newOptions = Object.entries(csvData).map(([code, name]) => ({
      label: `${name} : ${code}`,
      code
    }));
    setAllIcdCodes(newOptions);  // Autocomplete에 사용될 options 상태 업데이트
  }, [csvData]);
  
  useEffect(() => {
    const options = icd9Codes.map(({ variable }) => {
      const codeWithoutPrefix = variable.replace("diag_", "");  // "diag_" 접두사 제거
      const name = csvData[codeWithoutPrefix] || "알 수 없는 진단명";  // csvData에서 진단명을 찾습니다
      // label에서는 'diag_' 접두사를 포함시키고, code에서는 제외합니다.
      return { label: `${name} : diag_${codeWithoutPrefix}`, code: codeWithoutPrefix }; 
    });
    setAllIcdCodes(options);  // 구성된 옵션 객체 배열을 allIcdCodes 상태에 저장합니다
  }, [csvData, icd9Codes]);
  
  

  
    // CSV 파일을 파싱하여 매핑 객체를 생성하는 함수
  const parseCsv = (csvFileUrl, callback) => {
    Papa.parse(csvFileUrl, {
      header: true,
      download: true,
      complete: (results) => {
        const mapping = {};
        results.data.forEach((row) => {
          // icd_code와 long_title 값이 있는지 확인 후 trim 처리
          const code = row.icd_code ? row.icd_code.trim() : '';
          const name = row.long_title ? row.long_title.trim() : '';
          mapping[code] = name;
        });
        callback(mapping);
      }
    });
  };


  // CSV 파일에서 매핑 데이터를 가져오는 예시
  parseCsv(csvFile, (mapping) => {
    // 이곳에서 mapping 객체를 사용할 수 있습니다.
  });
  
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
                    options={allIcdCodes}
                    getOptionLabel={(option) => option.label}
                    // isOptionEqualToValue={(option, value) => option.code === value}
                    isOptionEqualToValue={(option, value) => option.code === value.code}
                    value={selectedICD9}
                    onChange={(event, newValue) => {
                        setSelectedICD9(newValue);
                        onSelectedIcd9Change(newValue.filter(option => option.code !== 'showMore'));
                    }}
                    groupBy={(option) => {
                        if (option.variable === 'showMore') return '';
                        return option.group || '급성신부전증 주요 진단코드';
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

export default Icd9Codes;
