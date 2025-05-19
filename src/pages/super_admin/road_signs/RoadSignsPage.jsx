import { useState } from "react";
import Breadcrumb from "../../../utils/Breadcrumbs/Breadcrumb";
import Header from "../../../utils/Header";
import RoadSignsContainer from "../../../components/super_admin/road_signs/RoadSignsContainer";
import { useSelector } from "react-redux";
import { Button, useTheme } from "@mui/material";
import { TiFilter } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";
import { breadcrumbsRoadSigns } from "../../../utils/Breadcrumbs/breadcrumbs";
import RoadSingsAddReservationFilter from "../../../utils/RoadSingsAddReservationFilter";


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
        <RoadSingsAddReservationFilter searchWord={searchWord} setSearchWord={setSearchWord} endDate={endDate} status={status} setStatus={setStatus} setEndDate={setEndDate} city={city} setCity={setCity} startDate={startDate} setStartDate={setStartDate} />
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