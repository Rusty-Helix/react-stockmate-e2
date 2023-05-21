import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AppSlice } from "./slices/AppSlice";
import { StrategySlice } from "./slices/StrategySlice";

// deposit all your global states (redux)

export const store = configureStore({
  reducer: {
    app: AppSlice.reducer,
    strategy: StrategySlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
