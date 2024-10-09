import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const setAuthInfoCookie = (result) => {
  try {
    const decodedToken = jwtDecode(result?.token);
    const expirationTimeInSeconds = decodedToken.exp;
    const expirationDate = new Date(expirationTimeInSeconds * 1000);

    Cookies.set("token", result.token, {
      secure: false, //TODO Cambiar a true en producción con HTTPS
      sameSite: "Strict",
      path: "/",
    });

    Cookies.set("user-info", JSON.stringify(result.user), {
      secure: false, //TODO Cambiar a true en producción con HTTPS
      sameSite: "Strict",
      path: "/",
    });
  } catch (error) {
    console.error("decode error", error);
  }
};

export const getAuthInfoUser = async (username, password) => {
  try {
    const url = `${apiUrl}/Api/Auth/login`;

    const payload = { username, password };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Ocurrió un error`);
    }

    const result = await response.json();

    setAuthInfoCookie(result);

    return result;
  } catch (error) {
    return null;
  }
};
