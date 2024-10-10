import { useState, useEffect } from "react";
import { createSede, updateSede } from "@src/services/sedes"; // Asegúrate de que esta ruta sea correcta
import { useAppContext } from "@src/context/AppContext"; // Asegúrate de que esta ruta también sea correcta

import {
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const formDataDefault = {
  nombre: "",
  descripcion: "",
};

export default function     ({ handleCancelAction, isEdicion, edicionData }) {
  const { setLoadSedes } = useAppContext();
  const [formData, setFormData] = useState(formDataDefault);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Cuando edicionData cambia, actualizamos el formData
  useEffect(() => {
    if (edicionData) {
      setFormData(edicionData);
    }
  }, [edicionData]);

  // Validar los campos necesarios
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "nombre":
        if (!value) error = "El nombre es requerido.";
        break;
      case "descripcion":
        if (!value) error = "La descripción es requerida.";
        break;
      default:
        break;
    }

    return error;
  };

  // Manejar los cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizar los datos del formulario
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar y actualizar los errores en tiempo real
    const error = validateField(name, value);
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

      let sede;
      try {
        if (isEdicion) {
          sede = await updateSede(formData); // Actualizar la sede si estamos en modo edición
        } else {
          sede = await createSede(formData); // Crear una nueva sede si no estamos en modo edición
        }

        if (sede) {
          setFormData(formDataDefault); // Reiniciar el formulario
          setLoadSedes(true); // Recargar la lista de sedes
          handleCancelAction(); // Cerrar el modal
        }
      } catch (error) {
        console.error("Error al guardar la sede:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="nombre"
        name="nombre"
        label="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        error={!!errors.nombre}
        helperText={errors.nombre}
      />
      <TextField
        required
        id="descripcion"
        name="descripcion"
        label="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        error={!!errors.descripcion}
        helperText={errors.descripcion}
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
              {isEdicion ? "Guardar Cambios" : "Crear Sede"}
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
    </Box>
  );
}
