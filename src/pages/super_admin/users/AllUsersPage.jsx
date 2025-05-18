import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import UsersContainer from '../../../components/super_admin/users/UsersContainer';
import { breadcrumbsUsers } from '../../../utils/Breadcrumbs/breadcrumbs';


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
        <Breadcrumb breadcrumbs={breadcrumbsUsers} />
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