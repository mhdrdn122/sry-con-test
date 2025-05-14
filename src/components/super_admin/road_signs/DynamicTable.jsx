import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  background: 'linear-gradient(145deg, #ffffff, #f5f7fa)',
  margin: '0 auto',
  overflowX: 'auto',
  [theme.breakpoints.down('sm')]: {
    margin: '0 8px',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& .MuiTableCell-head': {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    padding: '12px 16px',
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
  '& .MuiTableCell-body': {
    padding: '12px 16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    '& .MuiTableCell-root': {
      padding: '8px',
      fontSize: '0.85rem',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50],
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.error.main,
  fontWeight: 500,
}));

const NoDataMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}));

const DynamicTable = ({ columns, data, actions = [], loading, error, dir = 'ltr', footer = null }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable dir={dir}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align || 'center'}>
                {column.label}
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell align="center">الحدث</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                <LoadingContainer>
                  <Typography variant="body1">جار التحميل</Typography>
                  <CircularProgress />
                </LoadingContainer>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                <ErrorMessage>{error}</ErrorMessage>
              </TableCell>
            </TableRow>
          ) : paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align || 'center'}>
                                     {column.render ? column.render(row) : column.key == "coding.model" ? row['coding'].model : row[column.key] || 0 }
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {actions.map((action, idx) => (
                        (!action.condition || action.condition(row)) && (
                          <Tooltip key={idx} title={action.label} placement="top">
                            <span>
                              <IconButton
                                sx={{ color: action.color }}
                                onClick={() => action.onClick(row)}
                                disabled={action.disabled}
                              >
                                {action.icon}
                              </IconButton>
                            </span>
                          </Tooltip>
                        )
                      ))}
                    </Box>
                  </TableCell>
                )}
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                <NoDataMessage>لا توجد بيانات</NoDataMessage>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {footer && <tfoot>{footer}</tfoot>}
      </StyledTable>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="عدد الصفوف لكل صفحة:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} من ${count}`}
        sx={{
          direction: dir,
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            fontFamily: 'inherit',
          },
        }}
      />
    </StyledTableContainer>
  );
};

export default DynamicTable;