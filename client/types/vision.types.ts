// 1. Stock General Data
export interface StockGeneralItem {
    param: string;
    value: string;
}

// 2. Prediction Data
export interface PredictionData {
    open: Record<string, number>;
    high: Record<string, number>;
    low: Record<string, number>;
    close: Record<string, number>;
}

// 3. Config
export interface Config {
    ticker: string;
    timeframe: string;
    candles: number;
    val_horizon: number;
    for_horizon: number;
    use_prophet: boolean;
    use_xgboost: boolean;
    use_lstm: boolean;
    lstm_epochs: number;
    lstm_batch: number;
    output_dir: string;
    quiet: boolean;
}

// 4. Reasons (just an array of strings)
export type Reasons = string[];

// 5. Indicators (array of string identifiers)
export type Indicators = string[];

// 6. Strategies Influenced
export type StrategiesInfluenced = string[];