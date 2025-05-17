import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import {
  Person,
  LocationOn,
  Phone,
  Email,
  Business,
  CalendarToday,
  FormatListNumbered,
} from "@mui/icons-material";

// Reusable component for rendering key-value pairs with icons
const InfoField = ({ label, value, icon }) => (
  <Box
    display="flex"
    alignItems="center"
    gap="12px"
    sx={{
      transition: "transform 0.2s",
      "&:hover": { transform: "translateX(-4px)" },
    }}
  >
    {icon}
    <Typography variant="body1" fontWeight="bold" color="text.primary">
      {label}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {value}
    </Typography>
  </Box>
);

// Reusable component for rendering reservations
const ReservationsList = ({ reservations }) => (
  <Card sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 2 }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap="8px" mb={2}>
        <CalendarToday color="primary" />
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          الحجوزات:
        </Typography>
      </Box>
      {reservations.map((reservation, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="8px"
          mb={1}
        >
          <Typography variant="body2">
            تاريخ البداية: {reservation.start_date}
          </Typography>
          <Typography variant="body2">
            تاريخ النهاية: {reservation.end_date}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            بواسطة:
          </Typography>
          <Typography variant="body2">
            {reservation.company_name || reservation.name || "غير متوفر"}
          </Typography>
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Modal configurations for different pages
const modalConfig = {
  admins: {
    fields: [
      { label: "اسم المستخدم:", key: "username", icon: <Person /> },
      { label: "الاسم:", key: "name", icon: <Person /> },
      { label: "الهاتف:", key: "phone", icon: <Phone /> },
      { label: "العنوان:", key: "address", icon: <LocationOn /> },
    ],
  },
  roadSing: {
    fields: [
      { label: "المنطقة:", key: "region", icon: <LocationOn /> },
      { label: "الموقع:", key: "place", icon: <LocationOn /> },
      { label: "عدد الوجوه:", key: "number_of_faces", icon: <FormatListNumbered /> },
      {
        label: "الطراز والنوع:",
        value: (data) =>
          `${data?.coding?.model || "غير متوفر"} & ${data?.coding?.type || "غير متوفر"}`,
        icon: <Business />,
      },
    ],
    extra: (data) =>
      data?.reservations?.length > 0 && (
        <ReservationsList reservations={data.reservations} />
      ),
  },
  reservations: {
    fields: [
      { label: "عنوان اللوحة:", key: "road_sign_region", icon: <LocationOn /> },
      { label: "النوع:", key: "type", icon: <Business /> },
      { label: "اسم الشركة:", key: "company_name", icon: <Business /> },
      { label: "المدة:", key: "duration", icon: <CalendarToday /> },
      { label: "من:", key: "start_date", icon: <CalendarToday /> },
      { label: "إلى:", key: "end_date", icon: <CalendarToday /> },
      { label: "عدد الوجوه:", key: "number_of_faces", icon: <FormatListNumbered /> },
      { label: "عدد اللوحات:", key: "signs_number", icon: <FormatListNumbered /> },
      {
        label: "مع الطباعة:",
        value: (data) => (data.with_print == 0 ? "لا" : "نعم"),
        icon: <Business />,
      },
    ],
  },
  addReservations: {
    fields: [
      { label: "المنطقة:", key: "region", icon: <LocationOn /> },
      { label: "الموقع:", key: "place", icon: <LocationOn /> },
      { label: "عدد الوجوه:", key: "number_of_faces", icon: <FormatListNumbered /> },
      {
        label: "الطراز والنوع:",
        value: (data) =>
          `${data?.coding?.model || "غير متوفر"} & ${data?.coding?.type || "غير متوفر"}`,
        icon: <Business />,
      },
    ],
    extra: (data) =>
      data?.reservations?.length > 0 && (
        <ReservationsList reservations={data.reservations} />
      ),
  },
  users: {
    fields: [
      { label: "الاسم:", key: "name", icon: <Person /> },
      { label: "البريد الإلكتروني:", key: "email", icon: <Email /> },
      { label: "الهاتف:", key: "phone", icon: <Phone /> },
      { label: "اسم الشركة:", key: "company_name", icon: <Business /> },
      { label: "العنوان:", key: "address", icon: <LocationOn /> },
      { label: "رقم التسجيل:", key: "registration_number", icon: <Business /> },
      { label: "النوع:", key: "format", default: "غير متوفر", icon: <Business /> },
    ],
  },
};

const ModalShow = ({ show, handleClose, fromPage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const config = modalConfig[fromPage];

  if (!config || !show) return null;

  // Group fields into rows
  const groupedFields = config.fields.reduce((acc, field, index) => {
    if (index % (isMobile ? 1 : 2) === 0) acc.push([]);
    acc[acc.length - 1].push(field);
    return acc;
  }, []);

  return (
    <Modal
      show={!!show}
      onHide={handleClose}
      centered
      size="lg"
      dir="rtl"
      aria-labelledby="modal-title"
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          p={isMobile ? 2 : 4}
        >
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
