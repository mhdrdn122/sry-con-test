import { Padding } from "@mui/icons-material";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { Modal } from "react-bootstrap";
const ModalShowAdmin = ({ show, handleClose }) => {

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
              {/* Username and Name */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"50px"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">User Name: </Typography>
              <p>{show.username}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">Name: </Typography>
              <p>{show.name}</p>
            </Box>
            </Box>
                  {/* Phone and address */}
                  <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"50px"}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">Phone : </Typography>
              <p>{show.phone}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">Address : </Typography>
              <p>{show.address}</p>
            </Box>
          </Box>
        </Box>
        </Modal.Body>
        </Modal>
      )

}
export default ModalShowAdmin