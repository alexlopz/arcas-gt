import { Paper, Button, Box } from "@mui/material";
import Cookies from "cookies";

import DashboardLayout from "@layouts/DashboardLayout";
import UsuarioModal from "@components/forms/registro/modal";
import { getSolicitudes } from "@src/services/solicitudes";
import { useAppContext } from "@src/context/AppContext";
import { useState } from "react";
import SolicitudesTabla from "@components/Solicitud/tabla";
import SolicitudModal from "@components/Solicitud/modal";

export default function Page(props) {
  const { solicitudes } = props;
  const { isModalOpen, openModal, closeModal } = useAppContext();
  const [edicionData, setEdicionData] = useState();

  const handleClickEdicion = (row) => {
    setEdicionData(row);
    openModal();
  };

  const handleClickRegistro = () => {
    setEdicionData(null);
    openModal();
  };
  return (
    <DashboardLayout page={"solicitudes"}>
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
            Nueva solicitud
          </Button>
        </Box>
        <SolicitudModal
          open={isModalOpen}
          handleClose={closeModal}
          isEdicion={edicionData !== null}
          edicionData={edicionData}
          setEdicionData={setEdicionData}
        />
        <SolicitudesTabla
          data={solicitudes}
          handleClickEdicion={handleClickEdicion}
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
  const solicitudes = await getSolicitudes(token);
  return { props: { user, solicitudes: solicitudes?.reverse() } };
}
