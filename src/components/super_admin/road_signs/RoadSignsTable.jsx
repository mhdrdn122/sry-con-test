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
import Loading from '../../../utils/Loading';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxWidth: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  background: 'linear-gradient(145deg, #e3f2fd, #f5faff)',
  margin: '8px 0',
  overflowX: 'auto',
  [theme.breakpoints.down('sm')]: {
    margin: '4px 0',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  tableLayout: 'auto',
  '& .MuiTableCell-head': {
    background: theme.palette.blue?.main || '#1976d2',
    color: theme.palette.common.white,
    fontWeight: 600,
    padding: '8px 12px',
    borderBottom: `2px solid ${theme.palette.blue?.dark || '#1565c0'}`,
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
    backgroundColor: theme.palette.blue?.[50] || '#e3f2fd',
  },
  '&:hover': {
    backgroundColor: theme.palette.blue?.[100] || '#bbdefb',
  },
}));

const RoadSignsTable = ({ roadSigns , isLoading }) => {

    if(isLoading) {
        return <div className='flex justify-center items-center'>
            <Loading />
        </div>
    }
    
  return roadSigns?.coding_count?.length > 0 ? (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <TableRow>
            {roadSigns.coding_count.map((el, index) => (
              <TableCell key={index}>{el?.coding_name || 'غير محدد'}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {roadSigns.coding_count.map((el, index) => (
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

export default RoadSignsTable;