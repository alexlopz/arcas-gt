import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "@src/context/AppContext";
import { getPlanes, deletePlan } from "@src/services/planes"; // Importar los servicios de planes
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "../ConfirmDialog";

export default function PlanesTabla(props) {
  const { data, handleClickEdicion } = props;
  const { loadPlanes, setLoadPlanes, setAlertMessage } = useAppContext(); // Incluir setAlertMessage
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [plan, setPlan] = useState();

  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: "id", headerName: "ID", maxWidth: 10 },
    { field: "titulo", headerName: "Título", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 1 },
    { field: "precio", headerName: "Precio ($)", flex: 0.7 },
    {
      field: "sede",
      headerName: "Sede",
      flex: 1,
      valueGetter: (params) => params.row.sede.nombre,
    },
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

  // Función para cargar los planes desde el servicio
  const getPlanesAll = async () => {
    const planes = await getPlanes();
    console.log("Planes: ", planes);
    if (planes) {
      setRows(planes?.reverse());
    }
  };

  // Abrir el modal de confirmación para eliminar un plan
  const openModalEliminar = (row) => {
    setPlan(row);
    setOpenModal(true);
  };

  /// Maneja la eliminación de un plan
  const handleClickEliminar = async () => {
    try {
      await deletePlan(plan.id); // Llamada para eliminar el plan
      setLoadPlanes(true); // Indica que se deben recargar los planes después de eliminar
      setAlertMessage({ open: true, isSuccess: true }); // Alerta de éxito
    } catch (error) {
      console.error("Error al eliminar el plan: ", error);
      setAlertMessage({ open: true, isSuccess: false }); // Alerta de error
    } finally {
      setOpenModal(false); // Cerrar el modal
    }
  };

  // Cargar los planes cuando el estado cambia
  useEffect(() => {
    if (loadPlanes) {
      setLoadPlanes(false);
      getPlanesAll();
    }
  }, [loadPlanes]);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  return (
    <Box>
      <Box padding={0} display="flex" justifyContent="space-between">
        <Box>
          <h2>Planes</h2>
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
        title="Eliminar plan"
        description={`¿Deseas eliminar el plan ${plan?.titulo}?`}
      />
    </Box>
  );
}
