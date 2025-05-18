// Box.js
import { useState } from 'react';
import { useGetBoxQuery } from '../../../redux/slice/super_admin/box/boxApi';
import Header from '../../../utils/Header';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from '../../../components/Table/DynamicTable';
import { getColumnsBoxContainer } from '../../../components/Table/tableColumns';

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

  

  // Convert boxCache.data (single object) to an array for DynamicTable
  const data = boxCache?.data ? [boxCache.data] : [];

  return (
    <div>
      <Header heading={"الصندوق"} />
      <DynamicTable
        columns={getColumnsBoxContainer}
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