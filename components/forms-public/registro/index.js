import { useEffect, useState } from "react";
import { createUser, updateUser } from "@src/services/users";
import { paises } from "@src/utilities/sources/paises";
import { useAppContext } from "@src/context/AppContext";
import ReCAPTCHA from "react-google-recaptcha";

import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const formDataDefault = {
  idTipo: 2,
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  email: "",
  identificacion: "",
  fechaNacimiento: "",
  sexo: "",
  idPaisOrigen: "",
  idNacionalidad: "",
  direccion: "",
  numero: "",
  ocupacion: "", // Agregado
  hobbie: "", // Agregado
  experiencia: "", // Agregado
  password: null,
};

const sexos = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
];

export default function RegistroUsuariosPublic(props) {
  const { handleCancelAction, isEdicion, edicionData, admins } = props;
  const { setLoadUsers, setNewVoluntario } = useAppContext();
  const [formData, setFormData] = useState(edicionData || formDataDefault);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "primerNombre":
        if (!value) error = "El primer nombre es requerido.";
        break;
      case "primerApellido":
        if (!value) error = "El primer apellido es requerido.";
        break;
      case "email":
        if (!value) error = "El correo electrónico es requerido.";
        else if (!/\S+@\S+\.\S+/.test(value))
          error = "Correo electrónico inválido.";
        break;
      case "identificacion":
        if (!value) error = "La identificación es requerida.";
        break;
      case "fechaNacimiento":
        if (!value) error = "La fecha de nacimiento es requerida.";
        break;
      case "sexo":
        if (!value) error = "El sexo es requerido.";
        break;
      case "idPaisOrigen":
        if (!value) error = "El país de origen es requerido.";
        break;
      case "idNacionalidad":
        if (!value) error = "La nacionalidad es requerida.";
        break;
      case "direccion":
        if (!value) error = "La dirección es requerida.";
        break;
      case "numero":
        if (!value) error = "El número de teléfono es requerido.";
        else if (isNaN(value)) error = "El número debe ser válido.";
        break;
      case "password":
        if (admins && !value) error = "El password es requerido.";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "numero" ? (value ? parseInt(value, 10) : "") : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Por favor, completa el CAPTCHA antes de continuar.");
      return;
    }

    const newErrors = {};
    for (let key in formData) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      let user;

      if (isEdicion) {
        user = await updateUser(formData);
      } else {
        user = await createUser(formData);
      }

      if (user) {
        setFormData(formDataDefault);
        setNewVoluntario(user);
        setLoadUsers(true);
        handleCancelAction();
      }
    }
    setLoading(false);
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setCaptchaVerified(true); // Marcar como verificado si se obtiene el token
  };

  return (
    <Box
      component="form"
      sx={{
        overflowY: "auto",
        maxHeight: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: "30px", // Para separar del logo
      }}
      id="form-registration"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Registro solicitud
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="primerNombre"
            name="primerNombre"
            label="Primer Nombre"
            value={formData.primerNombre}
            onChange={handleChange}
            error={!!errors.primerNombre}
            helperText={errors.primerNombre}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="segundoNombre"
            name="segundoNombre"
            label="Segundo Nombre"
            value={formData.segundoNombre}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="primerApellido"
            name="primerApellido"
            label="Primer Apellido"
            value={formData.primerApellido}
            onChange={handleChange}
            error={!!errors.primerApellido}
            helperText={errors.primerApellido}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="segundoApellido"
            name="segundoApellido"
            label="Segundo Apellido"
            value={formData.segundoApellido}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Correo Electrónico"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="identificacion"
            name="identificacion"
            label="Identificación"
            value={formData.identificacion}
            onChange={handleChange}
            error={!!errors.identificacion}
            helperText={errors.identificacion}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fechaNacimiento"
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.fechaNacimiento?.toString()?.split("T")[0]}
            onChange={handleChange}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            required
            error={!!errors.sexo}
            sx={{ m: 1, width: "100%" }}
          >
            <InputLabel id="sexo-label">Sexo</InputLabel>
            <Select
              labelId="sexo-label"
              id="sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              label="Sexo"
            >
              {sexos.map((sexo) => (
                <MenuItem key={sexo.value} value={sexo.value}>
                  {sexo.label}
                </MenuItem>
              ))}
            </Select>
            {errors.sexo && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.sexo}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="direccion"
            name="direccion"
            label="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            error={!!errors.direccion}
            helperText={errors.direccion}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="numero"
            name="numero"
            label="Número de Teléfono"
            type="number"
            value={formData.numero}
            onChange={handleChange}
            error={!!errors.numero}
            helperText={errors.numero}
            fullWidth
          />
        </Grid>

        {/* Nuevos campos */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="ocupacion"
            name="ocupacion"
            label="Ocupación"
            value={formData.ocupacion}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="hobbie"
            name="hobbie"
            label="Hobbie"
            value={formData.hobbie}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="experiencia"
            name="experiencia"
            label="Experiencia"
            value={formData.experiencia}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, width: "100%" }}>
        <ReCAPTCHA
          sitekey="6Le46FwqAAAAAJwYFoFAZC4lYBAMwiWGoiypqqli" // Usa tu propia clave del sitio
          onChange={handleCaptchaChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || !captchaVerified}
          sx={{ mt: 2 }}
        >
          Guardar
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
    </Box>
  );
}
