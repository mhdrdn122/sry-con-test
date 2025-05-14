// UsersContainer.js
import React from 'react';
import { Tooltip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import ModalDelete from "../../../utils/ModalDelete";
import { useDeleteUserMutation, useGetUsersQuery } from '../../../redux/slice/super_admin/users/usersApi';
import ModalAddUser from './ModalAddUser';
import ModalShowUser from './ModalShowUser';
import ModalEditUser from './ModalEditUser';
import { TbContract } from "react-icons/tb";
import { LiaFileContractSolid } from "react-icons/lia";
import ModalShowContract from './ModalShowContract';
import { MdEditLocationAlt } from "react-icons/md";
import ModalShowOffer from './ModalShowOffer';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import { RiContractLine } from "react-icons/ri";
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../road_signs/DynamicTable';
// import DynamicTable from './DynamicTable';

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

  const onPress = async (page) => {
    setPage(page);
  };

  // Define columns for DynamicTable
  const columns = [
    {
      key: 'name',
      label: 'الاسم',
      align: 'center',
      render: (row) => row.name || '....'
    },
    {
      key: 'email',
      label: 'الايميل',
      align: 'center',
      render: (row) => row.email || '....'
    },
    {
      key: 'company_name',
      label: 'اسم الشركة',
      align: 'center',
      render: (row) => row.company_name || '....'
    },
    {
      key: 'phone',
      label: 'رقم الهاتف',
      align: 'center',
      render: (row) => row.phone || '....'
    },
    {
      key: 'code',
      label: 'الكود',
      align: 'center',
      render: (row) => row.code || '....'
    },
    {
      key: 'contracts',
      label: 'العقود',
      align: 'center',
      render: (row) => (
        <>
          <Tooltip placement='top-start' title="إنشاء عقد">
            <IconButton
              sx={{ color: "#FC9A08" }}
              onClick={() => handleShowContract(row)}
            >
              <TbContract />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top-start' title="عرض مالي">
            <IconButton
              sx={{ color: "#F35A5B" }}
              onClick={() => handleShowOffer(row)}
            >
              <LiaFileContractSolid />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top-start' title="نموذج تموضع اللوحات">
            <IconButton
              sx={{ color: "blue" }}
              onClick={() => downloadContract(row)}
            >
              <MdEditLocationAlt />
            </IconButton>
          </Tooltip>
          <Tooltip placement='top-start' title="كافة العقود">
            <IconButton
              sx={{ color: "#47B149" }}
              onClick={() => navigate(`/super_admin/users/${row.id}`)}
            >
              <RiContractLine />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: handleShowUser
    },
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
        data={usersCache?.data || []}
        actions={actions}
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
      <ModalShowUser show={showUser} handleClose={handleCloseShowUser} />
      <ModalEditUser show={showEdit} handleClose={handleCloseEdit} />
      <ModalShowContract show={showContract} handleClose={handleCloseShowContract} />
      <ModalShowOffer show={showOffer} handleClose={handleCloseShowOffer} />
      {usersCache?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={usersCache?.meta?.total_pages} />
      )}
      <ToastContainer />
    </div>
  );
};

export default UsersContainer;
