import { Grid } from "@mui/material";
import DetalleProfile from "../profile";
import InfoSolicitud from "../InfoSolicitud";

export default function InformacionBasica(props) {
  const { solicitud } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} lg={6}>
        <DetalleProfile voluntario={solicitud?.voluntario} />
      </Grid>
      <Grid item xs={12} sm={12} lg={6}>
        <InfoSolicitud solicitud={solicitud} plan={solicitud?.plan} />
      </Grid>
    </Grid>
  );
}
