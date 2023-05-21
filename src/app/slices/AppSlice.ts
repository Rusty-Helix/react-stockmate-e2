// redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { strategyTabs } from "../../utils/Constants";
import { AppTypeInitialState } from "../../utils/Types";

const initialState:AppTypeInitialState = {
    isLoading: true,
    userInfo: undefined,
    toasts: [],
    currentStrategyTab: strategyTabs.description,
};

export const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setToast:(state,action) => {
            const toasts = [...state.toasts];
            toasts.push(action.payload);
            state.toasts = toasts;
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
        setUserStatus: (state, action) => {
            state.userInfo = action.payload;
        },
        setStrategyTab: (state, action) => {
            state.currentStrategyTab = action.payload;
    },
    },
});

export const {
    setToast,
    clearToasts,
    setUserStatus,
    setStrategyTab
} = AppSlice.actions;
