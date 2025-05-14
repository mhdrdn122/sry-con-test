import {Box,Button,FormControl,FormHelperText,IconButton,TextField,Tooltip,useMediaQuery,} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddNewReservationContractMutation, useShowOneContractQuery } from "../../../redux/slice/super_admin/contracts/contractsApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import notify from "../../../utils/useNotification";
import { removeSign, setSelectedSigns, updateSelectedSigns, updateSignValue } from "../../../redux/slice/super_admin/road_signs/selectedSignsSlice";
import { useAddNewReservationMutation, useCalculateReservationMutation } from "../../../redux/slice/super_admin/reservations/reservationsApi";

const ModalRenewalContract = ({show , handleClose}) => {
    const dispatch = useDispatch();
        const isNonMobile = useMediaQuery("(min-width:600px)");
       const {
            data: oneContract,
            isLoading: loading,
            isSuccess: isSuccessShowOne,
          } = useShowOneContractQuery(show.id, { skip: !show });

      const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);
          console.log('selectedSigns : ',selectedSigns)
    const formik = useFormik({
            initialValues: {
            data:selectedSigns,
            start_date:show?.start_date ||"",
            end_date:show?.end_date ||"",
          },
            enableReinitialize:true,
            onSubmit: async (values) => {
            if (!validateFields()) {
                return; // Stop submission if validation fails
            }
            values.data=selectedSigns
                console.log("values : ",values);
            const result = await addNewReservationContract(values).unwrap();
        },
        validationSchema: Yup.object({
            }),})
        const [errors, setErrors] = useState({}); // Track errors for input fields
        
            const validateFields = () => {
            let newErrors = {};
            
        selectedSigns.forEach((item) => {
            if (!item.facesValue) {
            newErrors[item.id] = { ...newErrors[item.id], facesValue: "هذا الحقل مطلوب" };
            }
            if (!item.signsValue) {
            newErrors[item.id] = { ...newErrors[item.id], signsValue: "هذا الحقل مطلوب" };
            }
            // if (!item.format) {
            //   newErrors[item.id] = { ...newErrors[item.id], format: "هذا الحقل مطلوب" };
            // }
        });
        
        setErrors(newErrors);
        console.log('newErrors : ',newErrors  )
        return Object.keys(newErrors).length === 0; // Returns true if no errors
        };
        const [
          addNewReservationContract,
          { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
        ] = useAddNewReservationContractMutation();
        
        const [
          calculateReservation,
            {data:dataCalculate ,isLoading: isLoadingCalculate, isSuccess:isSuccessCalculate,
              isError: isErrorCalculate, error: errorCalculate },
            ] = useCalculateReservationMutation();
            useEffect(() => {
              if (isError) {
                console.error("Failed to add Reservation:", errorAdd);
                if (errorAdd.status === "FETCH_ERROR") {
                  notify("No Internet Connection", "error");
                } else if (errorAdd.status === 401) {
                  console.error("Failed to add Reservation:", errorAdd);
                } else {
                  notify(errorAdd.data.message, "error");
                  formik.setErrors(errorAdd.data?.errors || {});
                }
              }
            }, [isError, errorAdd]);
            useEffect(() => {
              if (!isLoadingAdd && isSuccess) {
                notify("Added successfully", "success");
                handleClose();
                formik.resetForm();
                dispatch(updateSelectedSigns([])); // Reset selectedSigns in Redux

              }
            }, [isSuccess, isLoadingAdd]);
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header  closeButton className="d-flex justify-content-center">
        <Modal.Title>التفاصيل</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
      <form 
        onSubmit={formik.handleSubmit} 
        autoComplete="off">
           <Modal.Header className="d-flex justify-content-center">
               <Modal.Title>إضافة الحجز للوحات المختارة</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <Box
        m="10px 0 10px 0"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, 1fr)" // تعديل هنا لتكون 4 أعمدة
        sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
    >
    {/* Date Input */}
        <FormControl
    variant="outlined"
    fullWidth
    margin="dense"
    sx={{ gridColumn: "span 2" }}
    error={!!formik.touched.start_date && !!formik.errors.start_date}
    >
            <TextField
              id="start_date"
              name="start_date"
              label="تاريخ البدء"
              type="date"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputLabelProps={{
                  shrink: true, // Ensures the label stays above the input
                }}
             
              fullWidth
            />
            {formik.touched.start_date && formik.errors.start_date && (
              <FormHelperText>{formik.errors.start_date}</FormHelperText>
            )}
          </FormControl>
              {/* Date Input */}
              <FormControl
            variant="outlined"
            fullWidth
            margin="dense"
            sx={{ gridColumn: "span 2" }}
            error={!!formik.touched.start_date && !!formik.errors.start_date}
          >
            <TextField
              id="end_date"
              name="end_date"
              label="تاريخ النهاية"
              type="date"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{
                  shrink: true, // Ensures the label stays above the input
                }}
              fullWidth
            />
            {formik.touched.end_date && formik.errors.end_date && (
              <FormHelperText>{formik.errors.end_date}</FormHelperText>
            )}
          </FormControl>
              </Box>
           <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>إجراء</th>
            <th>حذف</th>
            <th>التواريخ المحجوزة</th>
            <th>عدد أمتار الطباعة</th>
            <th>عدد الأوجه</th>
            <th>عدد اللوحات</th>
            <th>المكان</th>
            <th>المنطقة</th>
          </tr>
        </thead>
        <tbody>
  {oneContract?.data?.map((item) => {
    const isChecked = selectedSigns.some((sign) => sign.id === item.id);
    
    return (
      <tr key={item.id}>
        <td>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(updateSelectedSigns([
                  ...selectedSigns, 
                  { ...item, facesValue: item.number_of_faces, signsValue: item.signs_number }
                ])); 
              } else {
                dispatch(updateSelectedSigns(selectedSigns.filter((sign) => sign.id !== item.id)));
              }
            }}
          />
        </td>
        <td>
          <Tooltip title="حذف" placement="top">
            <IconButton
              sx={{ color: "red" }}
              onClick={() => dispatch(removeSign({ id: item.id }))}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </td>
        <td>
          {item.reservations.length > 0 ? (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>إلى</th>
                  <th>من</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {item.reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td>{reservation.end_date}</td>
                    <td>{reservation.start_date}</td>
                    <td>{index + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>لا توجد حجوزات</p>
          )}
        </td>
        <td>{item.meters_number_printing}</td>
        <td>
  <input
    type="number"
    value={
      selectedSigns.find((sign) => sign.id === item.id)?.facesValue ?? ""
    }
    onChange={(e) => {
      let value = parseInt(e.target.value, 10) || 0;
      console.log('Value entered:', value);
      value = Math.min(Math.max(value, 0), item.max_number_of_faces);
      console.log('After applying max limit:', value);
      
      dispatch(updateSignValue({ id: item.id, field: "facesValue", value }));
    }}
    max={item.max_number_of_faces}
    min={0}
    style={{
      width: "80px",
      textAlign: "center",
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    }}
  />
  {errors[item.id]?.facesValue && (
    <p style={{ color: "red", fontSize: "12px" }}>{errors[item.id].facesValue}</p>
  )}
</td>

<td>
  <input
    type="number"
    value={
      selectedSigns.find((sign) => sign.id === item.id)?.signsValue ?? ""
    }
    onChange={(e) => {
      let value = parseInt(e.target.value, 10) || 0;
      console.log('Value entered:', value);
      value = Math.min(Math.max(value, 0), item.max_signs_number);
      console.log('After applying max limit:', value);
      
      dispatch(updateSignValue({ id: item.id, field: "signsValue", value }));
    }}
    max={item.max_signs_number}
    min={0}
    style={{
      width: "80px",
      textAlign: "center",
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    }}
  />
  {errors[item.id]?.signsValue && (
    <p style={{ color: "red", fontSize: "12px" }}>{errors[item.id].signsValue}</p>
  )}
</td>

        <td>{item.road_sign_place}</td>
        <td>{item.road_sign_region}</td>
      </tr>
    );
  })}
</tbody>

</Table>

          </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="contained"
                    className="mx-2"
                    onClick={() => {
                    handleClose();
                    formik.resetForm();
                        dispatch(updateSelectedSigns([]));
                    }}
                >
                    تجاهل
                </Button>
                {isLoadingAdd === true ? (
                  <Button variant="contained" className="">
                  <Spinner
                      className="m-auto"
                      animation="border"
                      role="status"
                  ></Spinner>
                  </Button>
              ) : (
                  <Button variant="contained" type="submit" className="">
                          حفظ
                  </Button>  
                )}
   </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRenewalContract