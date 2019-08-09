import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../shared/abstractions/BaseComponent.abstract";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";
import {OrdersRestService} from "../../shared/rest/api/orders-rest.service";
import {QueryParams} from "../../shared/enums/QueryParams";
import {takeUntil} from "rxjs/operators";
import {Order} from "../../shared/rest/model/Order";
import {Filter} from "../../shared/types/Filter";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  isFilterVisible = false;
  filter: Filter = {};
  limit = STEP;
  loading = false;
  noMoreOrders = false;
  offset = 0;
  orders: Order[] = [];
  reloading = false;
  tooltip: MaterialInstance;
  @ViewChild('tooltip', {static: true}) tooltipRef: ElementRef;

  constructor(
    private ordersRestService: OrdersRestService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.tooltip.destroy();
  }

  applyFilter(filter: Filter): void {
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

  loadMore(): void {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  private fetch(): void {
    const params = Object.assign({}, this.filter, {
      [QueryParams.OFFSET]: this.offset,
      [QueryParams.LIMIT]: this.limit,
    });

    this.ordersRestService.orderCollectionResourceGet(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(orders => {
          this.orders = this.orders.concat(orders);
          this.noMoreOrders = orders.length < STEP;
        },
        e => MaterialService.toast(e.error.message),
        () => {
          this.loading = false;
          this.reloading = false;
        }
      );
  }

}
