import { Box, Grid, Typography } from "@mui/material";
import { DateTimeFormatter } from "@src/utilities/DateTimeFormater";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";

export default function InformacionLogistica(props) {
  const { logistica } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3} lg={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            minHeight: "100%",
            gap: "5px",
          }}
        >
          <Typography component="span" variant="subtitle2" color="secondary">
            <CalendarMonthOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Fecha y hora: </strong>
            {DateTimeFormatter(logistica.fechaHora)}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <DirectionsBusFilledOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Tipo de transporte: </strong>
            {logistica.tipotransporte}
          </Typography>
          <Typography component="span" variant="subtitle2" color="secondary">
            <CardTravelOutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Llega por cuenta propia: </strong>
            {logistica.llegaPorCuentaPropia ? "Si" : "No"}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            minHeight: "100%",
            gap: "6px",
          }}
        >
          <Typography component="span" variant="subtitle2" color="secondary">
            <StickyNote2OutlinedIcon
              sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
            />{" "}
            <strong>Descripcion: </strong>
            {logistica?.descripcion}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
