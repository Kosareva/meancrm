export interface OverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}

export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem;
}
