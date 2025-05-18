import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import notify from "../../useNotification";

const DynamicModal = ({
  show,
  handleClose,
  title,
  fields,
  validationSchema,
  mutationHook,
  initialValues,
  selectData = {},
  onSubmitTransform = (values) => values,
}) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [mutate, { isLoading, isSuccess, isError, error }] = mutationHook();
  const [hasNotified, setHasNotified] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const transformedValues = onSubmitTransform(values);
        const result = await mutate(transformedValues).unwrap();
        console.log(result);
      } catch (err) {
        console.error("Mutation error:", err);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && isSuccess && !hasNotified) {
      notify("Added successfully", "success");
      setHasNotified(true);
      handleClose();
      formik.resetForm();
    }
  }, [isSuccess, isLoading, handleClose, formik, hasNotified]);

  useEffect(() => {
    if (isError) {
      console.error("Failed to add:", error);
      if (error.status === "FETCH_ERROR") {
        notify("No Internet Connection", "error");
      } else if (error.status === 401) {
        // redirect logic
      } else {
        notify(error.data?.message || "An error occurred", "error");
        formik.setErrors(error.data?.errors || {});
      }
    }
  }, [isError, error, formik]);

  useEffect(() => {
    return () => setHasNotified(false);
  }, [show]);

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <FormControl
            key={field.name}
            fullWidth
            margin="dense"
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
            >
              {field.options
                ? field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : selectData[field.dataKey]?.data?.map((item) => (
                    <MenuItem key={item.id} value={item[field.valueKey]}>
                      {field.displayKey
                        ? item[field.displayKey]
                        : item[field.valueKey]}
                    </MenuItem>
                  ))}
            </Select>
            {formik.touched[field.name] && formik.errors[field.name] && (
              <FormHelperText>{formik.errors[field.name]}</FormHelperText>
            )}
          </FormControl>
        );
      case "file":
        return (
          <FormControl
            key={field.name}
            fullWidth
            margin="dense"
            error={!!formik.touched[field.name] && !!formik.errors[field.name]}
          >
            <InputLabel shrink htmlFor={field.name}>
              {field.label}
            </InputLabel>
            <TextField
              id={field.name}
              name={field.name}
              type="file"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue(field.name, file);
              }}
              onBlur={formik.handleBlur}
              inputProps={{ accept: field.accept || "image/*" }}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <FormHelperText>{formik.errors[field.name]}</FormHelperText>
            )}
          </FormControl>
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
    <Modal style={{position:"absolute" , zIndex:"10000000"}}  show={show} onHide={handleClose} centered>
      <form style={{ backgroundColor: theme.palette.background.paper  }} onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: theme.palette.background.paper }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isNonMobile ? "repeat(2, 1fr)" : "1fr",
              gap: "20px",
              bgcolor: theme.palette.background.default,
              color: theme.palette.text.primary,
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {fields.map(renderField)}
          </Box>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: theme.palette.background.paper }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            تجاهل
          </Button>
          {isLoading ? (
            <Button variant="contained">
              <Spinner animation="border" size="sm" />
            </Button>
          ) : (
            <Button variant="contained" color="error" type="submit">
              حفظ
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DynamicModal;
