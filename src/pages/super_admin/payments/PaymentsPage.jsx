import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import PaymentsContainer from '../../../components/super_admin/payments/PaymentsContainer';
import SearchInput from '../../../utils/super_admin/SearchInput';
import { breadcrumbsPayments } from '../../../utils/Breadcrumbs/breadcrumbs';


const PaymentsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const handleShowAddPayment = () => {
    setShowAddPayment(true);
  };
  const handleCloseAddPayment = () => {
    setShowAddPayment(false);
  };

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbsPayments} />
      <Header
        heading={"الدفعات"}
        buttonText={"إضافة "}
        onButtonClick={handleShowAddPayment}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <SearchInput
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
      <PaymentsContainer
        show={showAddPayment} handleClose={handleCloseAddPayment}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        refresh={refresh}
      />
    </div>
  )
}

export default PaymentsPage