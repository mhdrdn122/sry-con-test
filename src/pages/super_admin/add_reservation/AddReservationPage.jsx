import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import RoadSignsContainer from "../../../components/super_admin/road_signs/RoadSignsContainer";
import SearchInput from "../../../utils/super_admin/SearchInput";
import DateFilter from "../../../utils/super_admin/DateFilter";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select, Button, useTheme } from "@mui/material";
import AddReservationContainer from "../../../components/super_admin/add_reservation/AddReservationContainer";
import { CiFilter } from "react-icons/ci";
import { TiFilter } from "react-icons/ti";
import { breadcrumbsAddReservationPage } from "../../../utils/Breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";


const AddReservationPage = () => {
  const [refresh, setRefresh] = useState(false)
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility
  const theme = useTheme()
  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  const [searchWord, setSearchWord] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

console.log('selectedSigns : ', selectedSigns)
  const handleShowAddReserveRoadSigns = () => {
    navigate('/super_admin/add_reservation/cart');
  };
  const handleCloseAddReserveRoadSigns = () => {
    setShowAddReserveRoadSigns(false);
  };
  // Toggle the visibility of the filter section
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbsAddReservationPage} />
      <Header
        heading={"إضافة حجز"}
        onButtonClickAddReserve={handleShowAddReserveRoadSigns}
        setRefresh={setRefresh}
        refresh={refresh}
        selectedSigns={selectedSigns}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          className="me-5"
          onClick={toggleFilters}
          sx={{ marginBottom: "1rem" }}
        >
          {showFilters ? <TiFilter size={25} /> : <CiFilter size={22} />}
        </Button>

        {/* Render the filters only if `showFilters` is true */}
        {showFilters && (
          <div style={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            direction: 'rtl',
            position:"absolute",
            zIndex:1000,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              alignItems: 'center'
            }}>
              {/* Header */}
              <div style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  width: '4px',
                  height: '20px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px'
                }}></span>
                <span style={{
                  fontWeight: '600',
                  color: theme.palette.text.primary
                }}>تصفية النتائج</span>
              </div>

              {/* Search Input - Full width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <SearchInput
                  searchWord={searchWord}
                  setSearchWord={setSearchWord}
                  phrasePlaceHolder="ابحث..."
                />
              </div>

              {/* City Filter */}
              <FormControl
                variant="outlined"
                margin="dense"
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: theme.palette.background.default,
                  },
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -50%) scale(0.9)',
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)'
                    }
                  },
                }}
              >
                <InputLabel id="city-filter-label">المدينة</InputLabel>
                <Select
                  labelId="city-filter-label"
                  id="city-filter"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  label="المدينة"
                  sx={{
                    height: '40px',
                    '& .MuiSelect-select': {
                      padding: '10px 14px'
                    }
                  }}
                >
                  <MenuItem value="">الكل</MenuItem>
                  <MenuItem value="دمشق">دمشق</MenuItem>
                  <MenuItem value="حلب">حلب</MenuItem>
                </Select>
              </FormControl>

              {/* Status Filter */}
              <FormControl
                variant="outlined"
                margin="dense"
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: theme.palette.background.default,
                  },
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -50%) scale(0.9)',
                    '&.MuiInputLabel-shrink': {
                      transform: 'translate(14px, -9px) scale(0.75)'
                    }
                  },
                }}
              >
                <InputLabel id="status-filter-label">الحالة</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="الحالة"
                  sx={{
                    height: '40px',
                    '& .MuiSelect-select': {
                      padding: '10px 14px'
                    }
                  }}
                >
                  <MenuItem value="">الكل</MenuItem>
                  <MenuItem value="متاح">متاح</MenuItem>
                  <MenuItem value="محجوز">محجوز</MenuItem>
                </Select>
              </FormControl>

              {/* Date Filters - Will stack on mobile */}
              <div style={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
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
              </div>
            </div>
          </div>
        )}

      </div>
      <AddReservationContainer
        handleClose={handleCloseAddReserveRoadSigns}
         handleCloseAddReserve={handleCloseAddReserveRoadSigns}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        city={city}

      />
    </div>
  )
}

export default AddReservationPage