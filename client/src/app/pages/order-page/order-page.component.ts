import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../common/abstractions/BaseComponent.abstract";
import {NavigationEnd, Router} from "@angular/router";
import {routesAliases} from "../../common/enums/routesAliases";
import {map, takeUntil} from "rxjs/operators";
import {filter} from "rxjs/internal/operators/filter";
import {MaterialInstance, MaterialService} from "../../shared/services/material.service";
import {OrderService} from "./order.service";
import {OrderPosition} from "../../shared/rest/model/OrderPosition";
import {OrdersRestService} from "../../shared/rest/api/orders-rest.service";
import {Order} from "../../shared/rest/model/Order";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
  providers: [OrderService]
})
export class OrderPageComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  isRoot: boolean;
  modal: MaterialInstance;
  @ViewChild('modal', {static: true}) modalRef: ElementRef;

  constructor(
    public order: OrderService,
    private ordersRestService: OrdersRestService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.isRoot = this.router.url === `/${routesAliases.ORDER}`;
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe),
        filter(ev => ev instanceof NavigationEnd),
        map(ev => this.router.url)
      )
      .subscribe(url => {
        this.isRoot = url === `/${routesAliases.ORDER}`;
      });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.modal.destroy();
  }

  cancel(): void {
    this.modal.close();
  }

  open(): void {
    this.modal.open();
  }

  removePosition(orderPosition: OrderPosition): void {
    this.order.remove(orderPosition._id);
  }

  submit(): void {
    this.modal.close();
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    };
    this.ordersRestService.orderResourcePost(order)
      .subscribe(newOrder => {
          MaterialService.toast(`Order #${newOrder.order} created`);
        },
        e => {
          MaterialService.toast(e.error.message);
        },
        () => {
          this.modal.close();
        }
      );
  }

}
