// Box.js
import { useState } from 'react';
import { useGetBoxQuery } from '../../../redux/slice/super_admin/box/boxApi';
import Header from '../../../utils/Header';
import DynamicTable from '../../../components/Table/DynamicTable';
import { getColumnsBoxContainer } from '../../../components/Table/tableColumns';

const Box = () => {

  const {
    data: box,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetBoxQuery({ refetchOnMountOrArgChange: true });

  

  // Convert boxCache.data (single object) to an array for DynamicTable
  const data = boxCache?.data ? [boxCache.data] : [];

  return (
    <div>
      <Header heading={"الصندوق"} />
      <DynamicTable
        columns={getColumnsBoxContainer}
        data={box}
        actions={[]}
        loading={loading}
        error={error?.data?.message}
        dir="rtl"
      />
    </div>
  );
};

export default Box;