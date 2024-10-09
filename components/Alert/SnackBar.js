import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useAppContext } from "@src/context/AppContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar(props) {
  const [open, setOpen] = React.useState(true);
  const [alertOpen, setAlertOpen] = React.useState(true);
  const { alertMessage, setAlertMessage } = useAppContext();
  const handleCloseAlert = () => {
    setOpen(false);
  };

  const onCloseBar = () => {
    setAlertMessage({ open: false });
    setOpen(!open);
  };

  return (
    <Snackbar
      sx={{ position: "fixed", marginTop: "2rem", float: "right" }}
      open={alertMessage.open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onCloseBar}
      key="top-right"
    >
      <Alert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertMessage.type}
      >
        {alertMessage.message}
      </Alert>
    </Snackbar>
  );
}
