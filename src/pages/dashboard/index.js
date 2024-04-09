
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// material-ui
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Typography
} from '@mui/material';

// project import

import MainCard from 'components/MainCard';

// assets
import PatientInfo from './PatientInfo';
import Ioinfo from './Ioinfo';
import Examresult from './Examresult';
import Icd9Codes from './Icd9Codes';
import Icd10Codes from './Icd10Codes';
import Selectedicd9 from './Selectedicd9';
import Selectedicd10 from './Selectedicd10';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const modalStyle = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const patients = [
    { id: 1, name: "홍길동", gender: "남성", height: "170", age: 35, weight: "70", furo_amount: 20, sum_before: 100, base_output: 150,
    albumin: 4.5, bun: 14, calcium: 9.8, creatinine: 1.0, chloride: 110, glucose: 90, hematocrit: '45%', hemoglobin: 15.0, platelet_count: 250000, potassium: 4.2, pt: 12, ptt: 30, sodium: 140 },
    { id: 2, name: "김철수", gender: "남성", height: "180", age: 42, weight: "80", furo_amount: 25, sum_before: 110, base_output: 160,
    albumin: 4.9, bun: 21, calcium: 9.2, creatinine: 0.5, chloride: 90, glucose: 95, hematocrit: '35%', hemoglobin: 13.0, platelet_count: 200000, potassium: 4.0, pt: 10, ptt: 10, sodium: 130 },
    { id: 3, name: "이영희", gender: "여성", height: "160", age: 30, weight: "50", furo_amount: 15, sum_before: 90, base_output: 140,
    albumin: 5.1, bun: 36, calcium: 7.4, creatinine: 0.9, chloride: 120, glucose: 80, hematocrit: '76%', hemoglobin: 17.0, platelet_count: 300000, potassium: 3.1, pt: 5, ptt: 20, sodium: 170},
    { id: 4, name: "박 민", gender: "여성", height: "165", age: 38, weight: "55", furo_amount: 18, sum_before: 95, base_output: 145,
    albumin: 5.6, bun: 5, calcium: 8.2, creatinine: 0.7, chloride: 70, glucose: 110, hematocrit: '55%', hemoglobin: 12.0, platelet_count: 500000, potassium: 5.9, pt: 14, ptt: 40, sodium: 110 },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handlePatientSelect = (id) => {
    setSelectedPatientId(id);
    handleModalClose();
  };

  const reqData = {
    furo_amount: 0,
    sum_before: 0,
    patientweight: 0,
    sex: 0,
    real_age: 0,
    albumin: 0,
    bun: 0,
    calcium: 0,
    creatinine: 0,
    chloride: 0,
    glucose: 0,
    hematocrit: 0,
    hemoglobin: 0,
    platelet_count: 0,
    potassium: 0,
    pt: 0,
    ptt: 0,
    sodium: 0,
    diag_971: 0,
    diag_980: 0,
    diag_982: 0,
    diag_989: 0,
    diag_990: 0,
    diag_991: 0,
    diag_993: 0,
    diag_B16: 0,
    diag_B17: 0,
    diag_B18: 0,
    diag_B19: 0,
    diag_B942: 0,
    diag_C15: 0,
    diag_C18: 0,
    diag_C19: 0,
    diag_C20: 0,
    diag_C22: 0,
    diag_C25: 0,
    diag_C34: 0,
    diag_C50: 0,
    diag_C56: 0,
    diag_C61: 0,
    diag_C82: 0,
    diag_C83: 0,
    diag_C85: 0,
    diag_C91: 0,
    diag_C92: 0,
    diag_C93: 0,
    diag_C94: 0,
    diag_C95: 0,
    diag_D05: 0,
    diag_E10: 0,
    diag_E11: 0,
    diag_E13: 0,
    diag_E830: 0,
    diag_E831: 0,
    diag_G450: 0,
    diag_G453: 0,
    diag_G458: 0,
    diag_G459: 0,
    diag_H341: 0,
    diag_I10: 0,
    diag_I11: 0,
    diag_I12: 0,
    diag_I13: 0,
    diag_I15: 0,
    diag_I21: 0,
    diag_I22: 0,
    diag_I600: 0,
    diag_I601: 0,
    diag_I602: 0,
    diag_I603: 0,
    diag_I604: 0,
    diag_I605: 0,
    diag_I606: 0,
    diag_I607: 0,
    diag_I609: 0,
    diag_I61: 0,
    diag_I62: 0,
    diag_I630: 0,
    diag_I631: 0,
    diag_I632: 0,
    diag_I633: 0,
    diag_I634: 0,
    diag_I635: 0,
    diag_I638: 0,
    diag_I639: 0,
    diag_I700: 0,
    diag_I702: 0,
    diag_I708: 0,
    diag_I709: 0,
    diag_I731: 0,
    diag_I738: 0,
    diag_I739: 0,
    diag_I85: 0,
    diag_K551: 0,
    diag_K70: 0,
    diag_K713: 0,
    diag_K717: 0,
    diag_K721: 0,
    diag_K729: 0,
    diag_K74: 0,
    diag_K753: 0,
    diag_K754: 0,
    diag_K758: 0,
    diag_K759: 0,
    diag_K76: 0,
    diag_N08: 0,
    diag_N18: 0,
    diag_N19: 0,
    diag_N200: 0,
    diag_N201: 0,
    diag_N202: 0,
    diag_N210: 0,
    diag_R160: 0,
    diag_R162: 0,
    diag_R17: 0,
    diag_R18: 0,
    diag_T822: 0,
    diag_Z225: 0,
    diag_Z955: 0
  }
  const [loading, setLoading] = useState(false);
  const [icd9Codes, setIcd9codes] = useState([]);
  const [icd10Codes, setIcd10codes] = useState([]);
  const [selectedIcd10, setSelectedIcd10] = useState([]);
  const [selectedIcd9, setSelectedIcd9] = useState([]);
  const [imageSrc, setImageSrc] = useState(''); // base64 이미지 데이터를 위한 상태
  const resultRef = useRef(null);
  const imageRef = useRef(null);
  const [predictionResult, setPredictionResult] = useState('');
  const [variableImportance, setVariableImportance] = useState([]);

  const getIcdCodes = async () => {
    setLoading(true); // 로딩 시작
  
    try {
      const response = await axios.post('https://amm.kr:443/predict', reqData);
  
      // 2초 대기 후에 상태 업데이트
      setTimeout(() => {
        setLoading(false); // 로딩 종료
        const variableImportance = response.data.variable_importance;
  
        // ICD-9 및 ICD-10 코드 분류
        let icd9Codes = variableImportance.filter(item => 
          item.variable.startsWith('diag_') && !isNaN(item.variable.replace('diag_', ''))
        );
        let icd10Codes = variableImportance.filter(item => 
          item.variable.startsWith('diag_') && isNaN(item.variable.replace('diag_', ''))
        );
  
        setIcd9codes(icd9Codes);
        setIcd10codes(icd10Codes);
      }, 2000); // 2000밀리초 후에 실행됩니다.
      
    } catch (error) {
      // 오류가 발생하더라도 2초간 대기한 후 로딩 상태를 종료
      setTimeout(() => {
        setLoading(false); // 로딩 종료
      }, 2000);
      
      console.error('API 통신 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    getIcdCodes();
  }, []);

  
  const handleIcd9Change = (newIcd9Codes) => {
    setSelectedIcd9(newIcd9Codes);
  };

  const handleIcd10Change = (newIcd10Codes) => {
    setSelectedIcd10(newIcd10Codes);
  };

  const [predictLoading, setPredictLoading] = useState(false);
  const extractNumeric = (str) => {
    const numericPart = str.match(/\d+/g); // 정규 표현식을 사용하여 숫자만 추출
    return numericPart ? parseInt(numericPart.join(''), 10) : 0; // 추출된 숫자를 정수로 변환
  };

  const onClickPredictButton = async () => {
    
    const allDiagCodes = [...icd9Codes, ...icd10Codes].map(code => code.variable);

    

    setPredictLoading(true);

    let api_data = {
      furo_amount: ioInfo['이뇨제 투여량'] || 0,
      sum_before: ioInfo['배뇨량'] || 0,
      patientweight: extractNumeric(patientInfo['몸무게']) || 0,
      sex: patientInfo['gender'] === '남성' ? 1 : 0,
      real_age: patientInfo['나이'] || 0,
      albumin: examResult['albumin'] || 0,
      bun: examResult['bun'] || 0,
      calcium: examResult['calcium'] || 0,
      creatinine: examResult['creatinine'] || 0,
      chloride: examResult['chloride'] || 0,
      glucose: examResult['glucose'] || 0,
      hematocrit: extractNumeric(examResult['hematocrit']) || 0,
      hemoglobin: examResult['hemoglobin'] || 0,
      platelet_count: examResult['platelet_count'] || 0,
      potassium: examResult['potassium'] || 0,
      pt: examResult['pt'] || 0,
      ptt: examResult['ptt'] || 0,
      sodium: examResult['sodium'] || 0,
      ...allDiagCodes.reduce((acc, code) => ({ ...acc, [code]: 0 }), {}) // 모든 진단 코드 필드를 0으로 초기화
    }

    allDiagCodes.forEach(code => {
      api_data[code] = 0;
    });

    const selectedIcd9Codes = selectedIcd9.map(code => 'diag_' + code.code);
    const selectedIcd10Codes = selectedIcd10.map(code => 'diag_' + code.code);    
    [selectedIcd9Codes, selectedIcd10Codes].flat().forEach(code => {
      if (allDiagCodes.includes(code)) {
        api_data[code] = 1; // 선택된 진단 코드의 필드를 1로 설정
      }
    });
    // console.log(patientInfo);
    // console.log(api_data);

    try {
      const response = await axios.post('https://amm.kr:443/predict', api_data);
      
      let percentage = (response.data.probability * 100).toFixed(2);
      setPredictionResult(`${percentage}%`);
      setVariableImportance(response.data.variable_importance);
      
      // response.data.explain_row의 데이터를 이미지 소스로 설정
      const base64Image = response.data.explain_row;
      setImageSrc(`data:image/png;base64,${base64Image}`);
    } catch (error) {
      console.error("Prediction API call failed:", error);
    }
    setPredictLoading(false);
  };

  const onLoadimage = () => {
    if (imageSrc && imageRef.current) {
      // 이미지가 로드되면 해당 위치로 스크롤
      imageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  
  const [selectedPatientInfo, setSelectedPatientInfo] = useState({});

  // 환자 정보 변경 처리 함수
  const handlePatientInfoChange = (updatedInfo) => {
    console.log('Updated info:', updatedInfo);
    setSelectedPatientInfo(updatedInfo); // 선택된 환자 정보 업데이트
  };

  const [exampleData, setExampleData] = useState([]);

  
  const fillData = () => {
    const randomId = Math.floor(Math.random() * 4) + 1;
    setSelectedPatientId(randomId);
  };

  
  const [patientInfo, setPatientInfo] = useState({});
  const [examResult, setExamResult] = useState({});
  const [ioInfo, setIoInfo] = useState({});

  useEffect(() => {
    const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
    const patinfo = selectedPatient ? {
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
    
    const examrslt = selectedPatient ? {
      albumin: selectedPatient.albumin, bun: selectedPatient.bun, calcium: selectedPatient.calcium, 
      creatinine: selectedPatient.creatinine, chloride: selectedPatient.chloride, glucose: selectedPatient.glucose, 
      hematocrit: selectedPatient.hematocrit, hemoglobin: selectedPatient.hemoglobin, platelet_count: selectedPatient.platelet_count, 
      potassium: selectedPatient.potassium, pt: selectedPatient.pt, ptt: selectedPatient.ptt, sodium: selectedPatient.sodium
    } : {
      albumin: '', bun: '', calcium: '', 
      creatinine: '', chloride: '', glucose: '', 
      hematocrit: '', hemoglobin: '', platelet_count: '', 
      potassium: '', pt: '', ptt: '', sodium: ''
    };

    const ioinfo = selectedPatient ? {
      '이뇨제 투여량': selectedPatient.furo_amount,
      '배뇨량': selectedPatient.sum_before,
      '기준 배뇨량': selectedPatient.base_output
    } : {
      '이뇨제 투여량': '',
      '배뇨량': '',
      '기준 배뇨량': ''
    };

    if (selectedPatient) {
      setPatientInfo(patinfo);
      setIoInfo(ioinfo);
      setExamResult(examrslt);
    }
    else {
      setPatientInfo(patinfo);
      setExamResult(examrslt);
      setIoInfo(ioinfo);
    }
  }, [selectedPatientId]);



  

  const handleInfoChange = (type, key, value) => {
    switch (type) {
      case 'patient':
        setPatientInfo(prev => ({ ...prev, [key]: value }));
        break;
      case 'exam':
        setExamResult(prev => ({ ...prev, [key]: value }));
        break;
      case 'io':
        setIoInfo(prev => ({ ...prev, [key]: value }));
        break;
      default:
        break;
    }
  };


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      {/* row 1 */}
      <Grid item xs={12} md={6} lg={6} justifyContent="space-between" alignItems="stretch">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">환자 기본정보</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button size="small" onClick={fillData} color="primary" variant="contained" sx={{mr:2}}>
                  예시 데이터 채우기
              </Button>
              {/* <Button size="small" onClick={handleModalOpen} color="primary" variant="outlined">
                  환자선택
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 100 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            {/* <PatientInfo selectedPatientId={selectedPatientId} patients={patients} /> */}
            <PatientInfo patientInfo={patientInfo} onInfoChange={(key, value) => handleInfoChange('patient', key, value)} />
          </Box>
        </MainCard>
    </Grid>
    {/* 환자 선택 모달 */}
    <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ ...modalStyle, width: { xs: '90%', sm: '80%', md: '800px' } }}>
          <Typography variant="h6" component="h2">환자 선택</Typography>
          <List>
            {patients.map((patient) => (
              <React.Fragment key={patient.id}>
                <ListItem button onClick={() => handlePatientSelect(patient.id)}>
                  <ListItemText
                    primary={`${patient.name} (${patient.gender}, ${patient.age}세)`}
                    secondary={`키: ${patient.height}, 몸무게: ${patient.weight}, 이뇨제 투여량: ${patient.furo_amount}, 이전 6시간 배뇨량 합계: ${patient.sum_before}, base_output: ${patient.base_output}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Modal>
    <Grid item xs={12} md={6} lg={6} justifyContent="space-between" alignItems="stretch">
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">이뇨제 & 배뇨량 정보</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 100 }} content={false}>
          <Box sx={{ pt: 1, pr: 2 }}>
            {/* <Ioinfo selectedPatientId={selectedPatientId} patients={patients} /> */}
            <Ioinfo ioInfo={ioInfo} onInfoChange={(key, value) => handleInfoChange('io', key, value)} />
          </Box>
        </MainCard>
    </Grid>


      {/* row 2 */}
      <Grid item xs={12} md={4} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">검사결과</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* <Examresult selectedPatientId={selectedPatientId} patients={patients} /> */}
          <Examresult examResult={examResult} onInfoChange={(key, value) => handleInfoChange('exam', key, value)} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">ICD-9 Codes</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Icd9Codes icd9Codes={icd9Codes} onSelectedIcd9Change={handleIcd9Change}/>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">ICD-10 Codes</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Icd10Codes icd10Codes={icd10Codes} onSelectedIcd10Change={handleIcd10Change}/>
        </MainCard>
      </Grid>

      {/* row 3 */}
      {selectedIcd9.length === 0 && selectedIcd10.length === 0 ? (
          <>
          <Grid container alignItems="center" justifyContent="center" sx={{mt:5}}>
              <Typography variant="h6" fontWeight="bold" color='#3F4D67'>
              예측에 사용할 진단코드를 선택해주세요.
              </Typography>
          </Grid>
          </>
        )
        :
        (
            <>
            {/* <Grid item xs={12} md={6} lg={6}>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Typography variant="h5">예측에 사용할 ICD-9 진단코드 목록</Typography>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                  <Selectedicd9 selectedIcd9Codes={selectedIcd9}/>
                </MainCard>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Typography variant="h5">예측에 사용할 ICD-10 진단코드 목록</Typography>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
                <MainCard sx={{ mt: 1.75 }}>
                  <Selectedicd10 selectedIcd10Codes={selectedIcd10}/>
                </MainCard>
              </Grid> */}
            </>
        )
      }
      <>
              
              <Grid container alignItems="center" justifyContent="center" mt={3}>
                <Grid item>
                  {predictionResult ? (
                    <Button size="small" onClick={onClickPredictButton} color="primary" variant="outlined">
                      다시 예측하기
                    </Button>
                  ) : (
                    <div style={{ textAlign: 'center' }}> {/* div로 버튼과 메시지를 묶어서 중앙 정렬 */}
                      <Button
                        size="small"
                        onClick={onClickPredictButton}
                        color="primary"
                        variant="outlined"
                        disabled={!selectedPatientId}
                      >
                        선택한 정보로 예측하기
                      </Button>
                      {(!selectedPatientId) && (
                        <Typography variant="caption" display="block" mt={3}>
                          필수 입력정보 ( 환자 기본정보 또는 검사결과가 누락되었습니다. )
                        </Typography>
                      )}
                    </div>
                  )}
                </Grid>
              </Grid>
          </>
      {/* row 4 */}
      <>
          {predictLoading && (
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                    <CircularProgress />
                  </Grid>
          )}
            <Grid item xs={12} sx={{ mt: 6 }}>
              {predictLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                  <CircularProgress />
                </Box>
              ) : predictionResult && (
                <Grid>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>급성 신부전 예측 결과</Typography>
                    </Grid>
                    <Grid item />
                  </Grid>
                  <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                        급성 신부전 발생 확률: {predictionResult}
                      </Typography>
                      {imageSrc && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Explain Visualization"
                            onLoad={onLoadimage}
                            style={{
                              width: '100%',
                              maxWidth: '80%',
                              height: 'auto'
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </MainCard>
                </Grid>
              )}
            </Grid>

          </>
        {/* {selectedIcd9.length === 0 && selectedIcd10.length === 0 ? (
          <>
          </>
        )
        :
        (
          
        )
      } */}
      
    </Grid>
  );
};

export default DashboardDefault;
