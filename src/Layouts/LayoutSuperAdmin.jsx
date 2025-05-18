import { Outlet } from "react-router-dom";
import SuperAdminSidebar from '../utils/super_admin/super_admin/SuperAdminSidebar/SuperAdminSidebar';
import { useTheme } from '@mui/material';
const LayoutSuperAdmin = ({ toggleMode }) => {
  const theme = useTheme()
  return (
    <div style={{ backgroundColor: theme.palette.background.default }} className="flex flex-row-reverse" >
      <div>
        <SuperAdminSidebar toggleMode={toggleMode} />
      </div>
      <main style={{ width: "100% !important", marginTop: "4rem", backgroundColor: theme.palette.background.default }} className='content px-2 h-full pt-4 '>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutSuperAdmin