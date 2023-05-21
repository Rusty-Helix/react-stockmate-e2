// @ts-nocheck

import { useCallback, useEffect, useState } from "react";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { defaultImages, images } from "../utils/getStrategyImages";
import { extractColors } from "extract-colors";
import axios from "axios";

import Evolution from "./Strategy/Evolution";
import Locations from "./Strategy/Locations";
import CapableMoves from "./Strategy/CapableMoves";
import Description from "./Strategy/Description";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentStrategy } from "../app/slices/StrategySlice";
import { setStrategyTab } from "../app/slices/AppSlice";
import Loader from "../components/Loader";
import {
  strategyRoute,
  strategySpeciesRoute,
  strategyTabs,
} from "../utils/Constants";

function Strategy() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const currentStrategyTab = useAppSelector(
    ({ app: { currentStrategyTab } }) => currentStrategyTab
  );
  const currentStrategy = useAppSelector(
    ({ strategy: { currentStrategy } }) => currentStrategy
  );

  useEffect(() => {
    dispatch(setStrategyTab(strategyTabs.description));
  }, [dispatch]);

  const getRecursiveEvolution = useCallback(
    (evolutionChain, level, evolutionData) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          strategy: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "strategy-species",
              "strategy"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        strategy: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("strategy-species", "strategy"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain) => {
      const evolutionData = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const [isDataLoading, setIsDataLoading] = useState(true);
  const getStrategyInfo = useCallback(
    async (image) => {
      const { data } = await axios.get(`${strategyRoute}/${params.id}`);
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );

      const {
        data: {
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${strategySpeciesRoute}/${data.id}`);
      const { data: evolutionData } = await axios.get(evolutionURL);

      const strategyAbilities = {
        abilities: data.abilities.map(({ ability }) => ability.name),
        moves: data.moves.map(({ move }) => move.name),
      };

      const encounters = [];
      const evolution = getEvolutionData(evolutionData.chain);
      let evolutionLevel;
      evolutionLevel = evolution.find(
        ({ strategy }) => strategy.name === data.name
      ).level;
      dataEncounters.forEach((encounter) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      const stats = await data.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));
      dispatch(
        setCurrentStrategy({
          id: data.id,
          name: data.name,
          types: data.types.map(({ type: { name } }) => name),
          image,
          stats,
          encounters,
          evolutionLevel,
          evolution,
          strategyAbilities,
        })
      );
      setIsDataLoading(false);
    },
    [params.id, dispatch, getEvolutionData]
  );

  useEffect(() => {
    const imageElemet = document.createElement("img");
    imageElemet.src = images[params.id];
    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };
    const getColor = async () => {
      const color = await extractColors(imageElemet.src, options);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();
    let image = images[params.id];
    if (!image) {
      image = defaultImages[params.id];
    }

    getStrategyInfo(image);
  }, [params.id, getStrategyInfo]);

  return (
    <>
      {!isDataLoading && currentStrategy ? (
        <>
          {currentStrategyTab === strategyTabs.description && <Description />}
          {currentStrategyTab === strategyTabs.evolution && <Evolution />}
          {currentStrategyTab === strategyTabs.locations && <Locations />}
          {currentStrategyTab === strategyTabs.moves && <CapableMoves />}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Wrapper(Strategy);
