import { Paper, Button, Box } from "@mui/material";
import Cookies from "cookies";

import DashboardLayout from "@layouts/DashboardLayout";
import SedeModal from "@components/SedesModal"; // Cambiar el modal a SedeModal
import { getSedes } from "@src/services/sedes"; // Importar el servicio para sedes
import SedesTabla from "@components/SedesTabla"; // Cambiar a la tabla de sedes
import { useAppContext } from "@src/context/AppContext";
import { useState } from "react";

export default function Page(props) {
  const { sedes } = props; // Aquí traemos las sedes desde getServerSideProps
  const { isModalOpen, openModal, closeModal } = useAppContext();
  const [edicionData, setEdicionData] = useState(); // Estado para manejar la edición

  const handleClickEdicion = (row) => {
    setEdicionData(row);
    openModal(); // Abre el modal para editar una sede
  };

  const handleClickRegistro = () => {
    setEdicionData(null); // Limpiar los datos de edición para crear una nueva sede
    openModal(); // Abre el modal para crear una nueva sede
  };

  return (
    <DashboardLayout page={"Sedes"}> {/* Cambiar el título de la página a "Sedes" */}
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          minHeight: 240,
          mt: 3,
        }}
      >
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleClickRegistro}
          >
            Crear Sede {/* Cambiar a "Crear Sede" */}
          </Button>
        </Box>
        <SedeModal
          open={isModalOpen}
          handleClose={closeModal}
          isEdicion={edicionData !== null} // Si hay datos de edición, el modal se usa para editar
          edicionData={edicionData} // Pasar los datos de la sede en caso de edición
        />
        <SedesTabla
          data={sedes} // Pasamos las sedes a la tabla
          handleClickEdicion={handleClickEdicion} // Manejador de clic para editar sedes
        />
      </Paper>
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

  const userCookie = cookies.get("user-info");
  const user = JSON.parse(decodeURIComponent(userCookie));
  
  // Llamamos al servicio getSedes con el token obtenido
  const sedes = await getSedes(token);

  // Devolvemos las sedes y el usuario
  return { props: { user, sedes } };
}
