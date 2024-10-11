import { createContext, useContext, useReducer, useMemo } from "react";

const AppContext = createContext();

const initialState = {
  isModalOpen: false,
  modalType: "",
  loadUsers: false,
  voluntario: null,
  documentoPago: null,
  alertMessage: {
    open: false,
    isSuccess: true,
    message: "",
    type: "success",
  },
  loadPlanes: false, // Estado para los planes
};

// Acciones
const TOGGLE_MODAL = "TOGGLE_MODAL";
const UPDATE_MODAL_TYPE = "UPDATE_MODAL_TYPE";
const SET_NEW_VOLUNTARIO = "SET_NEW_VOLUNTARIO";
const SET_LOAD_USERS = "SET_LOAD_USERS";
const SET_LOAD_SOLICITUDES = "SET_LOAD_SOLICITUDES";
const SET_DOCUMENTO_PAGO = "SET_DOCUMENTO_PAGO";
const SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE";
const SET_LOAD_PLANES = "SET_LOAD_PLANES"; // Nueva acción para planes

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case UPDATE_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload,
      };
    case SET_NEW_VOLUNTARIO:
      return {
        ...state,
        voluntario: action.payload,
      };
    case SET_LOAD_USERS:
      return {
        ...state,
        loadUsers: action.payload,
      };
    case SET_LOAD_SOLICITUDES:
      return {
        ...state,
        loadSolicitudes: action.payload,
      };
    case SET_DOCUMENTO_PAGO:
      return {
        ...state,
        documentoPago: action.payload,
      };
    case SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.payload,
      };
    case SET_LOAD_PLANES:
      return {
        ...state,
        loadPlanes: action.payload, // Manejador de recarga de planes
      };
    default:
      throw new Error(`Acción no manejada: ${action.type}`);
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = (type = "") => {
    dispatch({ type: TOGGLE_MODAL, payload: true });
  };

  const closeModal = () => {
    dispatch({ type: TOGGLE_MODAL, payload: false });
  };

  const setNewVoluntario = (value) => {
    dispatch({ type: SET_NEW_VOLUNTARIO, payload: value });
  };

  const setLoadUsers = (value) => {
    dispatch({ type: SET_LOAD_USERS, payload: value });
  };

  const setLoadSolicitudes = (value) => {
    dispatch({ type: SET_LOAD_SOLICITUDES, payload: value });
  };
  const setDocumentoPago = (value) => {
    dispatch({ type: SET_DOCUMENTO_PAGO, payload: value });
  };
  const setAlertMessage = (value) => {
    const alert = {
      open: value?.open ?? false,
      isSuccess: value?.isSuccess,
      message: value?.isSuccess
        ? "Proceso realizado con exito!"
        : "Ocurrio un error!",
      type: value.type ? value.type : "success",
    };

    dispatch({ type: SET_ALERT_MESSAGE, payload: alert });
  };

  const setLoadPlanes = (value) => {
    // Manejador para cargar planes
    dispatch({ type: SET_LOAD_PLANES, payload: value });
  };

  const value = useMemo(
    () => ({
      isModalOpen: state.isModalOpen,
      modalType: state.modalType,
      loadUsers: state.loadUsers,
      loadSolicitudes: state.loadSolicitudes,
      voluntario: state.voluntario,
      documentoPago: state.documentoPago,
      alertMessage: state.alertMessage,
      loadPlanes: state.loadPlanes, // Estado para los planes
      openModal,
      closeModal,
      setLoadUsers,
      setLoadSolicitudes,
      setNewVoluntario,
      setDocumentoPago,
      setAlertMessage,
      setLoadPlanes, // Función para cargar planes
    }),
    [
      state.isModalOpen,
      state.modalType,
      state.loadUsers,
      state.loadSolicitudes,
      state.voluntario,
      state.documentoPago,
      state.alertMessage,
      state.loadPlanes, // Incluye el estado en los valores de contexto
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
