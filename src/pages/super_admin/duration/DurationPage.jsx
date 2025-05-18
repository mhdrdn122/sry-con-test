import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import DurationContainer from "../../../components/super_admin/durations/DurationContainer";

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "المدة الزمنية",
    },
  ].reverse();

const DurationPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddDuration, setShowAddDuration] = useState(false);
    const handleShowAddDuration = () => {
        setShowAddDuration(true);
      };
      const handleCloseAddDuration = () => {
        setShowAddDuration(false);
      };

  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header 
              heading={"الفترات الزمنية"}
              buttonText={"إضافة "}
              onButtonClick={handleShowAddDuration}
            //   requiredPermission={SuperPermissionsEnum.SUPER_ADMIN_ADD}
              setRefresh={setRefresh}
              refresh={refresh}
        />
        <DurationContainer
        show={showAddDuration} handleClose={handleCloseAddDuration} refresh={refresh}
          />
    </div>
  )
}

export default DurationPage