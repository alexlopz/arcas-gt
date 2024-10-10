import { useEffect, useState } from "react";
import { useAppContext } from "@src/context/AppContext";
import { getSedes, createPlan, updatePlan } from "@src/services/planes";

import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const formDataDefault = {
  titulo: "",
  descripcion: "",
  precio: 0,
  notas: "",
  idSede: "",
};

export default function RegistroPlanes(props) {
  const { handleCancelAction, isEdicion, edicionData, onSaveSuccess } = props;
  const { setLoadPlanes, setAlertMessage } = useAppContext(); // Incluimos setAlertMessage
  const [formData, setFormData] = useState(edicionData || formDataDefault);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSedes, setLoadingSedes] = useState(true); // Estado para indicar si las sedes están cargando
  const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes

  // Función para cargar las sedes desde el servicio
  const loadSedes = async () => {
    setLoadingSedes(true); // Indica que las sedes están en proceso de carga
    const response = await getSedes(); // Llamada al servicio para cargar sedes
    if (response) {
      setSedes(response); // Actualiza el estado de sedes
    }
    setLoadingSedes(false); // Indica que las sedes ya han terminado de cargarse
  };

  useEffect(() => {
    loadSedes(); // Cargar sedes cuando se monte el componente
  }, []);

  useEffect(() => {
    // Verificar si ya tenemos las sedes y los datos de edición
    if (!loadingSedes && edicionData) {
      // Inicializar el formulario con los datos de edición una vez que las sedes estén listas
      setFormData({
        ...edicionData,
        idSede: edicionData.idSede || "", // Inicializa idSede con un valor válido
      });
    }
  }, [loadingSedes, edicionData]); // Ejecutar este efecto cuando cambie el estado de carga o los datos de edición

  //validaciones
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "titulo":
        if (!value) error = "El título es requerido.";
        break;
      case "descripcion":
        if (!value) error = "La descripción es requerida.";
        break;
      case "precio":
        if (!value || value <= 0) error = "El precio debe ser mayor que 0.";
        break;
      case "idSede":
        if (!value || value === "") error = "La sede es requerida.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("init submit");

    // Validar el formulario antes de enviarlo
    const newErrors = {};
    for (let key in formData) {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true); // Muestra el indicador de carga

      let plan;
      let isSuccess;

      try {
        if (isEdicion) {
          console.log("Actualizando plan...");
          plan = await updatePlan(formData); // Actualizar plan
          isSuccess = true;
        } else {
          console.log("Creando plan...");
          plan = await createPlan(formData); // Crear nuevo plan
          isSuccess = true;
        }

        if (isSuccess) {
          console.log("Plan guardado: ", plan);
          setFormData(formDataDefault); // Reiniciar el formulario
          setLoadPlanes(true); // Actualizar la tabla de planes
          setAlertMessage({ open: true, isSuccess: true }); // Alerta de éxito
          handleCancelAction(); // Cerrar el modal
        }
      } catch (error) {
        console.error("Error guardando plan: ", error);
        setAlertMessage({ open: true, isSuccess: false }); // Alerta de error
      }

      setLoading(false); // Quitar el indicador de carga
    } else {
      setAlertMessage({
        open: true,
        isSuccess: false,
        message: "Hay errores en el formulario, revisa los campos.",
      });
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
      {loadingSedes ? (
        <Typography variant="body1">Cargando sedes...</Typography> // Indicador de carga
      ) : (
        <div>
          <TextField
            required
            id="titulo"
            name="titulo"
            label="Título"
            value={formData.titulo}
            onChange={handleChange}
            error={!!errors.titulo}
            helperText={errors.titulo}
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
          <TextField
            required
            id="precio"
            name="precio"
            label="Precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
            error={!!errors.precio}
            helperText={errors.precio}
          />
          <TextField
            id="notas"
            name="notas"
            label="Notas"
            value={formData.notas}
            onChange={handleChange}
          />

          <FormControl fullWidth sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="sede-label">Sede</InputLabel>
            <Select
              labelId="sede-label"
              id="idSede"
              name="idSede"
              value={formData.idSede}
              onChange={handleChange}
            >
              {/* Agrega una opción por defecto con valor vacío */}
              <MenuItem value="">
                <em>Seleccione una sede</em>
              </MenuItem>

              {/* Mostrar sedes obtenidas desde la API */}
              {sedes.map((sede) => (
                <MenuItem key={sede.id} value={sede.id}>
                  {sede.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.idSede && (
              <Typography color="error" variant="body2">
                {errors.idSede}
              </Typography>
            )}
          </FormControl>

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
      )}
    </Box>
  );
}
