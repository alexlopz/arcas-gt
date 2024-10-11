import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getPlanes = async (token) => {
  try {
    const tokenRequest = token ? token : Cookies.get("token");

    const url = `${apiUrl}/Api/Plan/Todos`;

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

//listar sedes:
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
      throw new Error(`Ocurrio un error al obtener las sedes`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Crear un nuevo plan
export const createPlan = async (payload) => {
  try {
    const token = Cookies.get("token");

    const url = `${apiUrl}/Api/Plan`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Ocurrió un error al crear el plan`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Actualizar un plan existente
export const updatePlan = async (payload) => {
  try {
    const token = Cookies.get("token");

    const url = `${apiUrl}/Api/Plan/${payload.id}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Ocurrió un error al actualizar el plan`);
    }

    //const result = await response.json();

    //return result;
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Eliminar un plan
export const deletePlan = async (planId) => {
  try {
    const token = Cookies.get("token");

    const url = `${apiUrl}/Api/Plan/${planId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Ocurrió un error al eliminar el plan`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
