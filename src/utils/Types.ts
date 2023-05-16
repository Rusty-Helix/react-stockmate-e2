export interface AppTypeInitialState {
    toasts:string[];
    userInfo: undefined | { email: string };
}

export interface StrategyTypeInitialState {
    allStrategy: undefined | genericStrategyType[];
    randomStrategies: undefined | generatedStrategyType[];
    compareQueue: generatedStrategyType[];
    userStrategies: userStrategiesType[];
}

export interface genericStrategyType {
    name: string;
    url: string;
}

export interface generatedStrategyType {
    name: string;
    id: number;
    image: string;  
    // types: 
    types: strategyTypeInterface[]
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

export interface userStrategiesType extends generatedStrategyType {
    firebaseId?: string;
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