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
  export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery,
    tagTypes: ["reservations"],
    endpoints: (builder) => ({
        getReservations: builder.query({
            query: ({ page, searchWord , startDate , endDate }) => {
                const params = new URLSearchParams();
                params.append('page', page);
                if (searchWord) params.append('search', searchWord);
                if (startDate) params.append('start_date', startDate);
                if (endDate) params.append('end_date', endDate);
                let queryString = `reservation?${params.toString()}`;
                return queryString;
            },
            providesTags: ["reservations"],
    }),
    addNewReservation: builder.mutation({
        query: (data) => {
          return {
            url: "reservation",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["reservations"],
      }),
      calculateReservation: builder.mutation({
        query: (data) => {
          return {
            url: "price-calculate",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["reservations"],
      }),
      deleteReservation: builder.mutation({
        query: (id) => {
          return {
            url: `reservation/${id}`,
            method: "DELETE",
            body: {},
          };
        },
        invalidatesTags: ["reservations"],
      }),
       // new new 
       showOneReservation: builder.query({
        query: (id) =>
          `reservation/${id}`,
        providesTags: ["reservations"],
      }),
      
      updateReservation: builder.mutation({
        query: (data) => {
          return {
            url: `reservation/${data.id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["reservations"],
      }),

    })
})

export const {
useGetReservationsQuery,
useAddNewReservationMutation,
useCalculateReservationMutation,
useUpdateReservationMutation,
useShowOneReservationQuery,
useDeleteReservationMutation,
} = reservationsApi;
