import { Box, Grid, Typography } from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

import BloodtypeOutlinedIcon from "@mui/icons-material/BloodtypeOutlined";
export default function InformacionSaludEmergencia(props) {
  const { voluntario } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} lg={5}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            minHeight: "100%",
            margin: "0",
            gap: "6px",
          }}
        >
          <Typography component="h6" variant="h6">
            <strong>Datos de Emergencia: </strong>
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <PersonOutlineOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Nombre: </strong>
            {voluntario?.emergencia?.nombre}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <LocalPhoneOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Telefono: </strong>
            {voluntario?.emergencia?.numero}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <HomeOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Dirección: </strong>
            {voluntario?.emergencia?.direccion}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <EmailOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Email: </strong>
            {voluntario?.emergencia?.email}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <GroupOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Relación: </strong>
            {voluntario?.emergencia?.relacion}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={7} lg={7}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            minHeight: "100%",
            gap: "6px",
          }}
        >
          <Typography component="h6" variant="h6">
            <strong>Datos de Salud: </strong>
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <RestaurantOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Vegetariano: </strong>
            {voluntario?.salud?.vegetariano ? "Si" : "No"}
            <strong style={{ marginLeft: "10px" }}>Seguro Médico: </strong>
            {voluntario?.salud?.seguroMedico ? "Si" : "No"}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <HealthAndSafetyOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Alérgico: </strong>
            {voluntario?.salud?.alergia ? "Si" : "No"} {", "}
            <strong style={{ marginLeft: "10px" }}>Tipo de alergia: </strong>
            {voluntario?.salud?.tipoAlergia}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <HealthAndSafetyOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Toma medicamento para la alergia: </strong>
            {voluntario?.salud?.alergiaMedicamento ? "Si" : "No"}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <VaccinesOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Medicamento para la alergia: </strong>
            {voluntario?.salud?.tipoAlergiaMedicamento}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <HealthAndSafetyOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Padece de alguna enfermedad: </strong>
            {voluntario?.salud?.padeceEnfermedad ? "Si" : "No"}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <VaccinesOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Nombre de la enfermedad: </strong>
            {voluntario?.salud?.enfermedad}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <HealthAndSafetyOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Toma medicamento: </strong>
            {voluntario?.salud?.tomaMedicamento ? "Si" : "No"}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <VaccinesOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Nombre del medicamento: </strong>
            {voluntario?.salud?.medicamento}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <BloodtypeOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />
            <strong>Tipo de sangre: </strong>
            {voluntario?.salud?.tipoSangre}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
