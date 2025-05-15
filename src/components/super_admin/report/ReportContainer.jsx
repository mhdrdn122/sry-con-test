// ReportContainer.js
import React, { useState } from 'react';
import { useDeleteReportRoadSignMutation, useGetReportQuery, useTransferReportRoadSignMutation } from '../../../redux/slice/super_admin/report/ReportApi';
import { ToastContainer } from 'react-toastify';
// import {  Spinner } from 'react-bootstrap';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { FaDownload } from 'react-icons/fa';
import ModalDelete from '../../../utils/ModalDelete';
import notify from '../../../utils/useNotification';
import ModalConfirmed from '../orders/ModalConfirmed';
import { useMediaQuery } from '@uidotdev/usehooks';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import SearchInput from '../../../utils/super_admin/SearchInput';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import { tableColumns } from '../../Table/tableColumns';
import DynamicTable from '../../Table/DynamicTable';
import ModalTable from '../../Table/ModalTable';

const ReportContainer = () => {
  const [page, setPage] = useState(1);
  const [selectedReportType, setSelectedReportType] = useState('all_data');
  const [showDelete, setShowDelete] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const [searchWord, setSearchWord] = useState("");
  const [reportCache, setReportCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    data: report,
    isError,
    error,
    isLoading,
    isFetching
  } = useGetReportQuery({ page, searchWord }, { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(report, "report", setReportCache, setLoadingData);

  const [
    deleteReportRoadSign,
    { isLoading: isLoadingDelete, isSuccess, isError: isErrDelete, error: errorDel },
  ] = useDeleteReportRoadSignMutation();

  const [
    transferReportRoadSign,
    { isLoading: isLoadingTransfer, isSuccess: isSuccessTransfer, isError: isErrTransfer, error: errorTransfer },
  ] = useTransferReportRoadSignMutation();

  const selectedData = reportCache?.data?.[selectedReportType] || [];

  const handleDelete = async () => {
    try {
      const result = await deleteReportRoadSign(showDelete).unwrap();
      if (result.status === true) {
        notify("تم الحذف بنجاح", "success");
        handleCloseDelete();
      } else {
        notify(result.message, "error");
      }
    } catch (error) {
      if (error?.status === 401) {
        notify("401 error", "error");
      } else {
        console.error("Failed:", error);
        notify(error?.data?.message, "error");
      }
    }
  };

  const handleTransfer = async () => {
    try {
      const result = await transferReportRoadSign(showTransfer).unwrap();
      if (result.status === true) {
        notify("تم النقل بنجاح", "success");
        handleCloseTransfer();
      } else {
        notify(result.message, "error");
      }
    } catch (error) {
      if (error?.status === 401) {
        notify("401 error", "error");
      } else {
        console.error("Failed:", error);
        notify(error?.data?.message, "error");
      }
    }
  };

  const handleDownload = async () => {
    try {
      const typeMapping = {
        all_data: 0,
        reservation_this_week: 1,
        unreserved_signs: 2,
      };

      const typeValue = typeMapping[selectedReportType];

      const params = new URLSearchParams();
      params.append("type", typeValue);
      if (searchWord.trim() !== "") {
        params.append("city", searchWord.trim());
      }

      const response = await fetch(
        `${baseURLLocal}/word-report?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${superAdminInfo?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to download the file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      notify("فشل تحميل التقرير ربما تكون لاتوجد حجوزات ", "error");
    }
  };

  const handleShowTransfer = (id) => {
    setShowTransfer(id);
  };

  const handleCloseTransfer = () => {
    setShowTransfer(false);
  };

  const handleShowDelete = (id) => {
    setShowDelete(id);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  // Define columns dynamically based on selectedReportType
  const columns = [
    ...(selectedReportType === 'reservation_this_week' ? [{
      key: 'company_name',
      label: 'اسم الشركة',
      align: 'center'
    }] : []),
    { key: 'road_sign_region', label: 'المنطقة', align: 'center' },
    { key: 'road_sign_place', label: 'الموقع', align: 'center' },
    { key: 'model', label: 'النموذج', align: 'center' },
    { key: 'signs_number', label: 'عدد اللوحات', align: 'center' },
    { key: 'number_of_faces', label: 'عدد الوجوه', align: 'center' },
    {
      key: 'meters_number',
      label: 'عدد الأمتار',
      align: 'center',
      render: (row) => row.meters_number || 'غير معرف'
    },
    ...(selectedReportType === 'all_data' ? [
      { key: 'signs_number_reservation', label: 'عدد اللوحات المحجوزة', align: 'center' },
      { key: 'number_of_faces_reservation', label: 'عدد الوجوه المحجوزة', align: 'center' }
    ] : []),
  ];

  // Define footer for reservation_this_week
  const footer = selectedReportType === 'reservation_this_week' ? (
    <tr style={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>
      <td colSpan={6} className="text-end" style={{ padding: "10px", fontSize: "18px", color: "#1565c0" }}>
        إجمالي عدد الأمتار:
      </td>
      <td className="text-center" style={{
        backgroundColor: "#1565c0",
        color: "white",
        fontSize: "20px",
        borderRadius: "5px",
        padding: "10px"
      }}>
        {reportCache?.data?.total_number_of_meters_for_this_week ?? 0}
      </td>
    </tr>
  ) : null;

  return (
    <div>


      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mb: 3,
          p: 1,
          flexWrap: 'wrap'
        }}
      >
        <Box
          sx={{
            alignSelf: { xs: 'flex-start', sm: 'center' },
            mr: { sm: 'auto' },
            ml: { xs: 2, sm: 0 }
          }}
        >
          <Tooltip placement="top-start" title="تحميل الجدول ك اكسل">
            <IconButton
              sx={{
                color: "primary.main",
                '&:hover': { backgroundColor: 'primary.light', color: 'white' }
              }}
              onClick={() => handleDownload()}
              disabled={isFetching || isLoading}
              size="medium"
            >
              <FaDownload />
            </IconButton>
          </Tooltip>
        </Box>

        <Button
          variant={selectedReportType === 'all_data' ? 'contained' : 'outlined'}
          onClick={() => setSelectedReportType('all_data')}
          sx={{
            minWidth: { xs: '90%', sm: '120px', md: '140px' },
            mx: { xs: 0, sm: 0.5 },
            my: { xs: 0.5, sm: 0 }
          }}
        >
          جميع البيانات
        </Button>

        <Button
          variant={selectedReportType === 'unreserved_signs' ? 'contained' : 'outlined'}
          onClick={() => setSelectedReportType('unreserved_signs')}
          sx={{
            minWidth: { xs: '90%', sm: '120px', md: '140px' },
            mx: { xs: 0, sm: 0.5 },
            my: { xs: 0.5, sm: 0 }
          }}
        >
          لوحات غير محجوزة
        </Button>

        <Button
          variant={selectedReportType === 'reservation_this_week' ? 'contained' : 'outlined'}
          onClick={() => setSelectedReportType('reservation_this_week')}
          sx={{
            minWidth: { xs: '90%', sm: '120px', md: '140px' },
            mx: { xs: 0, sm: 0.5 },
            my: { xs: 0.5, sm: 0 }
          }}
        >
          الحجز هذا الأسبوع
        </Button>
      </Box>

      <ModalTable data={reportCache.data?.coding} />

      <div className='w-100'>
        <SearchInput
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          phrasePlaceHolder={'البحث عن مدينة'}
        />
      </div>
      <DynamicTable
        columns={columns}
        data={selectedData}
        actions={[]}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
        footer={footer}
      />
      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoadingDelete}
        error={""}
        handleDelete={handleDelete}
      />
      <ModalConfirmed
        show={showTransfer}
        handleClose={handleCloseTransfer}
        loading={isLoadingTransfer}
        error={""}
        handleConfirmed={handleTransfer}
      />
      <ToastContainer />
    </div>
  );
};

export default ReportContainer;