import { baseApi } from "../../api/baseApi";

type TAddBrand = {
   name: string;
   icon: string;
};

type TUpdateBrand = {
   id: string;
   data: Partial<TAddBrand>;
};

const brandApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllBrand: builder.query({
         query: () => ({
            url: "/brand",
            method: "GET",
         }),
         providesTags: ["brand"],
      }),
      addBrand: builder.mutation({
         query: (data: TAddBrand) => ({
            url: "/brand",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["brand"],
      }),
      updateBrand: builder.mutation({
         query: (data: TUpdateBrand) => ({
            url: `/brand/${data.id}`,
            method: "PUT",
            body: data.data,
         }),
         invalidatesTags: ["brand"],
      }),
      getSingleBrand: builder.query({
         query: (brandId: string) => ({
            url: `/brand/${brandId}`,
            method: "GET",
         }),
      }),
      deleteBrand: builder.mutation({
         query: (brandId: string) => ({
            url: `/brand/${brandId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["brand"],
      }),
   }),
});

export const {
   useAddBrandMutation,
   useGetAllBrandQuery,
   useGetSingleBrandQuery,
   useUpdateBrandMutation,
   useDeleteBrandMutation,
} = brandApi;
