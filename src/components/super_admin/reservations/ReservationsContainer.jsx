// ReservationsContainer.js
import  { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import {  useGetReservationsQuery } from '../../../redux/slice/super_admin/reservations/reservationsApi';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';

import ModalShow from '../../../utils/Modals/ShowModal/GenericModal';
import DynamicTable from '../../Table/DynamicTable';
import { getColumnsReservationsContainer } from '../../Table/tableColumns';
import { actionsReservationsContainer } from '../../Table/tableActions';

const ReservationsContainer = ({  refresh, searchWord }) => {
  const [page, setPage] = useState(1);
  const [showReservation, setShowReservation] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [reservationsCache, setReservations] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    console.log(searchWord)
    const handler = setTimeout(() => {
      setDebouncedSearch(searchWord);
      setPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  const {
    data: reservations,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetReservationsQuery({ page, refresh, searchWord },
    { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(reservations, "reservations", setReservations, setLoadingData);

  const handleShowReservation = (data) => {
    setShowReservation(data);
  };
  const handleCloseShowReservation = () => {
    setShowReservation(false);
  };
 
  return (
    <div>
      <DynamicTable
        columns={getColumnsReservationsContainer}
        data={reservations?.data || []}
        actions={actionsReservationsContainer(handleShowReservation)}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      <ToastContainer />
      <ModalShow show={showReservation} handleClose={handleCloseShowReservation} fromPage={"reservations"} />

    </div>
  );
};

export default ReservationsContainer;