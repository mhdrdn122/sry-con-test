import { useParams } from 'react-router-dom'
import { useShowUserContractsQuery } from '../../../redux/slice/super_admin/users/usersApi';
import Header from '../../../utils/Header';
import DynamicTable from '../../../components/Table/DynamicTable';
import { getColumnsUserContractsContainer } from '../../../components/Table/tableColumns';
import { actionsUsersContracts } from '../../../components/Table/tableActions';

const UserContracts = () => {
  const params = useParams();
  const {
    data: oneContract,
    isFetching,
    error,
    isLoading,
  } = useShowUserContractsQuery(params.id, { skip: !params.id });

  const handleDownload = (contract) => {
    if (!contract?.url) {
      alert("No file URL available.");
      return;
    }
    const link = document.createElement("a");
    link.href = contract.url;
    link.download = contract.url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <div>
      <Header heading={"كافة العقود"} />
      <DynamicTable
        columns={getColumnsUserContractsContainer}
        data={oneContract?.data || []}
        actions={actionsUsersContracts(handleDownload , isLoading , isFetching)}
        loading={isFetching || isLoading}
        error={error?.data?.message}
        dir="rtl"
      />
    </div>
  );
};

export default UserContracts;