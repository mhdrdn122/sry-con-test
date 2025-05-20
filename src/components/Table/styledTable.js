import { Box, styled, Table, TableContainer, TableRow, Typography } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  background: theme.palette.mode === 'light'
    ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
    : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
  margin: '0 auto',
  overflowX: 'auto',
  [theme.breakpoints.down('sm')]: {
    margin: '0 8px',
  },
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    padding: '12px 16px',
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.action.selected
        : theme.palette.action.selected,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.error.main,
  fontWeight: 500,
}));

export const NoDataMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}));



export const StyledTableContainerSmall = styled(TableContainer)(({ theme }) => ({
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

export const StyledTableSmall = styled(Table)(({ theme }) => ({
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

export const StyledTableRowSmall = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.grey[800],
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.action.selected : theme.palette.grey[700],
  },
}));