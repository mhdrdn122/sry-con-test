import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import Loading from '../../utils/Loading/Loading';
import { StyledTableSmall, StyledTableContainerSmall, StyledTableRowSmall } from './styledTable';



const ModalTable = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  return data?.length > 0 ? (
    <StyledTableContainerSmall component={Paper}>
      <StyledTableSmall>
        <TableHead>
          <StyledTableRowSmall>
            {data.map((el, index) => (
              <TableCell key={index}>{el?.coding_name || el?.model || 'غير محدد'}</TableCell>
            ))}
          </StyledTableRowSmall>
        </TableHead>
        <TableBody>
          <StyledTableRowSmall>
            {data.map((el, index) => (
              <TableCell key={index}>{el?.count || '0'}</TableCell>
            ))}
          </StyledTableRowSmall>
        </TableBody>
      </StyledTableSmall>
    </StyledTableContainerSmall>
  ) : (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ p: 2 }}>
      لا توجد بيانات للوحات
    </Typography>
  );
};

export default ModalTable;