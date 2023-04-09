import React from 'react';
import { Button, Hidden, Menu, MenuItem, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const FixedMenu = () => {
  const [anchorEls, setAnchorEls] = React.useState({});

  const handleClick = (event, index) => {
    setAnchorEls({ ...anchorEls, [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEls({ ...anchorEls, [index]: null });
  };

  const menuItems = [
    { label: 'Dashboard', route: '/mui/header/dashboard' },
    {
      label: 'MUI',
      subItems: [
        { label: 'Form', route: '/mui/header/features/form' },
      ],
    },
    {
      label: 'Showcase',
      subItems: [
        { label: 'User', route: '/mui/header/user' }
      ],
    },
    { label: 'logout', route: '/mui/login' }
  ];

  const renderMenuItems = (items, parentIndex) => {
    return items.map((menuItem, index) => (
      <MenuItem
        key={index}
        onClick={() => {
          handleClose(parentIndex);
        }}
        component={Link}
        to={menuItem.route}
      >
        <ListItemText primary={menuItem.label} />
      </MenuItem>
    ));
  };

  return (
    <>
      <Hidden smDown>
        {menuItems.map((menuItem, index) =>
          !menuItem.subItems ? (
            <Button key={index} color="inherit" component={Link} to={menuItem.route}>
              {menuItem.label}
            </Button>
          ) : (
            <div key={index}>
              <Button color="inherit" onClick={(event) => handleClick(event, index)}>
                {menuItem.label}
              </Button>
              <Menu
                anchorEl={anchorEls[index]}
                keepMounted
                open={Boolean(anchorEls[index])}
                onClose={() => handleClose(index)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {renderMenuItems(menuItem.subItems, index)}
              </Menu>
            </div>
          ),
        )}
      </Hidden>
    </>
  );
};

export default FixedMenu;
