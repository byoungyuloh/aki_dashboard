import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ColorToggleButton from './ColorToggleButton';

const steps = [
  {
    label: '1차치료',
  },
  {
    label: '2차치료',
  },
  {
    label: '3차치료',
  },
  {
    label: '4차치료',
  },
  {
    label: '5차치료',
  },
];

const VerticalLinearStepper = ({ onPredictionClick, onResetClick }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedValues([]);
    onResetClick(); // Call the reset function from the parent component
  };

  const handlePrediction = () => {
    console.log('예측버튼');
    onPredictionClick(); // Notify parent component about the prediction button click
  };

  const handleValueChange = (index, newValues) => {
    setSelectedValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = newValues;
      return updatedValues;
    });
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2, mr: 10 }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label} - {selectedValues[index]}
            </StepLabel>
            <StepContent>
              <ColorToggleButton
                index={index}
                selectedValues={selectedValues}
                onValueChange={handleValueChange}
              />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, mr: 1 }}
                  >
                    {index === steps.length - 1 ? '예측' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>모든 치료경로를 선택하셨습니다.</Typography>
          <Typography>다시 선택하거나 예측 할 수 있습니다.</Typography>
          <Button onClick={handlePrediction} sx={{ mt: 1, mr: 1 }}>
            예측
          </Button>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default VerticalLinearStepper;
