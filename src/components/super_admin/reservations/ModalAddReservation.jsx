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
  } from "@mui/material";
  import { Modal, Spinner } from "react-bootstrap";
  import { useEffect, useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { useDispatch, useSelector } from "react-redux";
  import notify from "../../../utils/useNotification";
import { useAddNewReservationMutation } from "../../../redux/slice/super_admin/reservations/reservationsApi";
import { useGetDurationsQuery } from "../../../redux/slice/super_admin/durations/durationsApi";
import { useGetUsersQuery } from "../../../redux/slice/super_admin/users/usersApi";
import { useGetRoadSignsQuery } from "../../../redux/slice/super_admin/road_signs/roadSignsApi";

const ModalAddReservation = ({show,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
        const [
            addNewReservation,
            { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
        ] = useAddNewReservationMutation();

  
        // users
        const {
            data: users,
            // isError,
            error,
            isLoading: UsersLoading,
            isFetching:UsersIsFetching
        } = useGetUsersQuery({ page:1,  refresh:false ,per_page:1000}, { refetchOnMountOrArgChange: true });
        
        // Durations 
        const {
            data: durations,
            // isError,
            error:durationError,
            isLoading: durationLoading,
            isFetching:durationIsFetching
        } = useGetDurationsQuery({ page:1,  refresh:false ,per_page:1000}, { refetchOnMountOrArgChange: true });
 
        // RoadSigns
        const {
            data: roadSigns,
            // isError,
            error:RoadSignsError,
            isLoading: RoadSignsLoading,
            isFetching:RoadSignsIsFetching
        } = useGetRoadSignsQuery({ page:1,  refresh:false ,per_page:1000}, { refetchOnMountOrArgChange: true });
 
                  const formik = useFormik({
                    initialValues: {
                        type: "",
                        start_date: "",
                        with_print: "",
                        number_of_faces: "",
                        note: "",
                        // duration_id: "",
                        user_id: "",
                        road_sign_id: "",
                        signs_number:"",
                    },
                    onSubmit: async (values) => {
                    console.log("values : ",values);
                    const result = await addNewReservation(values).unwrap();
                },
                  validationSchema: Yup.object({
                    type: Yup.string().required("Required"),
                    start_date: Yup.string().required("Required"),
                    with_print: Yup.string().required("Required"),
                    number_of_faces: Yup.string().required("Required"),
                    note: Yup.string().required("Required"),
                    // duration_id: Yup.string().required("Required"),
                    user_id: Yup.string().required("Required"),
                    road_sign_id: Yup.string().required("Required"),
                    signs_number: Yup.string().required("Required"),
                }),
                })
                useEffect(() => {
                    if (!isLoadingAdd && isSuccess) {
                      notify("Added successfully", "success");
                      handleClose();
                      formik.resetForm();
                    }
                  }, [isSuccess, isLoadingAdd]);
                  
                  useEffect(() => {
                    if (isError) {
                      console.error("Failed to add admin:", errorAdd);
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
        return (
      <Modal show={show} onHide={handleClose} centered>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Modal.Header className="d-flex justify-content-center">
              <Modal.Title>إضافة حجز</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box
                m="40px 0 0 0"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, 1fr)" // تعديل هنا لتكون 4 أعمدة
                sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
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
            InputLabelProps={{
                shrink: true, // Ensures the label stays above the input
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Set today's date as the minimum
              }}
            fullWidth
          />
          {formik.touched.start_date && formik.errors.start_date && (
            <FormHelperText>{formik.errors.start_date}</FormHelperText>
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
                // size="small"
                value={formik.values.user_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // error={!!formik.touched.coding_id && !!formik.errors.coding_id}
                >
                {/* <MenuItem value={"All Cities"}>{"All Cities"}</MenuItem> */}
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

            {/* Duration */}
            {/* <FormControl
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{ gridColumn: "span 2" }}
                error={!!formik.touched.duration_id && !!formik.errors.duration_id}
            >
                <InputLabel id="duration_id">مدة الحجز</InputLabel>
                <Select
                InputLabelProps={{ shrink: true }}
                labelId="duration_id"
                id="duration_id"
                name="duration_id"
                label="مدة الحجز"
                // size="small"
                value={formik.values.duration_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                >
                {durations &&
                    durations.data &&
                    durations.data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name} 
                    </MenuItem>
                    ))}
                </Select>
                {formik.touched.duration_id && formik.errors.duration_id && (
                <FormHelperText>{formik.errors.duration_id}</FormHelperText>
                )}
            </FormControl> */}

            {/* road sign */}
            <FormControl
                variant="outlined"
                fullWidth
                margin="dense"
                sx={{ gridColumn: "span 2" }}
                error={!!formik.touched.road_sign_id && !!formik.errors.road_sign_id}
            >
                <InputLabel id="road_sign_id">عنوان اللوحة</InputLabel>
                <Select
                InputLabelProps={{ shrink: true }}
                labelId="road_sign_id"
                id="road_sign_id"
                name="road_sign_id"
                label="عنوان اللوحة"
                // size="small"
                value={formik.values.road_sign_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // error={!!formik.touched.coding_id && !!formik.errors.coding_id}
                >
                {/* <MenuItem value={"All Cities"}>{"All Cities"}</MenuItem> */}
                {roadSigns &&
                    roadSigns.data &&
                    roadSigns.data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.region} - {item.place}
                    </MenuItem>
                    ))}
                </Select>
                {formik.touched.road_sign_id && formik.errors.road_sign_id && (
                <FormHelperText>{formik.errors.road_sign_id}</FormHelperText>
                )}
            </FormControl>
                {/* number of faces */}
                 <TextField
                    margin="dense"
                    id="number_of_faces"
                    name="number_of_faces"
                    label="عدد الوجوه"
                    type="text"
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.number_of_faces}
                    error={!!formik.touched.number_of_faces && !!formik.errors.number_of_faces}
                    helperText={formik.touched.number_of_faces && formik.errors.number_of_faces}
                />
                  {/* signs number  */}
                  <TextField
                    margin="dense"
                    id="signs_number"
                    name="signs_number"
                    label="عدد اللوحات"
                    type="text"
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.signs_number}
                    error={!!formik.touched.signs_number && !!formik.errors.signs_number}
                    helperText={formik.touched.signs_number && formik.errors.signs_number}
                />
                {/* note */}
                <TextField
                    margin="dense"
                    id="note"
                    name="note"
                    label="ملاحظة"
                    type="text"
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.note}
                    error={!!formik.touched.note && !!formik.errors.note}
                    helperText={formik.touched.note && formik.errors.note}
                />
                
            </Box>

          </Modal.Body>
        <Modal.Footer>
                <Button
                variant="contained"
                className="mx-2"
                onClick={() => {
                    handleClose();
                    formik.resetForm();
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

export default ModalAddReservation