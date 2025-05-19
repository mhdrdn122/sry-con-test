import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import RoadSignsContainer from "../../../components/super_admin/road_signs/RoadSignsContainer";
import SearchInput from "../../../utils/super_admin/SearchInput";
import DateFilter from "../../../utils/super_admin/DateFilter";
import { useSelector } from "react-redux";
import { Button, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { TiFilter } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";
import { breadcrumbsRoadSigns } from "../../../utils/Breadcrumbs/breadcrumbs";


const RoadSignsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const theme = useTheme()


  const [showAddRoadSigns, setShowAddRoadSigns] = useState(false);
  const [showAddReserveRoadSigns, setShowAddReserveRoadSigns] = useState(false);
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  const isSuperAdmin = superAdminInfo?.role === "super";

  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  const [searchWord, setSearchWord] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');

  const handleShowAddRoadSigns = () => {
    setShowAddRoadSigns(true);
  };
  const handleCloseAddRoadSigns = () => {
    setShowAddRoadSigns(false);
  };

  const handleShowAddReserveRoadSigns = () => {
    setShowAddReserveRoadSigns(true);
  };
  const handleCloseAddReserveRoadSigns = () => {
    setShowAddReserveRoadSigns(false);
  };
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbsRoadSigns} />
      <Header
        heading={"اللوحات الطرقية"}
        buttonText={isSuperAdmin ? "إضافة" : undefined}
        onButtonClick={handleShowAddRoadSigns}
        // onButtonClickAddReserve={handleShowAddReserveRoadSigns}
        setRefresh={setRefresh}
        refresh={refresh}
        selectedSigns={selectedSigns}
      />



      <Button
        variant="contained"
        color="primary"
        className="me-2 sm:me-4"
        onClick={toggleFilters}
        sx={{
          marginBottom: { xs: '0.5rem', sm: '1rem' },
          padding: { xs: '6px 12px', sm: '8px 16px' },
          minWidth: { xs: '40px', sm: '48px' },
        }}
      >
        {showFilters ? <TiFilter size={20} /> : <CiFilter size={18} />}
      </Button>

      {showFilters && (
        <div
          style={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            direction: 'rtl',
           
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  width: '4px',
                  height: '20px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px',
                }}
              ></span>
              <span
                style={{
                  fontWeight: '600',
                  color: theme.palette.text.primary,
                }}
              >
                تصفية النتائج
              </span>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <SearchInput
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                phrasePlaceHolder="ابحث..."
              />
            </div>

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
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
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
                    padding: '10px 14px',
                  },
                }}
              >
                <MenuItem value="">الكل</MenuItem>
                <MenuItem value="دمشق">دمشق</MenuItem>
                <MenuItem value="حلب">حلب</MenuItem>
              </Select>
            </FormControl>

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
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
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
                    padding: '10px 14px',
                  },
                }}
              >
                <MenuItem value="">الكل</MenuItem>
                <MenuItem value="متاح">متاح</MenuItem>
                <MenuItem value="محجوز">محجوز</MenuItem>
              </Select>
            </FormControl>

            <div
              style={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
              }}
            >
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




      <RoadSignsContainer
        show={showAddRoadSigns} handleClose={handleCloseAddRoadSigns} refresh={refresh}
        showAddReserve={showAddReserveRoadSigns} handleCloseAddReserve={handleCloseAddReserveRoadSigns}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        city={city}
        status={status}
      />

      <div>

      </div>
    </div>
  )
}

export default RoadSignsPage