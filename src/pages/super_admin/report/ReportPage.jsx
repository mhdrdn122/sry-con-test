import React, { useState } from 'react'
import Breadcrumb from '../../../utils/Breadcrumbs/Breadcrumb';
import ReportContainer from '../../../components/super_admin/report/ReportContainer';
import Header from '../../../utils/Header';
import { breadcrumbsReport } from '../../../utils/Breadcrumbs/breadcrumbs';


const ReportPage = () => {
    const [refresh, setRefresh] = useState(false)

  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbsReport} />
        <Header
              heading={"التقرير الأسبوعي"}
              setRefresh={setRefresh}
              refresh={refresh}
        />
           
            <ReportContainer />
    </div>
  )
}

export default ReportPage