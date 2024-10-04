import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createLogistica = async (payload) => {
  try {
    const url = `${apiUrl}/Api/Logistica`;
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

    // const result = await response.json();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateReservacion = async (data) => {
  try {
    const url = `${apiUrl}/Api/Reservacion/4`;
    const token = Cookies.get("token");

    const payload = {
      idSolicitud: data?.id,
      inicio: data?.inicio,
      fin: data?.fin,
      activa: true,
    };

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
