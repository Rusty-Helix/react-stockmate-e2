import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatedStrategyType, genericStrategyType } from "../../utils/Types";
import axios from "axios";
import { defaultImages, images } from "../../utils/getStrategyImages";
import { strategyTypes } from "../../utils/getStrategyTypes";
import { strategyObject } from "../../utils/StrategyJSONString";

const illustrations = Object.values(images)
// console.log(Object.keys(images))
// console.log(illustrations)

export const getStrategyData = createAsyncThunk(
    "strategy/randomStrategy",
    async (strategies: genericStrategyType[]) => {
        try {
            const strategyData: generatedStrategyType[] = [];
            for await (const strategy of strategyObject) {
                const {data}: {
                    data: {
                        id: number;
                        types:{type:generatedStrategyType}[];
                    };
                } = await axios.get(strategies[0].url);

                

                console.log(strategy)

                const types = data.types.map(
                    ({type:{name}}:{type:{name:string}}) => ({
                        // @ts-expect-error
                        [name]: strategyTypes[name]
                    })
                );
                // @ts-expect-error
                let illustration:string = illustrations[data.id]
                // console.log(illustration)
                if(!illustration) {
                    // console.log(999)
                    // @ts-expect-error
                    // image = defaultImages[data.id];
                    illustration = illustrations[0];
                }

                if(illustration) {
                    // console.log(illustration)
                    strategyData.push({
                        name: strategy.name,
                        id: strategy.id,
                        image: illustration,
                        types,
                    })
                    // console.log(illustration)
                }
            }
            // console.log(strategyData)
            // console.log(strategyObject)
            return strategyData
        } catch (err) {
           console.log(err); 
        }
    }
);