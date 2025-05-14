// OrdersContainer.js
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip
} from "@mui/material";
import { Spinner } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GiConfirmed } from 'react-icons/gi';
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import ModalEditOrder from './ModalEditOrder';
import ModalConfirmed from './ModalConfirmed';
import { useConfirmOneOrderMutation, useGetOrdersQuery } from '../../../redux/slice/super_admin/orders/ordersApi';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../road_signs/DynamicTable';
import { tableColumns } from '../../Table/tableColumns';
import { tableActions } from '../../Table/tableActions';
// import DynamicTable from './DynamicTable';

const OrdersContainer = ({ refresh, searchWord, selectedType }) => {
  const [page, setPage] = useState(1);
  const [showEdit, setShowEidt] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType2, setSelectedType2] = useState("");
  const [loadingExport, setLoadingExport] = useState(false);
  const [ordersCache, setOrders] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

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

  useCacheInLocalStorage(orders, "orders", setOrders, setLoadingData);

  const onPress = async (page) => {
    setPage(page);
  };

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

  // Define columns for DynamicTable
  const columns = [
    { key: 'region', label: 'عنوان اللوحة', align: 'center' },
    { key: 'place', label: 'تموضع اللوحة', align: 'center' },
    { key: 'company_name', label: 'اسم الشركة', align: 'center' },
    {
      key: 'type',
      label: 'نوع الطلب',
      align: 'center',
      render: (row) => row.type === 'installation' ? 'تركيب' : 'فك'
    },
    { key: 'date', label: 'تاريخ الفك أو التركيب', align: 'center' },
    { key: 'note', label: 'الملاحظة', align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      align: 'center',
      render: (row) => row.status === 'done' ? '✅' : '⏳'
    }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'تعديل',
      icon: <EditOutlinedIcon />,
      color: 'orange',
      onClick: (row) => handleShowEdit(row.id)
    },
    {
      label: 'تأكيد',
      icon: <GiConfirmed />,
      color: 'green',
      onClick: (row) => handleShowConfirmed(row.id)
    }
  ];

  return (
    <div>
      <div className='d-flex mb-2'>
        <FormControl margin='dense' className='m-auto' sx={{ width: 200, marginBottom: 2, borderRadius: 2, boxShadow: 1 }}>
          <InputLabel id="order-type-label">نوع الطلب</InputLabel>
          <Select
            labelId="order-type-label"
            id="order-type"
            value={selectedType2}
            onChange={handleTypeChange}
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <MenuItem value="">اختر نوع الطلب</MenuItem>
            <MenuItem value="all">📋 تحميل الفك و التركيب</MenuItem>
            <MenuItem value="installation">🔧 تحميل تركيب</MenuItem>
            <MenuItem value="uninstallation">❌ تحميل فك</MenuItem>
          </Select>
        </FormControl>
      </div>
      <DynamicTable
        columns={columns}
        data={ordersCache?.data || []}
        actions={actions}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
      {ordersCache?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={ordersCache?.meta?.total_pages} />
      )}
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