import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* Config */
import { constant } from "@config/constants";
import Copyright from "@components/Copyright";
import RegistroUsuarios from "@components/forms/registro";

const theme = createTheme();

export default function Page() {
  const style = {
    boxContainer: {
      position: "relative",
      zIndex: 0,
      width: "100%",
      height: "100vh",
      display: "block",
      overflow: "hidden",
      "::before, ::after": {
        content: '" "',
        position: "absolute",
        zIndex: -1,
        backgroundColor: "secondary.light",
        display: "block",
        width: "1128px",
        height: "1200px",
        // borderRadius: "10px",
        // transform: "rotate(20deg)",
        bottom: 0,
        clipPath: "polygon(15% 0%, 100% 0, 85% 100%, 0% 100%)",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=1200&q=80)",
        backgroundRepeat: "no-repeat",
        // borderStyle: "solid",
        // borderWidth: "0 50px 86.6px 50px",
        // borderColor: "transparent transparent #007bff transparent",
      },
      "::before": {
        left: "-35rem",
      },
      "::after": {
        top: 0,
        right: "-35rem",
      },
    },
  };
  return (
    // <ThemeProvider theme={theme}>
    <Box component="main" sx={style.boxContainer}>
      <Container maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
