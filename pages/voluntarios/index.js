import { Paper, Button, Box } from "@mui/material";
import Cookies from "cookies";

import DashboardLayout from "@layouts/DashboardLayout";
import UsuarioModal from "@components/forms/registro/modal";
import { getUsers } from "@src/services/users";
import UsuariosTabla from "@components/UsuariosTabla";
import { useAppContext } from "@src/context/AppContext";
import { useState } from "react";

export default function Page(props) {
  const { voluntarios } = props;
  const { isModalOpen, openModal, closeModal } = useAppContext();
  const [edicionData, setEdicionData] = useState();

  const handleClickEdicion = (row) => {
    console.log("row: ", row);

    setEdicionData(row);
    openModal();
  };

  const handleClickRegistro = () => {
    setEdicionData(null);
    openModal();
  };
  return (
    <DashboardLayout page={"Voluntarios"}>
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
            Crear voluntario
          </Button>
        </Box>
        <UsuarioModal
          open={isModalOpen}
          handleClose={closeModal}
          isEdicion={edicionData !== null}
          edicionData={edicionData}
        />
        <UsuariosTabla
          data={voluntarios}
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
  const voluntarios = await getUsers(token);

  return { props: { user, voluntarios } };
}
