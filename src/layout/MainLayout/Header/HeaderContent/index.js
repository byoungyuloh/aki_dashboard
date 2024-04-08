import { Box, IconButton, Link, useMediaQuery, Typography } from '@mui/material';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mr:30 }}>
      {/* 왼쪽 요소 */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!matchesXs && <Search />}
        {matchesXs && <Box sx={{ ml: 1 }} />}
      </Box>

      {/* 중앙 요소 - 확장하여 중앙에 위치하도록 함 */}
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5">Aki Predict</Typography>
      </Box>

      {/* 오른쪽 요소 */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Notification /> */}
        {!matchesXs && <Profile />}
        {/* {matchesXs && <MobileSection />} */}
      </Box>
    </Box>
  );
};

export default HeaderContent;
