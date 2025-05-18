import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../../utils/useNotification';
import {
  removeSign,
  updateSelectedSigns,
  updateSignValue,
} from '../../../redux/slice/super_admin/road_signs/selectedSignsSlice';
import {
  useAddNewReservationMutation,
  useCalculateReservationMutation,
} from '../../../redux/slice/super_admin/reservations/reservationsApi';
import { useNavigate } from 'react-router-dom';

const PageAddReserveRoadSign = ({ inputFields }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  const navvigate = useNavigate()
  const [addNewReservation, { isLoading: isAdding, isSuccess, isError, error }] =
    useAddNewReservationMutation();
  const [calculateReservation, { data: calcData, isLoading: isCalcLoading, isSuccess: isCalcSuccess, isError: isCalcError, error: calcError }] =
    useCalculateReservationMutation();
    console.log("selectedSigns : ", selectedSigns)

  const [fieldErrors, setFieldErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      data: selectedSigns,
      type: inputFields?.type || '',
      start_date: inputFields?.start_date || '',
      end_date: inputFields?.end_date || '',
      with_print: '',
      user_id: inputFields?.user_id || '',
      format: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      if (!validateFields()) return;
      values.data = selectedSigns;
      await addNewReservation(values).unwrap();
    },
  });

  useEffect(() => {
    if (!isAdding && isSuccess) {
      notify('Added successfully', 'success');
      dispatch(updateSelectedSigns([]));
      formik.resetForm();
    }
  }, [isAdding, isSuccess]);

  useEffect(() => {
    if (!isCalcLoading && isCalcSuccess) {
      notify('Calculated successfully', 'success');
    }
  }, [isCalcLoading, isCalcSuccess]);

  useEffect(() => {
    if (isError) {
      const msg = error?.data?.message || 'Error occurred';
      notify(msg, 'error');
      formik.setErrors(error?.data?.errors || {});
    }
  }, [isError]);

  useEffect(() => {
    if (isCalcError) {
      const msg = calcError?.data?.message || 'Error calculating';
      notify(msg, 'error');
      formik.setErrors(calcError?.data?.errors || {});
    }
  }, [isCalcError]);

  const validateFields = () => {
    const errs = {};
    selectedSigns.forEach((item) => {
      if (!item.facesValue) errs[item.id] = { facesValue: 'هذا الحقل مطلوب' };
      if (!item.signsValue) errs[item.id] = { ...errs[item.id], signsValue: 'هذا الحقل مطلوب' };
    });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" align="center" gutterBottom>
        إضافة الحجز للوحات المختارة
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TableContainer component={Paper} sx={{ mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Table size={isNonMobile ? 'medium' : 'small'}>
            <TableHead>
              <TableRow>
                <TableCell align="center">إجراء</TableCell>
                <TableCell align="center">التواريخ المحجوزة</TableCell>
                <TableCell align="center">عدد أمتار الطباعة</TableCell>
                <TableCell align="center">عدد الأوجه</TableCell>
                <TableCell align="center">عدد اللوحات</TableCell>
                <TableCell align="center">المكان</TableCell>
                <TableCell align="center">المنطقة</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedSigns.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell align="center">
                    <Tooltip title="حذف">
                      <IconButton
                        onClick={() => dispatch(removeSign({ id: item.id }))}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {item.reservations?.length ? (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>من</TableCell>
                            <TableCell>إلى</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item.reservations.map((r, i) => (
                            <TableRow key={i}>                              
                              <TableCell>{r.start_date}</TableCell>
                              <TableCell>{r.end_date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        لا توجد حجوزات
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">{item.meters_number_printing}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={item.facesValue || ''}
                      inputProps={{ max: item.number_of_faces, min: 0 }}
                      onChange={(e) => {
                        let v = Number(e.target.value) || 0;
                        v = Math.max(0, Math.min(v, item.number_of_faces));
                        dispatch(updateSignValue({ id: item.id, field: 'facesValue', value: v }));
                      }}
                      error={!!fieldErrors[item.id]?.facesValue}
                      helperText={fieldErrors[item.id]?.facesValue}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={item.signsValue || ''}
                      inputProps={{ max: item.signs_number, min: 0 }}
                      onChange={(e) => {
                        let v = Number(e.target.value) || 0;
                        v = Math.max(0, Math.min(v, item.signs_number));
                        dispatch(updateSignValue({ id: item.id, field: 'signsValue', value: v }));
                      }}
                      error={!!fieldErrors[item.id]?.signsValue}
                      helperText={fieldErrors[item.id]?.signsValue}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.place}</TableCell>
                  <TableCell align="center">{item.region}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Box textAlign="center">
                <Typography variant="subtitle1">الإجمالي</Typography>
                <Typography variant="h6">
                  {calcData?.data && selectedSigns.length
                    ? `${calcData.data.total} $`
                    : '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box textAlign="center">
                <Typography variant="subtitle1">عدد أمتار الطباعة</Typography>
                <Typography variant="h6">
                  {calcData?.data && selectedSigns.length
                    ? calcData.data.meters_number_printing
                    : '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={isCalcLoading || !selectedSigns.length}
                onClick={() => calculateReservation(formik.values)}
              >
                {isCalcLoading ? 'جاري الحساب...' : 'حساب السعر'}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(updateSelectedSigns([]));
              navvigate('/super_admin/add_reservation');
              formik.resetForm();
            }}
          >
            تجاهل
          </Button>
          <Button variant="contained" type="submit" disabled={isAdding}>
            {isAdding ? 'جاري الحفظ...' : 'حفظ'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PageAddReserveRoadSign;
