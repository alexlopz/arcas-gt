export const DateTimeFormatter = (dateStr) => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${formattedDate} hora: ${hours}:${minutes}:${seconds}`;
};
