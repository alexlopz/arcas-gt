import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTiposPago = async (token) => {
  try {
    const tokenRequest = token ? token : Cookies.get("token");

    const url = `${apiUrl}/Api/TipoPago/Todos`;

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
    console.error(error);
    return null;
  }
};

export const uploadDocument = async (payload) => {
  try {
    const url = `${apiUrl}/Api/Pago`;
    const token = Cookies.get("token");

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
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPdf = async (idSolicitud) => {
  try {
    const tokenRequest = Cookies.get("token");

    const url = `${apiUrl}/Api/Pago/${idSolicitud}`;

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
    console.error(error);
    return null;
  }
};
