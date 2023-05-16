import React from "react";
import Wrapper from "../sections/Wrapper";
import { FaPlus } from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import {
        userStrategiesType,
        strategyTypeInterface,
        strategyStatType
    } from "../utils/Types";
import { removeFromCompare } from "../app/slices/StrategySlice";
import { strategyTypes } from "../utils/getStrategyTypes";
import { useAppDispatch } from "../app/hooks";
import { addStrategyToList } from "../app/reducers/addStrategyToList";

function CompareContainer({
    strategy=undefined,
    isEmpty=false,
}:{
    strategy?:userStrategiesType,
    isEmpty?:boolean;
}) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const createStatsArray = (
        types: strategyTypeInterface[],
        statType:strategyStatType
    ) => {
        const statsArray: {name: string; image: string}[] = [];
        const statsSet = new Set<string>();
        types.forEach((type:strategyTypeInterface)=>{
            const key = Object.keys(type)[0];
            // console.log({type})
            type[key][statType].forEach((stat:string)=>{
                if(!statsSet.has(stat)){
                    //@ts-ignore
                    statsArray.push({name:stat, image:strategyTypes[stat].image});
                    statsSet.add(stat);
                }
            });
        });
        return statsArray;
    }
    const getStates = () => {
        const data = createStatsArray(strategy?.types!, "strength");
        return (
                <>
                    <div className="strategy-types">
                        <h4 className="strategy-type-title">Strength</h4>
                        <div className="strategy-type-icons">
                            {
                                createStatsArray(strategy?.types!, "strength").map(
                                    (stat:{image:string})=>(
                                        <div className="strategy-type">
                                            <img
                                                src={stat.image}
                                                alt="strategy type"
                                                className="strategy-type-image"
                                            />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="strategy-types">
                        <h4 className="strategy-type-title">Resistance</h4>
                        <div className="strategy-type-icons">
                            {
                                createStatsArray(strategy?.types!, "resistance").map(
                                    (stat:{image:string})=>(
                                        <div className="strategy-type">
                                            <img
                                                src={stat.image}
                                                alt="strategy type"
                                                className="strategy-type-image"
                                            />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="strategy-types">
                        <h4 className="strategy-type-title">Vulnerable</h4>
                        <div className="strategy-type-icons">
                            {
                                createStatsArray(strategy?.types!, "vulnerable").map(
                                    (stat:{image:string})=>(
                                        <div className="strategy-type">
                                            <img
                                                src={stat.image}
                                                alt="strategy type"
                                                className="strategy-type-image"
                                            />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="strategy-types">
                        <h4 className="strategy-type-title">Weakness</h4>
                        <div className="strategy-type-icons">
                            {
                                createStatsArray(strategy?.types!, "weakness").map(
                                    (stat:{image:string})=>(
                                        <div className="strategy-type">
                                            <img
                                                src={stat.image}
                                                alt="strategy type"
                                                className="strategy-type-image"
                                            />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>

                </>
            )
    };
    return <div>
        {
            isEmpty && (
                <div className="empty">
                    <button>
                        <FaPlus />
                    </button>
                    <h3>交易紀錄</h3>
                </div>
            )
        }
        {
            strategy &&
            <div className="compare-element">
                <div className="compare-info">
                    <div className="compare-details">
                        <h3>{strategy?.name}</h3>
                        <img
                            src={strategy?.image}
                            alt="strategy"
                            className="compare-image"
                        />
                    </div>
                    <div className="strategy-types-container">
                        <div className="strategy-types">
                            <h4 className="strategy-type-title">
                                Type
                            </h4>
                            <div className="strategy-type-icons">
                                {
                                    strategy?.types.map((type:strategyTypeInterface)=>{
                                        const keys = Object.keys(type)
                                        return (
                                                <div className="strategy-type">
                                                    <img 
                                                        src={type[keys[0]].image}
                                                        alt="strategy type"
                                                        className="strategy-type-image"
                                                    />
                                                </div>
                                            )
                                    })
                                }
                            </div>
                        </div>
                        {getStates()}
                    </div>
                </div>
                <div className="compare-action-buttons">
                    <button 
                        className="compare-btn"
                        onClick={()=>dispatch(addStrategyToList(strategy))}
                    >Add</button>
                    <button
                        className="compare-btn"
                        onClick = {()=>{
                            // const strategyId = strategy.id
                            navigate(`/strategy/${strategy.id}`)}
                        }
                    >
                        View
                    </button>
                    <button className="compare-btn"
                            onClick={()=>dispatch(removeFromCompare({id:strategy.id}))}>Remove</button>
                </div>
            </div>
        }
    </div>

}

export default CompareContainer