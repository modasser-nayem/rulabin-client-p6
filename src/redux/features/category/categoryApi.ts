import { baseApi } from "../../api/baseApi";

type TAddCategory = {
   name: string;
   icon: string;
};

type TUpdateCategory = {
   id: string;
   data: Partial<TAddCategory>;
};

const categoryApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAllCategory: builder.query({
         query: () => ({
            url: "/category",
            method: "GET",
         }),
         providesTags: ["category"],
      }),
      addCategory: builder.mutation({
         query: (data: TAddCategory) => ({
            url: "/category",
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["category"],
      }),
      updateCategory: builder.mutation({
         query: (data: TUpdateCategory) => ({
            url: `/category/${data.id}`,
            method: "PUT",
            body: data.data,
         }),
         invalidatesTags: ["category"],
      }),
      getSingleCategory: builder.query({
         query: (categoryId: string) => ({
            url: `/category/${categoryId}`,
            method: "GET",
         }),
      }),
      deleteCategory: builder.mutation({
         query: (categoryId: string) => ({
            url: `/category/${categoryId}`,
            method: "DELETE",
         }),
         invalidatesTags: ["category"],
      }),
   }),
});

export const {
   useAddCategoryMutation,
   useGetAllCategoryQuery,
   useGetSingleCategoryQuery,
   useUpdateCategoryMutation,
   useDeleteCategoryMutation,
} = categoryApi;
