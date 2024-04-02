// material-ui
import MainCard from 'components/MainCard';
import {
  Box,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DataTable from './Datatable';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import VerticalLinearStepper from './VerticalLinearStepper';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    // height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [selectedRow, setSelectedRow] = useState(null);
  
  const handleRowSelect = (row) => {
    setSelectedRow(row); // 선택된 행 데이터 업데이트
    setOpen(false); // 모달 열기
  };

  const [showPredictionResults, setShowPredictionResults] = useState(false);

  const handlePrediction = () => {
    setShowPredictionResults(true); // 예측 결과를 보이도록 설정
  };
  const handleResetPrediction = () => {
    setShowPredictionResults(false);
  };


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
     
      {/* row 2 */}
      <Grid item xs={12} md={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">환자선택</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 3, width:'200px', alignItems:'center' }}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Button onClick={handleOpen}>Select Patient</Button>
          </Stack>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Patient List
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please Select Patient
                </Typography>
                <DataTable selectRow={handleRowSelect}/>
              </Box>
            </Modal>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">환자 기본정보</Typography>
          </Grid>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          </Typography>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 1 }} content={false}>
          {
            selectedRow === null ?
            (<Box></Box>) :
            (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 2  }}>
                  <TextField
                    label="PatNo"
                    value={selectedRow?.patno}
                    variant="outlined"
                    sx={{ width:'150px',margin: 1 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Name"
                    value={selectedRow?.name}
                    variant="outlined"
                    sx={{ width:'150px',margin: 1 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Age"
                    value={selectedRow?.age}
                    variant="outlined"
                    sx={{ width:'150px',margin: 1 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Sex"
                    value={selectedRow?.sex}
                    variant="outlined"
                    sx={{ width:'150px',margin: 1 }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="MedDate"
                    value={selectedRow?.meddate}
                    variant="outlined"
                    sx={{ width:'150px',margin: 1 }}
                    InputProps={{ readOnly: true }}
                  />

            </Box>      
            )
          }
          </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} sx={{ height:150 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">검사결과</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        {
          selectedRow === null ? 
          (<Box></Box>) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 2  }}>
              <TextField sx={{width:'150px', margin: 1}}label="sbp" value={80} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="dbp" value={110} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="RR" value={68} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="BT" value={36.7} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="Cr" value={0.7} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="T.bil" value={1} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="ALT" value={45} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="AST" value={17} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="CK" value={157} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="INR" value={1.0} variant="outlined" InputProps={{ readOnly: true }} />
              <TextField sx={{width:'150px', margin: 1}}label="Na" value={140} variant="outlined" InputProps={{ readOnly: true }} />
          </Box>
          )
        }
        </MainCard>
      </Grid>
      {/* row 3 */}
      <Grid item xs={12} sx={{ marginTop: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">최적치료경로 예측</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              {/* <Button onClick={handleOpen}>최적치료경로 예측</Button> */}
              {
                  selectedRow === null ?
                  (<Box></Box>)
                  :
                  (<VerticalLinearStepper sx={{ marginLeft: '50px' }} onPredictionClick={handlePrediction} onResetClick={handleResetPrediction} />)
              }
          </Stack>
        </MainCard>
      </Grid>

      <Grid item xs={12} sx={{ marginTop: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h2">예측 결과</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        {
          showPredictionResults === false ?
          (<Box></Box>) :
          (
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="입원 1일 생존율 평균" count="100%" percentage={100} extra="40,420" />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="입원 30일 생존율 평균" count="70%" percentage={30} isLoss color="warning" extra="28,360" />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="입원 50일 생존율 평균" count="56%" percentage={14} isLoss color="warning" extra="22,635" />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="입원 100일 생존율 평균" count="33%" percentage={23} isLoss color="warning" extra="13,340" />
              </Grid>
            </Stack>
          )
        }
        </MainCard>
      </Grid>

    </Grid>
  )
};

export default SamplePage;
