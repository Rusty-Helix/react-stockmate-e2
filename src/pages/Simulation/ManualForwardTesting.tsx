import React from "react";
import Wrapper from "../../sections/Wrapper";
// import { HighCharts} from "../components/HighCharts"
import TradingViewWidget from "../../components/RealtimeWidget"
function ManualForwardTesting() {

  return (
    <div className="manual-forward-testing">


      <h1>Manual Forward Testing</h1>

      <TradingViewWidget />


    </div>
  );
}

export default Wrapper(ManualForwardTesting);