import React from "react"
import Wrapper from "../../sections/Wrapper";
import {useAppSelector} from "../../app/hooks";
import CompareContainer from "../../components/CompareContainer";
// import {userStrategiesType} from "../utils/Types";

function News() {
    const { compareQueue } = useAppSelector(({strategy})=>strategy)
    
    return <>

      <h1>NEWS</h1>
    </> 
}

export default Wrapper(News);