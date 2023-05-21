import React from "react";
import { useAppSelector } from "../../app/hooks";

function Locations() {
  const strategyData = useAppSelector(
    ({ strategy: { currentStrategy } }) => currentStrategy
  );
  return (
    <div className="strategy-locations">
      <ul className="strategy-locations-list">
        {strategyData?.encounters.map((encounter: string) => (
          <li key={encounter} className="strategy-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
