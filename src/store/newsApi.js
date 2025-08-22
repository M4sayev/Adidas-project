import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category", "Product"],
  endpoints: (builder) => ({
    // ---------- Auth ----------
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: { email, password },
      }),
    }),

    // ---------- Category ----------
    getCategories: builder.query({
      query: () => "/category",
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: ({ name, slug, parentId }) => ({
        url: "/category",
        method: "POST",
        body: { name, slug, parentId },
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategoryWithSubs: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/category/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // ---------- Product ----------
    getProducts: builder.query({
      query: () => "/product/all",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // ---------- Upload ----------
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/upload/image",
        method: "POST",
        body: formData,
      }),
    }),

    // ---------- Basket ----------
    getBasket: builder.query({
      query: () => "/basket",
      providesTags: ["Basket"],
    }),
    addToBasket: builder.mutation({
      query: (data) => ({
        url: `/basket/${id}`,
        method: "POST",
        body: {color,size,quantity},
      }),
      invalidatesTags: ["Basket"],
    }),
    removeFromBasket: builder.mutation({
      query: (id) => ({
        url: `/basket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryWithSubsMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
  useGetBasketQuery,
  useAddToBasketMutation,
  useUpdateBasketItemMutation,
  useRemoveFromBasketMutation,
} = newsApi;
