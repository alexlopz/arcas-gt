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

export default function AgregarPlan(props) {
  const { setSolicitud, solicitud } = props;
  const [sedes, setSedes] = useState([]);
  const [planes, setPlanes] = useState([]);

  const geDataSedes = async () => {
    const resultSedes = await getSedes();
    if (resultSedes) setSedes(resultSedes);
  };

  const getDataPlanes = async (idSede) => {
    const resultPlanes = await getPlanes();
    if (resultPlanes) {
      const planesFiltered = resultPlanes.filter(
        (plan) => plan.idSede === idSede
      );

      setPlanes(planesFiltered);
    }
  };

  const handleChangeSede = (e) => {
    const { name, value } = e.target;
    getDataPlanes(value);
    setSolicitud((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolicitud((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    geDataSedes();
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
            <InputLabel id="pais-label">Elegir sede</InputLabel>
            <Select
              labelId="sede-label"
              id="idSede"
              name="idSede"
              value={solicitud?.idSede ?? ""}
              onChange={handleChangeSede}
              label="Elegir Sede"
              disabled={false}
            >
              {sedes.map((sede) => (
                <MenuItem key={sede.id} value={sede.id}>
                  {sede.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item display="flex" justifyContent="center" alignItems="center">
          <FormControl fullWidth error={null} sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="pais-label">Elegir Plan</InputLabel>
            <Select
              labelId="plan-label"
              id="idPlan"
              name="idPlan"
              value={solicitud?.idPlan ?? ""}
              onChange={handleChange}
              label="Elegir Plan"
              disabled={planes?.length < 1}
            >
              {planes.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>
                  {plan.titulo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
