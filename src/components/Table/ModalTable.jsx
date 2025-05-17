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
import { styled } from '@mui/material/styles';
import Loading from '../../utils/Loading';
import { useEffect, useState } from 'react';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper,
  margin: '8px 0',
  overflowX: 'auto',
  [theme.breakpoints.down('sm')]: {
    margin: '4px 0',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  tableLayout: 'auto',
  '& .MuiTableCell-head': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    padding: '8px 12px',
    borderBottom: `2px solid ${theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light}`,
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  '& .MuiTableCell-body': {
    padding: '8px 12px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: '0.85rem',
    color: theme.palette.text.primary,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 8px',
      fontSize: '0.8rem',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.grey[800],
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.action.selected : theme.palette.grey[700],
  },
}));

const ModalTable = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  return data?.length > 0 ? (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <TableRow>
            {data.map((el, index) => (
              <TableCell key={index}>{el?.coding_name || el?.model || 'غير محدد'}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {data.map((el, index) => (
              <TableCell key={index}>{el?.count || '0'}</TableCell>
            ))}
          </StyledTableRow>
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  ) : (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ p: 2 }}>
      لا توجد بيانات للوحات
    </Typography>
  );
};

export default ModalTable;