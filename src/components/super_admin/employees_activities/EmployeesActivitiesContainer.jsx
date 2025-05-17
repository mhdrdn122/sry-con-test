// EmployeesActivitiesContainer.js
import React, { useState } from 'react';
import { useGetEmployeesActivitiesQuery } from '../../../redux/slice/super_admin/employees_activities/employees_activitiesApi';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../Table/DynamicTable';
import { getColumnsEmployeesActivitiesContainer } from '../../Table/tableColumns';
import { actionsEmployeesActivitiesContainer } from '../../Table/tableActions';

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


  return (
    <div>
      <DynamicTable
        columns={getColumnsEmployeesActivitiesContainer}
        data={activitiesCache?.data?.data || []}
        actions={actionsEmployeesActivitiesContainer(handleShowActivities)}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
    </div>
  );
};

export default EmployeesActivitiesContainer;