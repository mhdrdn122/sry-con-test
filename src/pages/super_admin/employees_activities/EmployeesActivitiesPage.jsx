import React, { useState } from 'react'
import Breadcrumb from '../../../utils/Breadcrumbs/Breadcrumb';
import Header from '../../../utils/Header';
import EmployeesActivitiesContainer from '../../../components/super_admin/employees_activities/EmployeesActivitiesContainer';
import { breadcrumbsEmployeesActivitiesPage } from '../../../utils/Breadcrumbs/breadcrumbs';


const EmployeesActivitiesPage = () => {
        const [refresh, setRefresh] = useState(false)
  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbsEmployeesActivitiesPage} />
        <Header
              heading={"نشاطات الموظفين"}
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