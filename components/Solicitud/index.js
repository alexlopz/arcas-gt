import { useState } from "react";
import { createUser, updateUser } from "@src/services/users";
import { paises } from "@src/utilities/sources/paises";
import { useAppContext } from "@src/context/AppContext";

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
  ocupacion: "",
  hobbie: "",
  experiencia: "",
};

const sexos = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
];

export default function RegistroSolicitud(props) {
  const { handleCancelAction, isEdicion, edicionData } = props;
  const { setLoadUsers } = useAppContext();
  const [formData, setFormData] = useState(edicionData || formDataDefault);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue =
      name === "numero" ? (value ? parseInt(value, 10) : "") : value;

    // Actualizar los datos del formulario
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Validar y actualizar los errores en tiempo real
    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todo el formulario antes de enviarlo
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
        console.log("userNew: ", user);
        setFormData(formDataDefault);
        setLoadUsers(true);
        handleCancelAction();
      }
    }
    setLoading(false);
  };
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      id="form-registration"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="primerNombre"
          name="primerNombre"
          label="Primer Nombre"
          value={formData.primerNombre}
          onChange={handleChange}
          error={!!errors.primerNombre}
          helperText={errors.primerNombre}
          disabled={isEdicion}
        />
        <TextField
          id="segundoNombre"
          name="segundoNombre"
          label="Segundo Nombre"
          value={formData.segundoNombre}
          onChange={handleChange}
          disabled={isEdicion}
        />
        <TextField
          required
          id="primerApellido"
          name="primerApellido"
          label="Primer Apellido"
          value={formData.primerApellido}
          onChange={handleChange}
          error={!!errors.primerApellido}
          helperText={errors.primerApellido}
          disabled={isEdicion}
        />
        <TextField
          id="segundoApellido"
          name="segundoApellido"
          label="Segundo Apellido"
          value={formData.segundoApellido}
          onChange={handleChange}
          disabled={isEdicion}
        />
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
          disabled={isEdicion}
        />
        <TextField
          required
          id="identificacion"
          name="identificacion"
          label="Identificación"
          value={formData.identificacion}
          onChange={handleChange}
          error={!!errors.identificacion}
          helperText={errors.identificacion}
          disabled={isEdicion}
        />
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
          disabled={isEdicion}
        />
        <FormControl
          fullWidth
          required
          error={!!errors.sexo}
          sx={{ m: 1, width: "25ch" }}
        >
          <InputLabel id="sexo-label">Sexo</InputLabel>
          <Select
            labelId="sexo-label"
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            label="Sexo"
            disabled={isEdicion}
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
        <FormControl
          fullWidth
          required
          error={!!errors.idPaisOrigen}
          sx={{ m: 1, width: "25ch" }}
        >
          <InputLabel id="pais-label">País de Origen</InputLabel>
          <Select
            labelId="pais-label"
            id="idPaisOrigen"
            name="idPaisOrigen"
            value={formData.idPaisOrigen}
            onChange={handleChange}
            label="País de Origen"
            disabled={isEdicion}
          >
            {paises.map((pais) => (
              <MenuItem key={pais.id} value={pais.id}>
                {pais.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors.idPaisOrigen && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.idPaisOrigen}
            </Typography>
          )}
        </FormControl>
        <FormControl
          fullWidth
          required
          error={!!errors.idNacionalidad}
          sx={{ m: 1, width: "25ch" }}
        >
          <InputLabel id="nacionalidad-label">Nacionalidad</InputLabel>
          <Select
            labelId="nacionalidad-label"
            id="idNacionalidad"
            name="idNacionalidad"
            value={formData.idNacionalidad}
            onChange={handleChange}
            label="Nacionalidad"
            disabled={isEdicion}
          >
            {paises.map((pais) => (
              <MenuItem key={pais.id} value={pais.id}>
                {pais.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors.idNacionalidad && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.idNacionalidad}
            </Typography>
          )}
        </FormControl>
        <TextField
          required
          id="direccion"
          name="direccion"
          label="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          error={!!errors.direccion}
          helperText={errors.direccion}
        />
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
        />
        <TextField
          id="ocupacion"
          name="ocupacion"
          label="Ocupación"
          value={formData.ocupacion}
          onChange={handleChange}
        />
        <TextField
          id="hobbie"
          name="hobbie"
          label="Hobbie"
          value={formData.hobbie}
          onChange={handleChange}
        />
        <TextField
          id="experiencia"
          name="experiencia"
          label="Experiencia"
          value={formData.experiencia}
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid item>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                disabled={loading}
                sx={{ mt: 1, mb: 2 }}
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
          </Grid>
          <Grid item>
            <Box sx={{ m: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleCancelAction}
                sx={{ mt: 1, mb: 2 }}
              >
                Cerrar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
