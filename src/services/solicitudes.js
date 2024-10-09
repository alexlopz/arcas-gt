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
    return [];
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
    createHistorial(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSolicitud = async (data) => {
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
    createHistorial(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createHistorial = async (solicitud) => {
  try {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user-info");
    const user = JSON.parse(decodeURIComponent(userCookie));

    const payload = {
      IdSolicitud: solicitud?.id,
      IdEstado: solicitud?.idEstado,
      IdUsuario: user?.id,
    };

    const url = `${apiUrl}/Api/HistorialSolicitud`;

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

export const deleteSolicitud = async (id) => {
  try {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user-info");
    const user = JSON.parse(decodeURIComponent(userCookie));

    const url = `${apiUrl}/Api/Solicitud/${id}/${user?.id}`;

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
