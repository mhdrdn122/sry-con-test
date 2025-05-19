import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'
import SuperAdminSidebar from '../utils/super_admin/super_admin/SuperAdminSidebar/SuperAdminSidebar';
import { useTheme } from '@mui/material';
import PageContentSkeleton from "../utils/Loading/PageContentSkeleton";
const LayoutSuperAdmin = ({ toggleMode }) => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])



  console.log(loading)
  return (
    <div style={{ backgroundColor: theme.palette.background.default }} className="flex flex-row-reverse" >
      <div>
        <SuperAdminSidebar toggleMode={toggleMode} />
      </div>
      <main style={{ width: "100% !important", marginTop: "4rem", backgroundColor: theme.palette.background.default }} className='content px-2 h-full pt-4 '>

        {

          loading ? <PageContentSkeleton /> : <Outlet />
        }
      </main>
    </div>
  )
}

export default LayoutSuperAdmin