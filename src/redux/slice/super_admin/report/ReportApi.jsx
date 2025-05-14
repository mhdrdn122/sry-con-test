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
  export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery,
    tagTypes: ["report"],
    endpoints: (builder) => ({
        getReport: builder.query({
            query: ({ page, searchWord , startDate , endDate }) => {
                const params = new URLSearchParams();
                params.append('page', page);
                if (searchWord) params.append('city', searchWord);
                if (startDate) params.append('start_date', startDate);
                if (endDate) params.append('end_date', endDate);
                let queryString = `report?${params.toString()}`;
                return queryString;
            },
            providesTags: ["report"],
      }),
      deleteReportRoadSign: builder.mutation({
        query: (id) => {
          return {
            url: `cancel-report/${id}`,
            method: "POST",
            body: {},
          };
        },
        invalidatesTags: ["report"],
      }),
      transferReportRoadSign: builder.mutation({
        query: (id) => {
          return {
            url: `transfer-report/${id}`,
            method: "POST",
            body: {},
          };
        },
        invalidatesTags: ["report"],
      }),
    })
})

export const {
    useGetReportQuery, 
    useDeleteReportRoadSignMutation,
    useTransferReportRoadSignMutation,

}=reportApi;