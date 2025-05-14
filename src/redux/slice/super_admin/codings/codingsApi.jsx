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

export const codingsApi = createApi({
    reducerPath: "codingsApi",
  baseQuery,
  tagTypes: ["codings"],
  endpoints: (builder) => ({
    getCodings: builder.query({
      query: ({ role, page, per_page }) => {
          // Construct the query string conditionally
          // if there is per_page parameter to push with the query
          const queryParams = [`page=${page}`];
          if (per_page) {
              queryParams.push(`per_page=${per_page}`);
          }
          return `coding?${queryParams.join("&")}`;
      },
      providesTags: ["codings"],
  }),
  getRoadCodings: builder.query({
    query: ({ role, page, per_page }) => {
        // Construct the query string conditionally
        // if there is per_page parameter to push with the query
        const queryParams = [`page=${page}`];
        if (per_page) {
            queryParams.push(`per_page=${per_page}`);
        }
        return `codings?${queryParams.join("&")}`;
    },
    providesTags: ["codings"],
}),
    addNewCoding: builder.mutation({
        query: (data) => {
          return {
            url: "coding",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["codings"],
      }),
      deleteCoding: builder.mutation({
        query: (id) => {
          return {
            url: `coding/${id}`,
            method: "DELETE",
            body: {},
          };
        },
        invalidatesTags: ["codings"],
      }),
       // new new 
       showOneCoding: builder.query({
        query: (id) =>
          `coding/${id}`,
        providesTags: ["codings"],
      }),
      updateCoding: builder.mutation({
        query: (data) => {
          return {
            url: `coding/${data.id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["codings"],
      })
})
})
export const {
useGetCodingsQuery,
useGetRoadCodingsQuery,
useAddNewCodingMutation,
useUpdateCodingMutation,
useShowOneCodingQuery,

useDeleteCodingMutation,
} = codingsApi;
