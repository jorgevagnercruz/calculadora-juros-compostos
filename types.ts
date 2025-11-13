
export interface ChartData {
  period: number;
  invested: number;
  total: number;
}

export interface TableData {
  period: number;
  interest: number;
  totalInvested: number;
  total: number;
}

export interface ResultSummary {
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
}

export interface CalculationResultData {
  summary: ResultSummary;
  chartData: ChartData[];
  tableData: TableData[];
}
