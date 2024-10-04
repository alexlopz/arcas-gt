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
