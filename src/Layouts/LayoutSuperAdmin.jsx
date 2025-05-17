import React, { useContext, useState } from 'react'
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import SuperAdminSidebar from '../utils/super_admin/super_admin/SuperAdminSidebar/SuperAdminSidebar';
import { widthWindow } from '../Context/WindowWidthContext';
import { useTheme } from '@mui/material';
// import SuperAdminSidebar from '../utils/super_admin/SuperAdminSidebar';
const LayoutSuperAdmin = () => {
  const theme = useTheme()
    return (
    <div style={{backgroundColor : theme.palette.background.default}} className="flex flex-row-reverse" >
            <div>
            <SuperAdminSidebar />

            </div>
        <main style={{width:"100% !important" , marginTop:"4rem" , backgroundColor : theme.palette.background.default}}  className='content px-2 h-full pt-4 '> 
            <Outlet />
        </main>
    </div>
  )
}

export default LayoutSuperAdmin