import axios from "axios";
import { Navigate } from "react-router-dom";

const API_BASE_URL = "https://morsio.lm.r.appspot.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = localStorage.getItem("authToken") || "";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    authToken = response.data.token;
    localStorage.setItem("authToken", authToken);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logoutUser = async (navigate) => {
  try {
    await api.post(
      "/user/logout",
      {},
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log("SUCCESS LOGOUT");
    navigate("/login");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};
export const registerUser = async (
  userName,
  email,
  password,
  confirmPassword,
  role
) => {
  try {
    const response = await api.post("/user/register", {
      userName,
      email,
      password,
      confirmPassword,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listSessions = async () => {
  try {
    const authToken = localStorage.getItem("authToken") || "";
    const response = await api.get("/translationSession/", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTranslationsBySession = async (sessionId) => {
  try {
    const authToken = localStorage.getItem("authToken") || "";
    const response = await api.get(`/translation/listBySession/${sessionId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSession = async (sessionId) => {
  try {
    const authToken = localStorage.getItem("authToken") || "";
    const response = await api.get(`/translationSession/${sessionId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTranslation = async (translationId) => {
  try {
    const authToken = localStorage.getItem("authToken") || "";
    const response = await api.get(`/translation/${translationId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTranslation = async (sessionId, morse, translation) => {
  try {
    const authToken = localStorage.getItem("authToken") || "";
    const response = await api.post(
      `/translation/`,
      {
        sessionId,
        morseCode: morse.split(" "),
        translation,
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
