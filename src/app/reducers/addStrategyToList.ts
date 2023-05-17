import { createAsyncThunk } from "@reduxjs/toolkit";

import { setToast } from "../slices/AppSlice"; 
import { strategyListRef } from "../../utils/FirebaseConfig";
import { RootState } from "../store";
import { addDoc } from "firebase/firestore";
import {
  strategyStatsType,
  strategyTypeInterface,
  userStrategiesType,
} from "../../utils/Types";
import { getUserStrategies } from "./getUserStrategies";

export const addStrategyToList = createAsyncThunk("strategy/addStrategy", async (strategy:{
    id:number;
    name:string;
    types:strategyTypeInterface[] | string[]
    stats?:strategyStatsType[];
}, {getState, dispatch})=>{
    try {
        const {
            app: {userInfo},
            strategy: {userStrategies},
        } = getState() as RootState;
        if (!userInfo?.email) {
            return dispatch(setToast("Please Login to add strategies to your collection"))
        }
        const index = userStrategies.findIndex((userStrategy:userStrategiesType)=>{
            return userStrategy.name===strategy.name;
        })
        if(index===-1){
            let types: string[]=[];
            
            if (!strategy.stats) {
                strategy.types.forEach((type: any) =>
                types.push(Object.keys(type).toString())
            );
            } else {
                types = strategy.types as string[];
            }

            await addDoc(strategyListRef, {
                strategy:{id:strategy.id, name: strategy.name, types},
                email: userInfo.email
            })
            
            await dispatch(getUserStrategies());

            return dispatch(setToast(`「${strategy.name}」已被加入你的策略卡組`));
        } else {
            return dispatch(
                setToast(`「${strategy.name}」已在你的策略卡組`))
        }
    } catch(err) {
        console.log(err)
    }
})