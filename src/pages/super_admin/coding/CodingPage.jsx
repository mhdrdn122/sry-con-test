import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import CodingContainer from "../../../components/super_admin/codings/CodingContainer";
const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "النموذج",
    },
  ].reverse();

  const CodingPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddCoding, setShowAddCoding] = useState(false);
    const handleShowAddCoding = () => {
        setShowAddCoding(true);
      };
      const handleCloseAddCoding = () => {
        setShowAddCoding(false);
      };

   return(
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header 
              heading={"النماذج"}
              buttonText={"إضافة "}
              onButtonClick={handleShowAddCoding}
            //   requiredPermission={SuperPermissionsEnum.SUPER_ADMIN_ADD}
              setRefresh={setRefresh}
              refresh={refresh}
        />
        <CodingContainer 
        show={showAddCoding} handleClose={handleCloseAddCoding} refresh={refresh} />
    </div>
   )
  }

export default CodingPage