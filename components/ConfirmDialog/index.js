import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

const ConfirmDialog = ({ open, onClose, onConfirm, title, description }) => {
  const [loading, setLoading] = React.useState(false);

  const handleConfirmClick = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleConfirmClick}
          color="primary"
          disabled={loading}
          autoFocus
        >
          {loading ? <CircularProgress size={24} /> : "ACEPTAR"}
        </Button>
        <Button onClick={onClose} disabled={loading} color="error">
          CANCELAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
