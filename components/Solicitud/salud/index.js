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
  idUsuario: null,
  vegetariano: null,
  seguroMedico: null,
  alergia: false,
  tipoAlergia: "",
  alergiaMedicamento: false,
  tipoAlergiaMedicamento: "",
  padeceEnfermedad: false,
  enfermedad: "",
  tomaMedicamento: false,
  medicamento: "",
  tipoSangre: "",
};

const respuestas = [
  { label: "Si", value: true },
  { label: "No", value: false },
];

const FormSalud = forwardRef((props, ref) => {
  const { solicitud, setSolicitud, handlerSaludForm, setLoading } = props;
  const [formData, setFormData] = useState(formDataDefault);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "vegetariano":
        if (value === null) error = "Este campo es requerido.";
        break;
      case "seguroMedico":
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
      idUsuario: solicitud?.idVoluntario,
      [name]: value,
    }));

    setSolicitud((prev) => ({
      ...prev,
      voluntario: {
        ...prev.voluntario,
        salud: {
          ...prev?.voluntario?.salud,
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
      handlerSaludForm(isNext);
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
        <Grid item xs={12} md={3}>
          <FormControl fullWidth required error={!!errors.vegetariano}>
            <InputLabel id="vegetariano-label">Vegetariano</InputLabel>
            <Select
              labelId="vegetariano-label"
              id="vegetariano"
              name="vegetariano"
              value={solicitud?.voluntario?.salud?.vegetariano ?? ""}
              onChange={handleChange}
              label="Vegetariano"
              disabled={false}
              fullWidth
            >
              {respuestas.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            {errors.vegetariano && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.vegetariano}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth required error={!!errors.seguroMedico}>
            <InputLabel id="seguroMedico-label">Seguro Médico</InputLabel>
            <Select
              labelId="seguroMedico-label"
              id="seguroMedico"
              name="seguroMedico"
              value={solicitud?.voluntario?.salud?.seguroMedico ?? ""}
              onChange={handleChange}
              label="Seguro Médico"
              disabled={false}
              fullWidth
            >
              {respuestas.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            {errors.seguroMedico && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.seguroMedico}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="tipoAlergia"
            name="tipoAlergia"
            label="Tipos de alergias"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.salud?.tipoAlergia ?? ""}
            onChange={handleChange}
            helperText={"Puedes agregarlas separadas por coma."}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="tipoAlergiaMedicamento"
            name="tipoAlergiaMedicamento"
            label="Medicamentos para alergias"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.salud?.tipoAlergiaMedicamento ?? ""}
            onChange={handleChange}
            helperText={"Puedes agregarlas separadas por coma."}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="enfermedad"
            name="enfermedad"
            label="Enfermedades que padece"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.salud?.enfermedad ?? ""}
            onChange={handleChange}
            helperText={"Puedes agregarlas separadas por coma."}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="medicamento"
            name="medicamento"
            label="Medicamento que toma"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.salud?.medicamento ?? ""}
            onChange={handleChange}
            helperText={"Puedes agregarlas separadas por coma."}
            disabled={false}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="tipoSangre"
            name="tipoSangre"
            label="Tipo de Sangre"
            type="text"
            InputLabelProps={{ shrink: true }}
            value={solicitud?.voluntario?.salud?.tipoSangre ?? ""}
            onChange={handleChange}
            disabled={false}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default FormSalud;
