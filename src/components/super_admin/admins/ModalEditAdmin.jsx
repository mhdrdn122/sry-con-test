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
  import { useUpdateAdminMutation , useShowOneAdminQuery } from "../../../redux/slice/super_admin/super_admins/superAdminsApi";
  
const ModalEditAdmin = ({ show, handleClose }) => {
    const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [
    updateAdmin,
    { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
  ] = useUpdateAdminMutation();

  // const {
  //   data: oneAdmin,
  //   isLoading: loading,
  //   isSuccess: isSuccessShowOne,
  // } = useShowOneAdminQuery(show, { skip: !show });
  
  useEffect(() => {
    // if (!loading && isSuccessShowOne) {
    //   console.log(oneAdmin);

      formik.resetForm({
        values: {
          id: show?.id,
          name: show?.name,
          username: show.username,
          password:show?.password,
          phone:show?.phone,
          address:show?.address,
        },
      });
    // }
  }, [show]);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      username: "",
      password: "",
      phone: "",
      address: "",
    },
    // enableReinitialize:true,
    onSubmit: async (values) => {
      console.log("values : ",values);
      const result = await updateAdmin(values).unwrap();
      if (result.status === true) {
        notify(result.message, "success");
        handleClose();
        formik.resetForm();
      }
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("Required"),
      // user_name: Yup.string().required("Required"),
      // city_id: Yup.string().required(" Required"),
      // role: Yup.string().required(" Required"),
      // permission: Yup.array().min(1, "required"),
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

  return(
    <Modal show={show} onHide={handleClose} centered>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>تعديل معلومات موظف</Modal.Title>
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
              id="username"
              name="username"
              label="اسم المستخدم"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={!!formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
                <TextField
              margin="dense"
              id="password"
              name="password"
              label="كلمة السر"
              type="password"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={!!formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
             <TextField
              margin="dense"
              id="phone"
              name="phone"
              label="الرقم"
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
              type="address"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error={!!formik.touched.address && !!formik.errors.address}
              helperText={formik.touched.address && formik.errors.address}
            />
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
export default ModalEditAdmin