import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../../utils/useNotification';
import { updateSuperAdminInfo } from '../../../redux/slice/super_admin/auth/authSlice';

const ModalEditSuperAdminInfo = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.authSuper.superAdminDetails);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, 'يجب أن يكون الاسم 2 أحرف أو أكثر')
        .required('هذا الحقل مطلوب'),
      password: Yup.string()
        .min(8, 'يجب أن تكون كلمة السر 8 أحرف أو أكثر')
        .required('هذا الحقل مطلوب'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(updateSuperAdminInfo(values)).unwrap();
        notify('تم تحديث المعلومات بنجاح', 'success');
        resetForm();
        handleClose();
      } catch (err) {
        notify(err.message || 'حدث خطأ أثناء التحديث', 'error');
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header
          closeButton
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <Modal.Title>
            <Typography variant="h6" color="textPrimary" fontWeight="bold">
              تعديل معلومات المدير
            </Typography>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <Box
            display="grid"
            gap={3}
            gridTemplateColumns="repeat(1, 1fr)"
            px={2}
            py={2}
            sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 1' } }}
          >
            <TextField
              fullWidth
              label="اسم المستخدم"
              name="username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              dir="rtl"
            />

            <TextField
              fullWidth
              label="كلمة السر"
              name="password"
              variant="outlined"
                 style={{ backgroundColor: theme.palette.background.default , boxShadow: 'none' }}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              dir="rtl"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Modal.Body>

        <Modal.Footer
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <Button
            variant="outlined"
            color="primary"
            className='mx-2'
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            تجاهل
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'جارٍ الحفظ...' : 'حفظ'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalEditSuperAdminInfo;