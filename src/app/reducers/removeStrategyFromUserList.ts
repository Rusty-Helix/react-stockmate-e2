import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { strategyListRef } from "../../utils/FirebaseConfig";

export const removeStrategy = createAsyncThunk (
    "strategy/remove",
    async ({id}:{id:string}) => {
        try {
            await deleteDoc(doc(strategyListRef, id));
            return {id};
        } catch (err) {
            console.log(err);
        }
    }
)