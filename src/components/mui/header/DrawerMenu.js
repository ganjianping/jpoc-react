import React from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Box } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, Close as CloseIcon } from '@mui/icons-material';
import NestedMenu from './NestedMenu';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const DrawerMenu = ({ open, handleClose }) => {
  const menuItems = [
    { label: 'Dashboard', route: '/mui/header/dashboard' },
    {
      label: 'MUI',
      subItems: [
        { label: 'Form', route: '/mui/header/features/form' }
      ],
    },
    {
      label: 'Showcase',
      subItems: [
        { label: 'User', route: '/mui/header/user' }
      ],
    },
    { label: 'Logout', route: '/mui/login' }
  ];

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1201, // Increase zIndex value
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={handleClose} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ paddingTop: 2 }}>
        {menuItems.map((menuItem, index) =>
          menuItem.subItems ? (
            <NestedMenu key={index} label={menuItem.label} subItems={menuItem.subItems} handleClose={handleClose}/>
          ) : (
            <ListItem key={index} button component={RouterLink} to={menuItem.route} onClick={handleClose}>
              <ListItemText primary={menuItem.label} />
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
