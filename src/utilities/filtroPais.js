import { paises } from "./sources/paises";

const obtenerNombrePaisPorId = (id) => {
  const pais = paises.find((pais) => pais.id === id);
  return pais ? pais.nombre : "N/A";
};
export default obtenerNombrePaisPorId;
