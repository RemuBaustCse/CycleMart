// import { baseApi } from "../../api/baseApi";


// const ordersApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     makeOrder: builder.mutation({
//       query: (orderData) => {
//         // Extract token before returning the query object
//         const storedAuth = localStorage.getItem("persist:auth");

//         if (!storedAuth) {
//           console.error("No auth data found!");
//           return;
//         }

//         const parsedAuth = JSON.parse(storedAuth);
//         const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

//         return {
//           url: "/order",
//           method: "POST",
//           body: orderData,
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         };
//       },
//     }),
//     getOrders: builder.query({
//       query: () => {
//         // Extract token before returning the query object
//         const storedAuth = localStorage.getItem("persist:auth");

//         if (!storedAuth) {
//           console.error("No auth data found!");
//           return;
//         }

//         const parsedAuth = JSON.parse(storedAuth);
//         const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

//         return {
//           url: "/order",
//           method: "GET",
//           // body: orderData,
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         };
//       },
//     }),
//     updateUserInfo: builder.mutation({
//       query: ({ userPayload}) => {
//         // Extract token before returning the query object
//         const storedAuth = localStorage.getItem("persist:auth");

//         if (!storedAuth) {
//           console.error("No auth data found!");
//           return;
//         }

//         const parsedAuth = JSON.parse(storedAuth);
//         const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

//         return {
//           url: `/user/change-user-info`,
//           method: "PUT",
//           body: userPayload,
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         };
//       },
//     }),
//     deleteOrder: builder.mutation({
//       query: (orderId) => {
//         // Extract token before returning the query object
//         const storedAuth = localStorage.getItem("persist:auth");

//         if (!storedAuth) {
//           console.error("No auth data found!");
//           return;
//         }

//         const parsedAuth = JSON.parse(storedAuth);
//         const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

//         return {
//           url: `/order/${orderId}`,
//           method: "DELETE",
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         };
//       },
//     }),
//     changeOrderStatus: builder.mutation({
//       query: ({ orderId, status }) => {
//         // Extract token before returning the query object
//         const storedAuth = localStorage.getItem("persist:auth");

//         if (!storedAuth) {
//           console.error("No auth data found!");
//           return;
//         }

//         const parsedAuth = JSON.parse(storedAuth);
//         const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

//         return {
//           url: `/order/${orderId}`,
//           method: "PUT",
//           body: status,
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//             "Content-Type": "application/json",
//           },
//         };
//       },
//     }),
//   }),
// });

// export const {
//   useMakeOrderMutation,
//   useGetOrdersQuery,
//   useDeleteOrderMutation,useChangeOrderStatusMutation,useUpdateUserInfoMutation
// } = ordersApi;


import { baseApi } from "../../api/baseApi";

const getAuthToken = () => {
  try {
    const storedAuth = localStorage.getItem("persist:auth");
    if (!storedAuth) {
      console.error("No auth data found!");
      return null;
    }
    const parsedAuth = JSON.parse(storedAuth);
    return parsedAuth.token ? JSON.parse(parsedAuth.token) : null;
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: (orderData) => {
        const token = getAuthToken();
        return {
          url: "/order",
          method: "POST",
          body: orderData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    getOrders: builder.query({
      query: () => {
        const token = getAuthToken();
        return {
          url: "/order",
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    updateUserInfo: builder.mutation({
      query: ({ userPayload }) => {
        const token = getAuthToken();
        return {
          url: `/user/change-user-info`,
          method: "PUT",
          body: userPayload,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => {
        const token = getAuthToken();
        return {
          url: `/order/${orderId}`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    changeOrderStatus: builder.mutation({
      query: ({ orderId, status }) => {
        const token = getAuthToken();
        return {
          url: `/order/${orderId}`,
          method: "PUT",
          body: status , 
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
  useMakeOrderMutation,
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useChangeOrderStatusMutation,
  useUpdateUserInfoMutation,
} = ordersApi;
