import { Modal, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DeleteModal = ({ open, onClose, onDelete, loading }) => {
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
          maxWidth: 400,
          margin: 'auto',
          mt: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          تأكيد الحذف
        </Typography>
        <Typography variant="body1" gutterBottom>
          هل أنت متأكد من حذف هذه الدفعة؟
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <IconButton
            color="error"
            onClick={onDelete}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'حذف'}
          </IconButton>
          <IconButton color="primary" onClick={onClose}>
            إلغاء
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;