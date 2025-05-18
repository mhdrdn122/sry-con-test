// PaymentsContainer.js
import React, { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import ModalDelete from '../../../utils/ModalDelete';
import { useGetPaymentsQuery, useDeletePaymentMutation } from '../../../redux/slice/super_admin/payments/paymentsApi';
import ModalShowPayment from './ModalShowPayment';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../Table/DynamicTable'
import { getColumnsPaymentsContainer } from '../../Table/tableColumns';
import { actionsPaymentsContainer } from '../../Table/tableActions';
import { ModalAddCashPayment } from '../../../utils/DynamicAddModal';

const PaymentsContainer = ({ show, handleClose, refresh, searchWord }) => {
  const [page, setPage] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [showAddCashPayment, setShowAddCashPayment] = useState(false);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [paymentsCache, setPaymentsCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));

  const {
    data: payments,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetPaymentsQuery({ page, refresh, searchWord },
    { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(payments, "payments", setPaymentsCache, setLoadingData);

  const [
    deletePayment,
    { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
  ] = useDeletePaymentMutation();

  const handleShowPayment = (data) => {
    setShowPayment(data);
  };
  const handleCloseShowPayment = () => {
    setShowPayment(false);
  };
  const handleShowAddCashPayment = (payment) => {
    setShowAddCashPayment(payment);
  };
  const handleCloseAddCashPayment = () => {
    setShowAddCashPayment(false);
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
      const result = await deletePayment(showDelete).unwrap();
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
  const handleDownload = async (contract) => {
    try {
      const response = await fetch(
        `${baseURLLocal}/payment/account-statement/${contract.user_id}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${superAdminInfo.token}`,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "contract.docx";
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
  const onPress = async (page) => {
    setPage(page);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchWord);
      setPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);



  return (
    <div>
      <DynamicTable
        columns={getColumnsPaymentsContainer}
        data={paymentsCache?.data || []}
        actions={actionsPaymentsContainer(handleShowPayment , handleDownload , isFetching , loading)}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      <ToastContainer />
      <ModalAddCashPayment show={show} handleClose={handleClose} />
      
      <ModalShowPayment show={showPayment} handleClose={handleCloseShowPayment} />
      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoading}
        error={""}
        handleDelete={handleDelete}
      />
      {paymentsCache?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={paymentsCache?.meta?.total_pages} />
      )}
    </div>
  );
};

export default PaymentsContainer;