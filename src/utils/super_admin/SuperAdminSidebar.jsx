import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import adv_syrian from "../../assets/adv_syrian.png"
import LogoutIcon from "@mui/icons-material/Logout";
import { FaFileContract, FaUsers } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { GiResize } from "react-icons/gi";
import { GiDuration } from "react-icons/gi";
import { FaMapSigns } from "react-icons/fa";
import { LuSquareParking } from "react-icons/lu";
import { GoFileSymlinkFile } from "react-icons/go";
import { GrMoney, GrWorkshop } from "react-icons/gr";

import logo from "../../assets/logo.png"
import { Box,Button,FormControl,FormHelperText,InputLabel,OutlinedInput,Select,
    TextField,
    useMediaQuery,
    useTheme,Typography,
  } from "@mui/material";
  import { Link, useNavigate } from "react-router-dom";
import { resetAuthState } from '../../redux/slice/super_admin/auth/authSlice';
import { useDispatch } from 'react-redux';
import { GiLockedChest } from "react-icons/gi";
import { RiReservedLine } from 'react-icons/ri';
import { TbReport } from 'react-icons/tb';

  const Item = ({
    title,
    to,
    icon,
    selected,
    setSelected,
    handleClick,
    loading,
  }) => {
    const navigate = useNavigate ();
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: "#000",
          "&:hover": {
            backgroundColor: "transparent", // Override hover background
            // color: "#f5f5f5", // Optional
          },
        }}
        onClick={() => {
          setSelected(title);
          handleClick();
          navigate(to);
        }}
        icon={icon}
        rootStyles={{ backgroundColor: "transparent",
          
        }}
      >
        <Typography>
          {title} {loading ? <Spinner animation="border" size="sm" /> : ""}
        </Typography>
      </MenuItem>
      // </Link>
    );
  };
  
const SuperAdminSidebar = () => {
  const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));

  const dispatch = useDispatch();
  const handleLogout = async() => {
    await dispatch(resetAuthState())
    await localStorage.clear();
  };
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const [isCollapsed, setIsCollapsed] = useState(isSmallDevice ? true : false);
  const [selected, setSelected] = useState("المدن");

  return (
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor="#fff"
      rootStyles={{ minHeight: "100vh" }}
      rtl={true}
    >
      <Menu>
      <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            margin: "10px 0 20px 0",
            color: "#111",
            textAlign: "center",
          }}
        >
          {" "}
          {/* <Typography variant="h5">DASHBOARD</Typography> */}
        </MenuItem>
        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="170px"
                height="170px"
                src={adv_syrian}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              {/* <h5 className='text-white mt-3'>الشركة السورية للإعلان</h5> */}
            </Box>
          </Box>
        )}
        <Box>
        <Item
            title="الحساب الشخصي"
            to="/super_admin"
            icon={<HomeOutlinedIcon style={{ color: '#00796B' }} />} // Added 
            selected={selected}
            setSelected={setSelected}
            handleClick={() => {}}
            />
             {superAdminInfo?.role == "super" && 
             <Item
             title="الموظفين"
             to="/super_admin/admins"
             icon={<FaUsers color='#47B04C' />}
             selected={selected}
             setSelected={setSelected}
             handleClick={() => {}}
           />
             }
            {superAdminInfo?.role == "super" && 
             <Item
             title="نشاطات الموظفين"
             to="/super_admin/employees_activities"
             icon={<GrWorkshop color='#FF9900' />} // Added color
             selected={selected}
             setSelected={setSelected}
             handleClick={() => {}}
           />
             }
            <Item
              title="الزبائن"
              to="/super_admin/users"
              icon={<HiOutlineUsers color='#007BFF' />} // Added color
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
            <Item
              title="النموذج"
              to="/super_admin/coding"
              icon={<GiResize color='#FCC300' />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
             {/* <Item
              title="المدة الزمنية"
              to="/super_admin/duration"
              icon={<GiDuration  />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            /> */}
            <Item
              title="اللوحات الطرقية"
              to="/super_admin/road_signs"
              icon={<FaMapSigns color='#F99A14' />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
            <Item
              title="إضافة حجز"
              to="/super_admin/add_reservation"
              icon={<RiReservedLine color='#556DFB' />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
              <Item
              title="الحجوزات"
              to="/super_admin/reservations"
              icon={<LuSquareParking color='#2A9080' />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
              <Item
              title="الطلبات"
              to="/super_admin/orders"
              icon={<GoFileSymlinkFile color='#FF5516' />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
              <Item
              title="الدفعات"
              to="/super_admin/payments"
              icon={<GrMoney color='#30FDFE'  />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
             <Item
              title="العقود"
              to="/super_admin/contracts"
              icon={<FaFileContract color='#9939B2'/>}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
             <Item
              title="تقرير أسبوعي"
              to="/super_admin/report"
              icon={<TbReport color='#5E34B1' />}
              selected={selected}
              setSelected={setSelected}
              handleClick={() => {}}
            />
            {superAdminInfo?.role == "super" && 
             <Item
             title="الصندوق"
             to="/super_admin/box"
             icon={<GiLockedChest color='#6A0572' />} // Added color
             selected={selected}
             setSelected={setSelected}
             handleClick={() => {}}
           /> 
            }
          <Item
            title="تسجيل الخروج"
            to="/super_admin/login"
            icon={<LogoutIcon style={{ color: '#DC3545' }} />} // Added color
            selected={selected}
            setSelected={setSelected}
            handleClick={handleLogout}
          />
        </Box>
      </Menu>
    </Sidebar>
  )
}

export default SuperAdminSidebar