import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Modal, Spinner,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import notify from "../../../utils/useNotification";
import { GiReceiveMoney } from "react-icons/gi";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeletePaymentMutation, useReceivedPaymentMutation, useShowOneHistoryPaymentQuery } from '../../../redux/slice/super_admin/payments/paymentsApi';
import ModalDelete from "../../../utils/Modals/DeleteModal/ModalDelete";
import { AiFillPicture } from "react-icons/ai";


const ModalShowPayment = ({show,handleClose}) => {
  console.log('show payment : ',show)
  const [showPic,setShowPic]=useState('');
     const {
          data: onePaymentHistory,
          isLoading: loading,
          isSuccess: isSuccessShowOne,
        } = useShowOneHistoryPaymentQuery(show.user_id, { skip: !show });
        
          const [showDelete, setShowDelete] = useState(false);

        const [
            deletePayment,
            { isLoading, isSuccess, isError: isErrDelete, error: errorDel },
            ] = useDeletePaymentMutation();

            const [
              receivedPayment,
              { isLoading : receivedIsLoading, isSuccess:receivedIsSuccess,
                 isError: isErrReceived, error: errorReceived },
              ] = useReceivedPaymentMutation();

            const handleShowDelete = (id) => {
              setShowDelete(id);
            };
            const handleCloseDelete = () => {
              setShowDelete(false);
            };
            const handleShowReceipt = (payment) => {
              console.log("Receipt Image URL:", payment.image);

              setShowPic(payment);
            }
            const handleCloseShowReceipt = () => {
              setShowPic(false)
            }
            const handleReceived = async(id)=>{
              try {
                const result = await receivedPayment(id).unwrap();
                console.log('received result : ',result)
                if (result.status === true) {
                  notify(result.message, "success");
                  handleCloseDelete();
                } else {
                  notify(result.message, "error");
                }
                
              } catch (error) {
                if (error?.status === 401) {
                  triggerRedirect();
                } else {
                  console.error("Failed:", error);
                  notify(error?.data?.message, "error");
                }
              }

            }
            const handleDelete = async () => {
              try {
                const result = await deletePayment(showDelete).unwrap();
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

     

  return (
    <>
    <Modal
    show={show}
    onHide={handleClose}
    centered
    style={{ direction: "rtl" , textAlign:'center' ,justifyContent:'center' }}
    size="lg" // Makes the modal bigger for larger content
  >
    <Modal.Header>
    </Modal.Header>
    <Modal.Body>
       {/* Invoice Summary */}
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
            <td style={{ width: "30%" }}>اسم الشركة</td>
            <td style={{ width: "60%" }}>{show.company_name}</td>
            </tr>
            <tr>
              <td>رقم الشركة</td>
              <td>{show.company_phone}</td>
            </tr>
            <tr>
              <td>ايميل الشركة</td>
              <td>{show.company_email}</td>
            </tr>
            </tbody>
            </Table>
        {/* Orders List */}
        <Modal.Title className="mb-3">تفاصيل الدفعات</Modal.Title>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {/* <th>الرقم</th> */}
              <th>المدير</th>
              {/* <th>النوع</th> */}
              <th>الموظف</th>
              <th>المبلغ المدفوع</th>
              <th>تاريخ الدفع</th>
              <th>الحالة</th>
              <th>الحدث</th>
              {/* <th>الحالة</th> */}
            </tr>
          </thead>
          <tbody>
            {onePaymentHistory?.data?.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.super_admin_name}</td>
                <td>{payment.admin_name}</td>
                <td>{payment.amount_paid}</td>
                <td>{payment.created_at}</td>
                <td>{payment.status}</td>
                <td>
                {(
                    <Tooltip title="received" placement="top">
                    <IconButton
                      disabled={receivedIsLoading?true:false}
                        sx={{ color: "#000" }}
                        onClick={() => handleReceived(payment.id)}
                    >
                        <GiReceiveMoney />
                    </IconButton>
                </Tooltip>
                )}
                  {(
                    <Tooltip title="Delete" placement="top">
                    <IconButton
                        sx={{ color: "#000" }}
                        onClick={() => handleShowDelete(payment.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                )}
                  {(
                    <Tooltip title="receipt" placement="top">
                    <IconButton
                        sx={{ color: "#000" }}
                        onClick={() => handleShowReceipt(payment)}
                    >

                <AiFillPicture />                    
                </IconButton>
                </Tooltip>
                )}

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      </Modal>

      <ModalDelete
            show={showDelete}
            handleClose={handleCloseDelete}
            loading={isLoading}
            error={""}
            handleDelete={handleDelete}
        />
      <Modal 
       show={showPic}
       onHide={handleCloseShowReceipt}
       centered
       style={{ textAlign:'center' ,justifyContent:'center' }}
        > 
        <Modal.Body>
        {showPic?.image ? (
      <img
        src={showPic.image}
        alt="Receipt"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    ) : (
      <p>No Image Available</p>
    )}
        </Modal.Body>
      </Modal>
      </>
  )
}

export default ModalShowPayment