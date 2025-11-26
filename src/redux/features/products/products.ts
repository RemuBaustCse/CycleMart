import { baseApi } from "../../api/baseApi";


const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllproducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getSingleProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        const storedAuth = localStorage.getItem("persist:auth");
        let token = "";

        if (storedAuth) {
          try {
            const parsedAuth = JSON.parse(storedAuth);
            token = parsedAuth.token ? JSON.parse(parsedAuth.token) : "";
          } catch (error) {
            console.error("Error parsing auth data", error);
          }
        }

        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
    createProduct: builder.mutation({
      query: (productData) => {
        const storedAuth = localStorage.getItem("persist:auth");
        let token = "";

        if (storedAuth) {
          try {
            const parsedAuth = JSON.parse(storedAuth);
            token = parsedAuth.token ? JSON.parse(parsedAuth.token) : "";
          } catch (error) {
            console.error("Error parsing auth data", error);
          }
        }

        return {
          url: `/products`,
          method: "POST",
          body: productData,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        };
      },
    }),
    updateProduct: builder.mutation({
      query: ({ updatedProduct, id }) => {
        const storedAuth = localStorage.getItem("persist:auth");
        let token = "";

        if (storedAuth) {
          try {
            const parsedAuth = JSON.parse(storedAuth);
            token = parsedAuth.token ? JSON.parse(parsedAuth.token) : "";
          } catch (error) {
            console.error("Error parsing auth data", error);
          }
        }

        return {
          url: `/products/${id}`,
          method: "PUT",
          body: updatedProduct,
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
  useGetAllproductsQuery, 
  useGetSingleProductsQuery, 
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApi;

export default productsApi;
