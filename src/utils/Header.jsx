import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMediaQuery } from "@uidotdev/usehooks";
import { SlRefresh } from "react-icons/sl";
// import useRandomNumber from "../hooks/useRandomNumber";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";

const Header = ({
    heading,
    buttonText,
    onButtonClick,
    icon,
    requiredPermission,
    setRefresh,
    refresh,
    refreshRandomNumber,
    services,
    onButtonClick2,
    selectedSigns,
    onButtonClickAddReserve
  }) => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    // const { hasPermission } = usePermissions();
  
    // const requiredPermissions=['category.add','item.add', ]
    const styleButton = {
      "& .css-y6rp3m-MuiButton-startIcon": {
        margin: "0",
      },
    };
  
  useEffect(()=>{
    console.log('is small : ',isSmallDevice)
  },[])
    return (
      <Box
        component="section"
        sx={{
          py: isSmallDevice ? 1 : 2,
          width: "100%",
          marginLeft: "auto",
        }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={"row-reverse"}
      >
        <Typography
          variant={isSmallDevice ? "h6" : "h4"}
          sx={{ fontWeight: "700", margin: "0"  }}
          gutterBottom
        >
          {heading}
        </Typography>

          <div className="d-flex">
          {buttonText && (
              <Button
                size={isSmallDevice ? "small" : "large"}
                variant="contained"
                sx={{
                  ...styleButton,
                  padding: isSmallDevice ? "8px 12px" : "",
                  // background: "rgb(2 13 38 / 91%)",
                  // background: "#595959",
                  background: "primary",
                  color:'#fff',
                  minWidth: isSmallDevice ? "unset" : "",
                }}
                startIcon={icon ? icon : <AddCircleIcon />}
                onClick={onButtonClick}
              >
              {!isSmallDevice && buttonText}
            </Button>
          )}
          
          {selectedSigns && onButtonClickAddReserve &&
            <div style={{
              position:'relative', display: "inline-block" 
            }}>
              <Button
                className="ms-2"
                size={isSmallDevice ? "small" : "large"}
                variant="contained"
                sx={{
                  ...styleButton,
                  padding: isSmallDevice ? "8px 12px" : "",
                  // background: "rgb(2 13 38 / 91%)",
                  // background: "#595959",
                  background: "primary",
                  color:'#fff',
                  minWidth: isSmallDevice ? "unset" : "",
                }}
                // startIcon={icon ? icon : <AddCircleIcon />}
                onClick={onButtonClickAddReserve}
              >
                { <IoCartOutline  size={25}/>}
              </Button>
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "7px",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
        {selectedSigns.length}
              </div>
            </div>          
          }
            
          </div>
        
      </Box>
    );
  };
  
  export default Header;
  