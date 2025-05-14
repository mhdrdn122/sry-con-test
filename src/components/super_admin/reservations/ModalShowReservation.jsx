import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import {Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSign } from "../../../redux/slice/super_admin/road_signs/selectedSignsSlice";

const ModalShowReservation = ({show,handleClose}) => {
  const dispatch =useDispatch();
  const  handleAddToCart=()=>{
   dispatch(addSign(show))
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header  closeButton className="d-flex justify-content-center">
            <Modal.Title>التفاصيل</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-center">
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              // m={"20px"}
              gap={4}
            >
              {/* address and type and company name */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"50px"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">road sign address : </Typography>
              <p>{show.road_sign_region}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">type : </Typography>
              <p>{show.type}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">company name  : </Typography>
              <p>{show.company_name}</p>
            </Box>
        </Box>
         {/* duration and from and to */}
         <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"50px"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="h6">Duration  : </Typography>
            <p>{show.duration}</p>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="h6">from : </Typography>
            <p>{show.start_date}</p>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="h6">to  : </Typography>
            <p>{show.end_date}</p>
        </Box>
        </Box>
                 {/* num of faces and with print */}
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"50px"}>
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="h6"> num of faces : </Typography>
            <p>{show.number_of_faces}</p>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="h6"> num of signs : </Typography>
            <p>{show.signs_number}</p>
          </Box>

        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="h6">with print : </Typography>
            <p>{show.with_print==0?'No':'Yes'}</p>
        </Box>
       
      </Box>
      {/* <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Button 
              variant="contained"
              style={{
                backgroundColor: "#595959",
                color:'white'
              }}
              onClick={handleAddToCart}
                >Add into reservations</Button>
            </Box> */}
        </Box>
        </Modal.Body>
        </Modal>
  )
}

export default ModalShowReservation
