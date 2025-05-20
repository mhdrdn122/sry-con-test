import { Modal, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReceiptModal = ({ open, onClose, image }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      centered
      sx={{ direction: 'rtl', textAlign: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[5],
          p: 4,
          maxWidth: 600,
          margin: 'auto',
          mt: 4,
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Receipt"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : (
          <Typography variant="body1">لا يوجد صورة متاحة</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ReceiptModal;