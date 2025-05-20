// UsersContainer.js
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import ModalDelete from "../../../utils/Modals/DeleteModal/ModalDelete";
import { useDeleteUserMutation, useGetUsersQuery } from '../../../redux/slice/super_admin/users/usersApi';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import DynamicTable from '../../Table/DynamicTable'
import { getColumnsUsersContainer } from '../../Table/tableColumns';
import { actionsUsersContainer } from '../../Table/tableActions';
import ModalShowOffer from './ModalShowOffer';
import { ModalAddUser } from '../../../utils/Modals/AddModal/DynamicAddModal';
import { useState } from "react";
import { ModalEditUser } from "../../../utils/Modals/EditModal/EditModalConfigs";
import ModalShow from "../../../utils/Modals/ModalShow/ModalShow";
import { CoPresentOutlined } from "@mui/icons-material";
import ModalShowPayment from "../payments/ModalShowPayment/ModalShowPayment";
// import ModalShowContract from "./ModalShowContract";

const UsersContainer = ({ show, handleClose, refresh }) => {
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState(false);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  const {
    data: users,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetUsersQuery({ page, refresh }, { refetchOnMountOrArgChange: true });


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
    console.log("test")
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


  console.log(showOffer)

  return (
    <div>
      <DynamicTable
        columns={getColumnsUsersContainer(handleShowContract, handleShowOffer, downloadContract , navigate )}
        data={users?.data || []}
        actions={actionsUsersContainer( handleShowUser, handleShowEdit, handleShowDelete, superAdminInfo )}
        loading={loading}
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

      <ModalEditUser   show={showEdit} handleClose={handleCloseEdit} />
      <ModalShowOffer show={showOffer} handleClose={handleCloseShowOffer} />
      <ModalShowPayment show={showContract} handleClose={handleCloseShowContract} />
      {/* <ModalShowContract show={showContract} handleClose={handleCloseShowContract } /> */}
     
      <ToastContainer />
    </div>
  );
};

export default UsersContainer;
