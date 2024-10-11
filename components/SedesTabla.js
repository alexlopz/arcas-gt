import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "@src/context/AppContext";
import { deleteSede, getSedes } from "@src/services/sedes";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";

export default function SedesTabla(props) {
  const { data, handleClickEdicion } = props;
  const { loadUsers, setLoadUsers } = useAppContext(); 

  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sede, setSede] = useState(); 
  const paginationModel = { page: 0, pageSize: 5 };

  // Definir las columnas para la tabla de sedes
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
    const sedes = await getSedes();
    if (sedes) {
      setRows(sedes?.reverse());
    }
  };

  const openModalEliminar = (row) => {
    setSede(row);
    setOpenModal(true);
  };

  const handleClickEliminar = async () => {
    try {
      await deleteSede(sede.id); // Eliminar la sede
      setLoadUsers(true); // Actualizar el estado para recargar las sedes
    } catch (error) {
      console.error("Error al eliminar la sede: ", error);
    } finally {
      setOpenModal(false); // Cerrar el modal
    }
  };

  // Efecto para cargar las sedes cuando el estado "loadUsers" cambie
  useEffect(() => {
    if (loadUsers) {
      getSedesList(); // Cargar las sedes
      setLoadUsers(false); // Resetear el estado de carga
      //  setOpenModal(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    if (data) {
      setRows(data); // Actualizar las filas si "data" cambia
      //setOpenModal(false);
    }
  }, [data]);

  return (
    <Box>
      <Box padding={0} display="flex" justifyContent="space-between">
        <Box>
          <h2>Sedes</h2>
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
