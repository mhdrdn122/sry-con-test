// RoadSignsContainer.js
import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, IconButton } from "@mui/material";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import ModalDelete from '../../../utils/ModalDelete';
import { useDeleteRoadSignMutation, useGetRoadSignsQuery } from '../../../redux/slice/super_admin/road_signs/roadSignsApi';
import ModalAddRoadSign from './ModalAddRoadSign';
import ModalEditRoadSign from './ModalEditRoadSign';
import ModalShowRoadSign from './ModalShowRoadSign';
import { useDispatch, useSelector } from "react-redux";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { addSign, removeSign } from '../../../redux/slice/super_admin/road_signs/selectedSignsSlice';
import ModalAddReserveRoadSign from './ModalAddReserveRoadSign';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import DynamicTable from './DynamicTable';
import RoadSignsTable from './RoadSignsTable';
import ModalShow from '../../../utils/GenericModal';

const RoadSignsContainer = ({ show, handleClose, refresh, searchWord, startDate, endDate,
  showAddReserve, handleCloseAddReserve, city, status
}) => {
  const [page, setPage] = useState(1);
  const [showSignRoad, setShowSignRoad] = useState(false);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roadSignsCache, setRoadSignsCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const isSuperAdmin = superAdminInfo?.role === "super";

  const dispatch = useDispatch();
  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchWord);
      setPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  const {
    data: roadSigns,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetRoadSignsQuery({ refresh, searchWord, startDate, endDate, city, status },
    { refetchOnMountOrArgChange: true });

  useCacheInLocalStorage(roadSigns, "roadSignsCache", setRoadSignsCache, setLoadingData);

  const [
    deleteRoadSign,
    { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
  ] = useDeleteRoadSignMutation();

  const handleShowRoadSign = (data) => {
    setShowSignRoad(data);
  };
  const handleCloseShowRoadSign = () => {
    setShowSignRoad(false);
  };

  const handleShowEdit = (roadSign) => {
    setShowEidt(roadSign);
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
      const result = await deleteRoadSign(showDelete).unwrap();
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

  // const onPress = async (page) => {
  //   setPage(page);
  // };

  // const handleCheckboxChange = (event, roadSign) => {
  //   if (event.target.checked) {
  //     dispatch(addSign(roadSign));
  //   } else {
  //     dispatch(removeSign(roadSign));
  //   }
  // };

  // Define columns for DynamicTable
  const columns = [
    { key: 'coding.model', label: 'نموذج', align: 'center' },
    { key: 'signs_number', label: 'عدد اللوحات', align: 'center' },
    { key: 'number_of_faces', label: 'عدد الأوجه', align: 'center' },
    { key: 'meters_number', label: 'عدد الأمتار', align: 'center' },
    { key: 'meters_number_printing', label: 'عدد أمتار الطباعة', align: 'center' },
    { 
      key: 'coding.size', 
      label: 'القياس', 
      align: 'center',
      render: (row) => `${row.coding.size} / ${row.coding.type}`
    },
    { key: 'region', label: 'المنطقة', align: 'center' },
    { key: 'place', label: 'مكان التموضع', align: 'center' },
    { key: 'direction', label: 'الاتجاه', align: 'center' },
    {
      key: 'status',
      label: 'الحالة',
      align: 'center',
      render: (row) => (
        <td 
          className="badge badge-primary p-2 text-white"
          style={{ backgroundColor: row.color }}
        >
          {console.log(row)}
          {row.color === "gold"
            ? row.status
            : row.reservations.length > 0
              ? `محجوز/${row.total_faces_in_reservations}`
              : "متاح"}
        </td>
      )
    }
  ];

  // Define actions for DynamicTable
  const actions = [
    {
      label: 'View',
      icon: <FaEye />,
      color: '#289FBF',
      onClick: handleShowRoadSign
    },
    ...(isSuperAdmin ? [
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
    ] : [])
  ];


  return (
    <div>
      <div className=' p-0 text-center'>
{
  <RoadSignsTable data={roadSigns?.coding_count} isLoading={isFetching} />
}
      </div>
      
      <DynamicTable
        columns={columns}
        data={roadSignsCache?.data || []}
        actions={actions}
        loading={isFetching}
        error={error?.data?.message}
        dir="rtl"
      />

      <ToastContainer />
      <ModalAddRoadSign show={show} handleClose={handleClose} />
      <ModalAddReserveRoadSign show={showAddReserve} handleClose={handleCloseAddReserve} />
      <ModalEditRoadSign show={showEdit} handleClose={handleCloseEdit} />
      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoading}
        error={""}
        handleDelete={handleDelete}
      />
      {/* <ModalShowRoadSign show={showSignRoad} handleClose={handleCloseShowRoadSign} /> */}
      <ModalShow show={showSignRoad} handleClose={handleCloseShowRoadSign} fromPage={"roadSing"} />
    </div>
  );
};

export default RoadSignsContainer;
