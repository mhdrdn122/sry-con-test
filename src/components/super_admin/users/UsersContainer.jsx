// UsersContainer.js
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import ModalDelete from "../../../utils/Modals/DeleteModal/ModalDelete";
import { useDeleteUserMutation, useGetUsersQuery } from '../../../redux/slice/super_admin/users/usersApi';
// import ModalEditUser from './ModalEditUser';
import ModalShowContract from './ModalShowContract';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../Table/DynamicTable'
import ModalShow from '../../../utils/Modals/ShowModal/GenericModal';
import { getColumnsUsersContainer } from '../../Table/tableColumns';
import { actionsUsersContainer } from '../../Table/tableActions';
import ModalShowOffer from './ModalShowOffer';
import { ModalAddUser } from '../../../utils/Modals/AddModal/DynamicAddModal';
import { useState } from "react";
import { ModalEditUser } from "../../../utils/Modals/EditModal/EditModalConfigs";

const UsersContainer = ({ show, handleClose, refresh }) => {
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [usersCache, setUsersCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    data: users,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetUsersQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(users, "users", setUsersCache, setLoadingData);

  const [
    deleteUser,
    { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
  ] = useDeleteUserMutation();

  const handleShowUser = (data) => {
    setShowUser(data);
  };
  const handleCloseShowUser = () => {
    setShowUser(false);
  };
  const handleShowEdit = (user) => {
    setShowEidt(user);
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
  const handleShowContract = (user) => {
    setShowContract(user);
  };
  const handleCloseShowContract = () => {
    setShowContract(false);
  };
  const handleShowOffer = (user) => {
    setShowOffer(user);
  };
  const handleCloseShowOffer = () => {
    setShowOffer(false);
  };

  const downloadContract = async (user) => {
    try {
      const response = await fetch(
        `${baseURLLocal}/user/panel-placement-model/${user.id}/word`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${superAdminInfo.token}`,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "contractOfferNoPrice.docx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        notify("Word file downloaded successfully", "success");
        handleClose();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Failed to download PDF";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
      notify(error.message || "Error downloading the file", "error");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteUser(showDelete).unwrap();
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
        columns={getColumnsUsersContainer(handleShowContract, handleShowOffer, downloadContract , navigate )}
        data={usersCache?.data || []}
        actions={actionsUsersContainer( handleShowUser, handleShowEdit, handleShowDelete, superAdminInfo )}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      <ModalAddUser show={show} handleClose={handleClose} />

      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoading}
        error={""}
        handleDelete={handleDelete}
      />
      <ModalShow show={showUser} handleClose={handleCloseShowUser} fromPage={"users"} />
      {/* <ModalEditUser show={showEdit} handleClose={handleCloseEdit} /> */}
      <ModalEditUser   show={showEdit} handleClose={handleCloseEdit} />
      <ModalShowContract show={showContract} handleClose={handleCloseShowContract} />
      <ModalShowOffer show={showOffer} handleClose={handleCloseShowOffer} />
     
      <ToastContainer />
    </div>
  );
};

export default UsersContainer;
