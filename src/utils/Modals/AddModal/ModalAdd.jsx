import React, { useEffect, useRef } from "react";
import {
  Box,
  Button as MuiButton,
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
  const hasNotifiedRef = useRef(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const transformed = onSubmitTransform(values);
        await mutate(transformed).unwrap();
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && isSuccess && !hasNotifiedRef.current) {
      notify("Added successfully", "success");
      hasNotifiedRef.current = true;
      handleClose();
      formik.resetForm();
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.status === "FETCH_ERROR") {
        notify("No Internet Connection", "error");
      } else {
        notify(error.data?.message || "An error occurred", "error");
        formik.setErrors(error.data?.errors || {});
      }
    }
  }, [isError, error]);

  useEffect(() => {
    hasNotifiedRef.current = false;
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
              MenuProps={{
                disablePortal: true, // منع إنشاء بوابة منفصلة للقائمة
                PaperProps: {
                  style: {
                    zIndex: 3000000000, // أعلى من المودال ومحتوياته
                  },
                },
              }}
              sx={{ zIndex: 2500000000 }}
            >
              {(field.options || selectData[field.dataKey]?.data || []).map((opt) => (
                <MenuItem
                  key={opt.value ?? opt.id}
                  value={opt.value ?? opt[field.valueKey]}
                >
                  {opt.label ?? opt[field.displayKey ?? field.valueKey]}
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
              onChange={(e) =>
                formik.setFieldValue(field.name, e.currentTarget.files[0])
              }
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
        dialogClassName="modal-dialog"
        backdropClassName="modal-backdrop"
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
          <h5 style={{ textAlign: "center", marginBottom: 16, zIndex: 2000000003 }}>{title}</h5>

          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isNonMobile ? "1fr 1fr" : "1fr",
                gap: 2,
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                p: 2,
                borderRadius: 1,
                position: "relative",
                zIndex: 2000000003,
              }}
            >
              {fields.map(renderField)}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
                position: "relative",
                zIndex: 2000000003,
              }}
            >
              <MuiButton
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleClose();
                  formik.resetForm();
                }}
                sx={{
                  position: "relative",
                  zIndex: 2000000003,
                }}
              >
                تجاهل
              </MuiButton>

              {isLoading ? (
                <MuiButton variant="contained" sx={{ zIndex: 2000000003 }}>
                  <Spinner animation="border" size="sm" />
                </MuiButton>
              ) : (
                <MuiButton variant="contained" color="primary" type="submit" sx={{ zIndex: 2000000003 }}>
                  حفظ
                </MuiButton>
              )}
            </Box>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DynamicModal;