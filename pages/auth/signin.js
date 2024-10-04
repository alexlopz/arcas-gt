import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { teal } from "@mui/material/colors";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { constant } from "@config/constants";
import Copyright from "@components/Copyright";
import { getAuthInfoUser } from "@src/services/auth";
import { useRouter } from "next/router";
import Cookies from "cookies";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateField = (name, value) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value)
        ? ""
        : "Por favor ingresa un correo electrónico válido.";
    }
    if (name === "password") {
      return value ? "" : "La contraseña es obligatoria.";
    }
    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    if (emailError || passwordError) {
      setLoading(false);
      return setErrors({ email: emailError, password: passwordError });
    }

    const tokenUser = await getAuthInfoUser(formData.email, formData.password);
    if (!tokenUser?.token) {
      setLoading(false);
      return setErrors((prev) => ({
        ...prev,
        server:
          "Error en la autenticación. Por favor, revisa tus credenciales.",
      }));
    }
    router.push(`/dashboard`);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper sx={{ p: 4, mt: { xs: 12, lg: 24 } }} elevation={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/img/arcas_logo.png"
              alt={constant.siteName}
              height={96}
              style={{ verticalAlign: "middle" }}
            />
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="secondary.dark">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              {errors.server && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {errors.server}
                </Typography>
              )}
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Ingresar
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: teal[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Recuperar contraseña
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
