import React from "react";
import Wrapper from "../../sections/Wrapper";
// import { TradingViewWidget} from "../components/TradingViewWidget"
// import { HighCharts} from "../components/HighCharts"
import TradingViewWidget from "../../components/TradingViewWidget"
function AutoForwardTesting() {

  return (
    <div className="auto-forward-testing">


      <h1>Auto Forward Testing</h1>

      <TradingViewWidget />


    </div>
  );
}

export default Wrapper(AutoForwardTesting);