import { configureStore } from "@reduxjs/toolkit";

import superAdminAuthReducer from "../slice/super_admin/auth/authSlice"
import { superAdminsApi } from "../slice/super_admin/super_admins/superAdminsApi";
import { usersApi } from "../slice/super_admin/users/usersApi";
import { codingsApi } from "../slice/super_admin/codings/codingsApi";
import { durationsApi } from "../slice/super_admin/durations/durationsApi";
import { roadSignsApi } from "../slice/super_admin/road_signs/roadSignsApi";
import { reservationsApi } from "../slice/super_admin/reservations/reservationsApi";
import { ordersApi } from "../slice/super_admin/orders/ordersApi";
import { paymentsApi } from "../slice/super_admin/payments/paymentsApi";
import { profileApi } from "../slice/super_admin/profile/ProfileApi";
import selectedSignsReducer from "../slice/super_admin/road_signs/selectedSignsSlice"
import { boxApi } from "../slice/super_admin/box/boxApi";
import { contractsApi } from "../slice/super_admin/contracts/contractsApi";
import { reportApi } from "../slice/super_admin/report/ReportApi";
import { employeesActivitiesApi } from "../slice/super_admin/employees_activities/employees_activitiesApi";
const store = configureStore({
    reducer:{
          // suepr admin
    authSuper: superAdminAuthReducer,
    [superAdminsApi.reducerPath]:superAdminsApi.reducer,
    [usersApi.reducerPath]:usersApi.reducer,
    [codingsApi.reducerPath]:codingsApi.reducer,
    [durationsApi.reducerPath]:durationsApi.reducer,
    [roadSignsApi.reducerPath]:roadSignsApi.reducer,
    [reservationsApi.reducerPath]:reservationsApi.reducer,
    [ordersApi.reducerPath]:ordersApi.reducer,
    [paymentsApi.reducerPath]:paymentsApi.reducer,
    [profileApi.reducerPath]:profileApi.reducer,
    [boxApi.reducerPath]:boxApi.reducer,
    [contractsApi.reducerPath]:contractsApi.reducer,
    [reportApi.reducerPath]:reportApi.reducer,
    [employeesActivitiesApi.reducerPath]:employeesActivitiesApi.reducer,
    // selected Signs 
    selectedSigns: selectedSignsReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        superAdminsApi.middleware,
        usersApi.middleware,
        codingsApi.middleware,
        durationsApi.middleware,
        roadSignsApi.middleware,
        reservationsApi.middleware,
        ordersApi.middleware,
        paymentsApi.middleware,
        profileApi.middleware,
        boxApi.middleware,
        contractsApi.middleware,
        reportApi.middleware,
        employeesActivitiesApi.middleware
    )
})
export default store;
