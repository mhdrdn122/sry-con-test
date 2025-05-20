import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  useMediaQuery,
  useTheme,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import notify from "../../useNotification";

const DynamicEditModal = ({
  show,
  handleClose,
  title,
  fields,
  validationSchema,
  mutationHook,
  initialValues,
  selectData = {},
  fetchDataHook,
  fetchDataId,
  onSubmitTransform = (values) => values,
}) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [mutate, { isLoading, isSuccess, isError, error }] = mutationHook();
  const hasNotifiedRef = useRef(false);
  const [showPassword, setShowPassword] = useState({});

  // Fetch data for pre-filling the form (if fetchDataHook is provided)
  const { data: fetchedData, isLoading: isFetching } = fetchDataHook
    ? fetchDataHook(fetchDataId, { skip: !fetchDataId || !show })
    : { data: null, isLoading: false };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const transformed = onSubmitTransform(values);
        const result = await mutate(transformed).unwrap();
        if (result.status === true) {
          notify(result.message, "success");
          handleClose();
          formik.resetForm();
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  // Update form values when fetched data is available or show prop changes
  useEffect(() => {
    if (fetchDataHook && !isFetching && fetchedData && fetchedData.data) {
      formik.resetForm({
        values: Object.keys(initialValues).reduce((acc, key) => {
          acc[key] = fetchedData.data[key] || initialValues[key];
          return acc;
        }, {}),
      });
    } else if (!fetchDataHook && show && typeof show === "object") {
      formik.resetForm({
        values: Object.keys(initialValues).reduce((acc, key) => {
          acc[key] = show[key] !== undefined ? show[key] : initialValues[key];
          return acc;
        }, {}),
      });
    }
  }, [isFetching, fetchedData, show, initialValues, fetchDataHook]);

  // Handle success notification
  useEffect(() => {
    if (!isLoading && isSuccess && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
    }
  }, [isLoading, isSuccess]);

  // Handle error notification
  useEffect(() => {
    if (isError && error) {
      if (error.status === "FETCH_ERROR") {
        notify("No Internet Connection", "error");
      } else if (error.status === 401) {
        // Assuming triggerRedirect exists globally
        if (typeof triggerRedirect === "function") {
          triggerRedirect();
        }
      } else {
        notify(error.data?.message || "An error occurred", "error");
        formik.setErrors(error.data?.errors || {});
      }
    }
  }, [isError, error]);

  // Reset notification flag when modal is shown
  useEffect(() => {
    hasNotifiedRef.current = false;
  }, [show]);

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const renderField = (field) => {
    if (field.type === "hidden") {
      return null;
    }

    switch (field.type) {
      case "select":
        return (
          <FormControl
            key={field.name}
            fullWidth
            margin="dense"
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4", zIndex: 2000000002 }}
            error={!!formik.touched[field.name] && !!formik.errors[field.name]}
          >
            <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.name}-label`}
              id={field.name}
              name={field.name}
              label={field.label}
              value={formik.values[field.name] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              MenuProps={{
                disablePortal: true,
                PaperProps: {
                  style: {
                    zIndex: 2000000003,
                  },
                },
              }}
            >
              {(field.options || selectData[field.dataKey]?.data || []).map(
                (opt) => (
                  <MenuItem
                    key={opt.value ?? opt.id}
                    value={opt.value ?? opt[field.valueKey]}
                  >
                    {opt.label ??
                      (field.displayKey
                        ? field.secondaryDisplayKey
                          ? `${opt[field.displayKey]} - ${opt[field.secondaryDisplayKey]}`
                          : opt[field.displayKey]
                        : opt[field.valueKey])}
                  </MenuItem>
                )
              )}
            </Select>
            {formik.touched[field.name] && formik.errors[field.name] && (
              <FormHelperText>{formik.errors[field.name]}</FormHelperText>
            )}
          </FormControl>
        );
      case "date":
        return (
          <FormControl
            key={field.name}
            fullWidth
            margin="dense"
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4", zIndex: 2000000002 }}
            error={!!formik.touched[field.name] && !!formik.errors[field.name]}
          >
            <TextField
              id={field.name}
              name={field.name}
              label={field.label}
              type="date"
              value={formik.values[field.name] || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: field.minDate }}
              fullWidth
              sx={{ zIndex: 2000000002 }}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <FormHelperText>{formik.errors[field.name]}</FormHelperText>
            )}
          </FormControl>
        );
      case "password":
        return (
          <TextField
            key={field.name}
            margin="dense"
            id={field.name}
            name={field.name}
            label={field.label}
            type={showPassword[field.name] ? "text" : "password"}
            fullWidth
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4", zIndex: 2000000002 }}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name]}
            error={!!formik.touched[field.name] && !!formik.errors[field.name]}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            dir={field.dir || "rtl"}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => togglePasswordVisibility(field.name)}
                  edge="end"
                  sx={{ color: theme.palette.text.secondary, zIndex: 2000000002 }}
                >
                  {showPassword[field.name] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        );
      default:
        return (
          <TextField
            key={field.name}
            margin="dense"
            id={field.name}
            name={field.name}
            label={field.label}
            type={field.type || "text"}
            fullWidth
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4", zIndex: 2000000002 }}
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name]}
            error={!!formik.touched[field.name] && !!formik.errors[field.name]}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            dir={field.dir || "rtl"}
          />
        );
    }
  };

  return (
    <>
      <style>{`
        .modal-backdrop {
          z-index: 2000000000 !important;
        }
        .modal {
          z-index: 2000000001 !important;
        }
      `}</style>
      
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        style={{ zIndex: 2000000001 , direction:"rtl" }}
        
      >
        <div
          style={{
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            padding: 24,
            borderRadius: 8,
            position: "relative",
            zIndex: 2000000002,
            minWidth: isNonMobile ? 500 : "90%",
          }}
        >
          <h5 style={{ textAlign: "center", marginBottom: 16, zIndex: 2000000002 }}>
            {title}
          </h5>

          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isNonMobile ? "repeat(4, 1fr)" : "1fr",
                gap: 2,
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                p: 2,
                borderRadius: 1,
                position: "relative",
                zIndex: 2000000002,
              }}
            >
              {isFetching ? (
                <Box sx={{ textAlign: "center", gridColumn: "span 4", zIndex: 2000000002 }}>
                  <CircularProgress />
                </Box>
              ) : (
                fields.map(renderField)
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
                position: "relative",
                zIndex: 2000000002,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleClose();
                  formik.resetForm();
                }}
                sx={{ position: "relative", zIndex: 2000000002 }}
              >
                تجاهل
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading || isFetching}
                sx={{ position: "relative", zIndex: 2000000002 }}
              >
                {isLoading ? <Spinner animation="border" size="sm" /> : "حفظ"}
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DynamicEditModal;