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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import notify from "../../../utils/useNotification";
import React from 'react'
import { removeSign, setSelectedSigns, updateSelectedSigns, updateSignValue } from "../../../redux/slice/super_admin/road_signs/selectedSignsSlice";
import { useGetUsersQuery } from "../../../redux/slice/super_admin/users/usersApi";
import { useAddNewReservationMutation } from "../../../redux/slice/super_admin/reservations/reservationsApi";

const ModalAddReserveRoadSign = ({show,handleClose}) => { // show : true
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

               const formik = useFormik({
                        initialValues: {
                          data:selectedSigns,
                          type: "",
                          start_date: "",
                          end_date:"",
                          with_print: "",
                          user_id: "",
                          format:""
                        },
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
   <Modal show={show} onHide={handleClose} centered>
      <form 
      onSubmit={formik.handleSubmit} 
      autoComplete="off">
         <Modal.Header className="d-flex justify-content-center">
             <Modal.Title>إضافة الحجز للوحات المختارة</Modal.Title>
         </Modal.Header>
         <Modal.Body>
                {selectedSigns?.map((item)=>(
                    <Box key={item.id} sx={{display:"flex",flexDirection:"column",alignItems:"center",
                      textAlign: "center", 
                    }}>
                
                <p className="font-bold ms-4 text-center">{item.region}-{item.place}</p>
                <div className="d-flex flex-col">
                  <div className="d-flex flex-row-reverse items-center gap-4">
                <div className="me-2">
                    <input type="number" 
                     value={item.facesValue ?? ''}
                        onChange={(e) => {
                        let value = parseInt(e.target.value , 10) || 0;
                        value = Math.min(Math.max(value, 0), item.number_of_faces);
                        dispatch(updateSignValue({ id: item.id, field: "facesValue", value }));
                        }}
                    max={item.number_of_faces}
                    min={0}
                    style={{
                      display: 'block',
                      width: '100px',
                      border: '1px solid black',
                      borderRadius: '5px',
                      textAlign: 'center',
                    }}
                    placeholder="عدد الأوجه"
                    />
                    {errors[item.id]?.facesValue && <p style={{ color: 'red', fontSize: '12px' }}>{errors[item.id].facesValue}</p>}

                    </div>
                    <div>
                    <input type="number" 
                        value={item.signsValue ?? ''} // Ensure the value is 0 if undefined
                        max={item.signs_number}
                        min={0}
                        onChange={(e) => {
                        let value = parseInt(e.target.value, 10) || 0;
                        value = Math.min(Math.max(value, 0), item.signs_number); // Enforce min/max
                        dispatch(updateSignValue({ id: item.id, field: "signsValue", value }));
                        }}
                    style={{
                      display: 'block',
                      width: '100px',
                      border: '1px solid black',
                      borderRadius: '5px',
                      textAlign: 'center',
                    }}
                    placeholder="عدد اللوحات"
                    />
                    {errors[item.id]?.signsValue && <p style={{ color: 'red', fontSize: '12px' }}>{errors[item.id].signsValue}</p>}

                    </div>

              {/* Delete Icon */}
              <Button
                onClick={() => dispatch(removeSign({ id: item.id }))}
                sx={{
                  color: "red",
                  minWidth: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DeleteIcon />
              </Button>
              </div>
              <div>
                <div>
                  <p className="font-bold text-end"> : التواريخ المحجوزة</p>
                  <div>
                  {item.reservations.map((reservation, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <div className="flex flex-row-reverse gap-10 items-center">
                    <span>- {index + 1}</span>
                  <p className="font-bold"> {reservation.start_date} : من </p>
                  <p className="font-bold">  {reservation.end_date} : إلى </p>
                  </div>

                </Box>
              ))}
                  </div>
                </div>
                  {/* Check if reservations exist */}
      {item.reservations && item.reservations.length > 0 && (
        <div className="d-flex flex-row-reverse justify-center items-center gap-4">
          {/* From Date Input */}
          <FormControl variant="outlined"  margin="dense" 
            sx={{ 
            width: "150px",  
            fontSize: '8px',  
            padding: '8px' 
          }}>
            <TextField 
              id={`start_date-${item.id}`}
              name={`start_date-${item.id}`}
              label="من تاريخ"
              type="date"
              value={item.start_date || ""}
              onChange={(e) => dispatch(updateSignValue({ id: item.id, field: "start_date", value: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          {/* To Date Input */}
          <FormControl variant="outlined"  margin="dense"  
           sx={{ 
          width: "150px",  
          fontSize: '8px',  
          padding: '8px' 
        }}>
            <TextField
              id={`end_date-${item.id}`}
              name={`end_date-${item.id}`}
              label="إلى تاريخ"
              type="date"
              value={item.end_date || ""}
              onChange={(e) => dispatch(updateSignValue({ id: item.id, field: "end_date", value: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
        </div>
      )}
              </div>
            </div>
                <hr style={{height:'10px',color:'black',fontSize:'10px',lineHeight:'10px',
                    width:'100px'
                }}/>
                    </Box>
            ))}
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

        
        <FormControl
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
        </FormControl>
                {/* with print  */}
                <FormControl
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{ gridColumn: "span 2" }}
                error={!!formik.touched.with_print && !!formik.errors.with_print}
                >
                <InputLabel id="with_print">مع طباعة</InputLabel>
                <Select
                //   InputLabelProps={{ shrink: true }}
                    labelId="with_print"
                    id="with_print"
                    name="with_print"
                    label="مع طباعة"
                    // size="small"
                    value={formik.values.with_print}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                <MenuItem  value={0}>
                {"لا"}
                </MenuItem>
                <MenuItem  value={1}>
                {"نعم"}
                </MenuItem>
            </Select>
            {formik.touched.with_print && formik.errors.with_print && (
                <FormHelperText>{formik.errors.with_print}</FormHelperText>
            )}
        </FormControl>
            {/* with user  */}
            <FormControl
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
            </FormControl>
            <FormControl 
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ gridColumn: "span 2" }}
              error={!!formik.touched.format && !!formik.errors.format}
             >
              <InputLabel id="format">نوع النموذج</InputLabel>
              <Select
                InputLabelProps={{ shrink: true }}
                labelId="format"
                id="format"
                name="format"
                label="نوع النموذج"
                value={formik.values.format}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="أجنبي">أجنبي</MenuItem>
                <MenuItem value="أجنبي سوري">أجنبي سوري</MenuItem>
                <MenuItem value="وطني سوري">وطني سوري</MenuItem>
              </Select>
              {formik.touched.format && formik.errors.format && (
                <FormHelperText>{formik.errors.format}</FormHelperText>
                )}
            </FormControl>
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