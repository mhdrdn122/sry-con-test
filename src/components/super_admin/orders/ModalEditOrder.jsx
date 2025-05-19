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
  import { ToastContainer } from "react-toastify";
  import notify from "../../../utils/useNotification";
import { useUpdateOrderMutation , useShowOneOrderQuery } from "../../../redux/slice/super_admin/orders/ordersApi";
import { useGetRoadSignsQuery } from "../../../redux/slice/super_admin/road_signs/roadSignsApi";
import React from 'react'

const ModalEditOrder = ({show,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
          const [
            updateOrder,
            { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
          ] = useUpdateOrderMutation();

        const {
            data: oneOrder,
            isLoading: loading,
            isSuccess: isSuccessShowOne,
            } = useShowOneOrderQuery(show, { skip: !show });
        // RoadSigns
        const {
            data: roadSigns,
            // isError,
            error:RoadSignsError,
            isLoading: RoadSignsLoading,
            isFetching:RoadSignsIsFetching
        } = useGetRoadSignsQuery({ page:1,  refresh:false ,per_page:1000}, { refetchOnMountOrArgChange: true });

        useEffect(() => {
            if (!loading && isSuccessShowOne) {
              formik.resetForm({
                values: {
                  id: oneOrder?.data?.id,
                  type: oneOrder?.data?.type,
                  note: oneOrder?.data?.note,
                  date: oneOrder?.data.date,
                  road_sign_id: oneOrder?.data?.road_sign_id,
                },
              });
            }
          }, [loading, oneOrder]);
          useEffect(() => {
            if (isError) {
              console.error("Failed to add service:", errorAdd);
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

          const formik = useFormik({
            initialValues: {
              id:"",
              type: "",
              note: "",
              date: "",
              road_sign_id: "",
            },
            onSubmit: async (values) => {
            console.log("values : ",values);
            const result = await updateOrder(values).unwrap();
            if (result.status === true) {
              notify(result.message, "success");
              handleClose();
              formik.resetForm();
            }          
        },   
            validationSchema: Yup.object({
            // address: Yup.string().required("Required"),
            // price: Yup.string().required("Required"),
            // printing_price: Yup.string().required("Required"),
            // size: Yup.string().required("Required"),
        }),
        })
  return (
 <Modal show={show} onHide={handleClose} centered>
    <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>تعديل معلومات الطلب</Modal.Title>
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
                            {/* Date Input */}
        <FormControl
          variant="outlined"
          fullWidth
          margin="dense"
          sx={{ gridColumn: "span 2" }}
          error={!!formik.touched.start_date && !!formik.errors.start_date}
        >
          <TextField
            id="date"
            name="date"
            label="تاريخ البدء"
            type="date"
            value={formik.values.date}
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
          {formik.touched.date && formik.errors.date && (
            <FormHelperText>{formik.errors.date}</FormHelperText>
          )}
        </FormControl>

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

export default ModalEditOrder