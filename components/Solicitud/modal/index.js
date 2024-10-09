import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AgregarVoluntario from "../voluntarios";
import { Button, Chip, CircularProgress, Grid } from "@mui/material";
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
import { solicitudDefault } from "@src/utilities/sources/solicitudDefault";
import FormEmergencia from "../emergencia";
import { createEmergencia } from "@src/services/emergencia";
import FormSalud from "../salud";
import { createSalud } from "@src/services/salud";
import ResponsabilidadForm from "../responsabilidad";
import { createEmail } from "@src/services/correo";

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
const CANCELADA_ESTADO_11 = 11;

export default function SolicitudModal(props) {
  const { open, handleClose, edicionData, setEdicionData } = props;
  const {
    setLoadSolicitudes,
    setNewVoluntario,
    setDocumentoPago,
    setAlertMessage,
    documentoPago,
  } = useAppContext();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [solicitud, setSolicitud] = useState(solicitudDefault);
  const [disableButton, setDisableButton] = useState(true);
  const logisticaFormRef = useRef(null);
  const emergenciaFormRef = useRef(null);
  const saludFormRef = useRef(null);

  const handleModalClose = (e, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setSolicitud(solicitudDefault);
    setEdicionData(null);
    setNewVoluntario(null);
    setLoading(false);
    setDisableButton(true);
    setDocumentoPago(null);
    handleClose();
  };

  const sendSolicitud = async (idEstado) => {
    setLoading(true);
    const resultSolicitud = await createSolicitud({ ...solicitud, idEstado });
    if (resultSolicitud) {
      setSolicitud(resultSolicitud);
      setLoadSolicitudes(true);
      setAlertMessage({ open: true, isSuccess: true });
    }
    setDisableButton(true);
    setLoading(false);
  };

  const sendUpdateSolicitud = async (idEstado) => {
    setLoading(true);
    const resultSolicitud = await updateSolicitud({ ...solicitud, idEstado });
    if (resultSolicitud) {
      setSolicitud(resultSolicitud);
      setAlertMessage({ open: true, isSuccess: true });
    }
    setLoadSolicitudes(true);
    setLoading(false);
    setDisableButton(true);
  };

  const cancelSolicitud = async (idEstado) => {
    setLoading(true);
    const resultSolicitud = await updateSolicitud({
      ...solicitud,
      idEstado,
      activa: false,
    });
    if (resultSolicitud) {
      setSolicitud(resultSolicitud);
      setAlertMessage({ open: true, isSuccess: true });
    }
    setLoadSolicitudes(true);
    setLoading(false);
    setDisableButton(true);
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

  const sendEmail = async () => {
    setLoading(true);
    const responseDocument = await createEmail(solicitud?.idVoluntario);
    setLoading(false);
  };

  const sendLogistica = async () => {
    setLoading(true);
    const responseLogistica = await createLogistica(solicitud?.logistica);
    if (responseLogistica) {
    }
    setLoading(false);
  };

  const sendEmergencia = async () => {
    const responseEmergencia = await createEmergencia(
      solicitud?.voluntario?.emergencia
    );

    if (responseEmergencia) {
      setSolicitud((prev) => ({
        ...prev,
        voluntario: {
          ...prev.voluntario,
          emergencia: responseEmergencia,
        },
      }));
      setLoadSolicitudes(true);
      setDisableButton(true);
    }
  };

  const sendInfoSalud = async () => {
    const responseSalud = await createSalud(solicitud?.voluntario?.salud);
  };

  const handleSavedAndUpdateSolicitud = async (e) => {
    e.preventDefault();
    const idEstado = solicitud?.idEstado;
    switch (idEstado) {
      case 0:
        await sendSolicitud(CREADA_ESTADO_1);
        break;
      case CREADA_ESTADO_1:
        await sendUpdateSolicitud(SEDE_PLAN_ESTADO_2);
        break;
      case SEDE_PLAN_ESTADO_2:
        await sendReservacion();
        await sendUpdateSolicitud(FECHAS_VIAJE_ESTADO_3);
        break;
      case FECHAS_VIAJE_ESTADO_3:
        await sendUpdateSolicitud(PAGO_TIPO_ESTADO_4);
        break;
      case PAGO_TIPO_ESTADO_4:
        if (solicitud?.tipoPago?.nombre?.toLowerCase() === "efectivo") {
          await sendUpdateReservacion();
          await sendUpdateSolicitud(FECHAS_VIAJE_CONFIRMADO_ESTADO_7);
        } else {
          await sendDocument();
          await sendUpdateSolicitud(PAGO_ADJUNTO_ESTADO_5);
        }
        break;
      case PAGO_ADJUNTO_ESTADO_5:
        await sendEmail();
        await sendUpdateSolicitud(PAGO_CONFIRMADO_ESTADO_6);
        break;
      case PAGO_CONFIRMADO_ESTADO_6:
        await sendUpdateReservacion();
        await sendUpdateSolicitud(FECHAS_VIAJE_CONFIRMADO_ESTADO_7);
        break;
      case FECHAS_VIAJE_CONFIRMADO_ESTADO_7:
        if (logisticaFormRef.current) {
          setLoading(true);
          logisticaFormRef.current.submit(false);
        }
        return;
      case DATOS_LOGISTICA_ESTADO_8:
        if (solicitud?.voluntario?.emergencia?.id) {
          if (saludFormRef.current) {
            setLoading(true);
            await saludFormRef.current.submit(false);
          }
        } else {
          if (emergenciaFormRef.current) {
            setLoading(true);
            await emergenciaFormRef.current.submit(false);
          }
        }
        break;
      case INFO_EMERGENCIA_MEDICOS_9:
        if (solicitud?.tipoPago?.nombre?.toLowerCase() === "efectivo") {
          await sendEmail();
        }
        await sendUpdateSolicitud(RESPONSABILIDAD_ESTADO_10);
        break;
      case RESPONSABILIDAD_ESTADO_10:
        await cancelSolicitud(CANCELADA_ESTADO_11);
        break;
      default:
        break;
    }
    if (!loading && solicitud?.idEstado !== DATOS_LOGISTICA_ESTADO_8)
      handleModalClose();
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    const idEstado = solicitud?.idEstado;
    switch (idEstado) {
      case 0:
        await sendSolicitud(CREADA_ESTADO_1);
        break;
      case CREADA_ESTADO_1:
        await sendUpdateSolicitud(SEDE_PLAN_ESTADO_2);
        break;
      case SEDE_PLAN_ESTADO_2:
        await sendReservacion();
        await sendUpdateSolicitud(FECHAS_VIAJE_ESTADO_3);
        break;
      case FECHAS_VIAJE_ESTADO_3:
        sendUpdateSolicitud(PAGO_TIPO_ESTADO_4);
        break;
      case PAGO_TIPO_ESTADO_4:
        if (solicitud?.tipoPago?.nombre?.toLowerCase() === "efectivo") {
          await sendUpdateReservacion();
          await sendUpdateSolicitud(FECHAS_VIAJE_CONFIRMADO_ESTADO_7);
        } else {
          await sendDocument();
          await sendUpdateSolicitud(PAGO_ADJUNTO_ESTADO_5);
        }
        break;
      case PAGO_ADJUNTO_ESTADO_5:
        await sendEmail();
        await sendUpdateSolicitud(PAGO_CONFIRMADO_ESTADO_6);
        break;
      case PAGO_CONFIRMADO_ESTADO_6:
        await sendUpdateReservacion();
        await sendUpdateSolicitud(FECHAS_VIAJE_CONFIRMADO_ESTADO_7);
        break;
      case FECHAS_VIAJE_CONFIRMADO_ESTADO_7:
        if (logisticaFormRef.current) {
          setLoading(true);
          logisticaFormRef.current.submit(true);
        }
        break;
      case DATOS_LOGISTICA_ESTADO_8:
        if (solicitud?.voluntario?.emergencia?.id) {
          if (saludFormRef.current) {
            setLoading(true);
            saludFormRef.current.submit(true);
          }
        } else {
          if (emergenciaFormRef.current) {
            setLoading(true);
            emergenciaFormRef.current.submit(true);
          }
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const idEstado = solicitud?.idEstado;
    const defaultTitle = "Seleccionar";
    switch (idEstado) {
      case 0:
        setTitle(`${defaultTitle} voluntario:`);
        if (solicitud.idVoluntario) setDisableButton(false);
        break;
      case CREADA_ESTADO_1:
        setTitle(`${defaultTitle} sede y plan:`);
        if (solicitud.idPlan) setDisableButton(false);
        break;
      case SEDE_PLAN_ESTADO_2:
        setTitle(`${defaultTitle} fechas de viaje previstas:`);
        const reservacion = solicitud?.reservacion;
        if (reservacion?.inicio && reservacion?.fin) setDisableButton(false);
        break;
      case FECHAS_VIAJE_ESTADO_3:
        setTitle(`${defaultTitle} tipo de pago:`);
        if (solicitud?.idTipoPago) setDisableButton(false);
        break;
      case PAGO_TIPO_ESTADO_4:
        if (solicitud?.tipoPago?.nombre?.toLowerCase() === "efectivo") {
          setTitle(`Confirmar fechas para viaje: `);
          setDisableButton(false);
        } else {
          setTitle(`Cargar el comprobante de pago: `);
          if (solicitud?.archivo) setDisableButton(false);
        }
        break;
      case PAGO_ADJUNTO_ESTADO_5:
        setTitle(`Confirmar documento de pago: `);
        if (documentoPago?.base64) setDisableButton(false);
        break;
      case PAGO_CONFIRMADO_ESTADO_6:
        setTitle(`Confirmar fechas para viaje: `);
        setDisableButton(false);
        break;
      case FECHAS_VIAJE_CONFIRMADO_ESTADO_7:
        setTitle(`Agregar datos de logistica: `);
        if (solicitud?.logistica) setDisableButton(false);
        break;
      case DATOS_LOGISTICA_ESTADO_8:
        const voluntario = solicitud?.voluntario;
        if (voluntario.emergencia) {
          setDisableButton(false);
        }

        if (voluntario?.emergencia?.id) {
          setTitle(`Agregar datos medicos: `);
        } else {
          setTitle(`Agregar datos de emergencia: `);
        }
        break;
      case INFO_EMERGENCIA_MEDICOS_9:
        setTitle(`Agregar descargo de responsabilidad: `);
        setDisableButton(solicitud?.descargoResponsabilidades ? false : true);
        break;
      case RESPONSABILIDAD_ESTADO_10:
        setTitle(``);
        setDisableButton(false);
        break;
      default:
        setTitle(``);
        break;
    }
  }, [solicitud, documentoPago]);

  const handlerLogisticaForm = async (isNext) => {
    await sendLogistica();
    await sendUpdateSolicitud(DATOS_LOGISTICA_ESTADO_8);

    setLoading(false);
    if (!isNext) handleModalClose();
  };

  const handlerEmergenciaForm = async (isNext) => {
    setLoading(true);
    await sendEmergencia();
    setLoading(false);
    if (!isNext) handleModalClose();
  };

  const handlerSaludForm = async (isNext) => {
    await sendInfoSalud();
    await sendUpdateSolicitud(INFO_EMERGENCIA_MEDICOS_9);
    setLoading(false);
    if (!isNext) handleModalClose();
  };

  useEffect(() => {
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
            <Chip
              label={
                solicitud.idEstado === 0
                  ? "Nueva"
                  : `Último estado : ${solicitud?.idEstado} - ${solicitud?.estado?.nombre}`
              }
              color="primary"
              variant="outlined"
            />
          </Typography>
          {solicitud?.voluntario && <DetalleSolicitud solicitud={solicitud} />}

          {solicitud?.idEstado !== RESPONSABILIDAD_ESTADO_10 && (
            <>
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
                  <AgregarPlan
                    setSolicitud={setSolicitud}
                    solicitud={solicitud}
                  />
                )}
                {solicitud?.idEstado === SEDE_PLAN_ESTADO_2 && (
                  <FechasSolicitud
                    setSolicitud={setSolicitud}
                    solicitud={solicitud}
                  />
                )}
                {solicitud?.idEstado === FECHAS_VIAJE_ESTADO_3 && (
                  <AgregarPago
                    setSolicitud={setSolicitud}
                    solicitud={solicitud}
                  />
                )}

                {solicitud?.idEstado === PAGO_TIPO_ESTADO_4 &&
                solicitud?.tipoPago?.nombre?.toLowerCase() === "efectivo" ? (
                  <FechasSolicitud
                    setSolicitud={setSolicitud}
                    solicitud={solicitud}
                  />
                ) : (
                  solicitud?.idEstado === PAGO_TIPO_ESTADO_4 && (
                    <CargarPago
                      setSolicitud={setSolicitud}
                      solicitud={solicitud}
                    />
                  )
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
                {!solicitud?.voluntario?.emergencia?.id &&
                  solicitud?.idEstado === DATOS_LOGISTICA_ESTADO_8 && (
                    <FormEmergencia
                      ref={emergenciaFormRef}
                      setSolicitud={setSolicitud}
                      solicitud={solicitud}
                      setLoading={setLoading}
                      handlerEmergenciaForm={handlerEmergenciaForm}
                    />
                  )}
                {solicitud?.voluntario?.emergencia?.id &&
                  solicitud?.idEstado === DATOS_LOGISTICA_ESTADO_8 && (
                    <FormSalud
                      ref={saludFormRef}
                      setSolicitud={setSolicitud}
                      solicitud={solicitud}
                      setLoading={setLoading}
                      handlerSaludForm={handlerSaludForm}
                    />
                  )}
                {solicitud?.idEstado === INFO_EMERGENCIA_MEDICOS_9 && (
                  <ResponsabilidadForm
                    setSolicitud={setSolicitud}
                    solicitud={solicitud}
                    setLoading={setLoading}
                  />
                )}
              </Box>
            </>
          )}

          <Grid container spacing={2} justifyContent="end" alignItems="center">
            <Grid item>
              <Box>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  disabled={loading || disableButton}
                  color={
                    solicitud?.idEstado === RESPONSABILIDAD_ESTADO_10
                      ? "error"
                      : "success"
                  }
                  onClick={handleSavedAndUpdateSolicitud}
                >
                  {solicitud?.idEstado === INFO_EMERGENCIA_MEDICOS_9
                    ? `Finalizar`
                    : solicitud?.idEstado === RESPONSABILIDAD_ESTADO_10
                    ? `Cancelar solicitud`
                    : `Guardar y continuar mas tarde`}
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
            {solicitud?.idEstado !== INFO_EMERGENCIA_MEDICOS_9 &&
              solicitud?.idEstado !== RESPONSABILIDAD_ESTADO_10 && (
                <Grid item>
                  <Box>
                    <Button
                      type="submit"
                      fullWidth
                      color="info"
                      variant="outlined"
                      disabled={loading || disableButton}
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
              )}
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
