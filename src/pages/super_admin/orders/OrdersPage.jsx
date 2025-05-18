import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import OrdersContainer from '../../../components/super_admin/orders/OrdersContainer';
import { breadcrumbsOrders } from '../../../utils/Breadcrumbs/breadcrumbs';


const OrdersPage = () => {
    const [refresh, setRefresh] = useState(false)
  const [searchWord, setSearchWord] = useState("");

  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbsOrders} />

        <OrdersContainer 
         searchWord={searchWord}
         setSearchWord={setSearchWord}
         refresh={refresh}
        />

    </div>
  )
}

export default OrdersPage