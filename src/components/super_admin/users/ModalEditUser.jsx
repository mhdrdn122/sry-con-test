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

import { useShowOneUserQuery , useUpdateUserMutation } from "../../../redux/slice/super_admin/users/usersApi";
const ModalEditUser = ({ show, handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const [
      updateUser,
      { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
    ] = useUpdateUserMutation();
      // const {
      //   data: oneUser,
      //   isLoading: loading,
      //   isSuccess: isSuccessShowOne,
      // } = useShowOneUserQuery(show, { skip: !show });
    
      useEffect(() => {
        // if (!loading && isSuccessShowOne) {
          formik.resetForm({
            values: {
              id: show?.id,
              name: show?.name,
              email: show.email,
              phone:show?.phone,
              company_name:show?.company_name,
              address:show?.address,
              registration_number:show?.registration_number,
              format:show?.format  || "",

            },
          });
        // }
      }, [show]);

      const formik = useFormik({
        initialValues: {
          id: "",
          name: "",
          email: "",
          phone: "",
          company_name: "",
          address:"",
          registration_number:"",
          format:"",
        },
        // enableReinitialize:true,
        onSubmit: async (values) => {
          console.log("values : ",values);
          const result = await updateUser(values).unwrap();
          if (result.status === true) {
            notify(result.message, "success");
            handleClose();
            formik.resetForm();
          }
        },
        validationSchema: Yup.object({
          format: Yup.string().required("Required"),
        }),
      });

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
    
    return (
      <Modal show={show} onHide={handleClose} centered>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>تعديل معلومات زبون</Modal.Title>
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
              id="name"
              name="name"
              label="الاسم"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={!!formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              dir="rtl"
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="الايميل"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={!!formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="dense"
              id="company_name"
              name="company_name"
              label="اسم الشركة"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company_name}
              error={!!formik.touched.company_name && !!formik.errors.company_name}
              helperText={formik.touched.company_name && formik.errors.company_name}
            />
            <TextField
              margin="dense"
              id="phone"
              name="phone"
              label="رقم الهاتف"
              type="string"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error={!!formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
            />
             <TextField
                  margin="dense"
                  id="address"
                  name="address"
                  label="العنوان"
                  type="string"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  error={!!formik.touched.address && !!formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                />
                  <TextField
                  margin="dense"
                  id="registration_number"
                  name="registration_number"
                  label="رقم السجل التجاري"
                  type="string"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration_number}
                  error={!!formik.touched.registration_number && !!formik.errors.registration_number}
                  helperText={formik.touched.registration_number && formik.errors.registration_number}
                />
                  <FormControl 
                  fullWidth 
                  variant="outlined"  margin="dense" 
                  sx={{ gridColumn: "span 2", minWidth: 110 }} 
                  error={!!formik.touched.format && !!formik.errors.format}
                  >
                  <InputLabel id="format">نوع النموذج</InputLabel>
                  <Select  
                  labelId='format'
                    id="format"
                    name="format"
                    label="نوع النموذج"
                    value={formik.values.format} // Corrected here
                    onChange={formik.handleChange} // Pass sign ID
                    onBlur={formik.handleBlur}
  
                  >
                    <MenuItem value="أجنبي">{"أجنبي"}</MenuItem>
                    <MenuItem value="أجنبي سوري">{"أجنبي سوري"}</MenuItem>
                    <MenuItem value="وطني سوري">{"وطني سوري"}</MenuItem>
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
            <Button
              variant="contained"
              type="submit"
              className=""
              onClick={() => {}}
            >
              حفظ
            </Button>
          )}
        </Modal.Footer>
        </form>
      </Modal>
    )
}

export default ModalEditUser