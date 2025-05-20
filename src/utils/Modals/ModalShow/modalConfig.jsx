import {
  Person,
  LocationOn,
  Phone,
  Email,
  Business,
  CalendarToday,
  FormatListNumbered,
} from "@mui/icons-material";
import ReservationsList from "./ReservationsList";
import { Card, CardContent, Typography, Box } from "@mui/material";

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
  activities: {
    extra: (data) =>
      data?.subject ? (
        <Card sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap="8px" mb={2}>
              <CalendarToday color="primary" />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                بيانات الموضوع:
              </Typography>
            </Box>
            <ul className="list-group">
              {Object.entries(data.subject).map(([key, value]) => (
                <li key={key} className="list-group-item">
                  <strong>{key}: </strong> {value.toString()}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <Typography>لا توجد بيانات متاحة</Typography>
      ),
  },
};

export default modalConfig;
