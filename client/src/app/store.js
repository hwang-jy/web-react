import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import colorReducer from '../features/color/colorSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  ui: colorReducer
})

export const store = configureStore({
  reducer: rootReducer
})