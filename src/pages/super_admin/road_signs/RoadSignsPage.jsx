import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumb";
import Header from "../../../utils/Header";
import RoadSignsContainer from "../../../components/super_admin/road_signs/RoadSignsContainer";
import SearchInput from "../../../utils/super_admin/SearchInput";
import DateFilter from "../../../utils/super_admin/DateFilter";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FiltersBar from "../../../components/super_admin/road_signs/FiltersContainer";

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

{/* <FiltersBar searchWord={searchWord}  setSearchWord={setSearchWord} city={setCity} status={setStatus}  startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} /> */}

      <div className="w-100 flex flex-row-reverse flex-wrap justify-end gap-2  align-baseline items-center">
            <SearchInput
                searchWord={searchWord}
                setSearchWord={setSearchWord}
            />
                    {/* City Filter Dropdown */}
        <FormControl className="mb-4" variant="outlined" margin="dense" 
         sx={{
          minWidth:140,
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
        }}>
          <InputLabel id="city-filter-label">المدينة</InputLabel>
          <Select
            labelId="city-filter-label"
            id="city-filter"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="المدينة"
          >
            <MenuItem  value={''}>الكل</MenuItem>
            <MenuItem value="دمشق">دمشق</MenuItem>
            <MenuItem value="حلب">حلب</MenuItem>
          </Select>
        </FormControl>

          {/* Status Filter Dropdown */}
          <FormControl className="mb-4" variant="outlined" margin="dense"  sx={{
          minWidth:140,
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
        }}>
          <InputLabel id="status-filter-label">الحالة</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="الحالة"
          >
            <MenuItem  value={''}>الكل</MenuItem>
            <MenuItem value="متاح">متاح</MenuItem>
            <MenuItem value="محجوز">محجوز</MenuItem>
            {/* <MenuItem value="قيد الإنشاء">قيد الإنشاء</MenuItem> */}
          </Select>
        </FormControl>
            <DateFilter
                value={startDate}
                setValue={setStartDate}
                name="startDate"
                label="Start Date"/>
            <DateFilter
                value={endDate}
                setValue={setEndDate}
                name="endDate"
                label="End Date" 
            />
      </div>

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