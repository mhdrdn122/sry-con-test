import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertDataSuperAdmin } from "../../../../hooks/Admin/useInsertData";
import baseURL from "../../../../Api/baseURL";

const initialState = {
  loading: false,
  error: null,
  status: 'idle',
  superAdminAuth: {
    error: null,
    superAdminInfo: localStorage.getItem("superAdminInfo")
      ? JSON.parse(localStorage.getItem("superAdminInfo"))
      : null,
  },
  superAdminDetails: {
    error: null,
    loading: false,
    details: {},
  },
  updatedProfile: {
    error: null,
    loading: false,
    data: {},
  },
};

//login
export const loginSuperAdminAction = createAsyncThunk(
  "auth/loginSuperAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await useInsertDataSuperAdmin(
        `/api/login`,
        data
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// update Profile
export const updateProfileAction = createAsyncThunk(
  "auth/updateAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await useInsertDataWithImage(
        `/admin_api/update_admin`,
        payload
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error.response.data);
      // handle401ErrorAdmin(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// update SuperAdminInfo
export const updateSuperAdminInfo = createAsyncThunk(
  "auth/updateSuperAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload)
      const superAdminInfo = JSON.parse(localStorage.getItem("superAdminInfo"));
      // console.log(superAdminInfo)

      const config = {
        headers: {
          Authorization: `Bearer ${superAdminInfo && superAdminInfo.token}`,
          platform: window.navigator.userAgentData.platform
        },
      };

      const response = await baseURL.post(`/api/update-super-user`, payload, config);

      console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data);
      // handle401ErrorAdmin(error.response);
      // return rejectWithValue(error.response.data);
    }
  }
);

export const resetupdatedProfile = createAction("auth/resetupdatedProfile");

export const resetupdatedRestaurant = createAction(
  "auth/resetupdatedRestaurant"
);
export const resetUpdateProfileState = createAction(
  "auth/resetUpdateProfileState"
);
export const resetLogin = createAction("auth/resetLogin");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.superAdminAuth.error = null
      state.superAdminAuth.superAdminInfo = null
    }
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(loginSuperAdminAction.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(loginSuperAdminAction.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.superAdminAuth.superAdminInfo = action.payload.data;
      })
      .addCase(loginSuperAdminAction.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.superAdminAuth.error = action.payload;
      });
    // update profile
    builder
      .addCase(updateProfileAction.pending, (state) => {
        state.updatedProfile.loading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.updatedProfile.loading = false;
        state.updatedProfile.updatedDetails = action.payload;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.updatedProfile.loading = false;
        state.updatedProfile.error = action.payload;
      });

    // update SuperAdminInfo
    builder.addCase(updateSuperAdminInfo.pending, (state) => {
      state.superAdminDetails.loading = true

    })
      .addCase(updateSuperAdminInfo.fulfilled, (state, action) => {
        state.superAdminDetails.loading = false
        state.superAdminDetails.details = action.payload
      }).addCase(
        updateSuperAdminInfo.rejected, (state, action) => {
          state.superAdminDetails.error = action.error
        }
      )
    //reset update profile
    builder.addCase(resetUpdateProfileState, (state) => {
      state.updatedProfile = initialState.updatedProfile;
    });
    // Reset resetupdatedProfile state
    builder.addCase(resetupdatedProfile, (state) => {
      state.updatedProfile = initialState.updatedProfile;
    });
    // Reset resetUpdatedRestaurant state
    builder.addCase(resetupdatedRestaurant, (state) => {
      state.updatedRestaurant = initialState.updatedRestaurant;
    });
    // Reset Login state
    builder.addCase(resetLogin, (state) => {
      state.adminAuth = initialState.adminAuth;
    });
  }
})
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer
