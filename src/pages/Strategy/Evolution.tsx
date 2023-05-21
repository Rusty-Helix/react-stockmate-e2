import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import StrategyCardGrid from "../../components/StrategyCardGrid";
import { getStrategyData } from "../../app/reducers/getStrategyData";
import Loader from "../../components/Loader";
import { genericStrategyType } from "../../utils/Types";

function Evolution() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const strategyData = useAppSelector(({ strategy }) => strategy);
  useEffect(() => {
    const fetchData = async () => {
      const strategies: genericStrategyType[] =
        strategyData.currentStrategy!.evolution.map(
          ({ strategy }: { strategy: genericStrategyType }) => strategy
        );
      await dispatch(getStrategyData(strategies));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, strategyData.currentStrategy]);

  return (
    <div className="page">
      {isLoaded ? (
        <StrategyCardGrid strategies={strategyData.randomStrategies!} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Evolution;
