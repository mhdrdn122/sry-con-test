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
import { baseURLLocal } from "../../../Api/baseURLLocal";
import notify from "../../../utils/useNotification";
import { useUpdateDiscountMutation } from "../../../redux/slice/super_admin/contracts/contractsApi";
const ModalEditDiscount = ({ show, handleClose }) => {
      const isNonMobile = useMediaQuery("(min-width:600px)");
        const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));

      const [
        updateDiscount,
        { isLoading: isLoadingAdd, isSuccess, isError, error: errorUpdate },
      ] = useUpdateDiscountMutation();

      const formik = useFormik({
            initialValues: {
              id: show?.id || "",
              discount:show?.discount || "",
            },
            enableReinitialize: true,
            onSubmit: async (values) => {
            const result = await updateDiscount(values).unwrap();
            if (result.status === true) {
                notify(result.message, "success");
                handleClose();
                formik.resetForm();
            }},
             validationSchema: Yup.object({
                discount: Yup.number().required("Required"),
            }),
        })

        useEffect(() => {
            if (isError) {
              console.error("Failed to add service:", errorUpdate);
              if (errorUpdate.status === "FETCH_ERROR") {
                notify("No Internet Connection", "error");
              } else {
                notify(errorUpdate.data.message, "error");
                formik.setErrors(errorUpdate.data?.errors || {});
              }
            }
          }, [isError, errorUpdate]);

    return (
    <Modal show={show} onHide={handleClose} centered>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>تعديل قيمة الحسم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            m="40px 0 0 0"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, 1fr)" // تعديل هنا لتكون 4 أعمدة
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}>
            <TextField
            margin="dense"
            id="discount"
            name="discount"
            label="الخصم"
            type="number"
            fullWidth
            sx={{ gridColumn: "span 2" }}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discount}
            error={!!formik.touched.discount && !!formik.errors.discount}
            helperText={formik.touched.discount && formik.errors.discount}
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
            }}>
            تجاهل
            </Button>

            <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            className="">
            {formik.isSubmitting ? (
                <Spinner animation="border" role="status" size="sm" />
            ) : (
                "حفظ"
            )}
            </Button>
        </Modal.Footer>
       </form>
    </Modal>
  )
}

export default ModalEditDiscount