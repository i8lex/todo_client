import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const registerUser = async (body) => {
  return await httpClient.post("/register", body);
};

export const loginUser = async (body) => {
  return await httpClient.post("/login", body);
};

export const getTasks = async () => {
  console.log(httpClient.defaults.headers);
  return await httpClient.get("/tasks");
};

export const createTask = async (body) => {
  return await httpClient.post("/tasks", body);
};

export const deleteTasks = async (id) => {
  return await httpClient.delete(`/tasks/${id}`);
};

export const updateTasks = async (id, body) => {
  return await httpClient.put(`/tasks/${id}`, body);
};

export const uploadImages = async (body) => {
  return await httpClient.post("/image", body);
};

export const deleteImages = async (id) => {
  return await httpClient.delete(`/image/${id}`);
};

export const getImages = async (id) => {
  return await httpClient.get(`/image/${id}`);
};
