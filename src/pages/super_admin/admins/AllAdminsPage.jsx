import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import AdminsContainer from "../../../components/super_admin/admins/AdminsContainer";

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "المشرفين",
    },
  ].reverse();
  const AllAdminsPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddAdmin, setShowAddAdmin] = useState(false);
    const handleShowAddAdmin = () => {
        setShowAddAdmin(true);
      };
      const handleCloseAddAdmin = () => {
        setShowAddAdmin(false);
      };
      return (
        <div>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header 
              heading={"الموظفين"}
              buttonText={"إضافة "}
              onButtonClick={handleShowAddAdmin}
            //   requiredPermission={SuperPermissionsEnum.SUPER_ADMIN_ADD}
              setRefresh={setRefresh}
              refresh={refresh}
        />
            <AdminsContainer  show={showAddAdmin} handleClose={handleCloseAddAdmin} refresh={refresh}/>
        </div>
      )
}  
export default AllAdminsPage