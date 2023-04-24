import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Authentications", "Error"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: "/registration",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    emailRepeat: build.mutation({
      query: (body) => ({
        url: "/email",
        method: "PUT",
        body,
      }),
    }),
    emailConfirm: build.query({
      query: (confirmId) => `/email/?confirm=${confirmId}`,
    }),
  }),
  // onError: (error, { dispatch, getState }) => {
  //   console.error("Общая ошибка API:", error);
  //   // Дополнительная логика обработки ошибок
  // },
});

// authApi.injectEndpoints({
//   endpoints: (build) => ({
//     registrationV2: build.mutation({
//       query: (body) => ({
//         url: "/registration",
//         method: "POST",
//         body,
//       }),
//       onError: (error) => {
//         console.error("Ошибка при регистрации:", error);
//         // Дополнительная логика обработки ошибок
//       },
//     }),
//     loginV2: build.mutation({
//       query: (body) => ({
//         url: "/login",
//         method: "POST",
//         body,
//       }),
//       onError: (error) => {
//         console.error("Ошибка при авторизации:", error);
//         // Дополнительная логика обработки ошибок
//       },
//     }),
//     emailRepeatV2: build.mutation({
//       query: (body) => ({
//         url: "/email",
//         method: "PUT",
//         body,
//       }),
//       onError: (error) => {
//         console.error("Ошибка при повторной отправке email:", error);
//         // Дополнительная логика обработки ошибок
//       },
//     }),
//     emailConfirmV2: build.query({
//       query: (confirmId) => `/email/?confirm=${confirmId}`,
//       onError: (error) => {
//         console.error("Ошибка при подтверждении email:", error);
//         // Дополнительная логика обработки ошибок
//       },
//     }),
//   }),
//   // overrideExisting: true,
// });

export const {
  useRegistrationMutation,
  useLoginMutation,
  useEmailRepeatMutation,
  useEmailConfirmQuery,
} = authApi;
