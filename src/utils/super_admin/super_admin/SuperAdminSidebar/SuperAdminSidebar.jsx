import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SidebarItem from './SidebarItem';
import { menuItemsConfig } from './menuItemsConfig';
import useLogout from './useLogout';
import adv_syrian from '../../../../assets/adv_syrian.png';
import { useNavigate } from 'react-router-dom';
import { widthWindow } from '../../../../Context/WindowWidthContext';
// import { widthWindow } from '../../contexts/WidthWindowProvider';

const SuperAdminSidebar = () => {
  const superAdminInfo = JSON.parse(localStorage.getItem('superAdminInfo'));
  const screenWidth = useContext(widthWindow);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('الحساب الشخصي');
  const navigate = useNavigate();

  const logout = useLogout();

  const filteredItems = useMemo(() =>
    menuItemsConfig.filter((item) => item.roles.includes(superAdminInfo?.role)), [superAdminInfo]);

  useEffect(() => {
    if (screenWidth <= 768) setIsCollapsed(true);
    else setIsCollapsed(false);
  }, [screenWidth]);

  const handleItemClick = (item) => {
    setSelected(item.title);
    if (item.logout) logout();
    else navigate(item.to);
  };
  console.log(isCollapsed)

  return (
    <Sidebar collapsed={isCollapsed} backgroundColor={`#fff`} rootStyles={{ minHeight: '100vh' }} rtl>
      <Menu>
        <MenuItem icon={<MenuOutlinedIcon />} onClick={() => setIsCollapsed(!isCollapsed)} style={{ 
          margin: '10px 0 20px', color: '#111' }} />
        {!isCollapsed && (
          <Box mb="25px" display="flex" justifyContent="center" alignItems="center">
            <img
              src={adv_syrian}
              alt="profile"
              width="170"
              height="170"
              style={{ borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
            />
          </Box>
        )}
        <Box>
          {filteredItems.map((item) => (
            <SidebarItem key={item.title} item={item} selected={selected} onClick={handleItemClick} />
          ))}
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default SuperAdminSidebar;