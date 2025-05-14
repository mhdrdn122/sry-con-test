import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchInput from '../../../utils/super_admin/SearchInput';
import DateFilter from '../../../utils/super_admin/DateFilter';
// import SearchInput from './SearchInput'; // Adjust path as needed
// import DateFilter from './DateFilter'; // Adjust path as needed

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: 'linear-gradient(145deg, #e3f2fd, #f5faff)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  width: '100%',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5),
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 140,
  '& .MuiInputBase-root': {
    height: '40px',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300],
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    '& .MuiInputBase-root': {
      height: '36px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.85rem',
    },
  },
}));

const FiltersBar = ({
  searchWord,
  setSearchWord,
  city,
  setCity,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <FiltersContainer>
      <SearchInput searchWord={searchWord} setSearchWord={setSearchWord} />
      <StyledFormControl variant="outlined" margin="dense">
        <InputLabel id="city-filter-label">المدينة</InputLabel>
        <Select
          labelId="city-filter-label"
          id="city-filter"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="المدينة"
        >
          <MenuItem value="">الكل</MenuItem>
          <MenuItem value="دمشق">دمشق</MenuItem>
          <MenuItem value="حلب">حلب</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledFormControl variant="outlined" margin="dense">
        <InputLabel id="status-filter-label">الحالة</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="الحالة"
        >
          <MenuItem value="">الكل</MenuItem>
          <MenuItem value="متاح">متاح</MenuItem>
          <MenuItem value="محجوز">محجوز</MenuItem>
        </Select>
      </StyledFormControl>
      <DateFilter
        value={startDate}
        setValue={setStartDate}
        name="startDate"
        label="تاريخ البداية"
      />
      <DateFilter
        value={endDate}
        setValue={setEndDate}
        name="endDate"
        label="تاريخ النهاية"
      />
    </FiltersContainer>
  );
};

export default FiltersBar;