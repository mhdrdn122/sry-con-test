// OrdersContainer.js
import { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import ModalEditOrder from './ModalEditOrder';
import ModalConfirmed from './ModalConfirmed';
import { useConfirmOneOrderMutation, useGetOrdersQuery } from '../../../redux/slice/super_admin/orders/ordersApi';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import DynamicTable from '../../Table/DynamicTable'
import { getColumnsOrdersContainer } from '../../Table/tableColumns';
import { actionsOrdersContainer } from '../../Table/tableActions';
import SelectOptionOrders from './SelectOptionOrders';

const OrdersContainer = ({ refresh, searchWord }) => {
  const [page, setPage] = useState(1);
  const [showEdit, setShowEidt] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [selectedType2, setSelectedType2] = useState("");
  const [loadingExport, setLoadingExport] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const theme = useTheme();


  const [debouncedType, setDebouncedType] = useState("");

  const [confirmOneOrder, { isLoading, isSuccess, isError: isErrDelete, error: errorDel }] =
    useConfirmOneOrderMutation();

  const handleShowEdit = (id) => {
    setShowEidt(id);
  };
  const handleCloseEdit = () => {
    setShowEidt(false);
  };

  const handleShowConfirmed = (id) => {
    setShowConfirmed(id);
  };
  const handleCloseConfirmed = () => {
    setShowConfirmed(false);
  };

  const handleConfirmed = async () => {
    try {
      const result = await confirmOneOrder(showConfirmed).unwrap();
      if (result.status === true) {
        notify(result.msg, "success");
        handleCloseConfirmed();
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedType(selectedType);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [selectedType]);

  const {
    data: orders,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetOrdersQuery({ page, refresh, searchWord: debouncedType },
    { refetchOnMountOrArgChange: true });


  const handleTypeChange = async (event) => {
    const type = event.target.value;
    setSelectedType2(type);
    const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
    const token = superAdminInfo?.token;
    try {
      setLoadingExport(true);
      const response = await fetch(
        `${baseURLLocal}/order-export-excel?type=${type}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orders_${type}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      notify("Export successful!", "success");
    } catch (error) {
      console.error("Export failed:", error);
      notify("Export failed. Please try again.", "error");
    } finally {
      setLoadingExport(false);
    }
  };

  console.log(selectedType)
  return (
    <div>
      <SelectOptionOrders selectedType={selectedType} setSelectedType={setSelectedType} handleTypeChange={handleTypeChange} />
      <DynamicTable
        columns={getColumnsOrdersContainer}
        data={orders?.data || []}
        actions={actionsOrdersContainer(handleShowEdit, handleShowConfirmed)}
        loading={loading}
        error={error?.data?.message}
        dir="rtl"
      />

      <ToastContainer />
      <ModalEditOrder show={showEdit} handleClose={handleCloseEdit} />
      <ModalConfirmed
        show={showConfirmed}
        handleClose={handleCloseConfirmed}
        error={""}
        handleConfirmed={handleConfirmed}
      />
    </div>
  );
};

export default OrdersContainer;