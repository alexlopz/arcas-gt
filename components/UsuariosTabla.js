import { useState, useEffect } from "react";
import { Button, Box, IconButton } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useAppContext } from "@src/context/AppContext";
import { deleteUser, getUsers } from "@src/services/users";
import { maxWidth } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "./ConfirmDialog";
import filtroVoluntario from "@src/utilities/filtroVoluntario";
import filtroUsuario from "@src/utilities/filtroUsuario";

export default function UsuariosTabla(props) {
  const { data, handleClickEdicion, admins } = props;
  const { loadUsers, setLoadUsers } = useAppContext();

  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState();
  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: "id", headerName: "ID", maxWidth: 10 },
    { field: "primerNombre", headerName: "Nombre", flex: 1 },
    { field: "primerApellido", headerName: "Apellido", flex: 1 },
    { field: "identificacion", headerName: "Identificacion", flex: 1 },
    { field: "email", headerName: "Correo", flex: 1 },
    { field: "numero", headerName: "# Telefono", flex: 0.7 },
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

  const getVoluntarios = async () => {
    const usuarios = await getUsers();
    if (usuarios) {
      if (admins) {
        const dataFilter = filtroUsuario(usuarios);
        setRows(dataFilter);
      } else {
        const dataFilter = filtroVoluntario(usuarios);
        setRows(dataFilter);
      }
    }
  };

  const openModalEliminar = (row) => {
    setUser(row);
    setOpenModal(true);
  };

  const handleClickEliminar = async () => {
    await deleteUser(user.id);
    setLoadUsers(true);
  };

  useEffect(() => {
    if (loadUsers) {
      getVoluntarios();
      setLoadUsers(false);
    }
  }, [loadUsers]);

  useEffect(() => {
    if (data) {
      if (admins) {
        const dataFilter = filtroUsuario(data);
        setRows(dataFilter);
      } else {
        const dataFilter = filtroVoluntario(data);
        setRows(dataFilter);
      }
    }
  }, [data]);

  return (
    <Box>
      <Box padding={0} display="flex" justifyContent="space-between">
        <Box>
          <h2>{admins ? "Usuarios" : "Voluntarios"}</h2>
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
        title="Eliminar usuario"
        description={`¿Deseas eliminar al usuario ${user?.primerNombre} ${user?.primerApellido}?`}
      />
    </Box>
  );
}
