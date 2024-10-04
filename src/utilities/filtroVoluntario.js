const filtroVoluntario = (data) => {
  return (
    data
      .filter(
        (item) =>
          item.idTipo === 2 ||
          item?.tipo?.nombre?.toLowerCase() === "voluntario"
      )
      .reverse() || []
  );
};

export default filtroVoluntario;
