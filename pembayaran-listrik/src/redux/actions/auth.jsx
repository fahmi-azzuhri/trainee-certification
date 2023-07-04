import axios from "axios";
import { toast } from "react-toastify";
import { setIsLoggedIn, setToken } from "../reducers/auth";

export const login = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://64835290f2e76ae1b95c4e7f.mockapi.io/api/v1/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = "custom_token"; // Ganti dengan token kustom Anda

    // Simpan token ke dalam state Redux
    dispatch(setToken(token));

    // Set isLoggedIn menjadi true
    dispatch(setIsLoggedIn(true));

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
      return;
    }

    toast.error(error.message);
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    await axios.post(
      `https://64835290f2e76ae1b95c4e7f.mockapi.io/api/v1/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Arahkan ke halaman login setelah berhasil registrasi
    navigate("/login");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    }

    toast.error(error.message);
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setIsLoggedIn(false));

  navigate("/");
};
