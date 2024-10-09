import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";

export default function ResponsabilidadForm(props) {
  const { setSolicitud, solicitud } = props;

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSolicitud((prev) => ({ ...prev, [name]: checked }));
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
          <FormGroup>
            <FormControlLabel
              required
              control={
                <Checkbox
                  id="descargoResponsabilidades"
                  name="descargoResponsabilidades"
                  checked={solicitud?.descargoResponsabilidades}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Acepta descargo de responsabilidad"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
