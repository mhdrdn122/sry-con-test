import { toast } from 'react-toastify';
import { useDeletePaymentMutation, useReceivedPaymentMutation } from '../../../../redux/slice/super_admin/payments/paymentsApi';

export const handleReceived = async (id) => {
  const [receivedPayment] = useReceivedPaymentMutation();
  try {
    const result = await receivedPayment(id).unwrap();
    if (result.status === true) {
      toast.success(result.message);
      return true;
    } else {
      toast.error(result.message);
      return false;
    }
  } catch (err) {
    if (err?.status === 401) {
      toast.error('Unauthorized access. Please log in again.');
    } else {
      toast.error(err?.data?.message || 'Failed to process payment');
    }
    return false;
  }
};

export const handleDelete = async (id, handleCloseDelete) => {
  const [deletePayment] = useDeletePaymentMutation();
  try {
    const result = await deletePayment(id).unwrap();
    if (result.status === true) {
      toast.success(result.msg);
      handleCloseDelete();
      return true;
    } else {
      toast.error(result.msg);
      return false;
    }
  } catch (err) {
    if (err?.status === 401) {
      toast.error('Unauthorized access. Please log in again.');
    } else {
      toast.error(err?.data?.message || 'Failed to delete payment');
    }
    return false;
  }
};