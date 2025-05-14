import React from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { Modal, Spinner } from "react-bootstrap";
  import { useEffect, useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { useDispatch, useSelector } from "react-redux";
  import notify from "../../../utils/useNotification";
import { useAddNewCashPaymentMutation, useGetCodingsQuery } from '../../../redux/slice/super_admin/payments/paymentsApi';
const ModalAddCashPayment = ({show,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [page, setPage] = useState(1);
    
    const [
      addNewCashPayment,
      { isLoading: isLoadingAdd, isSuccess, isError, error: errorAdd },
    ] = useAddNewCashPaymentMutation();

    const { data: codingsData, isLoading:isLoadingCoding, errorCoding } = 
    useGetCodingsQuery({ page });
    
              const formik = useFormik({
                initialValues: {
                    // payment_id: show?.id || "", 
                    amount_paid:"",
                    image:"",
                    code:""
                },
                enableReinitialize: true,
                onSubmit: async (values) => {
                console.log("values : ",values);
                const formData = new FormData();
                formData.append("amount_paid", values.amount_paid);
                if (values.image) {
                  formData.append("image", values.image);
                }
                formData.append("code", values.code);
                try {
                  const result = await addNewCashPayment(formData).unwrap();
              } catch (error) {
                  console.error("Upload failed", error);
              }
            },
                validationSchema: Yup.object({
                amount_paid: Yup.string().required("Required"),
                image: Yup.string().required("Required"),
            }),
            })
            useEffect(() => {
                if (!isLoadingAdd && isSuccess) {
                  notify("Added successfully", "success");
                  handleClose();
                  formik.resetForm();
                }
              }, [isSuccess, isLoadingAdd]);
              useEffect(() => {
                if (isError) {
                  console.error("Failed to add admin:", errorAdd);
                  if (errorAdd.status === "FETCH_ERROR") {
                    notify("No Internet Connection", "error");
                  } else if (errorAdd.status === 401) {
                    triggerRedirect();
                  } else {
                    notify(errorAdd.data.message, "error");
                    formik.setErrors(errorAdd.data?.errors || {});
                  }
                }
              }, [isError, errorAdd]);  
  return (
    <Modal show={show} onHide={handleClose} centered>
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>إضافة دفعة</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box
            m="40px 0 0 0"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, 1fr)" // تعديل هنا لتكون 4 أعمدة
            sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
        >
            {/* amount paid */}
            <TextField
                margin="dense"
                id="amount_paid"
                name="amount_paid"
                label="المبلغ المراد دفعه"
                type="text"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount_paid}
                error={!!formik.touched.amount_paid && !!formik.errors.amount_paid}
                helperText={formik.touched.amount_paid && formik.errors.amount_paid}
                />
           {/* Select for code */}
            <FormControl
                margin="dense"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                error={!!formik.touched.code && !!formik.errors.code}
            >
                <InputLabel id="code-label">الكود</InputLabel>
                <Select
                    labelId="code-label"
                    id="code"
                    name="code"
                    InputLabelProps={{ shrink: true }}
                    label="الكود"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {codingsData?.data?.map((coding) => (
                        <MenuItem key={coding.id} value={coding.code}>
                            {coding.code}
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched.code && formik.errors.code && (
                    <FormHelperText>{formik.errors.code}</FormHelperText>
                )}
            </FormControl>
                {/* Image upload */}
            <FormControl
                margin="dense"
                fullWidth
                sx={{ gridColumn: "span 2" }}>
                <InputLabel shrink htmlFor="image">
                    صورة الإيصال
                </InputLabel>
                <TextField
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        formik.setFieldValue("image", file); // Save the file to formik state
                    }}
                    onBlur={formik.handleBlur}
                    inputProps={{ accept: "image/*" }} // Restrict to image files
                    error={!!formik.touched.image && !!formik.errors.image}
                />
                {formik.touched.image && formik.errors.image && (
                    <FormHelperText error>
                        {formik.errors.image}
                    </FormHelperText>
                )}
            </FormControl>
            </Box>
        </Modal.Body>
        <Modal.Footer>
            <Button
            variant="contained"
            className="mx-2"
            onClick={() => {
                handleClose();
                formik.resetForm();
            }}
            >
            تجاهل
            </Button>

            {isLoadingAdd === true ? (
            <Button variant="contained" className="">
                <Spinner
                className="m-auto"
                animation="border"
                role="status"
                ></Spinner>
            </Button>
            ) : (
            <Button variant="contained" type="submit" className="">
                    حفظ
                </Button>
    
                )}
            </Modal.Footer>
    </form>
    </Modal>
  )
}

export default ModalAddCashPayment