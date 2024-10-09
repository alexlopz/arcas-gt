import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createSalud = async (data) => {
  try {
    const url = `${apiUrl}/Api/Salud`;
    const token = Cookies.get("token");

    const payload = {
      idUsuario: data?.idUsuario,
      vegetariano: data?.vegetariano,
      seguroMedico: data?.seguroMedico,
      alergia:
        data.tipoAlergia !== null && data.tipoAlergia !== "" ? true : false,
      tipoAlergia: data?.tipoAlergia ?? "",
      alergiaMedicamento:
        data.tipoAlergiaMedicamento !== null &&
        data.tipoAlergiaMedicamento !== ""
          ? true
          : false,
      tipoAlergiaMedicamento: data?.tipoAlergiaMedicamento ?? "",
      padeceEnfermedad:
        data.enfermedad !== null && data.enfermedad !== "" ? true : false,
      enfermedad: data?.enfermedad ?? "",
      tomaMedicamento:
        data.medicamento !== null && data.medicamento !== "" ? true : false,
      medicamento: data?.medicamento ?? "",
      tipoSangre: data.tipoSangre ?? "",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Ocurrio un error`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
