// ReportContainer.js
import React, { useState } from 'react';
import { useGetReportQuery } from '../../../redux/slice/super_admin/report/ReportApi';
import { ToastContainer } from 'react-toastify';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { FaDownload } from 'react-icons/fa';
import notify from '../../../utils/useNotification';
import { useMediaQuery } from '@uidotdev/usehooks';
import { baseURLLocal } from '../../../Api/baseURLLocal';
import SearchInput from '../../../utils/super_admin/SearchInput';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../Table/DynamicTable';
import ModalTable from '../../Table/ModalTable';
import { getColumnsReportContainer } from '../../Table/tableColumns';

const ReportContainer = () => {
  const [page, setPage] = useState(1);
  const [selectedReportType, setSelectedReportType] = useState('all_data');
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


  const selectedData = reportCache?.data?.[selectedReportType] || [];


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



        {[
          { id: 'all_data', label: 'جميع البيانات' },
          { id: 'unreserved_signs', label: 'لوحات غير محجوزة' },
          { id: 'reservation_this_week', label: 'الحجز هذا الأسبوع' }
        ].map((type) => (
          <Button
            key={type.id}
            variant={selectedReportType === type.id ? 'contained' : 'outlined'}
            onClick={() => setSelectedReportType(type.id)}
            sx={{
              minWidth: { xs: '90%', sm: '120px', md: '140px' },
              mx: { xs: 0, sm: 0.5 },
              my: { xs: 0.5, sm: 0 }
            }}
          >
            {type.label}
          </Button>
        ))}
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
        columns={getColumnsReportContainer(selectedReportType)}
        data={selectedData}
        actions={[]}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
        footer={footer}
      />

      <ToastContainer />
    </div>
  );
};

export default ReportContainer;