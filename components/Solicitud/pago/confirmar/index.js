import { useState } from "react";

import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";

import { useAppContext } from "@src/context/AppContext";
import { base64ToBlob } from "@src/utilities/base64ToBlob";

export default function ConfirmarPago(props) {
  const { documentoPago } = useAppContext();

  const downloadPdf = (e) => {
    e.preventDefault();

    const base64 = documentoPago?.base64;
    if (base64) {
      const pdfBlob = base64ToBlob(base64, "application/pdf");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = documentoPago?.fileName;
      link.click();

      URL.revokeObjectURL(pdfUrl);
    }
  };

  return (
    <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              component="label"
              onClick={downloadPdf}
              size="large"
              sx={{ minWidth: "400px", minHeight: "43px" }}
              disabled={!documentoPago}
            >
              {documentoPago && <>Descargar {documentoPago?.fileName}</>}
            </Button>
            {!documentoPago && (
              <CircularProgress
                size={24}
                sx={{
                  color: "#3c988f",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
