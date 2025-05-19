import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { Modal, Spinner, Table } from "react-bootstrap";
  import { useEffect, useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { useDispatch, useSelector } from "react-redux";
  import notify from "../../../utils/useNotification";
  import React from 'react'
  import { removeSign, setSelectedSigns, updateSelectedSigns, updateSignValue } from "../../../redux/slice/super_admin/road_signs/selectedSignsSlice";
  import { useGetUsersQuery } from "../../../redux/slice/super_admin/users/usersApi";
  import { useAddNewReservationMutation, useCalculateReservationMutation } from "../../../redux/slice/super_admin/reservations/reservationsApi";
  
  const ModalAddReserveRoadSign = ({show,handleClose,inputFields}) => { // show : true
    console.log('show : ',show)
    console.log('inputFields : ',inputFields)
      const isNonMobile = useMediaQuery("(min-width:600px)");
      const dispatch = useDispatch();
  
      const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);
      console.log('selected Signs : ',selectedSigns)
          // users
              const {
                  data: users,
                  // isError,
                  error,
                  isLoading: UsersLoading,
                  isFetching:UsersIsFetching
              } = useGetUsersQuery({ page:1,  refresh:false ,per_page:1000}, { refetchOnMountOrArgChange: true });
                
              const [
                  addNewReservation,
                  { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
              ] = useAddNewReservationMutation();

              const [
                calculateReservation,
                {data:dataCalculate ,isLoading: isLoadingCalculate, isSuccess:isSuccessCalculate,
                  isError: isErrorCalculate, error: errorCalculate },
            ] = useCalculateReservationMutation();

        const formik = useFormik({
                initialValues: {
                data:selectedSigns,
                type: inputFields?.type || "",
                start_date:inputFields?.start_date ||"",
                end_date:inputFields?.end_date ||"",
                with_print: "",
                user_id: inputFields?.user_id ||"",
                format:""
                },
                enableReinitialize:true,
                onSubmit: async (values) => {
                if (!validateFields()) {
                    return; // Stop submission if validation fails
                }
                values.data=selectedSigns
                    console.log("values : ",values);
                const result = await addNewReservation(values).unwrap();
            },
            validationSchema: Yup.object({
                }),})

          useEffect(() => {
              if (!isLoadingAdd && isSuccess) {
                notify("Added successfully", "success");
                handleClose();
                formik.resetForm();
                dispatch(updateSelectedSigns([])); // Reset selectedSigns in Redux

              }
            }, [isSuccess, isLoadingAdd]);
            useEffect(() => {
              if (!isLoadingCalculate && isSuccessCalculate) {
                notify("Calculated successfully", "success");
              }
              console.log('dataCalculate : ',dataCalculate)
            }, [isSuccessCalculate, isLoadingCalculate]);

            useEffect(() => {
              if (isError) {
                console.error("Failed to add Reservation:", errorAdd);
                if (errorAdd.status === "FETCH_ERROR") {
                  notify("No Internet Connection", "error");
                } else if (errorAdd.status === 401) {
                  triggerRedirect();
                } else {
                  notify(errorAdd.data.message, "error");
                  formik.setErrors(errorAdd.data?.errors || {});
                }
              }
            }, [isError, errorAdd]);

            useEffect(() => {
              if (isErrorCalculate) {
                console.error("Failed to add Reservation:", errorCalculate);
                if (errorCalculate.status === "FETCH_ERROR") {
                  notify("No Internet Connection", "error");
                } else if (errorCalculate.status === 401) {
                  triggerRedirect();
                } else {
                  notify(errorCalculate.data.message, "error");
                  formik.setErrors(errorCalculate.data?.errors || {});
                }
              }
            }, [isErrorCalculate, errorCalculate]);
                        
      const [type, setType] = useState(""); // State to store selected value
  
  const handleChangeType = (event, signId) => {
      // setType(event.target.value);
      dispatch(updateSignValue({ id: signId, field: "format", value: event.target.value }));
  
    };
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
    
    return (
     <Modal show={show} onHide={handleClose} centered size="lg">
        <form 
        onSubmit={formik.handleSubmit} 
        autoComplete="off">
           <Modal.Header className="d-flex justify-content-center">
               <Modal.Title>إضافة الحجز للوحات المختارة</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>إجراء</th>
            <th>التواريخ المحجوزة</th>
            <th>عدد أمتار الطباعة</th>
            <th>عدد الأوجه</th>
            <th>عدد اللوحات</th>
            <th>المكان</th>
            <th>المنطقة</th>
          </tr>
        </thead>
        <tbody>
          {selectedSigns?.map((item) => (
            <tr key={item.id}>
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
          {item?.reservations?.length > 0 ? (
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
            value={item.facesValue ?? ''}
            onChange={(e) => {
              let value = parseInt(e.target.value, 10) || 0;
              value = Math.min(Math.max(value, 0), item.number_of_faces);
              dispatch(updateSignValue({ id: item.id, field: "facesValue", value }));
            }}
            max={item.number_of_faces}
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
            <p style={{ color: 'red', fontSize: '12px' }}>{errors[item.id].facesValue}</p>
          )}
        </td>
 <td>
          <input
            type="number"
            value={item.signsValue ?? ''}
            max={item.signs_number}
            min={0}
            onChange={(e) => {
              let value = parseInt(e.target.value, 10) || 0;
              value = Math.min(Math.max(value, 0), item.signs_number);
              dispatch(updateSignValue({ id: item.id, field: "signsValue", value }));
            }}
            style={{
              width: "80px",
              textAlign: "center",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors[item.id]?.signsValue && (
            <p style={{ color: 'red', fontSize: '12px' }}>{errors[item.id].signsValue}</p>
          )}
        </td>

        <td>{item.place}</td>
        <td>{item.region}</td>
      </tr>
    ))}
  </tbody>
</Table>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex flex-col items-center bg-white px-6 py-3 rounded-lg shadow-sm">
          <p className="text-lg font-bold text-gray-700">الإجمالي</p>
          <p className="text-xl font-semibold text-blue-600">
            {dataCalculate?.data && selectedSigns.length > 0 && `${dataCalculate?.data?.total} $`}
          </p>
        </div>

        <div className="flex flex-col items-center bg-white px-6 py-3 rounded-lg shadow-sm">
          <p className="text-lg font-bold text-gray-700">عدد أمتار الطباعة</p>
          <p className="text-xl font-semibold text-green-600">
            {dataCalculate?.data && selectedSigns.length > 0 && `${dataCalculate?.data?.meters_number_printing}`}
          </p>
        </div>

        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#1976D2",
            color: "white",
            fontWeight: "bold",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
            "&:disabled": {
              backgroundColor: "#B0BEC5",
              color: "#ECEFF1",
            },
          }}
          onClick={() => calculateReservation(formik.values)}
          disabled={isLoadingCalculate || selectedSigns.length === 0}
        >
          {isLoadingCalculate ? <Spinner size="sm" animation="border" /> : "حساب السعر"}
        </Button>
      </div>

               <Box
                  m="40px 0 0 0"
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, 1fr)" // تعديل هنا لتكون 4 أعمدة
                  sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
              >
              {/* Date Input */}
              {/* <FormControl
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
          </FormControl> */}
  
              {/* Date Input */}
              {/* <FormControl
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
          </FormControl> */}
  
          
          {/* <FormControl
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  sx={{ gridColumn: "span 2" }}
                  error={!!formik.touched.type && !!formik.errors.type}
                  >
                  <InputLabel id="type">مؤقت أو دائم</InputLabel>
                  <Select
                  //   InputLabelProps={{ shrink: true }}
                      labelId="type"
                      id="type"
                      name="type"
                      label="مؤقت أو دائم"
                      // size="small"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                  >
                  <MenuItem  value="temporary">
                  {"مؤقت"}
                  </MenuItem>
                  <MenuItem  value="permanent">
                  {"دائم"}
                  </MenuItem>
              </Select>
              {formik.touched.type && formik.errors.type && (
                  <FormHelperText>{formik.errors.type}</FormHelperText>
              )}
          </FormControl> */}
                  {/* with print  */}
             

              {/* with user  */}
              {/* <FormControl
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  sx={{ gridColumn: "span 2" }}
                  error={!!formik.touched.user_id && !!formik.errors.user_id}
              >
                  <InputLabel id="user_id">المستخدم</InputLabel>
                  <Select
                  InputLabelProps={{ shrink: true }}
                  labelId="user_id"
                  id="user_id"
                  name="user_id"
                  label="المستخدم"
                  value={formik.values.user_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  >
                  {users &&
                      users.data &&
                      users.data.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                          {item.name} - {item.company_name}
                      </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.user_id && formik.errors.user_id && (
                  <FormHelperText>{formik.errors.user_id}</FormHelperText>
                  )}
              </FormControl> */}
              </Box>
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
      </Modal>
    )
  }
  
  export default ModalAddReserveRoadSign