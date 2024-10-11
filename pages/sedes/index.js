import { Paper, Button, Box } from "@mui/material";
import Cookies from "cookies";

import DashboardLayout from "@layouts/DashboardLayout";
import SedeModal from "@components/SedesModal";
import { getSedes } from "@src/services/sedes"; 
import SedesTabla from "@components/SedesTabla";
import { useAppContext } from "@src/context/AppContext";
import { useState } from "react";

export default function Page(props) {
  const { sedes } = props; 
  const { isModalOpen, openModal, closeModal, setLoadUsers } = useAppContext();
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
    <DashboardLayout page={"Sedes"}>
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
            Crear Sede
          </Button>
        </Box>
        <SedeModal
          open={isModalOpen}
          handleClose={() => {
            closeModal();
            setLoadUsers(true); // Forzar la recarga cuando se cierre el modal
          }}
          isEdicion={edicionData !== null}
          edicionData={edicionData}
        />
        <SedesTabla
          data={sedes}
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

  const sedes = await getSedes(token);

  return { props: { user, sedes: sedes?.reverse() } };
}
