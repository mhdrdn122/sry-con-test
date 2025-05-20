import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Spinner, Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../../../utils/useNotification';
import {
  removeSign,
  updateSelectedSigns,
  updateSignValue,
} from '../../../redux/slice/super_admin/road_signs/selectedSignsSlice';
import { useGetUsersQuery } from '../../../redux/slice/super_admin/users/usersApi';
import {
  useAddNewReservationMutation,
  useCalculateReservationMutation,
} from '../../../redux/slice/super_admin/reservations/reservationsApi';

// ** Component: حقل إدخال رقمي قابل لإعادة الاستخدام **
const NumericInput = ({ value, onChange, max, error }) => {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative', width: 80 }}>
      <Box
        component="input"
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Math.min(Math.max(+e.target.value, 0), max))}
        min={0}
        max={max}
        sx={{
          width: '100%',
          textAlign: 'center',
          p: 1,
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      />
      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ position: 'absolute', bottom: -18, left: 0 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

const SignRow = ({ item, onDelete, onUpdate, errors }) => {
  const theme = useTheme();
  return (
    <tr style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
        <Tooltip title="حذف">
          <IconButton onClick={() => onDelete(item.id)} sx={{ color: theme.palette.error.main }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </td>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
        {item.reservations.length ? (
          <Table size="sm" responsive sx={{ backgroundColor: theme.palette.background.default }}>
            <thead style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
              <tr style={{ background: theme.palette.background.default }}>
                <th style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>إلى</th>
                <th style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>من</th>
                <th style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>#</th>
              </tr>
            </thead>
            <tbody>
              {item.reservations.map((res, idx) => (
                <tr key={idx} style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
                  <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{res.end_date}</td>
                  <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{res.start_date}</td>
                  <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{idx + 1}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Typography style={{ color: theme.palette.text.primary, background: theme.palette.background.default }} align="center" color="textSecondary">
            لا توجد حجوزات
          </Typography>
        )}
      </td>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{item.meters_number_printing}</td>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
        <NumericInput
          value={item.facesValue}
          max={item.number_of_faces}
          onChange={(val) => onUpdate(item.id, 'facesValue', val)}
          error={errors[item.id]?.facesValue}
        />
      </td>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>
        <NumericInput
          value={item.signsValue}
          max={item.signs_number}
          onChange={(val) => onUpdate(item.id, 'signsValue', val)}
          error={errors[item.id]?.signsValue}
        />
      </td>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{item.place}</td>
      <td style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{item.region}</td>
    </tr>
  );
};

const ModalAddReserveRoadSign = ({ show, handleClose, inputFields }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useDispatch();

  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  const { data: users } = useGetUsersQuery({ page: 1, per_page: 1000 }, { refetchOnMountOrArgChange: true });
  const [addNewReservation, { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd }] =
    useAddNewReservationMutation();
  const [calculateReservation, { data: dataCalculate, isLoading: isLoadingCalculate }] =
    useCalculateReservationMutation();

  const [errors, setErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      data: selectedSigns,
      type: inputFields?.type || '',
      start_date: inputFields?.start_date || '',
      end_date: inputFields?.end_date || '',
      with_print: inputFields?.with_print || '',
      user_id: inputFields?.user_id || '',
      format: inputFields?.format || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      if (!validate()) return;
      values.data = selectedSigns;
      await addNewReservation(values).unwrap();
    },
  });

  useEffect(() => {
    if (!isLoadingAdd && isSuccess) {
      notify('تمت الإضافة بنجاح', 'success');
      handleClose();
      formik.resetForm();
      dispatch(updateSelectedSigns([]));
    }
  }, [isLoadingAdd, isSuccess, handleClose, formik, dispatch]);

  useEffect(() => {
    if (isError) {
      if (errorAdd?.status === 'FETCH_ERROR') notify('لا يوجد اتصال بالإنترنت', 'error');
      else notify(errorAdd?.data?.message || 'حدث خطأ', 'error');
      formik.setErrors(errorAdd?.data?.errors || {});
    }
  }, [isError, errorAdd, formik]);

  const validate = () => {
    const errs = {};
    selectedSigns.forEach((s) => {
      if (!s.facesValue) errs[s.id] = { ...errs[s.id], facesValue: 'هذا الحقل مطلوب' };
      if (!s.signsValue) errs[s.id] = { ...errs[s.id], signsValue: 'هذا الحقل مطلوب' };
    });
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">

      <form style={{ background: theme.palette.background.paper }} onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header sx={{ justifyContent: 'center', bgcolor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            إضافة الحجز للوحات المختارة
          </Typography>
        </Modal.Header>
        <Modal.Body sx={{ p: isNonMobile ? 4 : 2, bgcolor: theme.palette.background.default }}>
          <Table striped bordered hover responsive size="sm" sx={{ backgroundColor: theme.palette.background.default }}>
            <thead style={{ backgroundColor: theme.palette.background.paper }}>
              <tr style={{ background: theme.palette.background.default }}>
                {['إجراء', 'التواريخ المحجوزة', 'عدد أمتار الطباعة', 'عدد الأوجه', 'عدد اللوحات', 'المكان', 'المنطقة'].map(
                  (h) => (
                    <th key={h} style={{ color: theme.palette.text.primary, background: theme.palette.background.default }}>{h}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {selectedSigns.map((item) => (
                <SignRow
                  key={item.id}
                  item={item}
                  errors={errors}
                  onDelete={(id) => dispatch(removeSign({ id }))}
                  onUpdate={(id, field, value) => dispatch(updateSignValue({ id, field, value }))}
                />
              ))}
            </tbody>
          </Table>

          <Box
            display="flex"
            flexDirection={isNonMobile ? 'row' : 'column'}
            justifyContent="space-between"
            alignItems="center"
            p={2}
            mt={3}
            bgcolor={theme.palette.background.paper}
            borderRadius={2}
            gap={2}
          >
            {[
              { label: 'الإجمالي', value: dataCalculate?.data?.total, color: 'primary' },
              { label: 'عدد أمتار الطباعة', value: dataCalculate?.data?.meters_number_printing, color: 'secondary' },
            ].map(({ label, value, color }) => (
              <Box key={label} textAlign="center">
                <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
                  {label}
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette[color]?.main }}>
                  {value != null ? `${value}${label === 'الإجمالي' ? ' $' : ''}` : '-'}
                </Typography>
              </Box>
            ))}

            <Button
              variant="contained"
              onClick={() => calculateReservation(formik.values)}
              disabled={!selectedSigns.length || isLoadingCalculate}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
            >
              {isLoadingCalculate ? <Spinner size="sm" animation="border" /> : 'حساب السعر'}
            </Button>
          </Box>
        </Modal.Body>
        <Modal.Footer sx={{  p: 2, bgcolor: theme.palette.background.paper }}>
          <Button
            variant="outlined"
           
            onClick={() => {
              handleClose();
              formik.resetForm();
              dispatch(updateSelectedSigns([]));
            }}
            sx={{ color: theme.palette.text.main  , margin:"10px"}}
          >
            تجاهل
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isLoadingAdd}
            sx={{
               backgroundColor:theme.palette.primary.main,
              color: theme.palette.text.primary.main,
              '&:hover': { bgcolor: theme.palette.text.primary.main },
            }}
          >
            {isLoadingAdd ? <Spinner size="sm" animation="border" /> : 'حفظ'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddReserveRoadSign;