// AddReservationContainer.js
import  { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import {  useGetRoadSignsQuery } from '../../../redux/slice/super_admin/road_signs/roadSignsApi';
import { removeSign,  addSign } from "../../../redux/slice/super_admin/road_signs/selectedSignsSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalCart from "./ModalCart";
import { useGetUsersQuery } from '../../../redux/slice/super_admin/users/usersApi';
import { useFormik } from 'formik';
import * as Yup from "yup";
import DynamicTable from '../../Table/DynamicTable'; 
import { getColumnsAddReservationContainer } from '../../Table/tableColumns';
import { actionsAddReservationContainer } from '../../Table/tableActions';
import ModalShow from '../../../utils/Modals/ModalShow/ModalShow';

const AddReservationContainer = ({ show, handleClose, refresh, searchWord, startDate, endDate,
  showAddReserve, handleCloseAddReserve, city, status
}) => {
  const [showSignRoad, setShowSignRoad] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchWord);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  // const formikInputs = useFormik({
  //   initialValues: {
  //     data: selectedSigns,
  //     type: "",
  //     start_date: "",
  //     end_date: "",
  //     with_print: "",
  //     user_id: "",
  //     format: ""
  //   },
  //   onSubmit: async (values) => {
  //     if (!validateFields()) {
  //       return;
  //     }
  //     values.data = selectedSigns;
  //     console.log("values : ", values);
  //     const result = await addNewReservation(values).unwrap();
  //   },
  //   validationSchema: Yup.object({}),
  // });

  const {
    data: roadSigns,
    isError,
    error,
    isLoading: loading,
    isFetching
  } = useGetRoadSignsQuery({ refresh, searchWord, startDate, endDate, city, status },
    { refetchOnMountOrArgChange: true });


  const handleShowRoadSign = (data) => {
    setShowSignRoad(data);
  };
  const handleCloseShowRoadSign = () => {
    setShowSignRoad(false);
  };

 

  const handleStatusClick = (roadSign) => {
    if (selectedSigns.find((sign) => sign.id === roadSign.id)) {
      dispatch(removeSign(roadSign));
    } else {
      dispatch(addSign(roadSign));
    }
  };

  const {
    data: users,
    error: UsersError,
    isLoading: UsersLoading,
    isFetching: UsersIsFetching
  } = useGetUsersQuery({ page: 1, refresh: false, per_page: 1000 }, { refetchOnMountOrArgChange: true });

  const formik = useFormik({
    initialValues: {
      data: selectedSigns,
      type: "",
      start_date: "",
      end_date: "",
      with_print: "",
      user_id: "",
    },
    onSubmit: async (values) => {
      if (!validateFields()) {
        return;
      }
      values.data = selectedSigns;
      console.log("values : ", values);
      const result = await addNewReservation(values).unwrap();
    },
    validationSchema: Yup.object({}),
  });



  return (
    <div>
      {/* Input fields */}
      <Box
        m="20px auto"
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, 1fr)"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
        }}
        width="80%"
      >
        <FormControl
          variant="outlined"
          fullWidth
          margin="dense"
          sx={{
            gridColumn: "span 1",
            "& .MuiTextField-root": { fontSize: "0.9rem" },
          }}
          error={!!formik.touched.start_date && !!formik.errors.start_date}
        >
          <TextField
            id="start_date"
            name="start_date"
            label="تاريخ البدء"
            type="date"
            value={formik.values.start_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            sx={{ "& .MuiInputBase-root": { height: "40px" } }}
          />
          {formik.touched.start_date && formik.errors.start_date && (
            <FormHelperText>{formik.errors.start_date}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          margin="dense"
          sx={{
            gridColumn: "span 1",
            "& .MuiTextField-root": { fontSize: "0.9rem" },
          }}
          error={!!formik.touched.end_date && !!formik.errors.end_date}
        >
          <TextField
            id="end_date"
            name="end_date"
            label="تاريخ النهاية"
            type="date"
            value={formik.values.end_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            sx={{ "& .MuiInputBase-root": { height: "40px" } }}
          />
          {formik.touched.end_date && formik.errors.end_date && (
            <FormHelperText>{formik.errors.end_date}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          margin="dense"
          sx={{
            gridColumn: "span 1",
            "& .MuiInputBase-root": { height: "40px" },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
              top: "50%",
              left: '10%',
              transform: "translateY(-50%)",
            },
          }}
          error={!!formik.touched.type && !!formik.errors.type}
        >
          <InputLabel id="type">مؤقت أو دائم</InputLabel>
          <Select
            labelId="type"
            id="type"
            name="type"
            label="مؤقت أو دائم"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="temporary">مؤقت</MenuItem>
            <MenuItem value="permanent">دائم</MenuItem>
          </Select>
          {formik.touched.type && formik.errors.type && (
            <FormHelperText>{formik.errors.type}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          margin="dense"
          sx={{
            gridColumn: "span 1",
            "& .MuiInputBase-root": { height: "40px" },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
              top: "50%",
              left: '10%',
              transform: "translateY(-50%)",
            },
          }}
          error={!!formik.touched.user_id && !!formik.errors.user_id}
        >
          <InputLabel id="user_id">المستخدم</InputLabel>
          <Select
            labelId="user_id"
            id="user_id"
            name="user_id"
            label="المستخدم"
            value={formik.values.user_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ fontSize: "0.9rem" }}
          >
            {users &&
              users.data &&
              users.data.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name} - {item.company_name}
                </MenuItem>
              ))}
          </Select>
          {formik.touched.user_id && formik.errors.user_id && (
            <FormHelperText>{formik.errors.user_id}</FormHelperText>
          )}
        </FormControl>
      </Box>

      <DynamicTable
        columns={getColumnsAddReservationContainer(selectedSigns, handleStatusClick)}
        data={roadSigns?.data || []}
        actions={actionsAddReservationContainer(handleShowRoadSign)}
        loading={loading}
        error={error?.data?.message}
        dir="rtl"
      />
      
     <ModalShow show={showSignRoad} handleClose={handleCloseShowRoadSign} fromPage="addReservations" />
     
 
 
      <ModalCart
        inputFields={formik.values}
        show={showAddReserve}
        handleClose={handleCloseAddReserve}
      />
      <ToastContainer />

    </div>
  );
};

export default AddReservationContainer;