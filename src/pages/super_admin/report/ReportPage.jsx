import React, { useState } from 'react'
import Breadcrumb from '../../../utils/Breadcrumb';
import ReportContainer from '../../../components/super_admin/report/ReportContainer';
import Header from '../../../utils/Header';
import SearchInput from '../../../utils/super_admin/SearchInput';

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "التقرير الأسبوعي",
    },
  ].reverse();
const ReportPage = () => {
    const [refresh, setRefresh] = useState(false)
    // const [searchWord, setSearchWord] = useState("");

  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header
              heading={"التقرير الأسبوعي"}
            //   buttonText={"إضافة"}
            //   onButtonClick={handleShowAddContract}
            //   requiredPermission={SuperPermissionsEnum.SUPER_ADMIN_ADD}
              setRefresh={setRefresh}
              refresh={refresh}
        />
           
            <ReportContainer />
    </div>
  )
}

export default ReportPage