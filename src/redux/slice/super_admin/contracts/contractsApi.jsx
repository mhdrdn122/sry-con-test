import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURLLocal } from "../../../../Api/baseURLLocal";
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
  export const contractsApi = createApi({
    reducerPath: "contractsApi",
  baseQuery,
  tagTypes: ["contracts"],
  endpoints: (builder) => ({
    getContracts: builder.query({
        query: ({ role, page, per_page }) => {
            const queryParams = [`page=${page}`];
            if (per_page) {
                queryParams.push(`per_page=${per_page}`);
            }
            return `contracts?${queryParams.join("&")}`;
        },
        providesTags: ["contracts"],
    }),
      showOneContract: builder.query({
      query: (id) =>
        `contract-renewal/${id}`,
      providesTags: ["contracts"],
    }),
    addNewReservationContract: builder.mutation({
      query: (data) => {
        return {
          url: "contract-renewal",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["contracts"],
    }),
    updateDiscount: builder.mutation({
      query: (data) => {
        return {
          url: `discount-contract/${data.id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["contracts"],
    }),
    deleteContract:builder.mutation({
      query:(id)=>({
        url:`contracts/${id}`,
        method:"DELETE",
        body:{id}
      }),
    invalidatesTags : ["contracts"]
    }),


  }) 
})
export const {
    useGetContractsQuery,
    useShowOneContractQuery,
    useAddNewReservationContractMutation,
    useUpdateDiscountMutation,
    useDeleteContractMutation
} = contractsApi;
    