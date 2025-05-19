import { Box, Button, TextField, FormControl, useMediaQuery } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { useEffect } from "react";
import notify from "../../../utils/useNotification";
import { baseURLLocal } from "../../../Api/baseURLLocal";

import React from 'react'

const ModalShowOffer = ({show,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
    const formik = useFormik({
        initialValues: {
          id: show?.id || "",
          discount:"",
        },
        enableReinitialize: true,
    
        onSubmit: async (values) => {
          try {
            const response = await fetch(
              `${baseURLLocal}/user/create-financial-offer/${values.id}/word`,
              {
                method: "POST",
                headers: {
                  // "Content-Type": "application/json",
                  "Authorization": `Bearer ${superAdminInfo.token}`, // Add the token here
                  },
                body: JSON.stringify(values),
              }
            );
            console.log('response : ',response)
            if (response.ok) {
              const blob = await response.blob();
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "offerContract.docx"; // Change the file extension to .docx
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          notify("Word file downloaded successfully", "success");
          handleClose();
            } else {
              const errorData = await response.json();
              const errorMessage = errorData?.message || "Failed to download PDF";
              throw new Error(errorMessage);
            }
          } catch (error) {
            console.error("Error downloading the file:", error);
            notify(error.message || "Error downloading the file", "error");
          }
        },
      });
  return (
 <Modal show={show} onHide={handleClose} centered>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>تصدير عقد</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            m="40px 0 0 0"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, 1fr)"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
         
              <TextField
              margin="dense"
              id="discount"
              name="discount"
              label="الخصم"
              type="text" 
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discount}
              error={!!formik.touched.discount && !!formik.errors.discount}
              helperText={formik.touched.discount && formik.errors.discount}
              dir="rtl"
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="mx-2 primary"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            تجاهل </Button>

          <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            className=""
          >
            {formik.isSubmitting ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "حفظ"
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>  )
}

export default ModalShowOffer 