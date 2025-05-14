import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import PaymentsContainer from '../../../components/super_admin/payments/PaymentsContainer';
import SearchInput from '../../../utils/super_admin/SearchInput';

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "الدفعات",
    },
  ].reverse();

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
          <Breadcrumb breadcrumbs={breadcrumbs} />
            {/* <h2 className='text-end m-5'>
              الدفعات
            </h2> */}
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