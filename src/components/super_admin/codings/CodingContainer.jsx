// CodingContainer.js
import  { useState } from 'react';
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { useDeleteCodingMutation, useGetCodingsQuery } from '../../../redux/slice/super_admin/codings/codingsApi';
import ModalDelete from '../../../utils/Modals/DeleteModal/ModalDelete';
// import ModalEditCoding from './ModalEditCoding';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../Table/DynamicTable';
import { getColumnsCodingContainer } from '../../Table/tableColumns';
import { actionsCodingContainer } from '../../Table/tableActions';
import { ModalAddCoding } from '../../../utils/Modals/AddModal/DynamicAddModal';
import { ModalEditCoding } from '../../../utils/Modals/EditModal/EditModalConfigs';
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


  return (
    <div>
      <DynamicTable
        columns={getColumnsCodingContainer}
        data={codingsCache?.data || []}
        actions={actionsCodingContainer(handleShowEdit , handleShowDelete , superAdminInfo) }
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      
      <ModalAddCoding show={show} handleClose={handleClose} />

      {/* <ModalEditCoding show={showEdit} handleClose={handleCloseEdit} /> */}
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