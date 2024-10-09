import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { constant } from "@config/constants";
import Copyright from "@components/Copyright";
import RegistroUsuarios from "@components/forms/registro";

const theme = createTheme();

export default function Page() {
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link
              href="/"
              sx={{
                transition: "all .5s ease",
                verticalAlign: "middle",
                mx: "auto",
                mb: 2,
                ":hover": {
                  filter: "brightness(1.35);",
                },
              }}
            >
              <img
                src="/assets/img/arcas_logo.png"
                alt={constant.siteName}
                height={96}
                style={{ verticalAlign: "middle" }}
              />
            </Link>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro solicitud
            </Typography>
            <Box sx={{ width: "100%" }}>
              <RegistroUsuarios />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
