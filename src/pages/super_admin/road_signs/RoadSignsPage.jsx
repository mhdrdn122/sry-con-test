import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import RoadSignsContainer from "../../../components/super_admin/road_signs/RoadSignsContainer";
import SearchInput from "../../../utils/super_admin/SearchInput";
import DateFilter from "../../../utils/super_admin/DateFilter";
import { useSelector } from "react-redux";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TiFilter } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";

const breadcrumbs = [
  {
    label: "الرئيسية",
    to: "/super_admin",
  },
  {
    label: "اللوحات الطرقية",
  },
].reverse();

const RoadSignsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const [showFilters, setShowFilters] = useState(false)



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
      <Breadcrumb breadcrumbs={breadcrumbs} />
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
        <div className="w-full flex flex-col sm:flex-row-reverse flex-wrap justify-center gap-2 sm:gap-4 items-center p-2">
          <SearchInput
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            className="w-full sm:w-auto flex-1 min-w-[140px] m-0"
          />

          {/* City Filter Dropdown */}
          <FormControl
            variant="outlined"
            margin="dense"
            sx={{
              minWidth: { xs: '100%', sm: 140, md: 160 },
              width: "100%",
              '& .MuiInputBase-root': {
                height: { xs: '36px', sm: '40px' },
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
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

            >
              <MenuItem value="">الكل</MenuItem>
              <MenuItem value="دمشق">دمشق</MenuItem>
              <MenuItem value="حلب">حلب</MenuItem>
            </Select>
          </FormControl>

          {/* Status Filter Dropdown */}
          <FormControl
            variant="outlined"
            margin="dense"
            sx={{
              minWidth: { xs: '100%', sm: 140, md: 160 },
              width: { xs: '100%' },
              '& .MuiInputBase-root': {
                height: { xs: '36px', sm: '40px' },
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
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
            >
              <MenuItem value="">الكل</MenuItem>
              <MenuItem value="متاح">متاح</MenuItem>
              <MenuItem value="محجوز">محجوز</MenuItem>
            </Select>
          </FormControl>

          <DateFilter
            value={startDate}
            setValue={setStartDate}
            name="startDate"
            label="Start Date"
            className="w-full sm:w-auto w-100 flex-1 m-0 min-w-[140px]"
          />
          <DateFilter
            value={endDate}
            setValue={setEndDate}
            name="endDate"
            label="End Date"
            className="w-full sm:w-auto flex-1 m-0 min-w-[140px]"
          />
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