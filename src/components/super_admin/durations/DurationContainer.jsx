import React, { useState } from 'react'
import {
    IconButton,
} from "@mui/material";
import { Spinner } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { useDeleteDurationMutation,useGetDurationsQuery } from '../../../redux/slice/super_admin/durations/durationsApi';
import ModalDelete from '../../../utils/Modals/DeleteModal/ModalDelete';
import ModalAddDuration from './ModalAddDuration';
import ModalEditDuration from './ModalEditDuration';


const DurationContainer = ({ show, handleClose, refresh }) => {
      const [page, setPage] = useState(1);
      const [showEdit, setShowEidt] = useState(false);
      const [showDelete, setShowDelete] = useState(false);
           const {
               data: durations,
               isError,
               error,
               isLoading: loading,
               isFetching
           } = useGetDurationsQuery({ page , refresh}, { refetchOnMountOrArgChange: true });
            const [
            deleteDuration,
            { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
            ] = useDeleteDurationMutation();
           
      const handleShowEdit = (id) => {
        setShowEidt(id);
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
      const result = await deleteDuration(showDelete).unwrap();
      if (result.status === true) {
        notify(result.msg, "success");
        handleCloseDelete();
      } else {
        notify(result.msg, "error");
      }
    } catch (error) {
      // Check for 401 error here
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
    <div className="table-responsive table_container">
    <table className="table" dir="rtl">
      <thead>
        <tr>
          <th className="col"> الاسم </th>
          <th className="col"> عدد الأيام</th>
          <th className="col-3">الحدث </th>
        </tr>
      </thead>
      {isFetching ? (
        <tbody>
          <tr>
            <td colSpan="6">
              <div className="my-4 text-center">
                <p className="mb-2">جار التحميل</p>
                <Spinner
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </div>
            </td>
          </tr>
        </tbody>
      ) : error ? (
        <tbody>
          <tr>
            <td colSpan="6">
              <p className="my-5">{error.data?.message}</p>
            </td>
          </tr>
        </tbody>
      ) 
      : (
        <tbody>
          {durations && durations.data && durations.data.length > 0 ? (
            durations.data.map((duration, i) => (
              <tr key={i}>
                <td style={{ textAlign: "center" }}>{duration.name}</td>
                <td style={{ textAlign: "center" }}>{duration.day}</td>
                <td className="">
                  {
                //   hasPermission(
                //     SuperPermissionsEnum.ADMIN_RESTAURANT_UPDATE
                //   ) &&
                
                  (
                    <IconButton
                      sx={{ color: "#000" }}
                      onClick={() => handleShowEdit(duration.id)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  )}
                  {
                //   hasPermission(
                //     SuperPermissionsEnum.ADMIN_RESTAURANT_DELETE
                //   ) &&
                   (
                    <IconButton
                      sx={{ color: "#000" }}
                      onClick={() => handleShowDelete(duration.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <p className="my-5">لا توجد بيانات</p>
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  </div>
  <ModalAddDuration show={show} handleClose={handleClose} />
  <ModalEditDuration show={showEdit} handleClose={handleCloseEdit} />
  
  <ModalDelete
    show={showDelete}
    handleClose={handleCloseDelete}
    loading={isLoading}
    error={""}
    handleDelete={handleDelete}
  />
{durations?.meta?.total_pages > 1 && (
        <Pagination onPress={onPress} pageCount={durations?.meta?.total_pages} />
      )}
  <ToastContainer />
</div>

  )
}

export default DurationContainer