import { useState } from 'react';
import { Box, Modal, Typography, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { columns, actions } from './TableConfig';
import { handleReceived, handleDelete } from './utils';
import { useShowOneHistoryPaymentQuery } from '../../../../redux/slice/super_admin/payments/paymentsApi';
import { StyledTableContainer, StyledTable } from './StyledComponents';
import DeleteModal from './DeleteModal';
import ReceiptModal from './ReceiptModal';
import DynamicTablePayment from './DynamicTablePayment';

const ModalShowPayment = ({ show, handleClose }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDelete, setShowDelete] = useState(false);
  const [showPic, setShowPic] = useState(null);

  const {
    data: onePaymentHistory,
    isLoading: loading,
    error,
  } = useShowOneHistoryPaymentQuery(show?.user_id, { skip: !show });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowDelete = (id) => {
    setShowDelete(id);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowReceipt = (payment) => {
    setShowPic(payment);
  };

  const handleCloseShowReceipt = () => {
    setShowPic(null);
  };

  return (
    <>
      <Modal
        open={!!show}
        onClose={handleClose}
        centered
        sx={{ direction: 'rtl', textAlign: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            p: 4,
            maxWidth: 800,
            margin: 'auto',
            mt: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            ملخص الفاتورة
          </Typography>
          <StyledTableContainer component="div">
            <StyledTable dir="rtl">
              <tbody>
                <tr>
                  <td style={{ width: '30%' }}>اسم الشركة</td>
                  <td style={{ width: '60%' }}>{show?.company_name}</td>
                </tr>
                <tr>
                  <td>رقم الشركة</td>
                  <td>{show?.company_phone}</td>
                </tr>
                <tr>
                  <td>ايميل الشركة</td>
                  <td>{show?.company_email}</td>
                </tr>
              </tbody>
            </StyledTable>
          </StyledTableContainer>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            تفاصيل الدفعات
          </Typography>
          <DynamicTablePayment
            columns={columns}
            data={onePaymentHistory?.data || []}
            actions={actions({ handleReceived, handleShowDelete, handleShowReceipt, theme })}
            loading={loading}
            error={error?.data?.message}
            dir="rtl"
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Modal>

      <DeleteModal
        open={!!showDelete}
        onClose={handleCloseDelete}
        onDelete={() => handleDelete(showDelete, handleCloseDelete)}
        loading={false} // Loading state will be handled in utils
      />

      <ReceiptModal
        open={!!showPic}
        onClose={handleCloseShowReceipt}
        image={showPic?.image}
      />

      <ToastContainer />
    </>
  );
};

export default ModalShowPayment;