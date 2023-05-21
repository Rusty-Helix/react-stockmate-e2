import React from "react"
import Wrapper from "../sections/Wrapper";
import {useAppSelector} from "../app/hooks";
import CompareContainer from "../components/CompareContainer";
// import {userStrategiesType} from "../utils/Types";

function Compare() {
    const { compareQueue } = useAppSelector(({strategy})=>strategy)
    return <>
        <div className="compare">
        <CompareContainer 
            strategy={compareQueue[0]}
            isEmpty={compareQueue.length < 1}
            />
        <CompareContainer 
            strategy={compareQueue[1]}
            isEmpty={compareQueue.length < 2}
            />
    </div>
    </> 
}

export default Wrapper(Compare);