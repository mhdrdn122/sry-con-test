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
  export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery,
    tagTypes: ["profile"],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () =>
              `profile`,
            providesTags: ["profile"],
        }),

        updateProfile: builder.mutation({
            query: (data) => {
              return {
                url: `profile`,
                method: "PUT",
                body: data,
              };
            },
            invalidatesTags: ["profile"],
          }),
    })
})

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
}=    profileApi;