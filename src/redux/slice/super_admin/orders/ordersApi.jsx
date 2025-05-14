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

  export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery,
    tagTypes: ["orders"],
    endpoints: (builder) => ({
      getOrders: builder.query({
      query: ({ page, searchWord , startDate , endDate }) => {
          const params = new URLSearchParams();
          params.append('page', page);
          if (searchWord) params.append('type', searchWord);
          if (startDate) params.append('start_date', startDate);
          if (endDate) params.append('end_date', endDate);
          let queryString = `order?${params.toString()}`;
          return queryString;
      },
      providesTags: ["orders"],
    }),
    // new new 
    showOneOrder: builder.query({
      query: (id) =>
        `order/${id}`,
      providesTags: ["orders"],
    }),
    confirmOneOrder: builder.mutation({
      query: (id) => {
        return {
          url: `order/status/${id}`,
          method: "POST",
          body: {},
        };
      },
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: (data) => {
        return {
          url: `order/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["orders"],
    }),
    }),

  })
export const {
useGetOrdersQuery,
useUpdateOrderMutation,
useShowOneOrderQuery,
useConfirmOneOrderMutation,
// useAddNewReservationMutation,
// useDeleteReservationMutation,
} = ordersApi;
