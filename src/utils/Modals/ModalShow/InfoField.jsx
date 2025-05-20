import { Box, Typography } from "@mui/material";

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

export default InfoField;
