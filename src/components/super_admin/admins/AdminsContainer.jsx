// AdminsContainer.js
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import Pagination from "../../../utils/Pagination";
import { useDeleteAdminMutation, useGetAdminsQuery } from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
import ModalAddAdmin from "./ModalAddAdmin";
import ModalDelete from "../../../utils/ModalDelete";
import ModalShowAdmin from "./ModalShowAdmin";
import ModalEditAdmin from "./ModalEditAdmin";
import useCacheInLocalStorage from "../../../hooks/superAdmin/useCacheInLocalStorage";
import DynamicTable from "../road_signs/DynamicTable";
import { tableColumns } from "../../Table/tableColumns";
import { tableActions } from "../../Table/tableActions";
// import DynamicTable from "./DynamicTable";

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

    // Define columns for DynamicTable
    const columns = [
        { key: 'name', label: 'الاسم', align: 'center' },
        { key: 'username', label: 'اسم الأدمن', align: 'center' },
        {
            key: 'address',
            label: 'العنوان',
            align: 'center',
            render: (row) => row.address || '...'
        },
        { key: 'role', label: 'roles', align: 'center' }
    ];

    // Define actions for DynamicTable
    const actions = [
        {
            label: 'View',
            icon: <FaEye />,
            color: '#289FBF',
            onClick: handleShowAdmin
        },
        {
            label: 'Edit',
            icon: <EditOutlinedIcon />,
            color: 'orange',
            onClick: handleShowEdit
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            color: 'red',
            onClick: (row) => handleShowDelete(row.id)
        }
    ];
    
    return (
        <div>
            <DynamicTable
                columns={columns}
                data={adminsCache?.data || []}
                actions={actions}
                loading={loadingData}
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
            <ModalShowAdmin show={showAdmin} handleClose={handleCloseShowAdmin} />
            {adminsCache?.meta?.total_pages > 1 && (
                <Pagination onPress={onPress} pageCount={adminsCache?.meta?.total_pages} />
            )}
            <ToastContainer />
        </div>
    );
};

export default AdminsContainer;
