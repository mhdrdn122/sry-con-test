import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import ContractContainer from "../../../components/super_admin/contract/ContractContainer";
import { breadcrumbsContract } from "../../../utils/Breadcrumbs/breadcrumbs";


const ContractPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddContract, setShowAddContract] = useState(false);


return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbsContract} />
        <Header 
              heading={"العقود"}
              setRefresh={setRefresh}
              refresh={refresh}
        />
        <ContractContainer refresh={refresh} />
    </div>
  )
}

export default ContractPage