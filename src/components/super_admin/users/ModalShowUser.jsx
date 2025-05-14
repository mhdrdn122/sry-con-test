import { Padding } from "@mui/icons-material";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { Modal } from "react-bootstrap";

const ModalShowUser = ({ show, handleClose }) => {

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
              {/* name and email */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"50px"}>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">Name: </Typography>
              <p>{show.name}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">Email : </Typography>
              <p>{show.email}</p>
            </Box>
            </Box>
            {/* company_name and phone */}
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
              <Typography variant="h6">Company name : </Typography>
              <p>{show.company_name}</p>
            </Box>
          </Box>
            {/* address and registration number */}
            <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"50px"}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">address : </Typography>
              <p>{show.address}</p>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">registration number : </Typography>
              <p>{show.registration_number}</p>
            </Box>
          </Box>
          {/* model type */}
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"50px"}
          >
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography variant="h6">type : </Typography>
              <p>{show.format || "...."}</p>
            </Box>
          </Box>
    </Box>
    </Modal.Body>
    </Modal>
  )
}

export default ModalShowUser