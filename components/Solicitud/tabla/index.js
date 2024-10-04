import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "@src/context/AppContext";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "@components/ConfirmDialog";
import { deleteSolicitud, getSolicitudes } from "@src/services/solicitudes";

export default function SolicitudesTabla(props) {
  const { data, handleClickEdicion } = props;
  const { loadSolicitudes, setLoadSolicitudes } = useAppContext();

  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [solicitud, setSolicitud] = useState();
  const paginationModel = { page: 0, pageSize: 10 };

  const columns = [
    { field: "id", headerName: "ID", maxWidth: 10 },
    {
      field: "estadoNombre",
      headerName: "Estado",
      flex: 1.5,
      valueGetter: (params) => params.row.estado?.nombre || "",
    },
    {
      field: "nombreVoluntario",
      headerName: "Nombre Voluntario",
      flex: 2,
      valueGetter: (params) =>
        `${params.row.voluntario?.primerNombre || ""} ${
          params.row.voluntario?.primerApellido || ""
        }`,
    },
    {
      field: "nombrePlan",
      headerName: "Plan",
      flex: 1,
      valueGetter: (params) => params.row.plan?.titulo || "---",
    },
    {
      field: "nombrePago",
      headerName: "Tipo de pago",
      flex: 1,
      valueGetter: (params) => params.row.tipoPago?.nombre || "---",
    },
    { field: "descargoResponsabilidades", headerName: "Dercargo", flex: 1 },
    { field: "pagado", headerName: "Pagado", flex: 0.7 },
    {
      field: "actions",
      headerName: "Actions",
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

  const getRowsSolicitudes = async () => {
    const solicitudes = await getSolicitudes();
    if (solicitudes) {
      setRows(solicitudes.reverse());
    }
  };

  const openModalEliminar = (row) => {
    setSolicitud(row);
    setOpenModal(true);
  };

  const handleClickEliminar = async () => {
    await deleteSolicitud(solicitud.id);
    setLoadSolicitudes(true);
  };

  useEffect(() => {
    if (loadSolicitudes) {
      getRowsSolicitudes();
      setLoadSolicitudes(false);
    }
  }, [loadSolicitudes]);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  return (
    <Box>
      <Box padding={0} display="flex" justifyContent="space-between">
        <Box>
          <h2>Solicitudes</h2>
        </Box>
      </Box>
      <Box marginTop={2} marginBottom={2}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          sx={{ border: 0 }}
        />
      </Box>
      <ConfirmDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleClickEliminar}
        title="Eliminar Solicitud"
        description={`¿Deseas eliminar la solicitud ${solicitud?.id}?`}
      />
    </Box>
  );
}
