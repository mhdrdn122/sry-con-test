// ReservationsContainer.js
import  { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import {  useGetReservationsQuery } from '../../../redux/slice/super_admin/reservations/reservationsApi';

import DynamicTable from '../../Table/DynamicTable';
import { getColumnsReservationsContainer } from '../../Table/tableColumns';
import { actionsReservationsContainer } from '../../Table/tableActions';
import ModalShow from '../../../utils/Modals/ModalShow/ModalShow';

const ReservationsContainer = ({  refresh, searchWord }) => {
  const [page, setPage] = useState(1);
  const [showReservation, setShowReservation] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
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
        loading={loading}
        error={error?.data?.message}
        dir="rtl"
      />
      <ToastContainer />
      <ModalShow show={showReservation} handleClose={handleCloseShowReservation} fromPage={"reservations"} />


    </div>
  );
};

export default ReservationsContainer;