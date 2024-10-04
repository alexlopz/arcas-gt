import { Grid } from "@mui/material";
import DetalleProfile from "./profile";
import InfoSolicitud from "./InfoSolicitud";

export default function DetalleSolicitud(props) {
  const { solicitud } = props;
  console.log("data:", solicitud);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} lg={5}>
        <DetalleProfile voluntario={solicitud?.voluntario} />
      </Grid>
      <Grid item xs={12} sm={12} lg={7}>
        <InfoSolicitud solicitud={solicitud} />
      </Grid>
    </Grid>
  );
}
