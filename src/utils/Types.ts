export interface AppTypeInitialState {
    isLoading: boolean;
    userInfo: undefined | { email: string };
    toasts:string[];
    currentStrategyTab: string;
}

export interface StrategyTypeInitialState {
    allStrategy: undefined | genericStrategyType[];
    randomStrategies: undefined | generatedStrategyType[];
    compareQueue: generatedStrategyType[];
    userStrategies: userStrategiesType[];
    currentStrategy: undefined | currentStrategyType;
}

export interface genericStrategyType {
    name: string;
    url: string;
}

export interface generatedStrategyType {
    name: string;
    id: number;
    image: string;  
    types: strategyTypeInterface[]
}


export interface userStrategiesType extends generatedStrategyType {
    firebaseId?: string;
}

export interface currentStrategyType {
  id: number;
  name: string;
  types: strategyTypeInterface[];
  image: string;
  stats: strategyStatsType[];
  encounters: string[];
  evolutionLevel: number;
  evolution: { level: number; strategy: { name: string; url: string } }[];
  pokemonAbilities: { abilities: string[]; moves: string[] };
}

export interface strategyStatsType {
  name: string;
  value: string;
}

export interface strategyTypeInterface {
    [key:string]: {
        image:string,
        resistance: string[];
        strength: string[];
        weakness: string[];
        vulnerable: string[];
    }
}

export type strategyStatType =
    | "vulnerable"
    | "weakness"
    | "strength"
    | "resistance"


export interface strategyStatsType {
    name:string,
    value:string;
}