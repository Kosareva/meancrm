import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BaseComponent} from "../../shared/abstractions/BaseComponent.abstract";
import {AnalyticsRestService} from "../../shared/rest/api/analytics-rest.service";
import {takeUntil} from "rxjs/operators";
import {AnalyticsPage} from "../../shared/types/AnalyticsPage";
import {MaterialService} from "../../shared/services/material.service";
import {Chart} from 'chart.js';
import {createChartConfig} from "../../shared/utils/Utils";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.sass']
})
export class AnalyticsPageComponent extends BaseComponent implements AfterViewInit {

  average: number;
  @ViewChild('gain', {static: true}) gainRef: ElementRef;
  pending = true;
  @ViewChild('order', {static: true}) orderRef: ElementRef;

  constructor(
    private analyticsRestService: AnalyticsRestService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Revenue',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)'
    };

    this.analyticsRestService.getAnalytics()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (data: AnalyticsPage) => {
          this.average = data.average;

          gainConfig.labels = data.chart.map(item => item.label);
          gainConfig.data = data.chart.map(item => item.gain);

          orderConfig.labels = data.chart.map(item => item.label);
          orderConfig.data = data.chart.map(item => item.order);

          const gainCtx = this.gainRef.nativeElement.getContext('2d');
          const orderCtx = this.orderRef.nativeElement.getContext('2d');
          gainCtx.canvas.height = '300px';
          orderCtx.canvas.height = '300px';

          new Chart(gainCtx, createChartConfig(gainConfig));
          new Chart(orderCtx, createChartConfig(orderConfig));

        },
        e => MaterialService.toast(e.error.message),
        () => {
          this.pending = false;
        }
      )
  }

}
