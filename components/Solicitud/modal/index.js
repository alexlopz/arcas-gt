import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AgregarVoluntario from "../voluntarios";
import { Button, CircularProgress, Grid } from "@mui/material";
import { boxStyle } from "./style";
import { createSolicitud, updateSolicitud } from "@src/services/solicitudes";
import { useAppContext } from "@src/context/AppContext";
import AgregarPlan from "../plan";
import FechasSolicitud from "../fechas";
import {
  createReservacion,
  updateReservacion,
} from "@src/services/reservaciones";
import DetalleSolicitud from "../detalle";
import AgregarPago from "../pago";
import CargarPago from "../pago/carga";
import { uploadDocument } from "@src/services/pagos";
import ConfirmarPago from "../pago/confirmar";
import FormLogistica from "../logistica";
import { createLogistica } from "@src/services/logistica";

const solicitudDefault = {
  id: null,
  idEstado: 0,
  idVoluntario: null,
  idPlan: null,
  idTipoPago: null,
  descargoResponsabilidades: false,
  pagado: false,
  activa: true,
};

const CREADA_ESTADO_1 = 1;
const SEDE_PLAN_ESTADO_2 = 2;
const FECHAS_VIAJE_ESTADO_3 = 3;
const PAGO_TIPO_ESTADO_4 = 4;
const PAGO_ADJUNTO_ESTADO_5 = 5;
const PAGO_CONFIRMADO_ESTADO_6 = 6;
const FECHAS_VIAJE_CONFIRMADO_ESTADO_7 = 7;
const DATOS_LOGISTICA_ESTADO_8 = 8;
const INFO_EMERGENCIA_MEDICOS_9 = 9;
const RESPONSABILIDAD_ESTADO_10 = 10;
const CANCELADA_ESTADO_12 = 11;

export default function SolicitudModal(props) {
  const { open, handleClose, isEdicion, edicionData, setEdicionData } = props;
  const { setLoadSolicitudes, setNewVoluntario, setDocumentoPago } =
    useAppContext();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [solicitud, setSolicitud] = useState(solicitudDefault);
  const [step, setStep] = useState(["voluntario"]);
  const logisticaFormRef = useRef(null);

  console.log("edicionData: ", edicionData);

  const handleModalClose = (e, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setSolicitud(solicitudDefault);
    setEdicionData(null);
    setNewVoluntario(null);
    setStep("voluntario");
    setLoading(false);
    setDocumentoPago(null);
    handleClose();
  };

  const sendSolicitud = async (idEstado) => {
    setLoading(true);
    const resultSolicitud = await createSolicitud({ ...solicitud, idEstado });
    if (resultSolicitud) {
      setSolicitud(resultSolicitud);
      setLoadSolicitudes(true);
    }
    setLoading(false);
  };

  const sendUpdateSolicitud = async (idEstado) => {
    setLoading(true);
    const resultSolicitud = await updateSolicitud({ ...solicitud, idEstado });
    if (resultSolicitud) {
      setSolicitud(resultSolicitud);
    }
    setLoadSolicitudes(true);
    setLoading(false);
  };

  const sendReservacion = async () => {
    setLoading(true);
    const responseReservacion = await createReservacion(solicitud);
    if (responseReservacion) {
      setLoadSolicitudes(true);
      setLoading(false);
    }
  };

  const sendUpdateReservacion = async () => {
    setLoading(true);
    const responseUpdateReservacion = await updateReservacion(solicitud);
    if (responseUpdateReservacion) {
      setLoadSolicitudes(true);
      setLoading(false);
    }
  };

  const sendDocument = async () => {
    setLoading(true);
    const responseDocument = await uploadDocument(solicitud?.archivo);
    if (responseDocument) {
    }
    setLoading(false);
  };

  const sendLogistica = async () => {
    const responseLogistica = await createLogistica(solicitud?.logistica);
  };

  const handleSavedAndUpdateSolicitud = async (e) => {
    e.preventDefault();
    const idEstado = solicitud?.idEstado;
    switch (idEstado) {
      case 0:
        sendSolicitud(CREADA_ESTADO_1);
        setStep("plan");
        break;
      case CREADA_ESTADO_1:
        sendUpdateSolicitud(SEDE_PLAN_ESTADO_2);
        setStep("fechas");
        break;
      case SEDE_PLAN_ESTADO_2:
        await sendUpdateSolicitud(FECHAS_VIAJE_ESTADO_3);
        await sendReservacion();
        setStep("pago");
        break;
      case FECHAS_VIAJE_ESTADO_3:
        sendUpdateSolicitud(PAGO_TIPO_ESTADO_4);
        setStep("pago-tipo");
        break;
      case PAGO_TIPO_ESTADO_4:
        await sendUpdateSolicitud(PAGO_ADJUNTO_ESTADO_5);
        await sendDocument();
        setStep("pago-adjunto");
        break;
      case PAGO_ADJUNTO_ESTADO_5:
        sendUpdateSolicitud(PAGO_CONFIRMADO_ESTADO_6);
        setStep("pago-confirmado");
        break;
      case PAGO_CONFIRMADO_ESTADO_6:
        await sendUpdateSolicitud(FECHAS_VIAJE_CONFIRMADO_ESTADO_7);
        await sendUpdateReservacion();
        setStep("fechas-viaje-confirmado");
        break;
      case FECHAS_VIAJE_CONFIRMADO_ESTADO_7:
        if (logisticaFormRef.current) {
          setLoading(true);
          logisticaFormRef.current.submit(false);
        }
        setStep("datos-logistica");
        return;
      default:
        setStep("voluntario");
        break;
    }
    if (!loading) handleModalClose();
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const idEstado = solicitud?.idEstado;
    switch (idEstado) {
      case 0:
        sendSolicitud(CREADA_ESTADO_1);
        setStep("plan");
        break;
      case CREADA_ESTADO_1:
        sendUpdateSolicitud(SEDE_PLAN_ESTADO_2);
        setStep("fechas");
        break;
      case SEDE_PLAN_ESTADO_2:
        sendUpdateSolicitud(FECHAS_VIAJE_ESTADO_3);
        sendReservacion();
        setStep("pago");
        break;
      case FECHAS_VIAJE_ESTADO_3:
        sendUpdateSolicitud(PAGO_TIPO_ESTADO_4);
        setStep("pago-tipo");
        break;
      case PAGO_TIPO_ESTADO_4:
        sendUpdateSolicitud(PAGO_ADJUNTO_ESTADO_5);
        sendDocument();
        setStep("pago-adjunto");
        break;
      case PAGO_ADJUNTO_ESTADO_5:
        sendUpdateSolicitud(PAGO_CONFIRMADO_ESTADO_6);
        setStep("pago-confirmado");
        break;
      case PAGO_CONFIRMADO_ESTADO_6:
        sendUpdateSolicitud(FECHAS_VIAJE_CONFIRMADO_ESTADO_7);
        sendUpdateReservacion();
        setStep("fechas-viaje-confirmado");
        break;
      case FECHAS_VIAJE_CONFIRMADO_ESTADO_7:
        if (logisticaFormRef.current) {
          setLoading(true);
          logisticaFormRef.current.submit(true);
        }
        setStep("datos-logistica");
        break;
      default:
        setStep("voluntario");
        break;
    }
  };

  console.log("solicitud: ", solicitud);

  useEffect(() => {
    const idEstado = solicitud?.idEstado;
    const defaultTitle = "Seleccionar";
    switch (idEstado) {
      case 0:
        setTitle(`${defaultTitle} voluntario:`);
        break;
      case CREADA_ESTADO_1:
        setTitle(`${defaultTitle} sede y plan:`);
        break;
      case SEDE_PLAN_ESTADO_2:
        setTitle(`${defaultTitle} fechas de viaje previstas:`);
        break;
      case FECHAS_VIAJE_ESTADO_3:
        setTitle(`${defaultTitle} tipo de pago:`);
        break;
      case PAGO_TIPO_ESTADO_4:
        if (solicitud?.tipoPago?.nombre !== "Efectivo") {
          setTitle(`Cargar el comprobante de pago: `);
        }
        break;
      case PAGO_ADJUNTO_ESTADO_5:
        setTitle(`Confirmar documento de pago: `);
        break;
      case PAGO_CONFIRMADO_ESTADO_6:
        setTitle(`Confirmar fechas para viaje: `);
        break;
      case FECHAS_VIAJE_CONFIRMADO_ESTADO_7:
        setTitle(`Agregar datos de logistica: `);
        break;
      case DATOS_LOGISTICA_ESTADO_8:
        setTitle(`Agregar datos de logistica: `);
        break;
      default:
        setStep("voluntario");
        break;
    }
  }, [solicitud]);

  const handlerLogisticaForm = async (isNext) => {
    await sendUpdateSolicitud(DATOS_LOGISTICA_ESTADO_8);
    await sendLogistica();
    console.log("envio: ", solicitud);

    setLoading(false);
    handleModalClose();
  };

  useEffect(() => {
    console.log("edicionDataeffect: ", edicionData);

    setSolicitud(edicionData?.voluntario ? edicionData : solicitudDefault);
  }, [edicionData]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={true}
        disableScrollLock={true}
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Solicitud {solicitud?.id ? `# ${solicitud?.id} - ` : " - "}
            <Button
              variant="outlined"
              size="small"
              color="info"
              sx={{ borderRadius: "50px" }}
            >
              {solicitud.idEstado === 0
                ? "Nueva"
                : `Paso: ${solicitud?.idEstado} - ${solicitud?.estado?.nombre}`}
            </Button>
          </Typography>
          {solicitud?.voluntario && <DetalleSolicitud solicitud={solicitud} />}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ pb: 3 }}
          >
            {title}
          </Typography>
          <Box sx={{ p: 3, mb: 5 }}>
            {solicitud?.idEstado === 0 && (
              <AgregarVoluntario
                setSolicitud={setSolicitud}
                solicitud={solicitud}
              />
            )}
            {solicitud?.idEstado === CREADA_ESTADO_1 && (
              <AgregarPlan setSolicitud={setSolicitud} solicitud={solicitud} />
            )}
            {solicitud?.idEstado === SEDE_PLAN_ESTADO_2 && (
              <FechasSolicitud
                setSolicitud={setSolicitud}
                solicitud={solicitud}
              />
            )}
            {solicitud?.idEstado === FECHAS_VIAJE_ESTADO_3 && (
              <AgregarPago setSolicitud={setSolicitud} solicitud={solicitud} />
            )}

            {solicitud?.idEstado === PAGO_TIPO_ESTADO_4 &&
              solicitud?.tipoPago?.nombre !== "Efectivo" && (
                <CargarPago setSolicitud={setSolicitud} solicitud={solicitud} />
              )}
            {solicitud?.idEstado === PAGO_ADJUNTO_ESTADO_5 && (
              <ConfirmarPago
                setSolicitud={setSolicitud}
                solicitud={solicitud}
              />
            )}
            {solicitud?.idEstado === PAGO_CONFIRMADO_ESTADO_6 && (
              <FechasSolicitud
                setSolicitud={setSolicitud}
                solicitud={solicitud}
              />
            )}
            {solicitud?.idEstado === FECHAS_VIAJE_CONFIRMADO_ESTADO_7 && (
              <FormLogistica
                ref={logisticaFormRef}
                setSolicitud={setSolicitud}
                solicitud={solicitud}
                setLoading={setLoading}
                handlerLogisticaForm={handlerLogisticaForm}
              />
            )}
          </Box>
          <Grid container spacing={2} justifyContent="end" alignItems="center">
            <Grid item>
              <Box>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  disabled={loading || !solicitud.idVoluntario}
                  color="success"
                  onClick={handleSavedAndUpdateSolicitud}
                >
                  Guardar y continuar mas tarde
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  color="info"
                  variant="outlined"
                  disabled={loading || !solicitud.idVoluntario}
                  onClick={handleNextStep}
                >
                  Siguiente
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleModalClose}
                >
                  Cerrar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
