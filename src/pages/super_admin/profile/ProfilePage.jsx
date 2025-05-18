import React, { useState } from 'react'
import Breadcrumb from '../../../utils/Breadcrumbs/Breadcrumb'
import ProfileDetails from '../../../components/super_admin/profile/ProfileDetails'
import Header from '../../../utils/Header'
import ModalEditSuperAdminInfo from '../../../components/super_admin/profile/ModalEditSuperAdminInfo';
import { ManageAccounts } from '@mui/icons-material';
import { breadcrumbsProfile } from '../../../utils/Breadcrumbs/breadcrumbs';


const ProfilePage = () => {
  const [show, setShow] = useState(false)
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));


  const handleClose = () => {
    setShow(prev => !prev)
  }

  const role = superAdminInfo.role


  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbsProfile} />
        <Header 
        heading={"تعديل الملف الشخصي"}
        buttonText={role == "super" ? "تعديل معلومات التسجيل" : ''}  
        onButtonClick={handleClose}
        icon={<ManageAccounts/>} 
        />
      <div className="profile-forms">
        <ProfileDetails />
      </div>

        <ModalEditSuperAdminInfo show={show} handleClose={handleClose} />

    </div>

  )
}

export default ProfilePage