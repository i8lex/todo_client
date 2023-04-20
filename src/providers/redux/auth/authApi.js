import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Authentications"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: "registration",
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
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
