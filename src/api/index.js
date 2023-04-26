import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const registerUser = async (body) => {
  return await httpClient.post("/register", body);
};

// export const loginUser = async (body) => {
//   return await httpClient.post("/login", body);
// };

export const useTasks = () => {
  const token = useSelector((state) => state.auth.token);
  // sessionStorage.setItem("token", token);
  //
  // useEffect(() => {
  //   sessionStorage.setItem("token", token);
  // }, [token]);

  const getTasks = async () => {
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

  const createTask = async (body) => {
    console.log(body);
    return await httpClient
      .post("/tasks", body, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTasks = async (id) => {
    return await httpClient
      .delete(`/tasks/${id}`, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTasks = async (id, body) => {
    return await httpClient
      .put(`/tasks/${id}`, body, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    getTasks,
    createTask,
    deleteTasks,
    updateTasks,
  };
};
