import React, { useState } from 'react'
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import ReservationsContainer from '../../../components/super_admin/reservations/ReservationsContainer';
import SearchInput from '../../../utils/super_admin/SearchInput';
import { breadcrumbsReservation } from '../../../utils/Breadcrumbs/breadcrumbs';


const ReservationPage = () => {
    const [refresh, setRefresh] = useState(false)
    const [showAddReservation, setShowAddReservation] = useState(false);
    const [searchWord, setSearchWord] = useState("");

    const handleShowAddReservation = () => {
        setShowAddReservation(true);
      };
  return (
    <div>
        <Breadcrumb breadcrumbs={breadcrumbsReservation} />
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