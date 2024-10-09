import { Box, Grid, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const formDataDefault = {
  idUsuario: null,
  nombre: "",
  direccion: "",
  numero: null,
  email: "",
  relacion: null,
};

const FormEmergencia = forwardRef((props, ref) => {
  const { solicitud, setSolicitud, handlerEmergenciaForm, setLoading } = props;
  const [formData, setFormData] = useState(formDataDefault);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
        if (!value) error = "El nombre es requerido.";
        break;
      case "direccion":
        if (!value) error = "La dirección es requerida.";
        break;
      case "numero":
        if (!value) error = "El número es requerida.";
        break;
      case "relacion":
        if (!value) error = "El campo de relacion es requerido.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      idUsuario: solicitud?.idVoluntario,
      [name]: value,
    }));

    setSolicitud((prev) => ({
      ...prev,
      voluntario: {
        ...prev.voluntario,
        emergencia: {
          ...prev?.voluntario?.emergencia,
          idUsuario: solicitud?.idVoluntario,
          [name]: value,
        },
      },
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const submit = (isNext) => {
    const newErrors = {};
    for (let key in formData) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handlerEmergenciaForm(isNext);
      setFormData(null);
    }
    setLoading(false);
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <Box id="form-registration">
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombre"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.emergencia?.nombre ?? ""}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="direccion"
            name="direccion"
            label="Dirección"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.emergencia?.direccion ?? ""}
            onChange={handleChange}
            error={!!errors.direccion}
            helperText={errors.direccion}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="numero"
            name="numero"
            label="Número"
            type="number"
            value={solicitud?.voluntario?.emergencia?.numero}
            onChange={handleChange}
            error={!!errors.numero}
            helperText={errors.numero}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            required
            id="email"
            name="email"
            label="Correo"
            value={solicitud?.voluntario?.emergencia?.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            id="relacion"
            name="relacion"
            label="Relación"
            value={solicitud?.voluntario?.emergencia?.relacion}
            onChange={handleChange}
            error={!!errors.relacion}
            helperText={errors.relacion}
            disabled={false}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default FormEmergencia;
