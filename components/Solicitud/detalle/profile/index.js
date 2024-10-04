import React, { useState } from "react";
import { Avatar, Paper, Typography, Grid, Box } from "@mui/material";

import MapIcon from "@mui/icons-material/MapOutlined";

export default function DetalleProfile(props) {
  const { voluntario } = props;
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Grid container>
        <Grid item sm={4}>
          <Avatar
            src="/assets/img/profile.png"
            sx={{
              width: "80px",
              height: "80px",
              border: 2,
              mb: 1,
            }}
          />
        </Grid>
        <Grid item sm={8}>
          <Typography component="h4" variant="subtitle1">
            {voluntario?.primerNombre} {voluntario?.primerApellido}
          </Typography>
          <Typography component="div" variant="subtitle2" color="secondary">
            <MapIcon sx={{ verticalAlign: "middle", fontSize: "1.25rem" }} />{" "}
            Guatemala, Guatemala
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            color="secondary"
            fontWeight={300}
          >
            {voluntario?.identificacion}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
