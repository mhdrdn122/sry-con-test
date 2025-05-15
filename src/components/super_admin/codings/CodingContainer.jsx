// CodingContainer.js
import React, { useState } from 'react';
import { IconButton, Tooltip } from "@mui/material";
import { Spinner } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import { useDeleteCodingMutation, useGetCodingsQuery } from '../../../redux/slice/super_admin/codings/codingsApi';
import ModalDelete from '../../../utils/ModalDelete';
import ModalAddCoding from './ModalAddCoding';
import ModalEditCoding from './ModalEditCoding';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import { tableColumns } from '../../Table/tableColumns';
import { tableActions } from '../../Table/tableActions';
import DynamicTable from '../../Table/DynamicTable';
const CodingContainer = ({ show, handleClose, refresh }) => {
  const [page, setPage] = useState(1);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [codingsCache, setCodingsCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));

  const {
    data: codings,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetCodingsQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(codings, "codingsCache", setCodingsCache, setLoadingData);

  const [
    deleteCoding,
    { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
  ] = useDeleteCodingMutation();

  const handleShowEdit = (coding) => {
    setShowEidt(coding);
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
      const result = await deleteCoding(showDelete).unwrap();
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
    { key: 'model', label: 'النموذج', align: 'center' },
    { key: 'type', label: 'النوع', align: 'center' },
    { key: 'size', label: 'الحجم', align: 'center' },
    { key: 'price', label: 'السعر', align: 'center' },
    { key: 'format', label: 'نوع النموذج', align: 'center' }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: handleShowEdit
    },
    ...(superAdminInfo?.role === 'super' ? [
      {
        label: 'حذف',
        icon: <DeleteIcon />,
        color: 'red',
        onClick: (row) => handleShowDelete(row.id)
      }
    ] : [])
  ];

  return (
    <div>
      <DynamicTable
        columns={columns}
        data={codingsCache?.data || []}
        actions={actions }
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      <ModalAddCoding show={show} handleClose={handleClose} />
      <ModalEditCoding show={showEdit} handleClose={handleCloseEdit} />
      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoading}
        error={""}
        handleDelete={handleDelete}
      />
      {codingsCache?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={codingsCache?.meta?.total_pages} />
      )}
      <ToastContainer />
    </div>
  );
};

export default CodingContainer;