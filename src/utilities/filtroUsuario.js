const filtroUsuario = (data) => {
  return (
    data
      .filter(
        (item) =>
          item.idTipo === 1 ||
          item?.tipo?.nombre?.toLowerCase() === "administrador"
      )
      .reverse() || []
  );
};

export default filtroUsuario;
