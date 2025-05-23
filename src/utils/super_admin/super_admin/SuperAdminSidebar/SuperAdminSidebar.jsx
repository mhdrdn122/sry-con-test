import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { menuItemsConfig } from './menuItemsConfig';
import useLogout from '../../../../hooks/GlobalHooks/useLogout';
import adv_syrian from '../../../../assets/adv_syrian.png';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';

const SuperAdminSidebar = ({ toggleMode }) => {
  const superAdminInfo = JSON.parse(localStorage.getItem('superAdminInfo'));
  const isLargeScreen = useMediaQuery('(min-width:769px)');
  const [open, setOpen] = useState(isLargeScreen);
  const [buttonMode, setButtonMode] = useState(localStorage.getItem('mode') || 'light');
  
  const navigate = useNavigate();
  const logout = useLogout();
  const theme = useTheme()

  const filteredItems = useMemo(() =>
    menuItemsConfig.filter((item) => item.roles.includes(superAdminInfo?.role)), [superAdminInfo]);

  useEffect(() => {
    setOpen(isLargeScreen); // Automatically open on large/medium screens, close on small
  }, [isLargeScreen]);

  const toggleDrawer = () => {
    if (!isLargeScreen) {
      setOpen(!open); // Toggle drawer only on small screens
    }
  };

  const handleItemClick = (item) => {
    if (item.logout) {
      logout();
    } else {
      navigate(item.to);
    }
    if (!isLargeScreen) {
      setOpen(false); // Close drawer on item click for small screens
    }
  };
  const DrawerContent = (
    <Box sx={{
      width: 250,
      bgcolor: theme.palette.background.default,
      height: '100%',
      direction: 'rtl',
      overflowX: 'hidden' 
    }}>
      <Box mb="25px" display="flex" style={{ backgroundColor: theme.palette.mode === 'light' ? "#fff" : "#333" }} justifyContent="center" alignItems="center" pt="20px">
        <img
          src={adv_syrian}
          alt="profile"
          width="170"
          height="170"
          style={{ borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
        />
      </Box>
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top AppBar */}
     <TopBar toggleDrawer={toggleDrawer } buttonMode={buttonMode} setButtonMode={setButtonMode} isLargeScreen={isLargeScreen} toggleMode={toggleMode} />

      {/* Drawer */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant={isLargeScreen ? 'permanent' : 'temporary'}
          open={open}
          onClose={toggleDrawer}
          anchor="right" // Drawer opens from the right
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
              backgroundColor: theme.palette.background.default,
              top: '50px', // Start below AppBar
              height: 'calc(100% - 64px)', // Adjust height to fit below AppBar
              overflowX: 'hidden', // Ensure no horizontal scroll
              ...(isLargeScreen && { position: 'relative' }),
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      </Box>
    </Box>
  );
};

export default SuperAdminSidebar;