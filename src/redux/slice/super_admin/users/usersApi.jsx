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

export const usersApi = createApi({ 
    reducerPath: "usersApi",
    baseQuery,
    tagTypes: ["users"],
    endpoints: (builder) => ({ 
        getUsers: builder.query({
            query: ({ role, page, per_page }) => {
              // Construct the query string conditionally
              // if there is per_page parameter to push with the query
              const queryParams = [`page=${page}`];
              if (per_page) {
                  queryParams.push(`per_page=${per_page}`);
              }
              return `user?${queryParams.join("&")}`;
          },
              providesTags: ["users"],
          }),
        addNewUser: builder.mutation({
            query: (data) => {
              return {
                url: "user",
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["users"],
          }),
          // new new 
          showOneUser: builder.query({
            query: (id) =>
              `user/${id}`,
            providesTags: ["users"],
          }),
          showUserContracts: builder.query({
              query: (id) =>
                `user/contracts/${id}`,
              providesTags: ["users"],
            }),
            
          deleteUser: builder.mutation({
            query: (id) => {
              return {
                url: `user/${id}`,
                method: "DELETE",
                body: {},
              };
            },
            invalidatesTags: ["users"],
          }),
          updateUser: builder.mutation({
            query: (data) => {
              return {
                url: `user/${data.id}`,
                method: "PUT",
                body: data,
              };
            },
            invalidatesTags: ["users"],
          }),
          addNewContract: builder.mutation({
            query: (data) => {
              console.log('hello from usersApi : ',data)
              return {
                url: `user/${data.id}/pdf`,
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["users"],
          }),
    })
})
export const {
useGetUsersQuery,
useAddNewUserMutation,
useShowOneUserQuery,
useShowUserContractsQuery,
useUpdateUserMutation,
useDeleteUserMutation,
useAddNewContractMutation
} = usersApi;
