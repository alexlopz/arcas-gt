import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getSedes = async (token) => {
  try {
    const tokenRequest = token ? token : Cookies.get("token");

    const url = `${apiUrl}/Api/Sede/Todos`;

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

export const createSede = async (payload) => {
  try {
    const url = `${apiUrl}/Api/Sede`;

    const token = Cookies.get("token");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload), // Enviar el nombre y descripción como payload
    });

    if (!response.ok) {
      throw new Error(`Ocurrió un error al crear la sede`);
    }

    const result = await response.json(); // Si la API devuelve un resultado

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSede = async (payload) => {
  try {
    const url = `${apiUrl}/Api/Sede/${payload.id}`;

    const token = Cookies.get("token");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload), // Enviar el nombre y descripción actualizados
    });

    if (!response.ok) {
      throw new Error(`Ocurrió un error al actualizar la sede`);
    }

    const result = await response.json(); // Si la API devuelve un resultado

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteSede = async (id) => {
  try {
    const url = `${apiUrl}/Api/Sede/${id}`;

    const token = Cookies.get("token");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ocurrió un error al eliminar la sede`);
    }

    // Verificar si la respuesta tiene contenido
    if (response.status === 204 || response.status === 200) {
      return null; // No hay contenido en la respuesta
    }

    const result = await response.json(); // Si la API devuelve algún resultado
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
