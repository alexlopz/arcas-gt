import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Grid,
  TablePagination,
} from "@mui/material";
import Cookies from "cookies";
import DashboardLayout from "@layouts/DashboardLayout";
import { getSolicitudes } from "@src/services/solicitudes";
import { getUsers } from "@src/services/users";
import { getSedes } from "@src/services/sedes";
import { getPlanes, getPlanesAll } from "@src/services/planes";  // Servicio de planes
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page(props) {
  const { solicitudes, voluntarios, sedes, planes } = props;
  const router = useRouter();
  
  // Estado y paginación para Solicitudes, Voluntarios, Sedes y Planes
  const [pageSolicitudes, setPageSolicitudes] = useState(0);
  const [rowsPerPageSolicitudes, setRowsPerPageSolicitudes] = useState(5);

  const [pageVoluntarios, setPageVoluntarios] = useState(0);
  const [rowsPerPageVoluntarios, setRowsPerPageVoluntarios] = useState(5);

  const [pageSedes, setPageSedes] = useState(0);
  const [rowsPerPageSedes, setRowsPerPageSedes] = useState(5);

  const [pagePlanes, setPagePlanes] = useState(0);
  const [rowsPerPagePlanes, setRowsPerPagePlanes] = useState(5);

  // Handlers de paginación para cada sección
  const handleChangePageSolicitudes = (event, newPage) => setPageSolicitudes(newPage);
  const handleChangeRowsPerPageSolicitudes = (event) => {
    setRowsPerPageSolicitudes(parseInt(event.target.value, 10));
    setPageSolicitudes(0);
  };

  const handleChangePageVoluntarios = (event, newPage) => setPageVoluntarios(newPage);
  const handleChangeRowsPerPageVoluntarios = (event) => {
    setRowsPerPageVoluntarios(parseInt(event.target.value, 10));
    setPageVoluntarios(0);
  };

  const handleChangePageSedes = (event, newPage) => setPageSedes(newPage);
  const handleChangeRowsPerPageSedes = (event) => {
    setRowsPerPageSedes(parseInt(event.target.value, 10));
    setPageSedes(0);
  };

  const handleChangePagePlanes = (event, newPage) => setPagePlanes(newPage);
  const handleChangeRowsPerPagePlanes = (event) => {
    setRowsPerPagePlanes(parseInt(event.target.value, 10));
    setPagePlanes(0);
  };

  // Handlers de navegación
  const handleGoToSolicitudes = () => router.push("/solicitudes");
  const handleGoToVoluntarios = () => router.push("/voluntarios");
  const handleGoToSedes = () => router.push("/sedes");
  const handleGoToPlanes = () => router.push("/planes");

  // Contador de estados de solicitudes
  const conteoPorEstado = solicitudes.reduce((acc, solicitud) => {
    const estado = solicitud.estado.nombre;
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});
  
  const estados = Object.entries(conteoPorEstado).map(([estado, cantidad]) => ({
    estado,
    cantidad,
  }));

  return (
    <DashboardLayout page={"Dashboard"}>
      <Grid container spacing={2} sx={{mt:4}}>
      
        {/* Panel de Estado de Solicitudes */}
        <Grid item xs={12} md={6}>
          <Paper
        
            sx={{
              
              p: 8,
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Estado de Solicitudes
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGoToSolicitudes}
                sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
              >
                Ir a Solicitudes
              </Button>
            </Box>

            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Estado
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Cantidad
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {estados
                    .slice(pageSolicitudes * rowsPerPageSolicitudes, pageSolicitudes * rowsPerPageSolicitudes + rowsPerPageSolicitudes)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{row.estado}</TableCell>
                        <TableCell align="center">{row.cantidad}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={estados.length}
              rowsPerPage={rowsPerPageSolicitudes}
              page={pageSolicitudes}
              onPageChange={handleChangePageSolicitudes}
              onRowsPerPageChange={handleChangeRowsPerPageSolicitudes}
            />
          </Paper>
        </Grid>

        {/* Panel de Lista de Voluntarios */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 8,
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Lista de Voluntarios
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGoToVoluntarios}
                sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
              >
                Ir a Voluntarios
              </Button>
            </Box>

            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Nombre
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Apellido
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Correo Electrónico
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Teléfono
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {voluntarios
                    .slice(pageVoluntarios * rowsPerPageVoluntarios, pageVoluntarios * rowsPerPageVoluntarios + rowsPerPageVoluntarios)
                    .map((voluntario, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{voluntario.primerNombre}</TableCell>
                        <TableCell align="left">{voluntario.primerApellido}</TableCell>
                        <TableCell align="center">{voluntario.email}</TableCell>
                        <TableCell align="center">{voluntario.numero}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={voluntarios.length}
              rowsPerPage={rowsPerPageVoluntarios}
              page={pageVoluntarios}
              onPageChange={handleChangePageVoluntarios}
              onRowsPerPageChange={handleChangeRowsPerPageVoluntarios}
            />
          </Paper>
        </Grid>

        {/* Panel de Sedes */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 8,
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Lista de Sedes
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGoToSedes}
                sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
              >
                Ir a Sedes
              </Button>
            </Box>

            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Nombre
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Descripción
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sedes
                    .slice(pageSedes * rowsPerPageSedes, pageSedes * rowsPerPageSedes + rowsPerPageSedes)
                    .map((sede, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{sede.nombre}</TableCell>
                        <TableCell align="left">{sede.descripcion}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sedes.length}
              rowsPerPage={rowsPerPageSedes}
              page={pageSedes}
              onPageChange={handleChangePageSedes}
              onRowsPerPageChange={handleChangeRowsPerPageSedes}
            />
          </Paper>
        </Grid>

        {/* Panel de Lista de Planes */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 8,
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                Lista de Planes
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGoToPlanes}
                sx={{ fontSize: "0.8rem", padding: "6px 12px" }}
              >
                Ir a Planes
              </Button>
            </Box>

            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Título
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Descripción
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Precio
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Sede
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {planes && planes.length > 0
                    ? planes
                        .slice(pagePlanes * rowsPerPagePlanes, pagePlanes * rowsPerPagePlanes + rowsPerPagePlanes)
                        .map((plan, index) => (
                          <TableRow key={index}>
                            <TableCell align="left">{plan.titulo}</TableCell>
                            <TableCell align="left">{plan.descripcion}</TableCell>
                            <TableCell align="center">{plan.precio}</TableCell>
                            <TableCell align="center">{plan.sede?.nombre || "Sin sede asignada"}</TableCell>
                          </TableRow>
                        ))
                    : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No hay planes disponibles
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={planes.length}
              rowsPerPage={rowsPerPagePlanes}
              page={pagePlanes}
              onPageChange={handleChangePagePlanes}
              onRowsPerPageChange={handleChangeRowsPerPagePlanes}
            />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const solicitudes = await getSolicitudes(token);
  const voluntarios = await getUsers(token);
  const sedes = await getSedes(token);
  const planes = await getPlanes(token);

  return { props: { 
    solicitudes: solicitudes?.reverse() || [], 
    voluntarios: voluntarios?.slice(0,4)?.reverse() || [], 
    sedes: sedes?.slice(0,4)?.reverse() || [], 
    planes: planes?.slice(0,4)?.reverse() || [] 
  } };
}
