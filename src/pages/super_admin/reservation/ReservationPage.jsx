import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import ReservationsContainer from '../../../components/super_admin/reservations/ReservationsContainer';
import SearchInput from '../../../utils/super_admin/SearchInput';

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "الحجوزات",
    },
  ].reverse();
const ReservationPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddReservation, setShowAddReservation] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const handleShowAddReservation = () => {
        setShowAddReservation(true);
      };
  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Header 
              heading={"الحجوزات"}
              onButtonClick={handleShowAddReservation}
              setRefresh={setRefresh}
              refresh={refresh}
        />
           <SearchInput
                searchWord={searchWord}
                setSearchWord={setSearchWord}
            />
        <ReservationsContainer 
            show={showAddReservation} 
            refresh={refresh}
            searchWord={searchWord}
        />
    </div>
  )
}

export default ReservationPage