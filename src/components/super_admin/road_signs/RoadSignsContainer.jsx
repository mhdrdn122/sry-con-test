// RoadSignsContainer.js
import React, { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import ModalDelete from '../../../utils/Modals/DeleteModal/ModalDelete';
import { useDeleteRoadSignMutation, useGetRoadSignsQuery } from '../../../redux/slice/super_admin/road_signs/roadSignsApi';
import DynamicTable from '../../Table/DynamicTable';
import ModalTable from '../../Table/ModalTable';
import { getColumnsRoadSignContainer } from '../../Table/tableColumns';
import { actionsRoadSignsContainer } from '../../Table/tableActions';
import { ModalAddRoadSign } from '../../../utils/Modals/AddModal/DynamicAddModal';
import { ModalEditRoadSign } from '../../../utils/Modals/EditModal/EditModalConfigs';
import ModalShow from '../../../utils/Modals/ModalShow/ModalShow';

const RoadSignsContainer = ({ show, handleClose, refresh, searchWord, startDate, endDate, city, status
}) => {
  const [page, setPage] = useState(1);
  const [showSignRoad, setShowSignRoad] = useState(false);
  const [showEdit, setShowEidt] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const isSuperAdmin = superAdminInfo?.role === "super";


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

  console.log(roadSigns)

  return (
    <div>
      <div className=' p-0 text-center'>
        {
          <ModalTable data={roadSigns?.coding_count} isLoading={isFetching} />
        }
      </div>

      <DynamicTable
        columns={getColumnsRoadSignContainer}
        data={roadSigns?.data || []}
        actions={actionsRoadSignsContainer(handleShowRoadSign, handleShowEdit, handleShowDelete, isSuperAdmin)}
        loading={loading}
        error={error?.data?.message}
        dir="rtl"
      />

      <ToastContainer />
      <ModalAddRoadSign show={show} handleClose={handleClose} />
      {/* <ModalEditRoadSign show={showEdit} handleClose={handleCloseEdit} /> */}
      <ModalEditRoadSign show={showEdit} handleClose={handleCloseEdit}  />
      <ModalDelete
        show={showDelete}
        handleClose={handleCloseDelete}
        loading={isLoading}
        error={""}
        handleDelete={handleDelete}
      />
      <ModalShow show={showSignRoad} handleClose={handleCloseShowRoadSign} fromPage={"roadSing"} />
    </div>
  );
};

export default RoadSignsContainer;
