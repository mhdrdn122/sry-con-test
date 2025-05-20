// CodingContainer.js
import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { useDeleteCodingMutation, useGetCodingsQuery } from '../../../redux/slice/super_admin/codings/codingsApi';
import ModalDelete from '../../../utils/Modals/DeleteModal/ModalDelete';
import DynamicTable from '../../Table/DynamicTable';
import { getColumnsCodingContainer } from '../../Table/tableColumns';
import { actionsCodingContainer } from '../../Table/tableActions';
import { ModalAddCoding } from '../../../utils/Modals/AddModal/DynamicAddModal';
import { ModalEditCoding } from '../../../utils/Modals/EditModal/EditModalConfigs';
const CodingContainer = ({ show, handleClose, refresh }) => {
  const [page, setPage] = useState(1);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));

  const {
    data: codings,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetCodingsQuery({ page, refresh }, { refetchOnMountOrArgChange: true });


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


  return (
    <div>
      <DynamicTable
        columns={getColumnsCodingContainer}
        data={codings?.data || []}
        actions={actionsCodingContainer(handleShowEdit, handleShowDelete, superAdminInfo)}
        loading={loading}
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

      <ToastContainer />
    </div>
  );
};

export default CodingContainer;