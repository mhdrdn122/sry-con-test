import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableRow,
  ErrorMessage,
  NoDataMessage,
  LoadingContainer,
} from './StyledComponents';

const DynamicTablePayment = ({
  columns,
  data,
  actions = [],
  loading,
  error,
  dir = 'rtl',
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const paginatedData = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <StyledTableContainer component="div">
      <StyledTable dir={dir}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align || 'center'}>
                {column.label}
              </TableCell>
            ))}
            {actions.length > 0 && <TableCell align="center">الحدث</TableCell>}
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
                <ErrorMessage>{error || 'خطأ في جلب البيانات'}</ErrorMessage>
              </TableCell>
            </TableRow>
          ) : paginatedData?.length > 0 ? (
            paginatedData.map((row) => (
              <StyledTableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align || 'center'}>
                    {row[column.key] || '-'}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {actions.map((action, idx) => (
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
      </StyledTable>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data?.length || 0}
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

export default DynamicTablePayment;