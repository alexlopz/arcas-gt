import { useEffect, useState } from "react";

import { Box, Button, Grid, TextField } from "@mui/material";
import { convertToBase64 } from "@src/utilities/convertToBase64";

export default function CargarPago(props) {
  const { setSolicitud, solicitud } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileBase64, setFileBase64] = useState("");

  const getBase64 = async (file) => {
    try {
      const result = await convertToBase64(file);
      return result;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    const file = files[0];
    const archivo = {
      idSolicitud: solicitud.id,
      extension: "pdf",
      base64: await getBase64(file),
    };
    setSelectedFile(file);
    setSolicitud((prev) => ({ ...prev, archivo }));
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
          {selectedFile && (
            <TextField
              id="base64"
              fullWidth
              value={selectedFile ? selectedFile.name : ""}
              label="Archivo PDF"
              name="base64"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          <Button variant="contained" component="label">
            Agregar archivo PDF
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handleChange}
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
