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
import { useUpdateDurationMutation,useShowOneDurationQuery } from "../../../redux/slice/super_admin/durations/durationsApi";

const ModalEditDuration = ({ show, handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const [
        updateDuration,
        { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
      ] = useUpdateDurationMutation();
        const {
          data: oneDuration,
          isLoading: loading,
          isSuccess: isSuccessShowOne,
        } = useShowOneDurationQuery(show, { skip: !show });

        useEffect(() => {
          if (!loading && isSuccessShowOne) {
      
            formik.resetForm({
              values: {
                id: oneDuration?.data?.id,
                name: oneDuration?.data?.name,
                day: oneDuration?.data.day,
              },
            });
          }
        }, [loading, oneDuration]);
      
        const formik = useFormik({
          initialValues: {
            id: "",
            name:"",
            day:"",
          },
          // enableReinitialize:true,
          onSubmit: async (values) => {
            const result = await updateDuration(values).unwrap();
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
          <Modal.Title>تعديل المدة الزمنية</Modal.Title>
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
            />
              <TextField
              margin="dense"
              id="day"
              name="day"
              label="عدد الأيام"
              type="text"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.day}
              error={!!formik.touched.day && !!formik.errors.day}
              helperText={formik.touched.day && formik.errors.day}
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
            style={{backgroundColor:"rgb(117 32 40)"}}
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

export default ModalEditDuration