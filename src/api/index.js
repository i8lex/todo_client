import axios from "axios";
import { useEffect } from "react";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001/api/",
});

export const registerUser = async (body) => {
  return await httpClient.post("/register", body);
};

export const loginUser = async (body) => {
  return await httpClient.post("/login", body);
};

export const useTasks = () => {
  //

  const getTasks = async () => {
    return await httpClient
      .get("/tasks", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createTask = async (body) => {
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

export const useImages = () => {
  const authInfo = JSON.parse(sessionStorage.getItem("authInfo"));
  const { token } = authInfo;
  // const token = useSelector((state) => state.auth.token);
  // sessionStorage.setItem("token", token);

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  const uploadImages = async (body) => {
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

  const deleteImages = async (id) => {
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

  const getImages = async (id) => {
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

  return {
    uploadImages,
    deleteImages,
    getImages,
  };
};

// export const getTasks = async () => {
//   return await httpClient
//     .get("/tasks", {
//       headers: {
//         token: token,
//       },
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
//
// export const createTask = async (body) => {
//   console.log(body);
//   return await httpClient
//     .post("/tasks", body, {
//       headers: {
//         token: token,
//       },
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
//
// export const deleteTasks = async (id) => {
//   return await httpClient
//     .delete(`/tasks/${id}`, {
//       headers: {
//         token: token,
//       },
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
//
// export const updateTasks = async (id, body) => {
//   return await httpClient
//     .put(`/tasks/${id}`, body, {
//       headers: {
//         token: token,
//       },
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
