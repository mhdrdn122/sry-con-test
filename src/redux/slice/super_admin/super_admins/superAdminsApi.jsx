import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURLLocal } from "../../../../Api/baseURLLocal";

// Function to set up headers dynamically
const prepareHeaders = (headers) => {
    const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
  
    if (superAdminInfo && superAdminInfo.token) {
      headers.set("Authorization", `Bearer ${superAdminInfo.token}`);
    }
    headers.set("Accept", "application/json");
    // headers.set("Content-Type", "multipart/form-data");
    return headers;
  };

  
const baseQuery = fetchBaseQuery({
    baseUrl: baseURLLocal,
    prepareHeaders,
  });
  
export const superAdminsApi = createApi({
  reducerPath: "superAdminsApi",
  baseQuery,
  tagTypes: ["admins"],
  endpoints: (builder) => ({
    getAdmins: builder.query({
        query: ({role, page}) =>
          `admin?page=${page} `,
        providesTags: ["admins"],
    }),
    addNewAdmin: builder.mutation({
        query: (data) => {
          return {
            url: "admin",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["admins"],
      }),
      // new new 
      showOneAdmin: builder.query({
        query: (id) =>
          `admin/${id}`,
        providesTags: ["admins"],
      }),
      deleteAdmin: builder.mutation({
        query: (id) => {
          return {
            url: `admin/${id}`,
            method: "DELETE",
            body: {},
          };
        },
        invalidatesTags: ["admins"],
      }),
      updateAdmin: builder.mutation({
        query: (data) => {
          return {
            url: `admin/${data.id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["admins"],
      })
})
})
export const {
useGetAdminsQuery,
useAddNewAdminMutation,
useShowOneAdminQuery,
useUpdateAdminMutation,
useDeleteAdminMutation,
} = superAdminsApi;
