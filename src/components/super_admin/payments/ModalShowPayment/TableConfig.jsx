import { GiReceiveMoney } from 'react-icons/gi';
import DeleteIcon from '@mui/icons-material/Delete';
import { AiFillPicture } from 'react-icons/ai';

export const columns = [
  { key: 'super_admin_name', label: 'المدير', align: 'center' },
  { key: 'admin_name', label: 'الموظف', align: 'center' },
  { key: 'amount_paid', label: 'المبلغ المدفوع', align: 'center' },
  { key: 'created_at', label: 'تاريخ الدفع', align: 'center' },
  { key: 'status', label: 'الحالة', align: 'center' },
];

export const actions = ({ handleReceived, handleShowDelete, handleShowReceipt, theme }) => [
  {
    label: 'استلام',
    icon: <GiReceiveMoney />,
    onClick: (row) => handleReceived(row.id),
    disabled: false, // Managed in utils
    color: theme.palette.success.main,
  },
  {
    label: 'حذف',
    icon: <DeleteIcon />,
    onClick: (row) => handleShowDelete(row.id),
    color: theme.palette.error.main,
  },
  {
    label: 'عرض الإيصال',
    icon: <AiFillPicture />,
    onClick: (row) => handleShowReceipt(row),
    color: theme.palette.info.main,
  },
];