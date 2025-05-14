import React, { useState } from 'react'
import Breadcrumb from '../../../utils/Breadcrumb';
import Header from '../../../utils/Header';
import EmployeesActivitiesContainer from '../../../components/super_admin/employees_activities/EmployeesActivitiesContainer';

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "نشاطات الموظفين",
    },
  ].reverse();
const EmployeesActivitiesPage = () => {
        const [refresh, setRefresh] = useState(false)
  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header
              heading={"نشاطات الموظفين"}
            //   buttonText={"إضافة "}
            //   onButtonClick={handleShowAddDuration}
            //   requiredPermission={SuperPermissionsEnum.SUPER_ADMIN_ADD}
              setRefresh={setRefresh}
              refresh={refresh}
        />
        <EmployeesActivitiesContainer 
            refresh={refresh}
            />
    </div>
  )
}

export default EmployeesActivitiesPage