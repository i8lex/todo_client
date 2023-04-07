import axios from "axios";

const authInfo = JSON.parse(localStorage.getItem("authInfo"));
const { token } = authInfo;
console.log(token);
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
  return await httpClient
    .get("/tasks", {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createTask = async (body) => {
  console.log(body);
  return await httpClient
    .post("/tasks", body, {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteTasks = async (id) => {
  return await httpClient
    .delete(`/tasks/${id}`, {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTasks = async (id, body) => {
  return await httpClient
    .put(`/tasks/${id}`, body, {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const uploadImages = async (body) => {
  return await httpClient
    .post("/image", body, {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteImages = async (id) => {
  return await httpClient
    .delete(`/image/${id}`, {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getImages = async (id) => {
  return await httpClient
    .get(`/image/${id}`, {
      headers: {
        token: token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
};
