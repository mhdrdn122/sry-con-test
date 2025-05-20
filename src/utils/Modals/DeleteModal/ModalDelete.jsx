import { Modal, Button } from "react-bootstrap";
import { useTheme } from "@mui/material/styles";

const ModalDelete = ({ show, handleClose, loading, error, handleDelete }) => {
  const theme = useTheme();



  const contentStyle = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: 10,
    padding: 20,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 20px rgba(255,255,255,0.1)"
        : "0 0 20px rgba(0,0,0,0.1)",
    zIndex: theme.zIndex.modal + 1001, 
    position: "relative",
  };

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <div style={{ ...contentStyle, direction: "rtl" }}>
          <h5 style={{ marginBottom: 16, textAlign: "center" }}>
            تأكيد عملية الحذف
          </h5>

          {error && (
            <div
              style={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                padding: 8,
                borderRadius: 4,
                marginBottom: 12,
              }}
            >
              {error}
            </div>
          )}

          <p>هل أنت متأكد من حذف هذا العنصر؟</p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
            }}
          >
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{
                backgroundColor: theme.palette.secondary.main,
                border: "none",
                zIndex: theme.zIndex.modal + 1002,
              }}
            >
              تجاهل
            </Button>

            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
              style={{
                backgroundColor: theme.palette.error.main,
                border: "none",
                zIndex: theme.zIndex.modal + 1002,
              }}
            >
              {loading ? "جاري الحذف..." : "حذف"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDelete;
