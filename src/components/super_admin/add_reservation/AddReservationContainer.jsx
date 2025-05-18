import { useEffect, useState } from 'react';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';
import { FaEye } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { removeSign, addSign } from '../../../redux/slice/super_admin/road_signs/selectedSignsSlice';
import { useGetRoadSignsQuery, useDeleteRoadSignMutation } from '../../../redux/slice/super_admin/road_signs/roadSignsApi';
import { useGetUsersQuery } from '../../../redux/slice/super_admin/users/usersApi';
import useCacheInLocalStorage from '../../../hooks/superAdmin/useCacheInLocalStorage';
import ModalShow from '../../../utils/GenericModal';
import DynamicTable from '../../Table/DynamicTable';
import { getColumnsAddReservationContainer } from '../../Table/tableColumns';
import { actionsAddReservationContainer } from '../../Table/tableActions';
import { formFields } from './dataAddReservationContainer';

// Shared styles
const formControlStyles = {
  variant: 'outlined',
  fullWidth: true,
  margin: 'dense',
  sx: {
    gridColumn: 'span 1',
    '& .MuiInputBase-root': { height: '40px' },
    '& .MuiTextField-root': { fontSize: '0.9rem' },
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
      top: '50%',
      left: '10%',
      transform: 'translateY(-50%)',
    },
  },
};

const dateFieldStyles = {
  InputLabelProps: { shrink: true },
  sx: { '& .MuiInputBase-root': { height: '40px' } },
};



const AddReservationContainer = ({
  refresh,
  searchWord,
  startDate,
  endDate,
  showAddReserve,
  handleCloseAddReserve,
  city,
  status,
}) => {
  const [page, setPage] = useState(1);
  const [showSignRoad, setShowSignRoad] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roadSignsCache, setRoadSignsCache] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const isNonMobile = useMediaQuery('(min-width:600px)');
  const dispatch = useDispatch();
  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchWord);
      setPage(1);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchWord]);

  // Fetch road signs
  const { data: roadSigns, isError, error, isLoading: loading, isFetching } = useGetRoadSignsQuery(
    { refresh, searchWord, startDate, endDate, city, status },
    { refetchOnMountOrArgChange: true }
  );

  // Cache road signs
  useCacheInLocalStorage(roadSigns, 'roadSigns', setRoadSignsCache, setLoadingData);

  // Fetch users
  const { data: users, error: usersError, isLoading: usersLoading, isFetching: usersIsFetching } = useGetUsersQuery(
    { page: 1, refresh: false, per_page: 1000 },
    { refetchOnMountOrArgChange: true }
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      data: selectedSigns,
      type: '',
      start_date: '',
      end_date: '',
      with_print: '',
      user_id: '',
    },
    onSubmit: async (values) => {
      if (!validateFields()) return;
      values.data = selectedSigns;
      console.log('values : ', values);
      const result = await addNewReservation(values).unwrap();
    },
    validationSchema: Yup.object({}),
  });

  // Handlers
  const handleShowRoadSign = (data) => setShowSignRoad(data);
  const handleCloseShowRoadSign = () => setShowSignRoad(false);

  const handleStatusClick = (roadSign) => {
    dispatch(selectedSigns.find((sign) => sign.id === roadSign.id) ? removeSign(roadSign) : addSign(roadSign));
  };

  // Render form field
  const renderFormField = ({ id, name, label, type, options, dynamicOptions }) => {
    const hasError = formik.touched[name] && formik.errors[name];

    if (type === 'date') {
      return (
        <FormControl {...formControlStyles} error={hasError}>
          <TextField
            id={id}
            name={name}
            label={label}
            type="date"
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            {...dateFieldStyles}
          />
          {hasError && <FormHelperText>{formik.errors[name]}</FormHelperText>}
        </FormControl>
      );
    }

    return (
      <FormControl {...formControlStyles} error={hasError}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          name={name}
          label={label}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ fontSize: '0.9rem' }}
        >
          {dynamicOptions
            ? users?.data?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name} - {item.company_name}
                </MenuItem>
              ))
            : options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
        </Select>
        {hasError && <FormHelperText>{formik.errors[name]}</FormHelperText>}
      </FormControl>
    );
  };

  return (
    <div>
      <Box
        m="20px auto"
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, 1fr)"
        sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 3' } }}
        width="80%"
      >
        {formFields.map((field) => (
          <div key={field.id}>{renderFormField(field)}</div>
        ))}
      </Box>

      <DynamicTable
        columns={getColumnsAddReservationContainer(selectedSigns, handleStatusClick)}
        data={roadSignsCache?.data || []}
        actions={actionsAddReservationContainer(handleShowRoadSign)}
        loading={loadingData}
        error={error?.data?.message}
        dir="rtl"
      />

      <ToastContainer />
      <ModalShow show={showSignRoad} handleClose={handleCloseShowRoadSign} fromPage="addReservations" />
    </div>
  );
};

export default AddReservationContainer;