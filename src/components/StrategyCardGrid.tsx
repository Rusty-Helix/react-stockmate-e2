import React from "react";
import { IoGitCompare } from "react-icons/io5";
import { strategyTypeInterface, userStrategiesType } from "../utils/Types";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCompare } from "../app/slices/StrategySlice";
import { addStrategyToList } from "../app/reducers/addStrategyToList";
import { removeStrategy } from "../app/reducers/removeStrategyFromUserList";

import buyingSignal from "../../assets/bullish-icon.png";
import sellingSignal from "../../assets/selling-icon.png";


import { setToast } from "../app/slices/AppSlice";

function StrategyCardGrid({strategies}: {strategies:userStrategiesType[]}) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
    <div className="strategy-card-grid-container">
        <div className="strategy-card-grid">
            {
                strategies && strategies.length>0 &&
                strategies?.map((strategyData:userStrategiesType)=>{
                    return (
                    <div className="strategy-card" key={strategyData.id}>
                        <div className="strategy-card-list">
                            {location.pathname.includes("/strategy") ||
                             location.pathname.includes("/search") ? (
                                <FaPlus
                                    className="plus"
                                    onClick={()=>dispatch(addStrategyToList(strategyData))}
                                />
                            ):(
                               <FaTrash
                                    className="trash" 
                                    onClick={async ()=>{
                                        await dispatch(removeStrategy({id:strategyData.firebaseId!}));
                                        dispatch(setToast("策略移除"));
                                    }
                                    }
                               />
                            )
                            }

                        </div>
                        <div className="strategy-card-compare">
                            <IoGitCompare
                            onClick={()=>{
                                // dispatch(addToCompare(strategyData))
                                dispatch(setToast(`「${strategyData.name}」已被加入比對序列`));
                            }
                        }/>

                        </div>
                        <h3 className="strategy-card-title">{strategyData.name}</h3>
                        <img
                            // src="bearish-counterattack.jpg"
                            // src="../../static/media/death-cross.jpg"
                            src={strategyData.image}
                            alt="strategy"
                            className="strategy-card-image"
                            loading="lazy"
                            onClick={()=>navigate(`/strategy/${strategyData.id}`)}
                        />
                        {/* <div className="strategy-card-types">
                            {
                            strategyData.types.map(
                            (type:strategyTypeInterface, index:number)=>{
                                const keys = Object.keys(type);
                                return (
                                        <div
                                            className="strategy-card-types-type"
                                            key={index}
                                        >
                                            <img
                                                src={type[keys[0]].image}
                                                // src={type[keys[0]].image}
                                                alt="strategy type"
                                                className="strategy-card-types-type-image"
                                                loading="lazy"
                                            />
                                            <h6 className="strategy-card-types-type-text">
                                                {keys[0]}
                                            </h6>
                                        </div>
                                    )
                            })
                            }
                        </div> */}
                    </div>
                )})
            }

        </div>
    </div>)
}

export default StrategyCardGrid;