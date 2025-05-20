import { Box, Card, CardContent, Typography } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

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

export default ReservationsList;
