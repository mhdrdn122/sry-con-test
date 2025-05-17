import React from 'react'
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
import { useAddNewRoadSignMutation } from '../../../redux/slice/super_admin/road_signs/roadSignsApi';
import { useGetCodingsQuery, useGetRoadCodingsQuery } from '../../../redux/slice/super_admin/codings/codingsApi';

const ModalAddRoadSign = ({show,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // const [page,setPage]=useState(1)
        const [
            addNewRoadSign,
            { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
          ] = useAddNewRoadSignMutation();
             const {
                data: codings,
                // isError,
                error,
                isLoading: loading,
                isFetching
            } = useGetRoadCodingsQuery({ page:1,  refresh:false ,per_page:1000}, { refetchOnMountOrArgChange: true });
    
          const formik = useFormik({
            initialValues: {
              region: "",
              signs_number:"",
              number_of_faces: "",
              meters_number:"",
              meters_number_printing:"",
              printing_price: "",
              coding_id: "",
              place:"",
              city:"",
              direction:"",
              status:"",
            },
            onSubmit: async (values) => {
            console.log("values : ",values);
            const result = await addNewRoadSign(values).unwrap();
            console.log(result);
        },   
          validationSchema: Yup.object({
            city: Yup.string().required("Required"),
            // price: Yup.string().required("Required"),
            // printing_price: Yup.string().required("Required"),
            // size: Yup.string().required("Required"),
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
          <Modal.Title>إضافة لوحة طرقية</Modal.Title>
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
            <TextField
              margin="dense"
              id="region"
              name="region"
              label="المنطقة"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.region}
              error={!!formik.touched.region && !!formik.errors.region}
              helperText={formik.touched.region && formik.errors.region}
              dir="rtl"
            />
              <TextField
                margin="dense"
                id="city"
                name="city"
                label="المدينة"
                type="text"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={!!formik.touched.city && !!formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
              />
            <TextField
              margin="dense"
              id="place"
              name="place"
              label="مكان التموضع"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.place}
              error={!!formik.touched.place && !!formik.errors.place}
              helperText={formik.touched.place && formik.errors.place}
            />
            <TextField
              margin="dense"
              id="direction"
              name="direction"
              label="الاتجاه"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.direction}
              error={!!formik.touched.direction && !!formik.errors.direction}
              helperText={formik.touched.direction && formik.errors.direction}
            />
            <TextField
              margin="dense"
              id="printing_price"
              name="printing_price"
              label="سعر الطباعة"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.printing_price}
              error={!!formik.touched.printing_price && !!formik.errors.printing_price}
              helperText={formik.touched.printing_price && formik.errors.printing_price}
            />
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
             <TextField
              margin="dense"
              id="meters_number"
              name="meters_number"
              label="عدد الأمتار"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.meters_number}
              error={!!formik.touched.meters_number && !!formik.errors.meters_number}
              helperText={formik.touched.meters_number && formik.errors.meters_number}
            />
            <TextField
              margin="dense"
              id="meters_number_printing"
              name="meters_number_printing"
              label="عدد أمتار الطباعة"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.meters_number_printing}
              error={!!formik.touched.meters_number_printing && !!formik.errors.meters_number_printing}
              helperText={formik.touched.meters_number_printing && formik.errors.meters_number_printing}
            />
              <FormControl
              variant="outlined"
              fullWidth
              margin="dense"
              sx={{ gridColumn: "span 2" }}
              error={!!formik.touched.coding_id && !!formik.errors.coding_id}
            >
              <InputLabel id="coding_id">النموذج</InputLabel>
              <Select
                InputLabelProps={{ shrink: true }}
                labelId="coding_id"
                id="coding_id"
                name="coding_id"
                label="النموذج"
                // size="small"
                value={formik.values.coding_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // error={!!formik.touched.coding_id && !!formik.errors.coding_id}
              >
                {/* <MenuItem value={"All Cities"}>{"All Cities"}</MenuItem> */}
                {codings &&
                  codings.data &&
                  codings.data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.model} && {item.type}
                    </MenuItem>
                  ))}
              </Select>
              {formik.touched.coding_id && formik.errors.coding_id && (
                <FormHelperText>{formik.errors.coding_id}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth 
              variant="outlined"  margin="dense" 
              sx={{ gridColumn: "span 2", minWidth: 110 }} 
              error={!!formik.touched.status && !!formik.errors.status}
              >
              <InputLabel id="status">الحالة</InputLabel>
              <Select  
                labelId='status'
                id="status"
                name="status"
                label="الحالة"
                value={formik.status} // Get from Redux state
                onChange={formik.handleChange} // Pass sign ID
                onBlur={formik.handleBlur}
              >
                <MenuItem value="قيد الإنشاء">قيد الإنشاء</MenuItem>
                <MenuItem value="متاح">متاح</MenuItem>
              </Select>
            </FormControl>
        </Box>
      </Modal.Body>
      <Modal.Footer>
          <Button
            variant="contained"
            className="mx-2 primary"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            تجاهل </Button>

          {isLoadingAdd === true ? (
            <Button variant="contained" className="">
              <Spinner
                className="m-auto"
                animation="border"
                role="status"
              ></Spinner>
            </Button>
          ) : (
           <Button variant="contained" style={{backgroundColor:"#dc3545"}} type="submit" className="">
                    حفظ
              </Button>
    
              )}
            </Modal.Footer>
    </form>
  </Modal>
                )
}

export default ModalAddRoadSign