import React, { useEffect, useState } from "react";
import { Avatar, Paper, Typography, Grid, Box } from "@mui/material";

import MapIcon from "@mui/icons-material/MapOutlined";
import { getPdf } from "@src/services/pagos";
import { base64ToBlob } from "@src/utilities/base64ToBlob";
import { useAppContext } from "@src/context/AppContext";

const PAGO_ADJUNTO_ESTADO_5 = 5;

export default function InfoSolicitud(props) {
  const { solicitud } = props;
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
    console.log("traeeeerr pdf");

    if (
      solicitud.id >= PAGO_ADJUNTO_ESTADO_5 &&
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
          {solicitud?.plan?.titulo && (
            <Typography component="div" variant="subtitle2" color="secondary">
              <MapIcon sx={{ verticalAlign: "middle", fontSize: "1.25rem" }} />{" "}
              <strong>Plan: </strong>
              {solicitud?.plan?.titulo}
            </Typography>
          )}
          {solicitud?.plan?.sede?.nombre && (
            <Typography component="div" variant="subtitle2" color="secondary">
              <MapIcon sx={{ verticalAlign: "middle", fontSize: "1.25rem" }} />{" "}
              <strong>Sede: </strong>
              {solicitud?.plan?.sede?.nombre}
            </Typography>
          )}
          {solicitud?.tipoPago?.nombre && (
            <Typography component="div" variant="subtitle2" color="secondary">
              <MapIcon sx={{ verticalAlign: "middle", fontSize: "1.25rem" }} />{" "}
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
              <MapIcon sx={{ verticalAlign: "middle", fontSize: "1.25rem" }} />{" "}
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
