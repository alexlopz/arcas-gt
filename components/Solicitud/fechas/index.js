import { Box, Grid, TextField } from "@mui/material";

export default function FechasSolicitud(props) {
  const { setSolicitud, solicitud } = props;
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSolicitud((prev) => ({
      ...prev,
      reservacion: {
        ...prev?.reservacion,
        idSolicitud: solicitud.id,
        [name]: value,
      },
    }));
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
          <TextField
            required
            id="inicio"
            name="inicio"
            label="Fecha Inicio"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.reservacion?.inicio?.split("T")[0] ?? ""}
            onChange={handleChange}
            error={false}
            helperText={""}
            disabled={false}
            inputProps={{ min: today }}
          />
        </Grid>
        <Grid item display="flex" justifyContent="center" alignItems="center">
          <TextField
            required
            id="fin"
            name="fin"
            label="Fecha fin"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.reservacion?.fin?.split("T")[0] ?? ""}
            onChange={handleChange}
            error={false}
            helperText={""}
            disabled={false}
            inputProps={{ min: today }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
