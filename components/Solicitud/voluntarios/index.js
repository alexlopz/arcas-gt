import { getUsers } from "@src/services/users";
import { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import filtroVoluntario from "@src/utilities/filtroVoluntario";
import UsuarioModal from "@components/forms/registro/modal";
import { useAppContext } from "@src/context/AppContext";

export default function AgregarVoluntario(props) {
  const { setSolicitud, solicitud } = props;
  const [voluntarios, setVoluntarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { voluntario, setNewVoluntario } = useAppContext();

  const getVoluntarios = async () => {
    const voluntarios = await getUsers();
    if (voluntarios) {
      const dataFilter = filtroVoluntario(voluntarios);
      setVoluntarios(dataFilter);
    }
  };

  useEffect(() => {
    getVoluntarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolicitud((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (voluntario) {
      setVoluntarios((prev) => [voluntario, ...prev]);
      setSolicitud((prev) => ({ ...prev, idVoluntario: voluntario?.id }));
      setNewVoluntario(null);
    }
  }, [voluntario]);

  return (
    <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item display="flex" justifyContent="center" alignItems="center">
          <FormControl fullWidth error={null} sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="pais-label">Elegir voluntario</InputLabel>
            <Select
              labelId="voluntario-label"
              id="idVoluntario"
              name="idVoluntario"
              value={solicitud?.idVoluntario ?? ""}
              onChange={handleChange}
              label="Elegir voluntario"
              disabled={false}
            >
              {voluntarios.map((voluntario) => (
                <MenuItem key={voluntario.id} value={voluntario.id}>
                  {voluntario.primerNombre} {voluntario.primerApellido}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item display="flex" justifyContent="center" alignItems="center">
          o
        </Grid>
        <Grid item display="flex" justifyContent="center" alignItems="center">
          <Button
            type="button"
            fullWidth
            variant="outlined"
            disabled={false}
            sx={{ height: "56px", marginLeft: 1 }}
            size="large"
            onClick={handleOpen}
          >
            Agregar nuevo voluntario
          </Button>
        </Grid>
      </Grid>
      <UsuarioModal
        open={modalOpen}
        handleClose={handleClose}
        isEdicion={null}
        edicionData={null}
      />
    </Box>
  );
}
