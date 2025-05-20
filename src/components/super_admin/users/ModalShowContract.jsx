import { Box, Button, TextField, FormControl, useMediaQuery, useTheme } from "@mui/material";
import { Modal, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import notify from "../../../utils/useNotification";
import { baseURLLocal } from "../../../Api/baseURLLocal";

const ModalShowContract = ({ show, handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      id: show?.id || "",
      num: "",
      date: "",
      discount: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("id", values.id);
        formData.append("num", values.num);
        formData.append("date", values.date);
        formData.append("discount", values.discount ? Number(values.discount) : 0); // Ensure discount is a number
        formData.append("exchangeRate", values.exchangeRate ? Number(values.exchangeRate) : 0); // Ensure discount is a number

        const response = await fetch(`${baseURLLocal}/user/${values.id}/pdf`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${superAdminInfo.token}`, // Add the token here
          },
          body: formData, // Use FormData
        });

        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "contract.docx";
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
    }
  });

  return (
    <Modal show={show}  onHide={handleClose} centered>
      <form style={{backgroundColor:theme.palette.background.default , direction:"rtl"}} onSubmit={formik.handleSubmit} autoComplete="off">
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
              type="number"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
              inputProps={{
                min: 1,
                max: 90,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discount}
              error={!!formik.touched.discount && !!formik.errors.discount}
              helperText={formik.touched.discount && formik.errors.discount}
              dir="rtl"
            />

            <TextField
              margin="dense"
              id="exchangeRate"
              name="exchangeRate"
              label="سعر الصرف"
              type="number"
              fullWidth
              sx={{ gridColumn: "span 2" }}
              variant="outlined"
             
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.exchangeRate}
              error={!!formik.touched.exchangeRate && !!formik.errors.exchangeRate}
              helperText={formik.touched.exchangeRate && formik.errors.exchangeRate}
              dir="rtl"
            />
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
    </Modal>
  );
};

export default ModalShowContract;
