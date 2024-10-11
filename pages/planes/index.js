import { Paper, Button, Box } from "@mui/material";
import Cookies from "cookies";

import DashboardLayout from "@layouts/DashboardLayout";
import PlanModal from "@components/Planes/FormularioPlan"; // Verifica si la ruta es correcta
import PlanesTabla from "@components/Planes/PlanesTabla";
import { useAppContext } from "@src/context/AppContext";

import { useState } from "react";
import { getPlanes } from "@src/services/planes";

export default function Page(props) {
  const { planes } = props;
  const { isModalOpen, openModal, closeModal, setLoadPlanes } = useAppContext(); // Asegúrate de traer setLoadPlanes del contexto
  const [edicionData, setEdicionData] = useState();

  // Estado para controlar cuándo recargar los planes
  const [loadPlanesManual, setLoadPlanesManual] = useState(false); // Este estado controla la recarga

  const handleClickEdicion = (row) => {
    setEdicionData(row);
    openModal();
  };

  const handleClickRegistroPlan = () => {
    setEdicionData(null); // Limpia los datos de edición de planes
    openModal(); // Abre el modal
  };

  return (
    <DashboardLayout page={"Planes"}>
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
            onClick={handleClickRegistroPlan}
          >
            Crear nuevo plan
          </Button>
        </Box>

        {/* Modal para la creación/edición de planes */}
        <PlanModal
          open={isModalOpen}
          handleClose={() => {
            closeModal();
            setLoadPlanes(true); // Forzar la recarga cuando se cierre el modal
          }}
          isEdicion={edicionData !== null}
          edicionData={edicionData}
        />

        {/* Tabla de planes */}
        <PlanesTabla
          data={planes}
          handleClickEdicion={handleClickEdicion}
          loadPlanesManual={loadPlanesManual} // Pasamos el estado de recarga a la tabla
          setLoadPlanesManual={setLoadPlanesManual} // Pasamos la función para actualizar el estado
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

  const planes = await getPlanes(token); // Carga inicial de planes desde el servidor
  return { props: { user, planes } };
}
