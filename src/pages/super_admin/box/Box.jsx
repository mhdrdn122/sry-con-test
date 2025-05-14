// Box.js
import React, { useState } from 'react';
import { useGetBoxQuery } from '../../../redux/slice/super_admin/box/boxApi';
import { Spinner } from 'react-bootstrap';
import Header from '../../../utils/Header';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../../components/super_admin/road_signs/DynamicTable';
// import DynamicTable from './DynamicTable';

const Box = () => {
  const [boxCache, setBoxCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const {
    data: box,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetBoxQuery({ refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(box, "box", setBoxCache, setLoadingData);

  // Define columns for DynamicTable
  const columns = [
    {
      key: 'amount_received',
      label: 'المبلغ المقبوض',
      align: 'center',
      render: (row) => row.amount_received || '....'
    },
    {
      key: 'remaining_amount',
      label: 'المبلغ المتبقي',
      align: 'center',
      render: (row) => row.remaining_amount || '....'
    },
    {
      key: 'total',
      label: 'المجموع',
      align: 'center',
      render: (row) => row.total || '....'
    }
  ];

  // Convert boxCache.data (single object) to an array for DynamicTable
  const data = boxCache?.data ? [boxCache.data] : [];

  return (
    <div>
      <Header heading={"الصندوق"} />
      <DynamicTable
        columns={columns}
        data={data}
        actions={[]}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />
    </div>
  );
};

export default Box;