import { baseApi } from "../../api/baseApi";

type TAddProduct = {
   title: string;
   model: string;
   price: number;
   quantity: number;
   image: string;
   description: string;
   brand: string;
   category: string;
};

type TUpdateProduct = {
   id: string;
   data: Partial<TAddProduct>;
};

const ProductApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllProductForAdmin: builder.query({
         query: () => ({
            url: "/products/admin",
            method: "GET",
         }),
         providesTags: ["products"],
      }),
      addProduct: builder.mutation({
         query: (data: TAddProduct) => ({
            url: "/products",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["products"],
      }),
      updateProduct: builder.mutation({
         query: (data: TUpdateProduct) => ({
            url: `/products/${data.id}`,
            method: "PUT",
            body: data.data,
         }),
         invalidatesTags: ["products"],
      }),
      getSingleProduct: builder.query({
         query: (productId: string) => ({
            url: `/products/${productId}`,
            method: "GET",
         }),
      }),
      deleteProduct: builder.mutation({
         query: (productId: string) => ({
            url: `/products/${productId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["products"],
      }),
   }),
});

export const {
   useAddProductMutation,
   useGetAllProductForAdminQuery,
   useGetSingleProductQuery,
   useUpdateProductMutation,
   useDeleteProductMutation,
} = ProductApi;
