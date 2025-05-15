import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import OrdersContainer from '../../../components/super_admin/orders/OrdersContainer';
import SearchInput from '../../../utils/super_admin/SearchInput';

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "الطلبات",
    },
  ].reverse();

const OrdersPage = () => {
    const [refresh, setRefresh] = useState(false)
  const [searchWord, setSearchWord] = useState("");
  const [selectedType, setSelectedType] = useState(""); 

  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
          <div className="mb-1 mt-3 w-100 d-flex justify-end me-5">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select w-25 text-end " // You can style this dropdown as needed
                >
              <option value="">فك و تركيب</option>
              <option value="installation">تركيب</option>
              <option value="uninstallation">فك</option>
        </select>
      </div>
        <OrdersContainer 
         searchWord={searchWord}
         setSearchWord={setSearchWord}
         selectedType={selectedType}
         refresh={refresh}
        />

    </div>
  )
}

export default OrdersPage