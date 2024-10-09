import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createEmail = async (idUsuario) => {
  try {
    const token = Cookies.get("token");

    const url = `${apiUrl}/Api/Email/${idUsuario}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [`Authorization`]: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Ocurrio un error`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};
