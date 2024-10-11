import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import Cookies from 'cookies'; // Asegúrate de importar Cookies aquí
import DashboardLayout from "@layouts/DashboardLayout";
import DashboardToolbar from "@components/Toolbar/Dashboard";
import { useRouter } from "next/router";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // Importamos el ícono para reemplazar el avatar

export default function Page(props) {
  const { user } = props;
  const router = useRouter();

  return (
    <DashboardLayout page={"Mi perfil"}>
      <DashboardToolbar user={user} />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mi perfil
        </Typography>

        <Grid container spacing={3}>
          {/* Sección de Icono de Avatar */}
          <Grid item xs={12} sm={4} md={3}>
            <ManageAccountsIcon sx={{ fontSize: 150 }} /> {/* Icono reemplaza al Avatar */}
          </Grid>

          {/* Sección de Información Personal */}
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Información Personal</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={1}>
              {/* Columna de Títulos */}
              <Grid item xs={5}>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Nombre:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Email:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Identificación:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Fecha de Nacimiento:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Sexo:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Dirección:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Teléfono:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Ocupación:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Hobbie:</strong></Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}><strong>Experiencia:</strong></Typography>
              </Grid>

              {/* Columna de Respuestas */}
              <Grid item xs={7}>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.primerNombre} {user.segundoNombre} {user.primerApellido} {user.segundoApellido}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.email}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.identificacion}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.fechaNacimiento}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.sexo}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.direccion}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.numero}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.ocupacion || 'N/A'}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.hobbie || 'N/A'}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.05rem" }}>{user.experiencia || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

// Obtener los datos del usuario desde el servidor (con Cookies)
export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res); // Corrección de importación de Cookies
  const token = cookies.get("token");

  // Redirigir al login si no hay token
  if (!token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const userCookie = cookies.get("user-info");

  // Asegurarse de que hay información del usuario en las cookies
  if (!userCookie) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  // Decodificar y pasar los datos del usuario como props
  const user = JSON.parse(decodeURIComponent(userCookie));

  return { props: { user } };
}
