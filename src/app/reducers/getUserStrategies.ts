import { createAsyncThunk} from "@reduxjs/toolkit";
import { getDocs, query, where } from "firebase/firestore";
import { strategyListRef } from "../../utils/FirebaseConfig";
import { RootState } from "../store";
import { userStrategiesType } from "../../utils/Types";
import { strategyTypes } from "../../utils/getStrategyTypes";
import { images, defaultImages } from "../../utils/getStrategyImages";

export const getUserStrategies = createAsyncThunk(
    "strategy/userList",
    async (args, {getState})=>{
        try {
            const {
                app: { userInfo }
            } = getState() as RootState;
            if (!userInfo?.email) {
                return;
            }
            const firestoreQuery = query(
                strategyListRef,
                where("email",  "==", userInfo.email)
            );
            const fetchedStrategies = await getDocs(firestoreQuery);
            if(fetchedStrategies.docs.length) {
                const userStrategies:userStrategiesType[] = [];
                fetchedStrategies.forEach(async (strategy)=>{
                    const strategies = await strategy.data().strategy;
                    // @ts-ignore
                    let image = images[strategies.id]
                    if(!image){
                        // @ts-ignore
                        image = defaultImages[strategies.id];
                    }
                    
                    const types = strategies.types.map((name:string)=>(
                    {
                        //@ts-ignore
                        [name]: strategyTypes[name],
                    }
                    ))
                    userStrategies.push({
                        ...strategies,
                        firebaseId: strategy.id,
                        image,
                        types,
                    });
                });
                return userStrategies;
            }
            return [];
        } catch(err) {
            console.log(err);
        }
})