import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: [255, 255, 255],
}

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, color) => {
      state.color = color.payload
    }
  }
})

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;