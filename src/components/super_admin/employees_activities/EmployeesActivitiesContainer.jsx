// EmployeesActivitiesContainer.js
import React, { useState } from 'react';
import { useGetEmployeesActivitiesQuery } from '../../../redux/slice/super_admin/employees_activities/employees_activitiesApi';
import { IconButton, Tooltip } from "@mui/material";
import { FaEye } from 'react-icons/fa';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import { tableColumns } from '../../Table/tableColumns';
import { tableActions } from '../../Table/tableActions';
import DynamicTable from '../../Table/DynamicTable';

const EmployeesActivitiesContainer = ({ refresh }) => {
  const [page, setPage] = useState(1);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activitiesCache, setActivitiesCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    data: activities,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetEmployeesActivitiesQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(activities, "activities", setActivitiesCache, setLoadingData);

  const handleShowActivities = (data) => {
    setSelectedActivity(data);
    setShowActivities(true);
  };

  const handleCloseShowActivities = () => {
    setShowActivities(false);
    setSelectedActivity(null);
  };

  // Define columns for DynamicTable
  const columns = [
    { key: 'description', label: 'العمل', align: 'center' },
    { key: 'created_at', label: 'تاريخه', align: 'center' },
    {
      key: 'causer_name',
      label: 'الفاعل',
      align: 'center',
      render: (row) => row.causer?.name || '...'
    }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'عرض',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: handleShowActivities
    }
  ];

  return (
    <div>
      <DynamicTable
        columns={columns}
        data={activitiesCache?.data?.data || []}
        actions={actions}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
    </div>
  );
};

export default EmployeesActivitiesContainer;