import React from "react";
import { Avatar, Typography, Grid, Box } from "@mui/material";

import MapIcon from "@mui/icons-material/MapOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import obtenerNombrePaisPorId from "@src/utilities/filtroPais";

export default function DetalleProfile(props) {
  const { voluntario } = props;

  const nacionalidad = obtenerNombrePaisPorId(voluntario?.idNacionalidad);
  const paisOrigen = obtenerNombrePaisPorId(voluntario?.idPaisOrigen);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Avatar
          src="/assets/img/profile.png"
          sx={{
            width: "80px",
            height: "80px",
            border: 2,
            mb: 1,
            marginRight: "10px",
          }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            minHeight: "100%",
            gap: "5px",
          }}
        >
          <Typography component="h4" variant="subtitle1">
            {voluntario?.primerNombre} {voluntario?.primerApellido}
          </Typography>
          <Typography component="div" variant="subtitle2" color="secondary">
            <MapIcon sx={{ verticalAlign: "middle", fontSize: "1.25rem" }} />{" "}
            {nacionalidad}, {paisOrigen}
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            color="secondary"
            fontWeight={300}
          >
            <LocalPhoneOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Telefono: </strong>
            {voluntario?.numero}
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            color="secondary"
            fontWeight={300}
          >
            <FingerprintOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Identificacón: </strong>
            {voluntario?.identificacion}
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            color="secondary"
            fontWeight={300}
          >
            <EmailOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Email: </strong>
            {voluntario?.email}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
