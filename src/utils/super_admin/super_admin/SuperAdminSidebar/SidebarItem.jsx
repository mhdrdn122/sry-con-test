// Reusable sidebar item component
import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { Typography } from '@mui/material';

const SidebarItem = ({ item, selected, onClick }) => {
  return (
    <MenuItem
      key={item.title}
      active={selected === item.title}
      icon={item.icon}
      style={{ color: '#000' }}
      onClick={() => onClick(item)}
    >
      <Typography>{item.title}</Typography>
    </MenuItem>
  );
};

export default SidebarItem;
