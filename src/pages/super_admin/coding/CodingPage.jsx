import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import CodingContainer from "../../../components/super_admin/codings/CodingContainer";
import { breadcrumbsCoding } from "../../../utils/Breadcrumbs/breadcrumbs";

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
        <Breadcrumb breadcrumbs={breadcrumbsCoding} />
        <Header 
              heading={"النماذج"}
              buttonText={"إضافة "}
              onButtonClick={handleShowAddCoding}
              setRefresh={setRefresh}
              refresh={refresh}
        />
        <CodingContainer 
        show={showAddCoding} handleClose={handleCloseAddCoding} refresh={refresh} />
    </div>
   )
  }

export default CodingPage