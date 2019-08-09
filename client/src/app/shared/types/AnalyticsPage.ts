export interface AnalyticsChartItem {
  gain: number;
  order: number;
  label: string;
}

export interface AnalyticsPage {
  average: number;
  chart: AnalyticsChartItem[];
}
