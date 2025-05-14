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
export const employeesActivitiesApi = createApi({
    reducerPath: "employeesActivitiesApi",
    baseQuery,
    tagTypes: ["employeesActivities"],
    endpoints: (builder) => ({
        getEmployeesActivities: builder.query({
            query: ({ role, page, per_page }) => {
              const queryParams = [`page=${page}`];
              if (per_page) {
                  queryParams.push(`per_page=${per_page}`);
              }
              return `activities?${queryParams.join("&")}`;
          },
                providesTags: ["employeesActivities"],
          }),
    }) 
})
export const {
useGetEmployeesActivitiesQuery,
}  =  employeesActivitiesApi;