import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import AdminsContainer from "../../../components/super_admin/admins/AdminsContainer";
import UsersContainer from '../../../components/super_admin/users/UsersContainer';

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "المستخدمين",
    },
  ].reverse();

const AllUsersPage = () => {
      const [refresh, setRefresh] = useState(false)
      const [showAddUser, setShowAddUser] = useState(false);
      
      const handleShowAddUser = () => {
        setShowAddUser(true);
      };
      const handleCloseAddUser = () => {
        setShowAddUser(false);
      };

  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header 
              heading={"الزبائن"}
              buttonText={"إضافة"}
              onButtonClick={handleShowAddUser}
              setRefresh={setRefresh}
              refresh={refresh}
        />  
        <UsersContainer 
            show={showAddUser} handleClose={handleCloseAddUser} refresh={refresh}
        />
    </div>
  )
}

export default AllUsersPage