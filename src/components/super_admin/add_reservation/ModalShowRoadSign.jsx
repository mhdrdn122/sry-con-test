import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSign } from "../../../redux/slice/super_admin/road_signs/selectedSignsSlice";


const ModalShowRoadSign = ({show,handleClose}) => {
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
              {/* region and place */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"50px"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">region : </Typography>
              <p>{show.region}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">place : </Typography>
              <p>{show.place}</p>
            </Box>
            </Box>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"50px"}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">number of faces : </Typography>
              <p>{show.number_of_faces}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">model & type : </Typography>
              <p>{show?.coding?.model} & {show?.coding?.type}</p>
            </Box>
          </Box>
                    {/* Reservations */}
                {show?.reservations && show?.reservations.length > 0 && (
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Typography variant="h6">Reservations:</Typography>
              {show.reservations.map((reservation, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"4px"}
                >
                  <Typography>Start Date: {reservation.start_date} && </Typography>
                  <Typography> End Date: {reservation.end_date}</Typography>
                   <span className="font-bold"> , By :</span> <p>{reservation?.company_name || reservation?.name}</p>
                </Box>
              ))}
            </Box>
          )}
           <Box
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
            </Box>
    </Box>
    </Modal.Body>
    </Modal> 
    
  )
}

export default ModalShowRoadSign