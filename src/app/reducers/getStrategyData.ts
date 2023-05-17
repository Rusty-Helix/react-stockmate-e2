import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatedStrategyType, genericStrategyType } from "../../utils/Types";
import axios from "axios";
import { defaultImages, images } from "../../utils/getStrategyImages";
import { strategyTypes } from "../../utils/getStrategyTypes";
import { strategyObject } from "../../utils/StrategyJSONString";

const illustrations = Object.values(images)

export const getStrategyData = createAsyncThunk(
    "strategy/randomStrategy",
    async (strategies: genericStrategyType[]) => {
        try {
            const strategyData: generatedStrategyType[] = [];
            for await (const strategy of strategyObject) {
                // console.log(strategy)
                const {data}: {
                    data: {
                        id: number;
                        types:{type:generatedStrategyType}[];
                    };
                } = await axios.get(strategies[0].url);

                const types = data.types.map(
                    ({type:{name}}:{type:{name:string}}) => ({
                        // @ts-expect-error
                        [name]: strategyTypes[name]
                    })
                );
                // @ts-expect-error
                let illustration:string = illustrations[strategy.id-1]
                console.log(illustrations)
                if(!illustration) {
                    // @ts-expect-error
                    // image = defaultImages[data.id];
                    illustration = illustrations[0];
                    console.log("fuck")
                    console.log(illustration)
                }

                if(illustration) {
                    strategyData.push({
                        name: strategy.name,
                        id: strategy.id,
                        image: illustration,
                        types,
                    })
                    // console.log(strategyData)
                }
                // console.log(strategy.id)
                // console.log(strategy.name)
                // console.log(illustration)
                // console.log("---")
            }
            return strategyData
        } catch (err) {
           console.log(err); 
        }
    }
);