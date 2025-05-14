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
  export const roadSignsApi = createApi({
    reducerPath: "roadSignsApi",
    baseQuery,
    tagTypes: ["roadSigns"],
    endpoints: (builder) => ({
        getRoadSigns: builder.query({
            query: ({ page, per_page, searchWord , startDate , endDate ,city,status}) => {
                const params = new URLSearchParams();
                if (page) params.append('page',page)
                if (searchWord) params.append('search', searchWord);
                if (startDate) params.append('start_date', startDate);
                if (endDate) params.append('end_date', endDate);
                if (per_page) params.append('per_page', per_page);
                if (city) params.append('city', city);
                if (status) params.append('status', status);
                let queryString = `road-sign?${params.toString()}`;
                return queryString;
            },
            providesTags: ["roadSigns"],
        }),
        addNewRoadSign: builder.mutation({
            query: (data) => {
              return {
                url: "road-sign",
                method: "POST",
                body: data,
              };
            },
            invalidatesTags: ["roadSigns"],
          }),
          deleteRoadSign: builder.mutation({
            query: (id) => {
              return {
                url: `road-sign/${id}`,
                method: "DELETE",
                body: {},
              };
            },
            invalidatesTags: ["roadSigns"],
          }),
           // new new 
           showOneRoadSign: builder.query({
            query: (id) =>
              `road-sign/${id}`,
            providesTags: ["roadSigns"],
          }),
          updateRoadSign: builder.mutation({
            query: (data) => {
              return {
                url: `road-sign/${data.id}`,
                method: "PUT",
                body: data,
              };
            },
            invalidatesTags: ["roadSigns"],
          }),
    })
})

export const {
useGetRoadSignsQuery,
useAddNewRoadSignMutation,
useUpdateRoadSignMutation,
useShowOneRoadSignQuery,
useDeleteRoadSignMutation,
} = roadSignsApi;
