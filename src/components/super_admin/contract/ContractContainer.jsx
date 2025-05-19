// ContractContainer.js
import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { useDeleteContractMutation, useGetContractsQuery } from '../../../redux/slice/super_admin/contracts/contractsApi';
import ModalRenewalContract from './ModalRenewalContract';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../Table/DynamicTable'
import { getColumnsContractContainer } from '../../Table/tableColumns';
import { actionsContractContainer } from '../../Table/tableActions';
import { ModalEditDiscount } from '../../../utils/Modals/EditModal/EditModalConfigs';

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


  return (
    <div>
      <DynamicTable
        columns={getColumnsContractContainer}
        data={contractsCache?.data || []}
        actions={actionsContractContainer(handleDownload , handleRenewalContract , handleEdit , handleDelete , isFetching , loading , superAdminInfo)}
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
 
      <ModalEditDiscount  show={showEdit}
        handleClose={handleCloseEdit}  />
    </div>
  );
};

export default ContractContainer;