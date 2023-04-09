import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import CustomAppBar from './header/AppBar';
import DrawerMenu from './header/DrawerMenu';
import FixedMenu from './header/FixedMenu';
import DashboardPage from './dashboard';
import UserPage from './user';
import MuiForm from './features/MuiForm';

const MuiNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar handleDrawerToggle={handleDrawerToggle}>
        <FixedMenu />
      </CustomAppBar>
      <DrawerMenu open={drawerOpen} handleClose={handleCloseDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 9,
          m: 2,
          '& .MuiBox-root': {
            pt: (theme) => theme.mixins.toolbar.minHeight,
          },
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/features/form" element={<MuiForm />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MuiNavigation;
