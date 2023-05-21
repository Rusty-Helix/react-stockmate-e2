import React from "react";
import { useAppSelector } from "../../app/hooks";

function CapableMoves() {
  const strategyData = useAppSelector(
    ({ strategy: { currentStrategy } }) => currentStrategy
  );
  return (
    <div className="page capable-moves">
      <h1 className="capable-moves-title">Abilities</h1>
      <ul className="capable-moves-list ability">
        {strategyData?.pokemonAbilities.abilities.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="capable-moves-title">Moves</h1>
      <ul className="capable-moves-list">
        {strategyData?.pokemonAbilities.moves.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapableMoves;
