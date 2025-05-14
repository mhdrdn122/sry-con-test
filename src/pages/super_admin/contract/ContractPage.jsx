import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import ContractContainer from "../../../components/super_admin/contract/ContractContainer";
const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "النموذج",
    },
  ].reverse();

const ContractPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddContract, setShowAddContract] = useState(false);

    const handleShowAddContract = () => {
        setShowAddContract(true);
      };
      const handleCloseAddContract = () => {
        setShowAddContract(false);
      };

return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header 
              heading={"العقود"}
            //   buttonText={"إضافة"}
            //   onButtonClick={handleShowAddContract}
            //   requiredPermission={SuperPermissionsEnum.SUPER_ADMIN_ADD}
              setRefresh={setRefresh}
              refresh={refresh}
        />
        <ContractContainer refresh={refresh} />
    </div>
  )
}

export default ContractPage