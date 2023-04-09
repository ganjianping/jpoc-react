import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Hidden } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const CustomAppBar = ({ handleDrawerToggle, children }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Hidden smUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        JPOC
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
);

export default CustomAppBar;
