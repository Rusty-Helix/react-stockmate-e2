import React from "react"
import Wrapper from "../../sections/Wrapper";
import {useAppSelector} from "../../app/hooks";
import CompareContainer from "../../components/CompareContainer";
// import {userStrategiesType} from "../utils/Types";

function News() {
    const { compareQueue } = useAppSelector(({strategy})=>strategy)
    
    return <>

        {/* <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
        {
          feedMode: "all_symbols";
          colorTheme: "dark";
          isTransparent: true;
          displayMode: "regular";
          width: "100%";
          height: "100%";
          locale: "en";
        }
        </script> */}

<div className="tradingview-widget-container">
  <div className="tradingview-widget-container__widget"></div>
  <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
</div>
    </> 
}

export default Wrapper(News);