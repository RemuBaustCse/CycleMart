
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeUserStatus: builder.mutation({
      query: (requestData) => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          throw new Error("No auth data found!");
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/admin/change-user-status",
          method: "PUT",
          body: requestData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllUser: builder.query({
      query: () => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          throw new Error("No auth data found!");
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/admin/get-all-user",
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getAllOrders: builder.query({
      query: () => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          throw new Error("No auth data found!");
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/order/get-all-orders",
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    updateOrderStatus: builder.mutation({
      query: (orderData) => {
        const storedAuth = localStorage.getItem("persist:auth");

        if (!storedAuth) {
          throw new Error("No auth data found!");
        }

        const parsedAuth = JSON.parse(storedAuth);
        const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

        return {
          url: "/order/update-status",
          method: "PUT",
          body: orderData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useChangeUserStatusMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = adminApi;

