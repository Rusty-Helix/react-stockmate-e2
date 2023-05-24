import React from "react";
import Wrapper from "../sections/Wrapper";
// import { TradingViewWidget} from "../components/TradingViewWidget"
// import { HighCharts} from "../components/HighCharts"
// import { TradingViewWidget} from "../components/TradingViewWidget"
import TradingViewWidget from "../components/TradingViewWidget"
function Simulation() {

  return (
    <div className="simulation">


      <h1>Simulation</h1>

      <TradingViewWidget />


    </div>
  );
}

export default Wrapper(Simulation);