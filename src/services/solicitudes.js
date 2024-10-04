import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getSolicitudes = async (token) => {
  try {
    const tokenRequest = token ? token : Cookies.get("token");

    const url = `${apiUrl}/Api/Solicitud/Todos`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${tokenRequest}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Ocurrio un error`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return null;
  }
};

export const createSolicitud = async (data) => {
  try {
    const url = `${apiUrl}/Api/Solicitud`;
    const token = Cookies.get("token");

    const payload = (({
      idEstado,
      idVoluntario,
      idPlan,
      idTipoPago,
      descargoResponsabilidades,
      pagado,
      activa,
    }) => ({
      idEstado,
      idVoluntario,
      idPlan,
      idTipoPago,
      descargoResponsabilidades,
      pagado,
      activa,
    }))(data);

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

export const updateSolicitud = async (data) => {
  console.log("data: ", data);

  try {
    const url = `${apiUrl}/Api/Solicitud/${data?.id}`;
    const token = Cookies.get("token");

    const payload = (({
      idEstado,
      idVoluntario,
      idPlan,
      idTipoPago,
      descargoResponsabilidades,
      pagado,
      activa,
    }) => ({
      idEstado,
      idVoluntario,
      idPlan,
      idTipoPago,
      descargoResponsabilidades,
      pagado,
      activa,
    }))(data);

    const response = await fetch(url, {
      method: "PATCH",
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

export const deleteSolicitud = async (id) => {
  try {
    const url = `${apiUrl}/Api/Solicitud/${id}`;

    const token = Cookies.get("token");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${token}`,
      },
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
