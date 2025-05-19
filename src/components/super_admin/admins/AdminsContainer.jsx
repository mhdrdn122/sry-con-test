// AdminsContainer.js
import {  useState } from "react";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { useDeleteAdminMutation, useGetAdminsQuery } from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
import ModalDelete from "../../../utils/Modals/DeleteModal/ModalDelete";
// import ModalEditAdmin from "./ModalEditAdmin";
import useCacheInLocalStorage from "../../../hooks/superAdmin/useCacheInLocalStorage";
import ModalShow from "../../../utils/Modals/ShowModal/GenericModal";
import DynamicTable from "../../Table/DynamicTable";
import { getColumnsAdminsContainer } from "../../Table/tableColumns";
import { actionsAdminsContainer } from "../../Table/tableActions";
import { ModalAddAdmin } from "../../../utils/Modals/AddModal/DynamicAddModal";
import { ModalEditAdmin } from "../../../utils/Modals/EditModal/EditModalConfigs";

const AdminsContainer = ({ show, handleClose, refresh }) => {
    const [page, setPage] = useState(1);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showEdit, setShowEidt] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [adminsCache, setAdminsCache] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    const {
        data: admins,
        isError,
        error,
        isLoading: loading,
        isFetching
    } = useGetAdminsQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

    useCacheInLocalStorage(admins, "admins", setAdminsCache, setLoadingData);

    const [
        deleteAdmin,
        { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
    ] = useDeleteAdminMutation();

    const handleShowAdmin = (data) => {
        setShowAdmin(data);
    };
    const handleCloseShowAdmin = () => {
        setShowAdmin(false);
    };
    const handleShowEdit = (admin) => {
        setShowEidt(admin);
    };
    const handleCloseEdit = () => {
        setShowEidt(false);
    };
    const handleShowDelete = (id) => {
        setShowDelete(id);
    };
    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const handleDelete = async () => {
        try {
            const result = await deleteAdmin(showDelete).unwrap();
            if (result.status === true) {
                notify(result.msg, "success");
                handleCloseDelete();
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

    const onPress = async (page) => {
        setPage(page);
    };


    
    return (
        <div>
            <DynamicTable
                columns={getColumnsAdminsContainer}
                data={adminsCache?.data || []}
                actions={actionsAdminsContainer(handleShowAdmin, handleShowEdit, handleShowDelete)}
                loading={loadingData}
                error={error?.data?.message}
                dir="rtl"
            />
          <ModalAddAdmin show={show} handleClose={handleClose}/> 
            {/* <ModalEditAdmin show={showEdit} handleClose={handleCloseEdit} /> */}
            <ModalEditAdmin show={showEdit} handleClose={handleCloseEdit}  />
            <ModalDelete
                show={showDelete}
                handleClose={handleCloseDelete}
                loading={isLoading}
                error={""}
                handleDelete={handleDelete}
            />
            <ModalShow show ={showAdmin} handleClose={handleCloseShowAdmin} fromPage={"admins"} />
            {adminsCache?.meta?.total_pages > 1 && (
                <Pagination onPress={onPress} pageCount={adminsCache?.meta?.total_pages} />
            )}
            <ToastContainer />
        </div>
    );
};

export default AdminsContainer;
