import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import SuperAdminSidebar from '../utils/super_admin/super_admin/SuperAdminSidebar/SuperAdminSidebar';
// import SuperAdminSidebar from '../utils/super_admin/SuperAdminSidebar';
const LayoutSuperAdmin = () => {
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
    <div className="flex flex-row-reverse" >
            {/* LayoutSuperAdmin */}
            {/* <SuperAdminSidebar /> */}
            <div>
            <SuperAdminSidebar />

            </div>
        <main className='content p-2'> 
            <Outlet />

          {/* <Container >
          </Container>     */}
        </main>
    </div>
  )
}

export default LayoutSuperAdmin