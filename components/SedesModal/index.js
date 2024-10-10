import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import RegistroSedes from "@components/forms/registrosedes";

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

export default function SedeModal(props) {
  const { open, handleClose, isEdicion, edicionData } = props;

  const handleModalClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    handleClose();
  };

  const title = `${isEdicion ? "Edición" : "Creación"} de Sede`;
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
          <RegistroSedes
            handleCancelAction={handleModalClose}
            isEdicion={isEdicion}
            edicionData={edicionData}
          />
        </Box>
      </Modal>
    </div>
  );
}
