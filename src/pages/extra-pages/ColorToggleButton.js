import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ColorToggleButton = ({ index, selectedValues, onValueChange }) => {
  const [alignment, setAlignment] = useState(selectedValues[index] || []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    onValueChange(index, newAlignment);
  };

  return (
    <Box display="flex" flexDirection="column">
      {/* row1 */}
      <Typography variant="subtitle1">항생제</Typography>
      <Box display="flex" flexDirection="row" marginTop={1}>
        <ToggleButtonGroup
          value={alignment}
          onChange={handleChange}
          exclusive
          aria-label={`Platform-${index}`}
        >
          <ToggleButton value="ANTI_B" name={`platform-${index}`}>
          ANTI_B
          </ToggleButton>
          <ToggleButton value="ANTI_F" name={`platform-${index}`}>
          ANTI_F
          </ToggleButton>
          <ToggleButton value="ANTI_V" name={`platform-${index}`}>
          ANTI_V
          </ToggleButton>
          <ToggleButton value="ANTI_T" name={`platform-${index}`}>
          ANTI_T
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {/* row2 */}
      <Typography variant="subtitle1" sx={{mt:2}}>기타약물</Typography>
      <Box display="flex" flexDirection="row" marginTop={1}>
        <ToggleButtonGroup
          value={alignment}
          onChange={handleChange}
          exclusive
          aria-label={`Platform-${index}`}
        >
          <ToggleButton value="Steroid" name={`platform-${index}`}>
          Steroid
          </ToggleButton>
          <ToggleButton value="Albumin" name={`platform-${index}`}>
          Albumin
          </ToggleButton>
          <ToggleButton value="NM_Blocker" name={`platform-${index}`}>
          NM_Blocker
          </ToggleButton>
          <ToggleButton value="Antithrombin" name={`platform-${index}`}>
          Antithrombin
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {/* row3 */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        기타치료
      </Typography>
      <Box display="flex" flexDirection="row" marginTop={1}>
        <ToggleButtonGroup
          value={alignment}
          onChange={handleChange}
          exclusive
          aria-label={`Treatment-${index}`}
        >
          <ToggleButton value="Arterial_SE" name={`treatment-${index}`}>
          Arterial_SE
          </ToggleButton>
          <ToggleButton value="Central_SE" name={`treatment-${index}`}>
          Central_SE
          </ToggleButton>
          <ToggleButton value="ECMO_SE" name={`treatment-${index}`}>
          ECMO_SE
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default ColorToggleButton;
