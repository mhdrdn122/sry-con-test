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
  export const durationsApi = createApi({
    reducerPath: "durationsApi",
    baseQuery,
    tagTypes: ["durations"],
    endpoints: (builder) => ({
        getDurations: builder.query({
          query: ({ role, page, per_page }) => {
            // Construct the query string conditionally
            // if there is per_page parameter to push with the query
            const queryParams = [`page=${page}`];
            if (per_page) {
                queryParams.push(`per_page=${per_page}`);
            }
            return `duration?${queryParams.join("&")}`;
        },
              providesTags: ["durations"],
        }),
        addNewDuration: builder.mutation({
            query: (data) => {
              return {
                url: "duration",
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["durations"],
          }),
          deleteDuration: builder.mutation({
            query: (id) => {
              return {
                url: `duration/${id}`,
                method: "DELETE",
                body: {},
              };
            },
            invalidatesTags: ["durations"],
          }),
           // new new 
           showOneDuration: builder.query({
            query: (id) =>
              `duration/${id}`,
            providesTags: ["durations"],
          }),
          updateDuration: builder.mutation({
            query: (data) => {
              return {
                url: `duration/${data.id}`,
                method: "PUT",
                body: data,
              };
            },
            invalidatesTags: ["durations"],
          }),
    })
})
export const {
useGetDurationsQuery,
useAddNewDurationMutation,
useUpdateDurationMutation,
useShowOneDurationQuery,
useDeleteDurationMutation,
} = durationsApi;
