import api from "../api/api";

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post("/user/signIn", credentials);
  return response.data;
};

export const register = async (credentials: { username: string; password: string; confirmPassword: string }) => {
  const response = await api.post("/user/signUp", credentials);
  return response.data;
};

export const logout = async () => {
  await api.post("/user/signOut");
};
