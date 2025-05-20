import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Modal } from "react-bootstrap";
import InfoField from "./InfoField";
import modalConfig from "./modalConfig";

const ModalShow = ({ show, handleClose, fromPage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const config = modalConfig[fromPage];

  if (!config || !show) return null;

  const groupedFields = config.fields
    ? config.fields.reduce((acc, field, index) => {
        if (index % (isMobile ? 1 : 2) === 0) acc.push([]);
        acc[acc.length - 1].push(field);
        return acc;
      }, [])
    : [];

  return (
    <Modal
      show={!!show}
      onHide={handleClose}
      centered
      size="lg"
      dir="rtl"
      aria-labelledby="modal-title"
      backdrop="static"
      style={{ zIndex: 2000 }} 
    >
      <Modal.Header
        closeButton
        className="d-flex justify-content-center"
        style={{
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderBottom: "none",
        }}
      >
        <Modal.Title id="modal-title">التفاصيل</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: theme.palette.background.default }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3} p={isMobile ? 2 : 4}>
          {groupedFields.map((row, rowIndex) => (
            <Card
              key={rowIndex}
              sx={{
                width: "100%",
                boxShadow: 3,
                bgcolor: "background.paper",
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  flexDirection={isMobile ? "column" : "row"}
                  justifyContent="space-between"
                  alignItems={isMobile ? "flex-start" : "center"}
                  gap={isMobile ? 2 : 4}
                >
                  {row.map((field, fieldIndex) => (
                    <InfoField
                      key={fieldIndex}
                      label={field.label}
                      value={
                        field.value
                          ? field.value(show)
                          : show[field.key] || field.default || "غير متوفر"
                      }
                      icon={field.icon}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
          {config.extra && config.extra(show)}
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ModalShow;
