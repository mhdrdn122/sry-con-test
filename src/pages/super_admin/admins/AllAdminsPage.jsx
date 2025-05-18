import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import AdminsContainer from "../../../components/super_admin/admins/AdminsContainer";
import { breadcrumbsAdmins } from "../../../utils/Breadcrumbs/breadcrumbs";


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
          <Breadcrumb breadcrumbs={breadcrumbsAdmins} />
        <Header 
              heading={"الموظفين"}
              buttonText={"إضافة "}
              onButtonClick={handleShowAddAdmin}
              setRefresh={setRefresh}
              refresh={refresh}
        />
            <AdminsContainer  show={showAddAdmin} handleClose={handleCloseAddAdmin} refresh={refresh}/>
        </div>
      )
}  
export default AllAdminsPage