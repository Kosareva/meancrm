import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../shared/abstractions/BaseComponent.abstract";
import {AnalyticsRestService} from "../../shared/rest/api/analytics-rest.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../../shared/types/OverviewPage";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.sass']
})
export class OverviewPageComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  data$: Observable<OverviewPage>;
  tapTarget: MaterialInstance;

  @ViewChild('tapTarget', {static: true}) tapTargetRef: ElementRef;
  yesterday = new Date();

  constructor(
    private analyticsRestService: AnalyticsRestService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.data$ = this.analyticsRestService.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.tapTarget.destroy();
  }

  openInfo(): void {
    this.tapTarget.open();
  }

}
