import { useState } from "react";
import Header from "../../../utils/Header";
import { useSelector } from "react-redux";
import {Button, useTheme } from "@mui/material";
import AddReservationContainer from "../../../components/super_admin/add_reservation/AddReservationContainer";
import { CiFilter } from "react-icons/ci";
import { TiFilter } from "react-icons/ti";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import { breadcrumbsAddReservationPage } from "../../../utils/Breadcrumbs/breadcrumbs";
import RoadSingsAddReservationFilter from "../../../utils/RoadSingsAddReservationFilter";

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
  
  const theme = useTheme()
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
<RoadSingsAddReservationFilter
 searchWord={searchWord}
   setSearchWord={setSearchWord }
    endDate={endDate} status={status }
      setStatus={setStatus} setEndDate={setEndDate} city={city} setCity={setCity} startDate={startDate } setStartDate={setStartDate}/>
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