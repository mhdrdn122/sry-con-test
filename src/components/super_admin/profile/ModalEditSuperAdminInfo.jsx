import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import notify from '../../../utils/useNotification';
import { updateSuperAdminInfo } from '../../../redux/slice/super_admin/auth/authSlice';

const ModalEditSuperAdminInfo = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector(state => state.authSuper.superAdminDetails);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "يجب أن يكون الاسم 2 أحرف أو أكثر")
        .required("هذا الحقل مطلوب"),
      password: Yup.string()
        .min(8, "يجب أن تكون كلمة السر 8 أحرف أو أكثر")
        .required("هذا الحقل مطلوب")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await dispatch(updateSuperAdminInfo(values)).unwrap();
        notify("تم تحديث المعلومات بنجاح", "success");
        resetForm();
        handleClose();
      } catch (err) {
        notify(err.message || "حدث خطأ أثناء التحديث", "error");
      }
    }
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>تعديل معلومات المدير</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            m="20px 0 0 0"
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(1, 1fr)"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              id="username"
              name="username"
              label="اسم المستخدم"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              dir="rtl"
            />
            <TextField
              margin="dense"
              id="password"
              name="password"
              label="كلمة السر"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={!!formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <Button onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? "إخفاء" : "إظهار"}
                  </Button>
                )
              }}
            />

          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="mx-2"
            color="danger"
            sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#b71c1c' }, color: "#fff" }}
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            تجاهل
          </Button>

          {loading ? (
            <Button variant="contained" disabled>
              <Spinner animation="border" size="sm" />
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              حفظ
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalEditSuperAdminInfo;