export interface IChart {
  mal?: number;
  mas?: number;
  mfi?: number;
  price?: number;
  rsi?: number;
  time?: string;
  wt1?: number;
  wt2?: number;
  long_in?: boolean;
  long_out?: boolean;
  short_in?: boolean;
  short_out?: boolean;
  tp_dot?: any;
  vu_man_sell?: any;
  vu_man_buy?: any;
}

export interface IDataChart {
  charts: IChart[];
  mfi_chart: string;
  momentum_chart: string;
  price_chart: string;
  rsi_chart: string;
  symbol: string;
  timeframe: string;
}

export interface IDataSim {
  nameSim: string | null;
  valueSim: string | null;
  valueTimeFrame?: string | null;
}

export interface IStatistics {
  commission_sum: number;
  id: number;
  long_count: number;
  long_sum: number;
  loss_count: number;
  loss_sum: number;
  low_amount: number;
  prof_count: number;
  prof_sum: number;
  profit_factor: number;
  result: number;
  short_count: number;
  short_sum: number;
  symbol: string;
  total_sum: number;
}

export interface IDataContext {
  options: IDataChart[] | null;
  setOptions: (a: IDataChart[] | null) => void;
  selectedOption: IDataChart | null;
  setSelectedOption: (a: IDataChart | null) => void;
  dataSim: IDataSim;
  setDataSim: (a: IDataSim) => void;
  error: boolean;
  statistics: IStatistics | null;
}
