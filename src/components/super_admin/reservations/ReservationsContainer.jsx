// ReservationsContainer.js
import React, { useEffect, useState } from 'react';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import ModalDelete from '../../../utils/ModalDelete';
import { useDeleteReservationMutation, useGetReservationsQuery } from '../../../redux/slice/super_admin/reservations/reservationsApi';
import ModalAddReservation from './ModalAddReservation';
import ModalEditReservation from './ModalEditReservation';
import ModalShowReservation from './ModalShowReservation';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../road_signs/DynamicTable';
import { tableColumns } from '../../Table/tableColumns';
import { tableActions } from '../../Table/tableActions';
// import DynamicTable from './DynamicTable';

const ReservationsContainer = ({ show, handleClose, refresh, searchWord }) => {
  const [page, setPage] = useState(1);
  const [showReservation, setShowReservation] = useState(false);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [reservationsCache, setReservations] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

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

  useCacheInLocalStorage(reservations, "reservations", setReservations, setLoadingData);

  const [
    deleteReservation,
    { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
  ] = useDeleteReservationMutation();

  const handleShowReservation = (data) => {
    setShowReservation(data);
  };
  const handleCloseShowReservation = () => {
    setShowReservation(false);
  };

  const handleShowEdit = (id) => {
    setShowEidt(id);
  };
  const handleCloseEdit = () => {
    setShowEidt(false);
  };
  const handleShowDelete = (id) => {
    setShowDelete(id);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteReservation(showDelete).unwrap();
      if (result.status === true) {
        notify(result.msg, "success");
        handleCloseDelete();
      } else {
        notify(result.msg, "error");
      }
    } catch (error) {
      if (error?.status === 401) {
        triggerRedirect();
      } else {
        console.error("Failed:", error);
        notify(error?.data?.message, "error");
      }
    }
  };

  const onPress = async (page) => {
    setPage(page);
  };

  // Define columns for DynamicTable
  const columns = [
    { key: 'road_sign_region', label: 'عنوان اللوحة', align: 'center' },
    { key: 'road_sign_place', label: 'تموضع اللوحة', align: 'center' },
    { key: 'start_date', label: 'من', align: 'center' },
    { key: 'end_date', label: 'إلى', align: 'center' },
    { key: 'company_name', label: 'اسم الشركة', align: 'center' }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: handleShowReservation
    }
  ];

  return (
    <div>
      <DynamicTable
        columns={columns}
        data={reservationsCache?.data || []}
        actions={actions}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      <ToastContainer />
      <ModalAddReservation show={show} handleClose={handleClose} />
      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoading}
        error={""}
        handleDelete={handleDelete}
      />
      <ModalEditReservation show={showEdit} handleClose={handleCloseEdit} />
      <ModalShowReservation show={showReservation} handleClose={handleCloseShowReservation} />
      {reservationsCache?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={reservationsCache?.meta?.total_pages} />
      )}
    </div>
  );
};

export default ReservationsContainer;