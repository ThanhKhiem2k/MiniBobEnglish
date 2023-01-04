import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface checkIndex {
  index: number;
  value: number;
}

const positionBankSlice = createSlice({
  name: 'PositionBank',
  initialState: {
    position: [] as number[],
    checkPosition: [] as number[],
  },
  reducers: {
    pushPosition(state, action: PayloadAction<number>) {
      state.position.push(action.payload);
    },
    initCheckIndex(state, action: PayloadAction<number>) {
      state.checkPosition[action.payload] = -1;
    },
    changeCheckIndex(state, action: PayloadAction<checkIndex>) {
      state.checkPosition[action.payload.index] = action.payload.value;
    },
  },
});
export const {
  pushPosition,
  initCheckIndex,
  changeCheckIndex,
} = positionBankSlice.actions;
export default positionBankSlice.reducer;
