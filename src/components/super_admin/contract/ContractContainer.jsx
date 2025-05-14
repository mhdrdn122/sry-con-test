// ContractContainer.js
import React, { useState } from 'react';
import {
  IconButton,
  Tooltip,
} from "@mui/material";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import { useDeleteContractMutation, useGetContractsQuery } from '../../../redux/slice/super_admin/contracts/contractsApi';
import { FaDownload } from 'react-icons/fa';
import { CiCircleRemove } from "react-icons/ci";
import { MdAutorenew } from 'react-icons/md';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModalRenewalContract from './ModalRenewalContract';
import ModalEditDiscount from './ModalEditDiscount';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../road_signs/DynamicTable';
import { tableColumns } from '../../Table/tableColumns';
import { tableActions } from '../../Table/tableActions';
// import DynamicTable from './DynamicTable';

const ContractContainer = ({ refresh }) => {
  const [page, setPage] = useState(1);
  const [contractRenewal, setContractRenewal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [contractsCache, setContractsCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));

  const {
    data: contracts,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetContractsQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(contracts, "contracts", setContractsCache, setLoadingData);

  const [delteContract, { isError: deleteErorr, isLoading, isFetching: deleteFetching }] = useDeleteContractMutation();

  const handleDownload = (contract) => {
    if (!contract?.url) {
      alert("No file URL available.");
      return;
    }
    const link = document.createElement("a");
    link.href = contract.url;
    link.download = contract.url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (contract) => {
    try {
      await delteContract(contract.id).unwrap();
      notify("تم حذف العقد بنجاح", "success");
    } catch (err) {
      console.error(err);
      notify(err?.data?.message || "فشل في حذف العقد", "error");
    }
  };

  const handleRenewalContract = (contract) => {
    setContractRenewal(contract);
  };

  const handleCloseContractRenewal = () => {
    setContractRenewal(false);
  };

  const handleEdit = (contract) => {
    setShowEdit(contract);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const onPress = async (page) => {
    setPage(page);
  };

  // Define columns for DynamicTable
  const columns = [
    { key: 'company_name', label: 'اسم الشركة', align: 'center' },
    {
      key: 'start_date',
      label: 'تاريخ البدء',
      align: 'center',
      render: (row) => row.start_date || row.date || '...'
    },
    {
      key: 'end_date',
      label: 'تاريخ الانتهاء',
      align: 'center',
      render: (row) => row.end_date || '...'
    },
    {
      key: 'price',
      label: 'السعر',
      align: 'center',
      render: (row) => row.price || '...'
    },
    {
      key: 'discount',
      label: 'الحسم',
      align: 'center',
      render: (row) => row.discount ? `${row.discount}%` : '...'
    }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'تحميل',
      icon: <FaDownload />,
      color: 'blue',
      onClick: handleDownload,
      disabled: isFetching || loading
    },
    {
      label: 'تعديل الحسم',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: handleEdit,
      disabled: isFetching || loading
    },
    {
      label: 'تجديد عقد',
      icon: <MdAutorenew />,
      color: 'green',
      onClick: handleRenewalContract,
      disabled: isFetching || loading,
      condition: (row) => !!row.company_name
    },
    {
      label: 'حذف عقد',
      icon: <CiCircleRemove />,
      color: 'red',
      onClick: handleDelete,
      disabled: isFetching || loading,
      condition: () => superAdminInfo?.role === 'super'
    }
  ];

  return (
    <div>
      <DynamicTable
        columns={columns}
        data={contractsCache?.data || []}
        actions={actions}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      {contractsCache?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={contractsCache?.meta?.total_pages} />
      )}
      <ToastContainer />
      <ModalRenewalContract
        show={contractRenewal}
        handleClose={handleCloseContractRenewal}
      />
      <ModalEditDiscount
        show={showEdit}
        handleClose={handleCloseEdit}
      />
    </div>
  );
};

export default ContractContainer;