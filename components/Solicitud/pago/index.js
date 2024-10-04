import { useEffect, useState } from "react";

import { getSedes } from "@src/services/sedes";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { getPlanes } from "@src/services/planes";
import { getTiposPago } from "@src/services/pagos";

export default function AgregarPago(props) {
  const { setSolicitud, solicitud } = props;
  const [pagoTipos, setPagoTipos] = useState([]);

  const geDataTiposPago = async () => {
    const resultTiposPago = await getTiposPago();
    if (resultTiposPago) setPagoTipos(resultTiposPago);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolicitud((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    geDataTiposPago();
  }, []);

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
          <FormControl fullWidth error={null} sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="tipo-pago-label">Elegir tipo de pago</InputLabel>
            <Select
              labelId="tipo-pago-label"
              id="idTipoPago"
              name="idTipoPago"
              value={solicitud?.idTipoPago ?? ""}
              onChange={handleChange}
              label="Elegir tipo de pago"
              disabled={false}
            >
              {pagoTipos.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
