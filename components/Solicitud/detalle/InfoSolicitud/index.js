import React, { useEffect, useState } from "react";
import { Avatar, Paper, Typography, Grid, Box, Button } from "@mui/material";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";

import { getPdf } from "@src/services/pagos";
import { base64ToBlob } from "@src/utilities/base64ToBlob";
import { useAppContext } from "@src/context/AppContext";
import { DateFormatter } from "@src/utilities/DateFormater";

const PAGO_ADJUNTO_ESTADO_5 = 5;

export default function InfoSolicitud(props) {
  const { solicitud, plan } = props;
  const { documentoPago, setDocumentoPago } = useAppContext();

  const [base64, setBase64] = useState();
  const [fileName, setFileName] = useState("");

  const getPdfDocument = async () => {
    const resultPdf = await getPdf(solicitud.id);
    if (resultPdf?.base64) {
      setBase64(resultPdf.base64);
      const fileName = `pago-solicitud-${solicitud.id}.pdf`;
      setFileName(fileName);
      setDocumentoPago({ ...resultPdf, fileName });
    }
  };

  const downloadPdf = () => {
    if (base64) {
      const pdfBlob = base64ToBlob(base64, "application/pdf");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(pdfUrl);
    }
  };
  useEffect(() => {
    if (
      solicitud.idEstado >= PAGO_ADJUNTO_ESTADO_5 &&
      solicitud?.tipoPago?.nombre?.toLowerCase() !== "efectivo" &&
      !documentoPago
    ) {
      getPdfDocument();
    }
  }, [solicitud]);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Grid container>
        <Grid item sm={12}>
          {plan?.titulo && (
            <Box sx={{ display: "flex" }}>
              <Typography component="div" variant="subtitle2" color="secondary">
                <StickyNote2OutlinedIcon
                  sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
                />{" "}
                <strong>Plan: </strong>
                {plan?.titulo}
              </Typography>
              <Typography
                component="div"
                variant="subtitle2"
                color="secondary"
                sx={{ marginLeft: "10px" }}
              >
                <OtherHousesOutlinedIcon
                  sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
                />{" "}
                <strong>Sede: </strong>
                {plan?.sede?.nombre}
              </Typography>
            </Box>
          )}
          {solicitud?.reservacion?.inicio && (
            <>
              <Typography component="div" variant="subtitle2" color="secondary">
                <CalendarMonthOutlinedIcon
                  sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
                />{" "}
                <strong>Fecha entrada: </strong>
                {DateFormatter(solicitud?.reservacion?.inicio)}
              </Typography>
              <Typography component="div" variant="subtitle2" color="secondary">
                <CalendarMonthOutlinedIcon
                  sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
                />{" "}
                <strong>Fecha salida: </strong>
                {DateFormatter(solicitud?.reservacion?.fin)}
              </Typography>
            </>
          )}
          {solicitud?.tipoPago?.nombre && (
            <Typography component="div" variant="subtitle2" color="secondary">
              <PaidOutlinedIcon
                sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
              />{" "}
              <strong>Tipo de pago: </strong>
              {solicitud?.tipoPago?.nombre}
            </Typography>
          )}
          {base64 && (
            <Typography
              component="div"
              variant="subtitle2"
              color="secondary"
              onClick={downloadPdf}
            >
              <ReceiptOutlinedIcon
                sx={{ verticalAlign: "middle", fontSize: "1.25rem" }}
              />{" "}
              <strong>Comprobante de pago: </strong>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "blue",
                }}
              >
                {fileName}
              </span>
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
