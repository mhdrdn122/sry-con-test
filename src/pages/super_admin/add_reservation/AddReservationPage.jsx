import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import RoadSignsContainer from "../../../components/super_admin/road_signs/RoadSignsContainer";
import SearchInput from "../../../utils/super_admin/SearchInput";
import DateFilter from "../../../utils/super_admin/DateFilter";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select ,Button } from "@mui/material";
import AddReservationContainer from "../../../components/super_admin/add_reservation/AddReservationContainer";
import { CiFilter } from "react-icons/ci";
import { TiFilter } from "react-icons/ti";

const breadcrumbs = [
    {
      label: "الرئيسية",
      to: "/super_admin",
    },
    {
      label: "إضافة حجز",
    },
  ].reverse();
  
const AddReservationPage = () => {
  const [refresh, setRefresh] = useState(false)
  // const [showAddRoadSigns, setShowAddRoadSigns] = useState(false);
  const [showAddReserveRoadSigns, setShowAddReserveRoadSigns] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

  const selectedSigns = useSelector((state) => state.selectedSigns.selectedSigns);

  const [searchWord, setSearchWord] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');

  const handleShowAddReserveRoadSigns = () => {
    setShowAddReserveRoadSigns(true);
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
        <Breadcrumb breadcrumbs={breadcrumbs} />
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
        {showFilters ? <TiFilter size={25}  />:<CiFilter size={22} />}
      </Button>

      {/* Render the filters only if `showFilters` is true */}
      {showFilters && (
        <div className="w-100 flex flex-row-reverse flex-wrap justify-around align-baseline items-center">
          <SearchInput searchWord={searchWord} setSearchWord={setSearchWord} />
          
          {/* City Filter Dropdown */}
          <FormControl
            className="mb-4"
            variant="outlined"
            margin="dense"
            // sx={{ minWidth: 180 }}
            sx={{
              minWidth: 150,
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: "40px", // Reduced height for the select
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.9rem", // Smaller font size for label
                top: "50%", // Set to the middle
                left:'10%',
                transform: "translateY(-50%)", // Center the label vertically
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
            className="mb-4"
            variant="outlined"
            margin="dense"
            sx={{
              minWidth: 150,
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: "40px", // Reduced height for the select
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.9rem", // Smaller font size for label
                top: "50%", // Set to the middle
                left:'10%',
                transform: "translateY(-50%)", // Center the label vertically
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

          {/* Date Filters */}
          <DateFilter
            value={startDate}
            setValue={setStartDate}
            name="startDate"
            label="Start Date"
          />
          <DateFilter
            value={endDate}
            setValue={setEndDate}
            name="endDate"
            label="End Date"
          />
        </div>
      )}
    </div>
        <AddReservationContainer
        show={showAddReserveRoadSigns}
        handleClose={handleCloseAddReserveRoadSigns}
        showAddReserve={showAddReserveRoadSigns} handleCloseAddReserve={handleCloseAddReserveRoadSigns}
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