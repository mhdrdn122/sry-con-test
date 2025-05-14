import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    selectedSigns: [],
  };
  const selectedSignsSlice = createSlice({
    name: "selectedSigns",
    initialState,
    reducers: {
      addSign: (state, action) => {
        state.selectedSigns.push(action.payload);
      },
      removeSign: (state, action) => {
        state.selectedSigns = state.selectedSigns.filter(
          (sign) => sign.id !== action.payload.id
        );
      },
      clearSigns: (state) => {
        state.selectedSigns = [];
      },
      updateSignValue : (state, action) => {
        const { id, field, value } = action.payload;
        const index = state.selectedSigns.findIndex((sign) => sign.id === id);
        if (index !== -1) {
          state.selectedSigns[index][field] = value;
        }
      },
      updateSelectedSigns: (state, action) => {
         state.selectedSigns= action.payload; // Updates the selectedSigns array
    }
  
    },
  });
  
export const { addSign, removeSign, clearSigns , setSelectedSigns ,updateSignValue,updateSelectedSigns  } = selectedSignsSlice.actions;
export default selectedSignsSlice.reducer;
    