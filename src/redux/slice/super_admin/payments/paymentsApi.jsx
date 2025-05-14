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
  export const paymentsApi = createApi({
    reducerPath: "paymentsApi",
    baseQuery,
    tagTypes: ["payments"],
  endpoints:(builder)=>({
    getPayments: builder.query({
      query: ({ page, searchWord , startDate , endDate }) => {
          const params = new URLSearchParams();
          params.append('page', page);
          if (searchWord) params.append('search', searchWord);
          if (startDate) params.append('start_date', startDate);
          if (endDate) params.append('end_date', endDate);
          let queryString = `payment?${params.toString()}`;
          return queryString;
      },
      providesTags: ["payments"],
}),
addNewPayment: builder.mutation({
  query: (data) => {
    return {
      url: "payment",
      method: "POST",
      body: data,
    };
  },
  invalidatesTags: ["payments"],
}),
// add-cash-payment
addNewCashPayment: builder.mutation({
  query: (data) => {
    return {
      url: "add-cash-payment",
      method: "POST",
      body: data,
    };
  },
  invalidatesTags: ["payments"],
}),
deletePayment: builder.mutation({
  query: (id) => {
    return {
      url: `delete-payment-history/${id}`,
      method: "DELETE",
      body: {},
    };
  },
  invalidatesTags: ["payments"],
}),
receivedPayment: builder.mutation({
  query: (id) => {
    return {
      url: `received/${id}`,
      method: "POST",
      body: {},
    };
  },
  invalidatesTags: ["payments"],
}),
     // showOnePayment
     showOnePayment: builder.query({
      query: (id) =>
        `payment/${id}`,
      providesTags: ["payments"],
    }),
       // showOneHistoryPayment
       showOneHistoryPayment: builder.query({
        query: (id) =>
          `show-user-payment-history/${id}`,
        providesTags: ["payments"],
      }),
    updatePayment: builder.mutation({
      query: (data) => {
        return {
          url: `payment/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["payments"],
    }),
    getCodings: builder.query({
      query: ({ page }) => {
          const params = new URLSearchParams();
          if (page) params.append('page', page);
          let queryString = `codes?${params.toString()}`;
          return queryString;
      },
      providesTags: ["payments"],
}),
  })      
})

export const {
useGetPaymentsQuery,
useAddNewPaymentMutation,
useAddNewCashPaymentMutation,
useUpdatePaymentMutation,
useShowOnePaymentQuery,
useShowOneHistoryPaymentQuery,
useDeletePaymentMutation,
useReceivedPaymentMutation,
useGetCodingsQuery,
} = paymentsApi;
