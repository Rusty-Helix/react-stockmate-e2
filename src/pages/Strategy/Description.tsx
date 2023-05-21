import React from "react";
import Info from "../../components/Info";
import StrategyContainer from "../../components/StrategyContainer";
import { useAppSelector } from "../../app/hooks";

function Description() {
  const strategyData = useAppSelector(
    ({ strategy: { currentStrategy } }) => currentStrategy
  );
  return (
    <>
      <Info data={strategyData} />
      {strategyData && <StrategyContainer image={strategyData.image} />}
    </>
  );
}

export default Description;
