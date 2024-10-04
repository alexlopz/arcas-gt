import Cookies from "cookies";

/* MUI */
import { Grid } from "@mui/material";

/* Layouts */
import DashboardLayout from "@layouts/DashboardLayout";

import DashboardToolbar from "@components/Toolbar/Dashboard";

export default function Page(props) {
  const { user } = props;

  return (
    <DashboardLayout page={"Dashboard"}>
      <DashboardToolbar user={user} />
      <Grid container spacing={2}>
        {/* <> NUEVO CONTENIDO DEBE IR ACA</> */}
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

  const userCookie = cookies.get("user-info");

  const user = JSON.parse(decodeURIComponent(userCookie));
  return { props: { user } };
}
