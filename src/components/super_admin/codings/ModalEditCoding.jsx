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
import { useUpdateCodingMutation,useShowOneCodingQuery } from "../../../redux/slice/super_admin/codings/codingsApi";

const ModalEditCoding = ({ show, handleClose }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
      const [
        updateCoding,
        { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
      ] = useUpdateCodingMutation();

        // const {
        //   data: oneCoding,
        //   isLoading: loading,
        //   isSuccess: isSuccessShowOne,
        // } = useShowOneCodingQuery(show, { skip: !show });

  useEffect(() => {
    // if (!loading && isSuccessShowOne) {

      formik.resetForm({
        values: {
          id: show?.id,
          model: show?.model,
          type: show.type,
          size:show.size,
          price:show.price,
          format:show.format,
        },
      });
    // }
  }, [show]);

  const formik = useFormik({
    initialValues: {
      id: "",
      model:"",
      type:"",
      size:"",
      price:"",
      format:""
    },
    // enableReinitialize:true,
    onSubmit: async (values) => {
      console.log("values : ",values);
      const result = await updateCoding(values).unwrap();
      if (result.status === true) {
        notify(result.message, "success");
        handleClose();
        formik.resetForm();
      }
    },
    validationSchema: Yup.object({
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
          <Modal.Title>تعديل النموذج</Modal.Title>
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
              id="type"
              name="type"
              label="النوع"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
              error={!!formik.touched.type && !!formik.errors.type}
              helperText={formik.touched.type && formik.errors.type}
            />
              <TextField
              margin="dense"
              id="model"
              name="model"
              label="النموذج"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
              error={!!formik.touched.model && !!formik.errors.model}
              helperText={formik.touched.model && formik.errors.model}
              dir="rtl"
            />
              <TextField
                  margin="dense"
                  id="size"
                  name="size"
                  label="الحجم"
                  type="text"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.size}
                  error={!!formik.touched.size && !!formik.errors.size}
                  helperText={formik.touched.size && formik.errors.size}
                  dir="rtl"
                />
                  <TextField
                  margin="dense"
                  id="price"
                  name="price"
                  label="السعر"
                  type="text"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  error={!!formik.touched.price && !!formik.errors.price} 
                  helperText={formik.touched.price && formik.errors.price}
                  dir="rtl"
                />
                <TextField
                  margin="dense"
                  id="format"
                  name="format"
                  label="نوع النموذج"
                  type="text"
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.format}
                  error={!!formik.touched.format && !!formik.errors.format}
                  helperText={formik.touched.format && formik.errors.format}
                  dir="rtl"
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

export default ModalEditCoding