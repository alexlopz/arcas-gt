import { useState, useEffect } from "react";
import { Button, Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "@src/context/AppContext";
import { deleteSede, getSedes } from "@src/services/sedes"; // Cambiar a funciones para sedes

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog"; // Reutilizamos el mismo ConfirmDialog

export default function SedesTabla(props) {
  const { data, handleClickEdicion } = props;
  const { loadUsers, setLoadUsers } = useAppContext(); // Cambiar el contexto a "sedes"

  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sede, setSede] = useState(); // Cambiar de "user" a "sede"
  const paginationModel = { page: 0, pageSize: 5 };

  // Definimos las columnas basadas en Nombre y Descripción
  const columns = [
    { field: "id", headerName: "ID", maxWidth: 10 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <IconButton
            aria-label="editar"
            onClick={() => handleClickEdicion(params?.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            onClick={() => openModalEliminar(params?.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      flex: 1,
    },
  ];

  // Obtener las sedes usando el servicio "getSedes"
  const getSedesList = async () => {
    const sedes = await getSedes(); // Llamada al servicio de sedes
    if (sedes) {
      setRows(sedes?.reverse());
    }
  };

  const openModalEliminar = (row) => {
    setSede(row);
    setOpenModal(true);
  };

  const handleClickEliminar = async () => {
    await deleteSede(sede.id); // Usamos "deleteSede" para eliminar la sede
    //setLoadSedes(true); // Actualizamos el estado para volver a cargar las sedes
  };

  useEffect(() => {
    if (loadUsers) {
      getSedesList(); // Cargamos las sedes si el estado "loadSedes" está en true
      setLoadUsers(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    if (data) {
      setRows(data); // Actualizamos las filas si "data" cambia
    }
  }, [data]);

  return (
    <Box>
      <Box padding={0} display="flex" justifyContent="space-between">
        <Box>
          <h2>Sedes</h2> {/* Cambiar el título a "Sedes" */}
        </Box>
      </Box>
      <Box marginTop={2} marginBottom={2}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Box>
      <ConfirmDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleClickEliminar}
        title="Eliminar Sede"
        description={`¿Deseas eliminar la sede ${sede?.nombre}?`}
      />
    </Box>
  );
}
