// src/components/EmployeesActivitiesContainer.js
import React, { useState } from 'react';
import { useGetEmployeesActivitiesQuery } from '../../../redux/slice/super_admin/employees_activities/employees_activitiesApi';
import DynamicTable from '../../Table/DynamicTable';
import { getColumnsEmployeesActivitiesContainer } from '../../Table/tableColumns';
import { actionsEmployeesActivitiesContainer } from '../../Table/tableActions';
import ModalShow from '../../../utils/Modals/ModalShow/ModalShow';

const EmployeesActivitiesContainer = ({ refresh }) => {
  const [page, setPage] = useState(1);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const {
    data: activities,
    isError,
    error,
    isLoading: loading,
    isFetching,
  } = useGetEmployeesActivitiesQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

  const handleShowActivities = (data) => {
    setShowActivities(true);
    setSelectedActivity(data);
    console.log('Activity Data:', data);
  };

  const handleCloseShowActivities = () => {
    setShowActivities(false);
    setSelectedActivity(null);
  };

  return (
    <div>
      <DynamicTable
        columns={getColumnsEmployeesActivitiesContainer}
        data={activities?.data?.data || []}
        actions={actionsEmployeesActivitiesContainer(handleShowActivities)}
        loading={loading || isFetching}
        error={error?.data?.message}
        dir="rtl"
      />

      <ModalShow
        show={selectedActivity}
        handleClose={handleCloseShowActivities}
        fromPage="activities"
      />
    </div>
  );
};

export default EmployeesActivitiesContainer;