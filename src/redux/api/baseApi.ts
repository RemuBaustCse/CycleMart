import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bi-cycle-store-server-brown.vercel.app/api",
    // baseUrl: "http://localhost:5000",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
