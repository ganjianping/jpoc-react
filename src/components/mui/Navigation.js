import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import CustomAppBar from './header/AppBar';
import DrawerMenu from './header/DrawerMenu';
import FixedMenu from './header/FixedMenu';
import DashboardPage from './dashboard';
import UserList from './user/UserList';
import MuiForm from './features/MuiForm';
import BrowserFingerprint from './other/BrowserFingerprint';

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
          <Route path="/user" element={<UserList />} />
          <Route path="/features/form" element={<MuiForm />} />
          <Route path="/other/browser-fingerprint" element={<BrowserFingerprint />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MuiNavigation;
