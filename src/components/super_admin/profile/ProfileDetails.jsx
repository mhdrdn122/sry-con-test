import { useEffect } from 'react';
import {
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import notify from '../../../utils/useNotification';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/slice/super_admin/profile/ProfileApi';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : `linear-gradient(145deg, ${theme.palette.primary.light}, ${theme.palette.background.default})`,
  boxShadow: theme.shadows[4],
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : theme.palette.common.white,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.95rem',
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputBase-root': {
      fontSize: '0.85rem',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  transition: 'all 0.3s ease',
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[3],
    },
  },
  '&.MuiButton-outlinedSecondary': {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[3],
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 2),
    fontSize: '0.9rem',
  },
}));

const ProfileDetails = () => {
  const theme = useTheme()
  const navigate = useNavigate();

  const superAdminInfo = JSON.parse(localStorage.getItem('superAdminInfo'));
  const {
    data: profileDetails,
    isError,
    error,
    isLoading: loading,
    isFetching,
  } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true });
  const [
    updateProfile,
    { isLoading: isLoadingUpdate, isSuccess, isError: isErrorUpdate, error: errorAdd },
  ] = useUpdateProfileMutation();

  useEffect(() => {
    if (isErrorUpdate) {
      console.error('Failed to update profile:', errorAdd);
      if (errorAdd.status === 'FETCH_ERROR') {
        notify('No Internet Connection', 'error');
      } else if (errorAdd.status === 401) {
        navigate('/login');
      } else {
        notify(errorAdd.data.message, 'error');
      }
    }
  }, [isErrorUpdate, errorAdd, navigate]);

  useEffect(() => {
    if (!isLoadingUpdate && isSuccess) {
      notify('Updated successfully', 'success');
    }
  }, [isSuccess, isLoadingUpdate]);

  const formik = useFormik({
    initialValues: {
      company_name: profileDetails?.data?.company_name || '',
      registration_number: profileDetails?.data?.registration_number || '',
      address: profileDetails?.data?.address || '',
      name: profileDetails?.data?.name || '',
      phone: profileDetails?.data?.phone || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await updateProfile(values);
    },
    validationSchema: Yup.object({
      company_name: Yup.string().required('مطلوب'),
      name: Yup.string().required('مطلوب'),
      registration_number: Yup.string().required('مطلوب'),
      address: Yup.string().required('مطلوب'),
      phone: Yup.string().matches(/^\+?\d{10,15}$/, 'رقم الهاتف غير صالح').required('مطلوب'),
    }),
  });

  return (
    <StyledPaper elevation={3} className="m-0">
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{ fontWeight: 600, color: 'primary.main', mb: 4, fontSize: '1.2rem' }}
      >
        تفاصيل الملف الشخصي
      </Typography>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              variant="outlined"
              size="medium"
              label="اسم الشركة"
              name="company_name"
              onChange={formik.handleChange}
              value={formik.values.company_name}
              onBlur={formik.handleBlur}
              error={!!formik.touched.company_name && !!formik.errors.company_name}
              helperText={formik.touched.company_name && formik.errors.company_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              variant="outlined"
              size="medium"
              label="الاسم"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              error={!!formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              variant="outlined"
              size="medium"
              label="رقم السجل التجاري"
              name="registration_number"
              onChange={formik.handleChange}
              value={formik.values.registration_number}
              onBlur={formik.handleBlur}
              error={!!formik.touched.registration_number && !!formik.errors.registration_number}
              helperText={formik.touched.registration_number && formik.errors.registration_number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              variant="outlined"
              size="medium"
              label="العنوان"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              error={!!formik.touched.address && !!formik.errors.address}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              variant="outlined"
              size="medium"
              label="رقم الهاتف"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              error={!!formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <StyledButton variant="outlined" color="primary"  style={{color:theme.palette.text.primary}} onClick={() => navigate(-1)}>
            تجاهل
          </StyledButton>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoadingUpdate}
            startIcon={isLoadingUpdate && <CircularProgress size={20} />}
          >
            {isLoadingUpdate ? 'جار الحفظ...' : 'حفظ'}
          </StyledButton>
        </Box>
      </form>
      <ToastContainer />
    </StyledPaper>
  );
};

export default ProfileDetails;
