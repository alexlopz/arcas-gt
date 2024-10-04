import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const formDataDefault = {
  idSolicitud: null,
  fechaHora: "",
  tipotransporte: "",
  descripcion: "",
  llegaPorCuentaPropia: null,
};
const transportes = [
  { label: "Aereo", value: "aereo" },
  { label: "Terrestre", value: "terrestre" },
];

const respuestas = [
  { label: "Si", value: true },
  { label: "No", value: false },
];
const FormLogistica = forwardRef((props, ref) => {
  const { solicitud, setSolicitud, handlerLogisticaForm, setLoading } = props;
  const [formData, setFormData] = useState(formDataDefault);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fechaHora":
        if (!value) error = "La fecha y hora es requerida.";
        break;
      case "tipotransporte":
        if (!value) error = "El Tipo de transporte es requerido.";
        break;
      case "descripcion":
        if (!value) error = "La descripción es requerida.";
        break;
      case "llegaPorCuentaPropia":
        if (value === null) error = "Este campo es requerido.";
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
      idSolicitud: solicitud.id,
      [name]: value,
    }));

    setSolicitud((prev) => ({
      ...prev,
      logistica: {
        ...prev.logistica,
        idSolicitud: solicitud.id,
        [name]: value,
      },
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  console.log("formData: ", formData);

  const submit = (isNext) => {
    console.log("hello moto", isNext);

    const newErrors = {};
    for (let key in formData) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handlerLogisticaForm(isNext);
      console.log("todo genial");
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
            id="fechaHora"
            name="fechaHora"
            label="Fecha y hora"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.fechaHora ?? ""}
            onChange={handleChange}
            error={!!errors.fechaHora}
            helperText={errors.fechaHora}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required error={!!errors.sexo}>
            <InputLabel id="sexo-label">Tipo Transporte</InputLabel>
            <Select
              labelId="tipo-transporte-label"
              id="tipotransporte"
              name="tipotransporte"
              value={formData.tipotransporte ?? ""}
              onChange={handleChange}
              label="Tipo Transporte"
              disabled={false}
              fullWidth
            >
              {transportes.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            {errors.tipotransporte && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.tipotransporte}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="descripcion"
            name="descripcion"
            label="Descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            error={!!errors.descripcion}
            helperText={errors.descripcion}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required error={!!errors.sexo}>
            <InputLabel id="sexo-label">Llega por cuenta propia</InputLabel>
            <Select
              labelId="tipo-transporte-label"
              id="llegaPorCuentaPropia"
              name="llegaPorCuentaPropia"
              value={formData.llegaPorCuentaPropia ?? ""}
              onChange={handleChange}
              label="Llega por cuenta propia"
              disabled={false}
              fullWidth
            >
              {respuestas.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            {errors.llegaPorCuentaPropia && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.llegaPorCuentaPropia}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
});

export default FormLogistica;
