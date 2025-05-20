// AdminsContainer.js
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { useDeleteAdminMutation, useGetAdminsQuery } from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
import ModalDelete from "../../../utils/Modals/DeleteModal/ModalDelete";
import DynamicTable from "../../Table/DynamicTable";
import { getColumnsAdminsContainer } from "../../Table/tableColumns";
import { actionsAdminsContainer } from "../../Table/tableActions";
import { ModalAddAdmin } from "../../../utils/Modals/AddModal/DynamicAddModal";
import { ModalEditAdmin } from "../../../utils/Modals/EditModal/EditModalConfigs";
import ModalShow from "../../../utils/Modals/ModalShow/ModalShow";

const AdminsContainer = ({ show, handleClose, refresh }) => {
    const [page, setPage] = useState(1);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showEdit, setShowEidt] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const {
        data: admins,
        isError,
        error,
        isLoading: loading,
        isFetching
    } = useGetAdminsQuery({ page, refresh }, { refetchOnMountOrArgChange: true });

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




    return (
        <div>
            <DynamicTable
                columns={getColumnsAdminsContainer}
                data={admins?.data || []}
                actions={actionsAdminsContainer(handleShowAdmin, handleShowEdit, handleShowDelete)}
                loading={loading}
                error={error?.data?.message}
                dir="rtl"
            />
            <ModalAddAdmin show={show} handleClose={handleClose} />
            <ModalEditAdmin show={showEdit} handleClose={handleCloseEdit} />
            <ModalDelete
                show={showDelete}
                handleClose={handleCloseDelete}
                loading={isLoading}
                error={""}
                handleDelete={handleDelete}
            />
            <ModalShow show={showAdmin} handleClose={handleCloseShowAdmin} fromPage={"admins"} />


            <ToastContainer />
        </div>
    );
};

export default AdminsContainer;
