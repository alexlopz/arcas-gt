import { Box, Grid, TextField } from "@mui/material";

export default function FechasSolicitud(props) {
  const { setSolicitud, solicitud } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolicitud((prev) => ({ ...prev, [name]: value }));
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
            value={solicitud?.inicio ?? ""}
            onChange={handleChange}
            error={false}
            helperText={""}
            disabled={false}
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
            value={solicitud?.fin ?? ""}
            onChange={handleChange}
            error={false}
            helperText={""}
            disabled={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
