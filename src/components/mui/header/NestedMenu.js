import React, { useState } from 'react';
import { ListItem, ListItemText, Collapse, List } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';

const NestedMenu = ({ label, subItems, handleClose }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((subItem, index) => (
            <ListItem key={index} button sx={{ pl: 4 }} component={RouterLink} to={subItem.route} onClick={handleClose}>
              <ListItemText primary={subItem.label} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NestedMenu;
