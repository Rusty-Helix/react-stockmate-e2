// redux
import { createSlice } from "@reduxjs/toolkit";
import { StrategyTypeInitialState, generatedStrategyType } from "../../utils/Types";
import { getInitialStrategyData } from "../reducers/getInitialStrategyData";
import { getStrategyData } from "../reducers/getStrategyData";
import { getUserStrategies} from "../reducers/getUserStrategies";
import { removeStrategy } from "../reducers/removeStrategyFromUserList";
import { strategyJSONString } from "../../utils/StrategyJSONString";

const initialState:StrategyTypeInitialState = {
    allStrategy: undefined,
    randomStrategies: undefined,
    compareQueue: [],
    userStrategies: [],
};

export const StrategySlice = createSlice({
    name: "strategy",
    initialState,
    reducers: {
        addToCompare: (state, action) => {
            const index = state.compareQueue.findIndex(
                (strategy:generatedStrategyType)=>strategy.id === action.payload.id
            );
            if(index===-1) {
                if(state.compareQueue.length===2) {
                    state.compareQueue.pop();
                }
                state.compareQueue.unshift(action.payload);
            }
        },
        removeFromCompare:(state,action)=>{
            const index = state.compareQueue.findIndex(
                (strategy:generatedStrategyType)=>strategy.id === action.payload.id
            );
            const queue = [...state.compareQueue];
            queue.splice(index, 1);
            state.compareQueue=queue;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInitialStrategyData.fulfilled, (state, action)=>{
            state.allStrategy = action.payload
            
            // console.log(action.payload)
            const strategyJSONArray = strategyJSONString.split('},')
            const strategyArray = []
            for (let i = 0; i < strategyJSONArray.length-1; i++) {

                strategyJSONArray[i] = strategyJSONArray[i] + "}"
                // console.log(JSON.parse(strategyJSONArray[i]))
                strategyArray.push(JSON.parse(strategyJSONArray[i]))
            }
            strategyArray.push(JSON.parse(strategyJSONArray[strategyJSONArray.length-1]))
            // console.log(strategyArray)
            // state.allStrategy = strategyArray
        });
        builder.addCase(getStrategyData.fulfilled, (state, action)=>{
            //@ts-ignore
            state.randomStrategies = action.payload;
        })
        builder.addCase(getUserStrategies.fulfilled, (state, action) => {
            state.userStrategies = action.payload!;
        });
        builder.addCase(removeStrategy.fulfilled, (state, action)=>{
            const userStrategy = [...state.userStrategies];
            const index = userStrategy.findIndex(
                (strategy)=>strategy.firebaseId===action.payload?.id
            );
            userStrategy.splice(index, 1)
            state.userStrategies=userStrategy;
        });

    }
});

export const { addToCompare, removeFromCompare } = StrategySlice.actions;
