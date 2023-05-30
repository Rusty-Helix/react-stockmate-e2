import Wrapper from "../../sections/Wrapper"
import HighCharts from "../../components/HighCharts"

function ManualBacktesting() {

  return (
    <div className="manual-backtesting">

      <h1>Manual Back Testing</h1>
      <HighCharts />

    </div>
  );
}

export default Wrapper(ManualBacktesting);