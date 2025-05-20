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
import { styled, useTheme } from '@mui/material/styles';

import {StyledTableContainer , StyledTable  , StyledTableRow , ErrorMessage , NoDataMessage , LoadingContainer}  from './styledTable'



const DynamicTable = ({ columns, data, actions = [], loading, error, dir = 'rtl', footer = null }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <StyledTableContainer component={Paper} style={{ margin: 0, padding: 0 }}>
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
                <ErrorMessage>{error}</ErrorMessage>
              </TableCell>
            </TableRow>
          ) : paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  
                  <TableCell  style={{display: column.label === "العقود" ? "flex" : "table-cell"}}  key={column.key} align={column.align || 'center'}>
                    {column.render ? column.render(row) : column.key === 'coding.model' ? row['coding'].model : row[column.key] || 0}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell display="flex" align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {actions.map((action, idx) => (
                        (!action.condition || action.condition(row)) && (
                          <Tooltip display="flex" key={idx} title={action.label} placement="top">
                            <span>
                              <IconButton
                                sx={{ color: action.color || theme.palette.text.primary }}
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
        count={data?.length}
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