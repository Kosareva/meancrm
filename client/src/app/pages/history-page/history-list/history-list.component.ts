import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../../shared/abstractions/BaseComponent.abstract";
import {Order} from "../../../shared/rest/model/Order";
import {MaterialInstance, MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.sass']
})
export class HistoryListComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  modal: MaterialInstance;
  @ViewChild('modal', {static: true}) modalRef: ElementRef;
  @Input() orders: Order[];
  selectedOrder: Order;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.modal.destroy();
  }

  closeModal(): void {
    this.modal.close();
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += +item.quantity * +item.cost;
    }, 0);
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

}
