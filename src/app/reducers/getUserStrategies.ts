import { createAsyncThunk} from "@reduxjs/toolkit";
import { getDocs, query, where } from "firebase/firestore";
import { strategyListRef } from "../../utils/FirebaseConfig";
import { RootState } from "../store";
import { userStrategiesType } from "../../utils/Types";
import { strategyTypes } from "../../utils/getStrategyTypes";
import { images, defaultImages } from "../../utils/getStrategyImages";

const illustrations = Object.values(images)

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
                    // console.log(strategies)
                    // @ts-ignore
                    let image = illustrations[strategies.id]
                    // console.log(image)
                    if(!image){
                        // @ts-ignore
                        image = illustrations[0];
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
                // console.log(userStrategies)
                return userStrategies;
            }
            return [];
        } catch(err) {
            console.log(err);
        }
})