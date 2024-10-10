import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//import CrearPlan from "@components/forms/plan/CrearPlan"; // Formulario para crear planes
//import CrearPlan from "./CrearPlan"; // Formulario para crear planes
import CrearPlan from "@components/Planes/RegistroPlanes";
import { useEffect } from "react";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "950px",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  maxHeight: {
    xs: "80vh",
    sm: "none",
  },
  overflowY: "auto",
};

export default function PlanModal(props) {
 
  const { open, handleClose, isEdicion, edicionData } = props;


  const handleModalClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    handleClose();
  };

  const title = `${isEdicion ? "Edición" : "Creación"} de Plan`;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={true}
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <CrearPlan
            handleCancelAction={handleModalClose}
            isEdicion={isEdicion}
            edicionData={edicionData}
          />
        </Box>
      </Modal>
    </div>
  );
}
